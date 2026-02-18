import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { createClient } from '@supabase/supabase-js'

const baseUrl = process.env.E2E_BASE_URL || 'http://127.0.0.1:3000'
const requireAuthChecks = process.env.E2E_REQUIRE_AUTH === '1'

const timeoutMs = 20000
const now = Date.now()

function loadDotEnvLocal() {
    const envPath = path.resolve('.env.local')
    if (!fs.existsSync(envPath)) {
        return
    }

    const content = fs.readFileSync(envPath, 'utf8')
    for (const rawLine of content.split('\n')) {
        const line = rawLine.trim()
        if (!line || line.startsWith('#')) continue

        const separatorIndex = line.indexOf('=')
        if (separatorIndex === -1) continue

        const key = line.slice(0, separatorIndex).trim()
        const value = line.slice(separatorIndex + 1).trim()
        if (!process.env[key]) {
            process.env[key] = value
        }
    }
}

function withTimeout(resource, init) {
    return fetch(resource, {
        ...init,
        signal: AbortSignal.timeout(timeoutMs),
    })
}

async function getHtml(pathname, init) {
    const response = await withTimeout(`${baseUrl}${pathname}`, init)
    const html = await response.text()
    return { response, html }
}

function logPass(message) {
    console.log(`PASS ${message}`)
}

function logSkip(message) {
    console.log(`SKIP ${message}`)
}

async function checkAdminRedirect() {
    const { response } = await getHtml('/admin/news', { redirect: 'manual' })
    assert(
        [301, 302, 303, 307, 308].includes(response.status),
        `Expected redirect status for /admin/news, got ${response.status}`
    )
    const location = response.headers.get('location') || ''
    assert(
        location.includes('/admin/login'),
        `Expected redirect location to include /admin/login, got "${location}"`
    )
    logPass('unauthenticated /admin/news redirects to /admin/login')
}

async function checkPublicRoutes() {
    const criticalRoutes = ['/', '/contacts', '/parents/admission', '/programs', '/about']

    for (const route of criticalRoutes) {
        const { response } = await getHtml(route)
        assert(
            response.status >= 200 && response.status < 400,
            `Expected ${route} to return 2xx/3xx, got ${response.status}`
        )
        logPass(`public route ${route} is reachable (${response.status})`)
    }
}

async function checkLanguageSwitch() {
    const { response, html } = await getHtml('/')
    assert.equal(response.status, 200, `Expected / to return 200, got ${response.status}`)
    assert(html.includes('>RU<'), 'Expected language switch to render RU option')
    assert(html.includes('>EN<'), 'Expected language switch to render EN option')
    logPass('home page renders RU/EN language switch controls')
}

async function checkContactFlow() {
    const { response, html } = await getHtml('/contacts')
    assert.equal(response.status, 200, `Expected /contacts to return 200, got ${response.status}`)
    assert(html.includes('<form'), 'Expected contact page to render form')
    assert(html.includes('id="name"'), 'Expected contact form name field')
    assert(html.includes('id="email"'), 'Expected contact form email field')
    assert(html.includes('id="message"'), 'Expected contact form message field')
    logPass('contact page renders required lead form fields')
}

async function checkAdmissionFlow() {
    const { response, html } = await getHtml('/parents/admission')
    assert.equal(
        response.status,
        200,
        `Expected /parents/admission to return 200, got ${response.status}`
    )
    assert(html.includes('Процесс поступления'), 'Expected admission hero title to be present')
    assert(html.includes('href="/contacts"'), 'Expected admission CTA link to contacts page')
    logPass('admission page renders process and CTA to contacts')
}

async function checkNewsCrudPublishFlow() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    const adminEmail = process.env.E2E_ADMIN_EMAIL
    const adminPassword = process.env.E2E_ADMIN_PASSWORD

    if (!supabaseUrl || !supabaseAnonKey) {
        if (requireAuthChecks) {
            throw new Error(
                'E2E_REQUIRE_AUTH=1 but NEXT_PUBLIC_SUPABASE_URL/NEXT_PUBLIC_SUPABASE_ANON_KEY are missing'
            )
        }
        logSkip('news CRUD/publish skipped: Supabase env vars are not set')
        return
    }

    if (!adminEmail || !adminPassword) {
        if (requireAuthChecks) {
            throw new Error('E2E_REQUIRE_AUTH=1 but E2E_ADMIN_EMAIL/E2E_ADMIN_PASSWORD are missing')
        }
        logSkip('news CRUD/publish skipped: E2E_ADMIN_EMAIL/E2E_ADMIN_PASSWORD are not set')
        return
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
        auth: { autoRefreshToken: false, persistSession: false },
    })

    const { error: signInError } = await supabase.auth.signInWithPassword({
        email: adminEmail,
        password: adminPassword,
    })
    assert(!signInError, `Admin sign-in failed: ${signInError?.message}`)
    logPass('admin auth sign-in via Supabase')

    const slug = `e2e-critical-${now}`
    const titleRu = `E2E Критический Тест ${now}`
    let articleId = null

    try {
        const { data: created, error: createError } = await supabase
            .from('news')
            .insert({
                title_ru: titleRu,
                title_en: `E2E Critical Test ${now}`,
                description_ru: 'Автотестовая публикация',
                description_en: 'Autotest publication',
                content_ru: 'Контент автотеста',
                content_en: 'Autotest content',
                category: 'news',
                slug,
                image_url: null,
                priority: 0,
                is_published: false,
                published_at: null,
            })
            .select('id,is_published')
            .single()

        assert(!createError, `News create failed: ${createError?.message}`)
        assert(created, 'News create returned no row')
        assert.equal(created.is_published, false, 'New article must start as draft')
        articleId = created.id
        logPass('news draft created')

        const publishedAt = new Date().toISOString()
        const { data: published, error: publishError } = await supabase
            .from('news')
            .update({ is_published: true, published_at: publishedAt })
            .eq('id', articleId)
            .select('id,is_published,published_at')
            .single()

        assert(!publishError, `News publish failed: ${publishError?.message}`)
        assert.equal(published.is_published, true, 'Article publish flag must be true')
        assert(published.published_at, 'Article published_at must be set')
        logPass('news draft published')

        const { response, html } = await getHtml(`/news/${slug}`)
        assert.equal(
            response.status,
            200,
            `Expected published article route to return 200, got ${response.status}`
        )
        assert(
            html.includes(titleRu),
            'Expected published article title to be visible on public route'
        )
        logPass('published article is reachable on public route')
    } finally {
        if (articleId) {
            const { error: deleteError } = await supabase.from('news').delete().eq('id', articleId)
            assert(!deleteError, `Cleanup delete failed: ${deleteError?.message}`)
            logPass('news test artifact cleaned up')
        }
        await supabase.auth.signOut()
    }
}

async function main() {
    loadDotEnvLocal()
    console.log(`Running critical E2E smoke checks against ${baseUrl}`)

    await checkAdminRedirect()
    await checkPublicRoutes()
    await checkLanguageSwitch()
    await checkContactFlow()
    await checkAdmissionFlow()
    await checkNewsCrudPublishFlow()

    console.log('Critical E2E smoke checks completed successfully')
}

main().catch((error) => {
    console.error(`FAIL ${error instanceof Error ? error.message : String(error)}`)
    process.exitCode = 1
})
