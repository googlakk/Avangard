-- Stage 2 stabilization
-- Fix CMS role claim extraction and align page builder policies with CMS RBAC helper.

-- -----------------------------------------------------------------------------
-- Role helpers
-- -----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION current_cms_role()
RETURNS TEXT
LANGUAGE sql
STABLE
AS $$
  SELECT LOWER(
    COALESCE(
      auth.jwt() ->> 'role',
      auth.jwt() -> 'app_metadata' ->> 'role',
      auth.jwt() -> 'user_metadata' ->> 'role',
      ''
    )
  );
$$;

CREATE OR REPLACE FUNCTION has_cms_role(allowed_roles TEXT[])
RETURNS BOOLEAN
LANGUAGE sql
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM unnest(allowed_roles) AS role_name
    WHERE LOWER(role_name) = current_cms_role()
  );
$$;

-- -----------------------------------------------------------------------------
-- page builder policy alignment
-- -----------------------------------------------------------------------------
ALTER TABLE cms_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_sections ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Published cms pages are viewable by everyone" ON cms_pages;
DROP POLICY IF EXISTS "Admins can manage cms pages" ON cms_pages;
DROP POLICY IF EXISTS "Published cms sections are viewable by everyone" ON cms_sections;
DROP POLICY IF EXISTS "Admins can manage cms sections" ON cms_sections;

CREATE POLICY "CMS pages public read"
  ON cms_pages FOR SELECT
  USING (status = 'published');

CREATE POLICY "CMS pages read"
  ON cms_pages FOR SELECT
  USING (has_cms_role(ARRAY['owner', 'admin', 'editor', 'reviewer']));

CREATE POLICY "CMS pages create"
  ON cms_pages FOR INSERT
  WITH CHECK (has_cms_role(ARRAY['owner', 'admin', 'editor']));

CREATE POLICY "CMS pages update"
  ON cms_pages FOR UPDATE
  USING (has_cms_role(ARRAY['owner', 'admin', 'editor']));

CREATE POLICY "CMS pages delete"
  ON cms_pages FOR DELETE
  USING (has_cms_role(ARRAY['owner', 'admin']));

CREATE POLICY "CMS sections public read"
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

CREATE POLICY "CMS sections read"
  ON cms_sections FOR SELECT
  USING (has_cms_role(ARRAY['owner', 'admin', 'editor', 'reviewer']));

CREATE POLICY "CMS sections create"
  ON cms_sections FOR INSERT
  WITH CHECK (has_cms_role(ARRAY['owner', 'admin', 'editor']));

CREATE POLICY "CMS sections update"
  ON cms_sections FOR UPDATE
  USING (has_cms_role(ARRAY['owner', 'admin', 'editor']));

CREATE POLICY "CMS sections delete"
  ON cms_sections FOR DELETE
  USING (has_cms_role(ARRAY['owner', 'admin']));
