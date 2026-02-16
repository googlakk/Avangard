-- Stage 2 hotfix
-- Add authenticated read fallback for CMS admin-managed tables.

-- news
DROP POLICY IF EXISTS "Auth select news" ON news;
CREATE POLICY "Auth select news"
  ON news FOR SELECT
  USING (auth.role() = 'authenticated');

-- documents
DROP POLICY IF EXISTS "Auth select documents" ON documents;
CREATE POLICY "Auth select documents"
  ON documents FOR SELECT
  USING (auth.role() = 'authenticated');

-- gallery
DROP POLICY IF EXISTS "Auth select gallery" ON gallery;
CREATE POLICY "Auth select gallery"
  ON gallery FOR SELECT
  USING (auth.role() = 'authenticated');

-- gallery_images
DROP POLICY IF EXISTS "Auth select gallery images" ON gallery_images;
CREATE POLICY "Auth select gallery images"
  ON gallery_images FOR SELECT
  USING (auth.role() = 'authenticated');

-- cms_pages
DROP POLICY IF EXISTS "Auth select cms pages" ON cms_pages;
CREATE POLICY "Auth select cms pages"
  ON cms_pages FOR SELECT
  USING (auth.role() = 'authenticated');

-- cms_sections
DROP POLICY IF EXISTS "Auth select cms sections" ON cms_sections;
CREATE POLICY "Auth select cms sections"
  ON cms_sections FOR SELECT
  USING (auth.role() = 'authenticated');
