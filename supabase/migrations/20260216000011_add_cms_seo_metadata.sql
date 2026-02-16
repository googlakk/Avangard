-- Stage 3 - INT-35 / INT-36
-- SEO metadata for CMS entities (pages/news)

CREATE TABLE IF NOT EXISTS cms_seo_metadata (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_type TEXT NOT NULL CHECK (entity_type IN ('page', 'news')),
  entity_id UUID NOT NULL,
  locale TEXT NOT NULL DEFAULT 'all' CHECK (locale IN ('all', 'ru', 'en')),
  seo_title TEXT,
  seo_description TEXT,
  canonical_url TEXT,
  og_image_url TEXT,
  robots_index BOOLEAN NOT NULL DEFAULT TRUE,
  robots_follow BOOLEAN NOT NULL DEFAULT TRUE,
  structured_data_enabled BOOLEAN NOT NULL DEFAULT FALSE,
  structured_data_type TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  CONSTRAINT cms_seo_metadata_entity_locale_unique UNIQUE (entity_type, entity_id, locale)
);

CREATE INDEX IF NOT EXISTS idx_cms_seo_metadata_entity
  ON cms_seo_metadata(entity_type, entity_id);

ALTER TABLE cms_seo_metadata ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admins can manage cms seo metadata" ON cms_seo_metadata;
CREATE POLICY "Admins can manage cms seo metadata"
  ON cms_seo_metadata FOR ALL
  USING (auth.jwt() ->> 'role' = 'admin')
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');

DROP TRIGGER IF EXISTS update_cms_seo_metadata_updated_at ON cms_seo_metadata;
CREATE TRIGGER update_cms_seo_metadata_updated_at
BEFORE UPDATE ON cms_seo_metadata
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
