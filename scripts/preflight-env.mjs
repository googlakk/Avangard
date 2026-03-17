import fs from 'node:fs'
import path from 'node:path'

const requiredEnv = [
    'NEXT_PUBLIC_SITE_URL',
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    'SUPABASE_SERVICE_ROLE_KEY',
    'CMS_WORKFLOW_TOKEN',
]

function loadDotEnvLocal() {
    const envPath = path.resolve('.env.local')
    if (!fs.existsSync(envPath)) return

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

loadDotEnvLocal()

const missing = requiredEnv.filter((key) => !process.env[key]?.trim())

if (missing.length > 0) {
    console.error(`Missing required environment variables: ${missing.join(', ')}`)
    process.exit(1)
}

console.log(`Environment preflight passed for ${requiredEnv.length} variables.`)
