# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**AvangardIntellect** is a Next.js 14 school website for INTELLECT INTERNATIONAL SCHOOL (a premium international school in Bishkek). It combines a public-facing website with a comprehensive CMS admin panel for content management (staff, programs, news, documents, gallery).

**Tech Stack:**
- **Next.js 14** (App Router, TypeScript)
- **Supabase** (PostgreSQL backend, auth, storage, RLS)
- **Tailwind CSS 3.4**
- **Framer Motion** (animations)
- **i18n** (Russian/English localization)

## Getting Started

```bash
npm install
npm run dev          # Start dev server (http://localhost:3000)
npm run build        # Production build
npm run start        # Run production server
npm run lint         # ESLint check
npm run type-check   # TypeScript validation
npm run e2e:critical # Run critical flow E2E tests
npm run check:migration-types # Verify Supabase types sync
```

**Environment Setup:**
- Create `.env.local` with `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `NEXT_PUBLIC_SITE_URL`
- Supabase types are auto-generated in `lib/database.types.ts` after migrations

## Architecture

### Directory Structure

```
app/                          # Next.js App Router pages
├── [locale]/                 # Localized routes (i18n wrapper)
├── admin/                    # CMS admin panel (protected by middleware)
│   ├── dashboard             # Overview dashboard
│   ├── staff/[id]           # Staff management
│   ├── programs             # Program management
│   ├── news                 # News/announcements
│   ├── documents            # Document library
│   ├── gallery              # Media gallery
│   ├── pages                # Dynamic page builder
│   └── login                # Admin authentication
├── api/cms/                 # API routes for CMS operations
├── parents/                 # Parent information pages
├── teachers/                # Teacher info & recruitment
├── programs/                # Academic programs showcase
├── parents/, teachers/, rules/, safety/ # Public content pages
└── robots.ts, sitemap.ts    # SEO metadata

components/
├── ui/                      # Reusable UI primitives (Button, Card, etc.)
├── layout/                  # Header, Footer, Navigation
├── sections/                # Page sections (Hero, Features, Programs)
└── ClientProviders.tsx      # Client-side context setup

lib/
├── auth/
│   ├── rbac.ts             # Role-based access control matrix
│   ├── client.ts           # Client-side auth helpers
│   └── server.ts           # Server-side auth utilities
├── supabase/
│   ├── client.ts           # Client Supabase instance
│   └── server.ts           # Server Supabase instance
├── cms/
│   └── canonical-types.ts  # Canonical CMS data models
├── services/
│   ├── api.ts              # API client for CMS routes
│   ├── page-builder.ts     # Dynamic page rendering
│   ├── media-optimization.ts # Image optimization
│   ├── storage.ts          # Supabase storage operations
│   └── seo.ts              # SEO utilities
├── data/                   # Static data (programs, teachers)
├── database.types.ts       # Auto-generated Supabase types
├── constants.ts            # Site config (name, email, links)
└── utils.ts                # Utility functions

locales/
├── ru.json                 # Russian translations
├── en.json                 # English translations
└── [locale]/               # Locale-specific content

docs/
├── DESIGN_SYSTEM.md        # Typography, colors, components
├── UX_GUIDELINES.md        # Page structure & UX patterns
├── cms-canonical-data-model.md # Database schema & ERD
├── PHOTO_GUIDELINES.md     # Photo requirements & sourcing
└── rbac-matrix.md          # Permission levels (owner/admin/editor/reviewer)
```

### Key Architectural Patterns

**Admin Route Protection:**
- `middleware.ts` protects `/admin/*` routes (except login)
- Uses Supabase auth + RBAC matrix (`lib/auth/rbac.ts`)
- Four roles: `owner`, `admin`, `editor`, `reviewer` with granular permissions per resource

**i18n Localization:**
- `[locale]` dynamic segment for URL-based routing
- Russian/English via locale JSON files
- Some routes are non-localized (e.g., `/admin`, `/api`)

**CMS Data Model:**
- Canonical schema defined in `docs/cms-canonical-data-model.md`
- Current tables: `documents`, `news`, `staff_members`, `departments`, `gallery`, `gallery_images`
- TypeScript contracts in `lib/cms/canonical-types.ts`
- Planned: `pages`, `sections`, `programs`, `settings` tables

**Page Rendering:**
- `lib/services/page-builder.ts` handles dynamic page composition from sections
- Sections are stored as `JSONB` payloads in Supabase

### Database

Supabase PostgreSQL with Row-Level Security (RLS):
- All tables have RLS policies enforcing user/role access
- Use `supabase/migrations/*.sql` for schema changes
- Auto-generate types: `supabase gen types --local > lib/database.types.ts`
- Critical: Update `lib/database.types.ts` in commits alongside migrations

## Development Workflow

### Making Code Changes

1. **Before editing:** Read the relevant documentation file (DESIGN_SYSTEM.md, cms-canonical-data-model.md, etc.)
2. **Migrations first:** If DB changes needed, create migration in `supabase/migrations/` before app code
3. **Type safety:** After migrations, run `supabase gen types` and commit the updated `lib/database.types.ts`
4. **RBAC impact:** If touching admin/auth, review `lib/auth/rbac.ts` and update matrix if needed
5. **Testing:** Run `npm run type-check && npm run lint && npm run build` before committing

### Pull Request Requirements

All PRs must verify:
- [ ] `npm run lint` passes
- [ ] `npm run type-check` passes
- [ ] `npm run build` succeeds
- [ ] `npm run check:migration-types` passes (schema ↔ types sync)
- [ ] For RLS changes: smoke tests in `supabase/tests/rls_smoke.sql` executed
- [ ] Migration-first approach: migrations updated before app code
- [ ] `lib/database.types.ts` regenerated if schema changed
- [ ] RBAC matrix reviewed for permission scope changes

See `.github/pull_request_template.md` for full checklist.

### Running Tests

**Type-check a single file:**
```bash
npx tsc lib/auth/rbac.ts --noEmit
```

**Critical E2E flows:**
```bash
npm run e2e:critical
```

**Lint specific file:**
```bash
npx eslint app/admin/dashboard/page.tsx
```

## Design System

**Required Reading:** `docs/DESIGN_SYSTEM.md` (single source of truth)

### Key Rules

**Typography:**
- **Cinzel** (`font-display`) - Logo-matching H1/main titles (Trajan style)
- **Montserrat** (`font-heading`) - Section headers
- **IBM Plex Serif** - Hero numbers ("2016", "1000+")
- **Cormorant Garamond** - Elegant subtitles
- **Inter** (`font-sans`) - Body text, buttons, UI

**Color Palette:**
- **Navy 900** (`#0B1B3D`) - Primary buttons, backgrounds
- **White** (`#FFFFFF`) - Cards, section backgrounds
- **Gray 50** (`#f9fafb`) - Alternating section backgrounds
- **Glass Effect** - `bg-white/10 backdrop-blur-xl border border-white`

**Component Patterns:**
- Buttons: `rounded-full` pill shape, Navy 900 background, white text
- Program cards: aspect-[5/3] images with hover descriptions
- Philosophy cards: vertical layout with icons
- Section spacing: `py-16` between sections

**What NOT to do:**
- ❌ No bright gradients (only glass effects)
- ❌ No 3D icons or cartoons
- ❌ No generic stock photos (premium photos only)
- ❌ No startup/SaaS vibes (premium Ivy League aesthetic)

## Important Files & Patterns

**Authentication & Authorization:**
- `lib/auth/rbac.ts` - Permission matrix for four roles
- `middleware.ts` - Admin route protection
- `lib/auth/server.ts` - Server-side auth utilities
- `lib/auth/client.ts` - Client-side auth helpers

**CMS Admin:**
- `app/admin/login` - Authentication entry point
- `app/admin/dashboard` - Main admin overview
- `app/api/cms/*` - API endpoints for CMS operations
- `lib/services/api.ts` - CMS API client

**Content:**
- `lib/data/` - Static data for programs, teachers
- `lib/services/page-builder.ts` - Dynamic page composition
- `app/api/cms/` - API routes (news, documents, gallery, staff, pages)

**SEO & Performance:**
- `app/robots.ts` - Robots.txt generation
- `app/layout.tsx` - Global metadata, fonts (Cinzel, Montserrat, etc.)
- `lib/services/seo.ts` - SEO utilities
- `lib/services/media-optimization.ts` - Image optimization

## Common Tasks

**Add a new admin feature:**
1. Check RBAC matrix in `lib/auth/rbac.ts` - does your resource exist?
2. Create API route in `app/api/cms/[resource].ts`
3. Create admin page in `app/admin/[resource]/page.tsx`
4. Use `lib/services/api.ts` to call the endpoint
5. Update PR template checklist if adding new permission scope

**Modify Supabase schema:**
1. Create migration: `supabase migration new <feature_name>`
2. Write SQL in `supabase/migrations/<timestamp>_<feature_name>.sql`
3. Apply locally: `supabase migration up`
4. Regenerate types: `supabase gen types --local > lib/database.types.ts`
5. Commit both migration and types file

**Add a public content page:**
1. Create route: `app/[locale]/[page-slug]/page.tsx`
2. Follow design patterns in DESIGN_SYSTEM.md
3. Use Cinzel for H1, Montserrat for section headers
4. Add translations to `locales/ru.json` and `locales/en.json`

**Debug Supabase auth issues:**
1. Check middleware.ts for route matching
2. Verify Supabase environment variables in .env.local
3. Check RLS policies in Supabase dashboard
4. Use server.ts utilities for server-side auth checks

## CI/CD

**GitHub Actions** (`.github/workflows/ci.yml`):
- Runs on PR and push to master
- Steps: lint → build → type-check → migration-types-sync
- Node 20, npm cache enabled

**Preview Deployments** (`.github/workflows/preview-deploy.yml`):
- Deploys PRs to staging environment
- Attach preview link in PR description

## Monitoring & Debugging

**Common Issues:**

1. **"Type mismatch in database.types.ts"** → Run `npm run check:migration-types` and regenerate types
2. **"Admin route 403 Forbidden"** → Check `middleware.ts`, RBAC matrix, and user role in Supabase
3. **"Images not loading"** → Verify `next.config.js` remote patterns and Supabase storage permissions
4. **"Locale not switching"** → Check `[locale]` segment routing and locale JSON files exist

**Performance profiling:**
- Use Next.js dev tools for rendering performance
- Check `lib/services/media-optimization.ts` for image optimization

## Documentation Files

Keep these in sync as source of truth:
- **docs/DESIGN_SYSTEM.md** - Typography, colors, components (MANDATORY)
- **docs/cms-canonical-data-model.md** - Database ERD and constraints
- **docs/PHOTO_GUIDELINES.md** - Photo sourcing and requirements
- **docs/UX_GUIDELINES.md** - Page structure and layout patterns
- **docs/rbac-matrix.md** - Permission levels summary
- **docs/definition-of-done-stage1.md** - Release criteria

## Git Workflow

- **Main branch:** `master` (always deployable)
- **Feature branches:** `feature/INT-XX-description` (numbered from issues)
- **Commits:** Descriptive, referencing issue numbers (e.g., `feat(cms): add media optimization INT-23`)
- **PRs:** Use template in `.github/pull_request_template.md`, include preview link if available

---

**Last Updated:** 2026-02-17
