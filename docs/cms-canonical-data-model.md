# Intellect Pro CMS Canonical Data Model (INT-23)

## Scope

This document defines the canonical CMS model for:

- pages
- sections
- media
- staff
- programs
- news
- documents
- settings

It is intentionally limited to architecture and type mapping deliverables for `INT-23`.

## Canonical Naming Convention

- Tables: `snake_case` plural nouns (example: `staff_members`).
- Columns: `snake_case`.
- Primary key: `id uuid`.
- Timestamps: `created_at`, `updated_at` (`timestamptz`).
- Publish workflow fields: `is_published`, `published_at`.
- Ordering fields: `order_index` (integer, ascending).
- Locale fields: `*_ru`, `*_en`.
- Foreign keys: `<parent>_id` (example: `department_id`).
- Booleans default to explicit values (`false`/`true`).

## ERD (Canonical View)

```mermaid
erDiagram
  departments ||--o{ staff_members : has
  gallery ||--o{ gallery_images : contains

  pages ||--o{ sections : contains
  sections }o--o{ media_assets : uses
  programs ||--|| pages : rendered_as
  settings ||--o{ pages : configures

  documents {
    uuid id PK
    text title_ru
    text title_en
    text category
    text file_url
    bool is_archived
    timestamptz published_at
    timestamptz updated_at
  }

  news {
    uuid id PK
    text title_ru
    text title_en
    text slug
    text category
    bool is_published
    int priority
    timestamptz published_at
    timestamptz updated_at
  }

  departments {
    uuid id PK
    text name_ru
    text name_en
    text type
    int order_index
    bool is_active
    timestamptz created_at
    timestamptz updated_at
  }

  staff_members {
    uuid id PK
    uuid department_id FK
    text name_ru
    text name_en
    text position_ru
    text position_en
    text photo_url
    bool is_active
    int order_index
    timestamptz created_at
    timestamptz updated_at
  }

  gallery {
    uuid id PK
    text album_name_ru
    text album_name_en
    text category
    bool is_published
    date event_date
    timestamptz created_at
    timestamptz updated_at
  }

  gallery_images {
    uuid id PK
    uuid gallery_id FK
    text image_url
    int order_index
    timestamptz created_at
  }

  pages {
    uuid id PK
    text slug UNIQUE
    text title_ru
    text title_en
    text status
    int version
    timestamptz published_at
    timestamptz updated_at
  }

  sections {
    uuid id PK
    uuid page_id FK
    text key
    text type
    int order_index
    jsonb payload
    bool is_enabled
    timestamptz updated_at
  }

  media_assets {
    uuid id PK
    text storage_bucket
    text storage_path
    text mime_type
    int size_bytes
    text alt_ru
    text alt_en
    timestamptz created_at
  }

  programs {
    uuid id PK
    text code UNIQUE
    text title_ru
    text title_en
    uuid page_id FK
    bool is_active
    timestamptz updated_at
  }

  settings {
    uuid id PK
    text scope
    text key
    jsonb value
    timestamptz updated_at
  }
```

## Constraint Baseline

- `news.slug` unique and indexed.
- `gallery_images (gallery_id, order_index)` unique.
- Section order unique per page: `(page_id, order_index)` (canonical rule).
- Program code unique.
- Settings unique per `(scope, key)`.
- All relation FKs use `ON DELETE CASCADE` only for content ownership chains (`pages -> sections`, `gallery -> gallery_images`).

## Canonical to Current Implementation Mapping

Current implementation already mapped:

- `documents` -> `public.documents`
- `news` -> `public.news`
- `staff` -> `public.departments` + `public.staff_members`
- `media` -> `public.gallery` + `public.gallery_images`

Canonical model not yet materialized as tables in current migration:

- `pages`
- `sections`
- `programs`
- `settings`
- `media_assets` (standalone registry table)

These entities are represented at application/content level and prepared as canonical TypeScript contracts in `lib/cms/canonical-types.ts`.

