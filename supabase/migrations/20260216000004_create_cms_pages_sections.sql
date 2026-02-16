-- Stage 2 - INT-32
-- Static Pages & Section Builder schema

CREATE TABLE IF NOT EXISTS cms_pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title_ru TEXT NOT NULL,
  title_en TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'review', 'published', 'archived')),
  version INTEGER NOT NULL DEFAULT 1 CHECK (version >= 1),
  published_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS cms_sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id UUID NOT NULL REFERENCES cms_pages(id) ON DELETE CASCADE,
  key TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('hero', 'content', 'cards', 'cta', 'media', 'custom')),
  order_index INTEGER NOT NULL DEFAULT 0,
  payload JSONB NOT NULL DEFAULT '{}'::jsonb,
  is_enabled BOOLEAN NOT NULL DEFAULT TRUE,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT unique_page_section_key UNIQUE (page_id, key)
);

CREATE INDEX IF NOT EXISTS idx_cms_pages_slug ON cms_pages(slug);
CREATE INDEX IF NOT EXISTS idx_cms_sections_page_id_order ON cms_sections(page_id, order_index);

ALTER TABLE cms_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_sections ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Published cms pages are viewable by everyone" ON cms_pages;
CREATE POLICY "Published cms pages are viewable by everyone"
  ON cms_pages FOR SELECT
  USING (status = 'published');

DROP POLICY IF EXISTS "Admins can manage cms pages" ON cms_pages;
CREATE POLICY "Admins can manage cms pages"
  ON cms_pages FOR ALL
  USING (auth.jwt() ->> 'role' = 'admin')
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');

DROP POLICY IF EXISTS "Published cms sections are viewable by everyone" ON cms_sections;
CREATE POLICY "Published cms sections are viewable by everyone"
  ON cms_sections FOR SELECT
  USING (
    is_enabled = TRUE
    AND EXISTS (
      SELECT 1
      FROM cms_pages
      WHERE cms_pages.id = cms_sections.page_id
        AND cms_pages.status = 'published'
    )
  );

DROP POLICY IF EXISTS "Admins can manage cms sections" ON cms_sections;
CREATE POLICY "Admins can manage cms sections"
  ON cms_sections FOR ALL
  USING (auth.jwt() ->> 'role' = 'admin')
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');
