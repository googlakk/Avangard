-- Intellect Pro CMS Enterprise
-- INT-24: Align migrations with generated database.types

-- =============================================================================
-- BASE TRIGGER FUNCTION (idempotent)
-- =============================================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- =============================================================================
-- CANONICAL TABLES FROM database.types.ts
-- =============================================================================
CREATE TABLE IF NOT EXISTS departments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name_ru TEXT NOT NULL,
  name_en TEXT NOT NULL,
  description_ru TEXT,
  description_en TEXT,
  icon TEXT,
  type TEXT NOT NULL CHECK (type IN ('leadership', 'academic', 'support')),
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS staff_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  department_id UUID NOT NULL REFERENCES departments(id) ON DELETE CASCADE,
  name_ru TEXT NOT NULL,
  name_en TEXT NOT NULL,
  position_ru TEXT NOT NULL,
  position_en TEXT NOT NULL,
  photo_url TEXT,
  bio_ru TEXT,
  bio_en TEXT,
  email TEXT,
  phone TEXT,
  qualifications TEXT[],
  subjects TEXT[],
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('owner', 'admin', 'editor', 'reviewer')),
  last_login_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =============================================================================
-- DATA MIGRATION FROM LEGACY TABLES (administration / teachers)
-- =============================================================================
DO $$
DECLARE
  leadership_id UUID;
  academic_id UUID;
  support_id UUID;
BEGIN
  INSERT INTO departments (name_ru, name_en, type, order_index, is_active)
  VALUES
    ('Руководство', 'Leadership', 'leadership', 0, TRUE),
    ('Академические кафедры', 'Academic Departments', 'academic', 1, TRUE),
    ('Поддержка и сервис', 'Support Services', 'support', 2, TRUE)
  ON CONFLICT DO NOTHING;

  SELECT id INTO leadership_id FROM departments WHERE type = 'leadership' ORDER BY created_at NULLS LAST LIMIT 1;
  SELECT id INTO academic_id FROM departments WHERE type = 'academic' ORDER BY created_at NULLS LAST LIMIT 1;
  SELECT id INTO support_id FROM departments WHERE type = 'support' ORDER BY created_at NULLS LAST LIMIT 1;

  IF to_regclass('public.administration') IS NOT NULL THEN
    INSERT INTO staff_members (
      department_id, name_ru, name_en, position_ru, position_en, photo_url, bio_ru, bio_en,
      email, phone, order_index, is_active
    )
    SELECT
      leadership_id,
      a.name_ru,
      a.name_en,
      a.position_ru,
      a.position_en,
      a.photo_url,
      a.bio_ru,
      a.bio_en,
      a.email,
      a.phone,
      COALESCE(a.order_index, 0),
      COALESCE(a.is_active, TRUE)
    FROM administration a
    WHERE leadership_id IS NOT NULL
      AND NOT EXISTS (
        SELECT 1 FROM staff_members s
        WHERE s.department_id = leadership_id
          AND s.name_ru = a.name_ru
          AND s.position_ru = a.position_ru
      );
  END IF;

  IF to_regclass('public.teachers') IS NOT NULL THEN
    INSERT INTO staff_members (
      department_id, name_ru, name_en, position_ru, position_en, photo_url, bio_ru, bio_en,
      email, phone, subjects, order_index, is_active
    )
    SELECT
      CASE
        WHEN t.department IN ('support', 'administration') THEN support_id
        ELSE academic_id
      END,
      t.name_ru,
      t.name_en,
      t.position_ru,
      t.position_en,
      t.photo_url,
      t.bio_ru,
      t.bio_en,
      t.email,
      t.phone,
      t.subjects,
      COALESCE(t.order_index, 0),
      COALESCE(t.is_active, TRUE)
    FROM teachers t
    WHERE (academic_id IS NOT NULL OR support_id IS NOT NULL)
      AND NOT EXISTS (
        SELECT 1 FROM staff_members s
        WHERE s.name_ru = t.name_ru
          AND s.position_ru = t.position_ru
      );
  END IF;
END $$;

-- =============================================================================
-- RLS POLICIES
-- =============================================================================
ALTER TABLE departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Departments are viewable by everyone" ON departments;
DROP POLICY IF EXISTS "Admins can manage departments" ON departments;
CREATE POLICY "Departments are viewable by everyone"
  ON departments FOR SELECT
  USING (is_active = TRUE);
CREATE POLICY "Admins can manage departments"
  ON departments FOR ALL
  USING ((auth.jwt() ->> 'role') IN ('owner', 'admin'));

DROP POLICY IF EXISTS "Staff members are viewable by everyone" ON staff_members;
DROP POLICY IF EXISTS "Admins can manage staff members" ON staff_members;
CREATE POLICY "Staff members are viewable by everyone"
  ON staff_members FOR SELECT
  USING (is_active = TRUE);
CREATE POLICY "Admins can manage staff members"
  ON staff_members FOR ALL
  USING ((auth.jwt() ->> 'role') IN ('owner', 'admin'));

DROP POLICY IF EXISTS "Admin users can be viewed by admins" ON admin_users;
DROP POLICY IF EXISTS "Admin users can be managed by owners" ON admin_users;
CREATE POLICY "Admin users can be viewed by admins"
  ON admin_users FOR SELECT
  USING ((auth.jwt() ->> 'role') IN ('owner', 'admin'));
CREATE POLICY "Admin users can be managed by owners"
  ON admin_users FOR ALL
  USING ((auth.jwt() ->> 'role') = 'owner');

-- =============================================================================
-- INDEXES + TRIGGERS
-- =============================================================================
CREATE INDEX IF NOT EXISTS idx_departments_type ON departments(type);
CREATE INDEX IF NOT EXISTS idx_departments_active ON departments(is_active);
CREATE INDEX IF NOT EXISTS idx_staff_members_department_id ON staff_members(department_id);
CREATE INDEX IF NOT EXISTS idx_staff_members_active ON staff_members(is_active);
CREATE INDEX IF NOT EXISTS idx_admin_users_role ON admin_users(role);

DROP TRIGGER IF EXISTS update_departments_updated_at ON departments;
CREATE TRIGGER update_departments_updated_at
  BEFORE UPDATE ON departments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_staff_members_updated_at ON staff_members;
CREATE TRIGGER update_staff_members_updated_at
  BEFORE UPDATE ON staff_members
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_admin_users_updated_at ON admin_users;
CREATE TRIGGER update_admin_users_updated_at
  BEFORE UPDATE ON admin_users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =============================================================================
-- RBAC HELPER
-- =============================================================================
CREATE OR REPLACE FUNCTION is_admin(user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM admin_users
    WHERE id = user_id
      AND role IN ('owner', 'admin')
  );
$$;

-- =============================================================================
-- REMOVE LEGACY TABLES (already migrated above)
-- =============================================================================
DROP TABLE IF EXISTS teachers CASCADE;
DROP TABLE IF EXISTS administration CASCADE;

