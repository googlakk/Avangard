# INTELLECT INTERNATIONAL SCHOOL

Next.js 14 + Supabase проект публичного сайта и CMS Intellect International School. Production target: `Vercel + Supabase`.

## Быстрый старт

```bash
npm install
cp .env.example .env.local
npm run preflight:env
npm run dev
```

Публичные страницы работают через locale-aware routing:
- `http://localhost:3000/ru`
- `http://localhost:3000/en`

Не-локализованные public URL автоматически редиректятся на locale из cookie или на `ru` по умолчанию.

## Обязательные env

См. [.env.example](/Users/intellectmac/Personal/avangardIntellect/.env.example).

Критичные production переменные:
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `CMS_WORKFLOW_TOKEN`

## Основные команды

```bash
npm run preflight:env
npm run lint
npm run type-check
npm run build
npm run start
npm run e2e:critical
npm run check:migration-types
```

## Release pipeline

```bash
npm ci
npm run preflight:env
npm run check:migration-types
npm run lint
npm run type-check
npm run build
npm run start
npm run e2e:critical
```

## Release checklist

- env проверены через `preflight:env`
- migrations применены
- `lib/database.types.ts` синхронизирован
- `lint`, `type-check`, `build`, smoke E2E проходят
- `sitemap.xml` содержит RU и EN URL
- `robots.txt` и localized routes доступны
- admin routes без сессии редиректят на `/admin/login`
- scheduled publish и upload routes защищены
- debug/test routes отсутствуют в production
