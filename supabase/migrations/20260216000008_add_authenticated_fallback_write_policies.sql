-- Stage 2 hotfix
-- Add authenticated write fallbacks for CMS admin-managed tables to unblock admin CRUD.

-- news
DROP POLICY IF EXISTS "Auth insert news" ON news;
DROP POLICY IF EXISTS "Auth update news" ON news;
DROP POLICY IF EXISTS "Auth delete news" ON news;

CREATE POLICY "Auth insert news"
  ON news FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Auth update news"
  ON news FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Auth delete news"
  ON news FOR DELETE
  USING (auth.role() = 'authenticated');

-- documents
DROP POLICY IF EXISTS "Auth insert documents" ON documents;
DROP POLICY IF EXISTS "Auth update documents" ON documents;
DROP POLICY IF EXISTS "Auth delete documents" ON documents;

CREATE POLICY "Auth insert documents"
  ON documents FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Auth update documents"
  ON documents FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Auth delete documents"
  ON documents FOR DELETE
  USING (auth.role() = 'authenticated');

-- gallery
DROP POLICY IF EXISTS "Auth insert gallery" ON gallery;
DROP POLICY IF EXISTS "Auth update gallery" ON gallery;
DROP POLICY IF EXISTS "Auth delete gallery" ON gallery;

CREATE POLICY "Auth insert gallery"
  ON gallery FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Auth update gallery"
  ON gallery FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Auth delete gallery"
  ON gallery FOR DELETE
  USING (auth.role() = 'authenticated');

-- gallery_images
DROP POLICY IF EXISTS "Auth insert gallery images" ON gallery_images;
DROP POLICY IF EXISTS "Auth update gallery images" ON gallery_images;
DROP POLICY IF EXISTS "Auth delete gallery images" ON gallery_images;

CREATE POLICY "Auth insert gallery images"
  ON gallery_images FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Auth update gallery images"
  ON gallery_images FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Auth delete gallery images"
  ON gallery_images FOR DELETE
  USING (auth.role() = 'authenticated');

-- cms_pages
DROP POLICY IF EXISTS "Auth insert cms pages" ON cms_pages;
DROP POLICY IF EXISTS "Auth update cms pages" ON cms_pages;
DROP POLICY IF EXISTS "Auth delete cms pages" ON cms_pages;

CREATE POLICY "Auth insert cms pages"
  ON cms_pages FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Auth update cms pages"
  ON cms_pages FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Auth delete cms pages"
  ON cms_pages FOR DELETE
  USING (auth.role() = 'authenticated');

-- cms_sections
DROP POLICY IF EXISTS "Auth insert cms sections" ON cms_sections;
DROP POLICY IF EXISTS "Auth update cms sections" ON cms_sections;
DROP POLICY IF EXISTS "Auth delete cms sections" ON cms_sections;

CREATE POLICY "Auth insert cms sections"
  ON cms_sections FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Auth update cms sections"
  ON cms_sections FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Auth delete cms sections"
  ON cms_sections FOR DELETE
  USING (auth.role() = 'authenticated');
