-- Intellect Pro CMS Enterprise
-- INT-26: Harden RLS policies and role-based access behavior

-- -----------------------------------------------------------------------------
-- Role helpers
-- -----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION current_cms_role()
RETURNS TEXT
LANGUAGE sql
STABLE
AS $$
  SELECT COALESCE(auth.jwt() ->> 'role', '');
$$;

CREATE OR REPLACE FUNCTION has_cms_role(allowed_roles TEXT[])
RETURNS BOOLEAN
LANGUAGE sql
STABLE
AS $$
  SELECT current_cms_role() = ANY (allowed_roles);
$$;

-- -----------------------------------------------------------------------------
-- documents
-- -----------------------------------------------------------------------------
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Documents are viewable by everyone" ON documents;
DROP POLICY IF EXISTS "Admins can insert documents" ON documents;
DROP POLICY IF EXISTS "Admins can update documents" ON documents;
DROP POLICY IF EXISTS "Admins can delete documents" ON documents;

CREATE POLICY "Documents public read"
  ON documents FOR SELECT
  USING (is_archived = FALSE);

CREATE POLICY "Documents CMS read"
  ON documents FOR SELECT
  USING (has_cms_role(ARRAY['owner', 'admin', 'editor', 'reviewer']));

CREATE POLICY "Documents CMS create"
  ON documents FOR INSERT
  WITH CHECK (has_cms_role(ARRAY['owner', 'admin', 'editor']));

CREATE POLICY "Documents CMS update"
  ON documents FOR UPDATE
  USING (has_cms_role(ARRAY['owner', 'admin', 'editor']));

CREATE POLICY "Documents CMS delete"
  ON documents FOR DELETE
  USING (has_cms_role(ARRAY['owner', 'admin']));

-- -----------------------------------------------------------------------------
-- news
-- -----------------------------------------------------------------------------
ALTER TABLE news ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Published news are viewable by everyone" ON news;
DROP POLICY IF EXISTS "Admins can manage news" ON news;

CREATE POLICY "News public read"
  ON news FOR SELECT
  USING (is_published = TRUE);

CREATE POLICY "News CMS read"
  ON news FOR SELECT
  USING (has_cms_role(ARRAY['owner', 'admin', 'editor', 'reviewer']));

CREATE POLICY "News CMS create"
  ON news FOR INSERT
  WITH CHECK (has_cms_role(ARRAY['owner', 'admin', 'editor']));

CREATE POLICY "News CMS update"
  ON news FOR UPDATE
  USING (has_cms_role(ARRAY['owner', 'admin', 'editor', 'reviewer']));

CREATE POLICY "News CMS delete"
  ON news FOR DELETE
  USING (has_cms_role(ARRAY['owner', 'admin']));

-- -----------------------------------------------------------------------------
-- calendar_events
-- -----------------------------------------------------------------------------
ALTER TABLE calendar_events ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Published calendar events are viewable by everyone" ON calendar_events;
DROP POLICY IF EXISTS "Admins can manage calendar events" ON calendar_events;

CREATE POLICY "Calendar public read"
  ON calendar_events FOR SELECT
  USING (is_published = TRUE);

CREATE POLICY "Calendar CMS read"
  ON calendar_events FOR SELECT
  USING (has_cms_role(ARRAY['owner', 'admin', 'editor', 'reviewer']));

CREATE POLICY "Calendar CMS create"
  ON calendar_events FOR INSERT
  WITH CHECK (has_cms_role(ARRAY['owner', 'admin', 'editor']));

CREATE POLICY "Calendar CMS update"
  ON calendar_events FOR UPDATE
  USING (has_cms_role(ARRAY['owner', 'admin', 'editor', 'reviewer']));

CREATE POLICY "Calendar CMS delete"
  ON calendar_events FOR DELETE
  USING (has_cms_role(ARRAY['owner', 'admin']));

-- -----------------------------------------------------------------------------
-- gallery / gallery_images
-- -----------------------------------------------------------------------------
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Published galleries are viewable by everyone" ON gallery;
DROP POLICY IF EXISTS "Admins can manage galleries" ON gallery;
DROP POLICY IF EXISTS "Gallery images are viewable by everyone" ON gallery_images;
DROP POLICY IF EXISTS "Admins can manage gallery images" ON gallery_images;

CREATE POLICY "Gallery public read"
  ON gallery FOR SELECT
  USING (is_published = TRUE);

CREATE POLICY "Gallery CMS read"
  ON gallery FOR SELECT
  USING (has_cms_role(ARRAY['owner', 'admin', 'editor', 'reviewer']));

CREATE POLICY "Gallery CMS create"
  ON gallery FOR INSERT
  WITH CHECK (has_cms_role(ARRAY['owner', 'admin', 'editor']));

CREATE POLICY "Gallery CMS update"
  ON gallery FOR UPDATE
  USING (has_cms_role(ARRAY['owner', 'admin', 'editor', 'reviewer']));

CREATE POLICY "Gallery CMS delete"
  ON gallery FOR DELETE
  USING (has_cms_role(ARRAY['owner', 'admin']));

CREATE POLICY "Gallery images public read"
  ON gallery_images FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM gallery g
      WHERE g.id = gallery_images.gallery_id
        AND g.is_published = TRUE
    )
  );

CREATE POLICY "Gallery images CMS read"
  ON gallery_images FOR SELECT
  USING (has_cms_role(ARRAY['owner', 'admin', 'editor', 'reviewer']));

CREATE POLICY "Gallery images CMS create"
  ON gallery_images FOR INSERT
  WITH CHECK (has_cms_role(ARRAY['owner', 'admin', 'editor']));

CREATE POLICY "Gallery images CMS update"
  ON gallery_images FOR UPDATE
  USING (has_cms_role(ARRAY['owner', 'admin', 'editor', 'reviewer']));

CREATE POLICY "Gallery images CMS delete"
  ON gallery_images FOR DELETE
  USING (has_cms_role(ARRAY['owner', 'admin']));

-- -----------------------------------------------------------------------------
-- departments / staff_members
-- -----------------------------------------------------------------------------
ALTER TABLE departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff_members ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Departments are viewable by everyone" ON departments;
DROP POLICY IF EXISTS "Admins can manage departments" ON departments;
DROP POLICY IF EXISTS "Staff members are viewable by everyone" ON staff_members;
DROP POLICY IF EXISTS "Admins can manage staff members" ON staff_members;

CREATE POLICY "Departments public read"
  ON departments FOR SELECT
  USING (is_active = TRUE);

CREATE POLICY "Departments CMS read"
  ON departments FOR SELECT
  USING (has_cms_role(ARRAY['owner', 'admin', 'editor', 'reviewer']));

CREATE POLICY "Departments CMS create"
  ON departments FOR INSERT
  WITH CHECK (has_cms_role(ARRAY['owner', 'admin']));

CREATE POLICY "Departments CMS update"
  ON departments FOR UPDATE
  USING (has_cms_role(ARRAY['owner', 'admin']));

CREATE POLICY "Departments CMS delete"
  ON departments FOR DELETE
  USING (has_cms_role(ARRAY['owner', 'admin']));

CREATE POLICY "Staff public read"
  ON staff_members FOR SELECT
  USING (is_active = TRUE);

CREATE POLICY "Staff CMS read"
  ON staff_members FOR SELECT
  USING (has_cms_role(ARRAY['owner', 'admin', 'editor', 'reviewer']));

CREATE POLICY "Staff CMS create"
  ON staff_members FOR INSERT
  WITH CHECK (has_cms_role(ARRAY['owner', 'admin']));

CREATE POLICY "Staff CMS update"
  ON staff_members FOR UPDATE
  USING (has_cms_role(ARRAY['owner', 'admin']));

CREATE POLICY "Staff CMS delete"
  ON staff_members FOR DELETE
  USING (has_cms_role(ARRAY['owner', 'admin']));

-- -----------------------------------------------------------------------------
-- admin_users
-- -----------------------------------------------------------------------------
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admin users can be viewed by admins" ON admin_users;
DROP POLICY IF EXISTS "Admin users can be managed by owners" ON admin_users;

CREATE POLICY "Admin users read by owner admin"
  ON admin_users FOR SELECT
  USING (has_cms_role(ARRAY['owner', 'admin']));

CREATE POLICY "Admin users manage by owner"
  ON admin_users FOR ALL
  USING (has_cms_role(ARRAY['owner']));

-- -----------------------------------------------------------------------------
-- suggestions
-- -----------------------------------------------------------------------------
ALTER TABLE suggestions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their own suggestions" ON suggestions;
DROP POLICY IF EXISTS "Anyone can create suggestions" ON suggestions;
DROP POLICY IF EXISTS "Admins can view all suggestions" ON suggestions;
DROP POLICY IF EXISTS "Admins can update suggestions" ON suggestions;

CREATE POLICY "Suggestions user read own"
  ON suggestions FOR SELECT
  USING (email = current_setting('request.jwt.claims', TRUE)::json->>'email');

CREATE POLICY "Suggestions public create"
  ON suggestions FOR INSERT
  WITH CHECK (TRUE);

CREATE POLICY "Suggestions CMS read"
  ON suggestions FOR SELECT
  USING (has_cms_role(ARRAY['owner', 'admin']));

CREATE POLICY "Suggestions CMS update"
  ON suggestions FOR UPDATE
  USING (has_cms_role(ARRAY['owner', 'admin']));

