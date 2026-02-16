-- INT-26: RLS smoke checks for owner/admin/editor/reviewer/anon
-- Run against a Supabase database after applying migrations.
-- This script is non-destructive and ends with ROLLBACK.

BEGIN;

CREATE TEMP TABLE IF NOT EXISTS rls_smoke_results (
  test_name TEXT PRIMARY KEY,
  passed BOOLEAN NOT NULL,
  details TEXT
);

CREATE OR REPLACE FUNCTION _smoke_assert_exec(
  test_name TEXT,
  db_role TEXT,
  jwt_claims TEXT,
  query_sql TEXT,
  expect_error BOOLEAN DEFAULT FALSE
)
RETURNS VOID
LANGUAGE plpgsql
AS $$
BEGIN
  EXECUTE format('SET LOCAL ROLE %I', db_role);
  PERFORM set_config('request.jwt.claims', jwt_claims, TRUE);
  EXECUTE query_sql;
  RESET ROLE;
  INSERT INTO rls_smoke_results(test_name, passed, details)
  VALUES (
    test_name,
    NOT expect_error,
    CASE WHEN expect_error THEN 'expected deny, got allow' ELSE 'ok' END
  );
EXCEPTION
  WHEN OTHERS THEN
    RESET ROLE;
    INSERT INTO rls_smoke_results(test_name, passed, details)
    VALUES (
      test_name,
      expect_error,
      CASE WHEN expect_error THEN 'denied as expected' ELSE SQLERRM END
    );
END;
$$;

CREATE OR REPLACE FUNCTION _smoke_assert_count(
  test_name TEXT,
  db_role TEXT,
  jwt_claims TEXT,
  query_sql TEXT,
  expected_count INTEGER
)
RETURNS VOID
LANGUAGE plpgsql
AS $$
DECLARE
  actual_count INTEGER;
BEGIN
  EXECUTE format('SET LOCAL ROLE %I', db_role);
  PERFORM set_config('request.jwt.claims', jwt_claims, TRUE);
  EXECUTE query_sql INTO actual_count;
  RESET ROLE;

  INSERT INTO rls_smoke_results(test_name, passed, details)
  VALUES (
    test_name,
    actual_count = expected_count,
    format('expected=%s actual=%s', expected_count, actual_count)
  );
EXCEPTION
  WHEN OTHERS THEN
    RESET ROLE;
    INSERT INTO rls_smoke_results(test_name, passed, details)
    VALUES (test_name, FALSE, SQLERRM);
END;
$$;

-- seed admin_users fixture from an existing auth.users row (if available)
INSERT INTO admin_users (id, email, role)
SELECT u.id, COALESCE(u.email, 'smoke-owner@example.com'), 'admin'
FROM auth.users u
WHERE NOT EXISTS (SELECT 1 FROM admin_users a WHERE a.id = u.id)
LIMIT 1;

-- -------------------------
-- anon
-- -------------------------
SELECT _smoke_assert_exec('anon_can_read_published_news', 'anon', '{}', $$SELECT 1 FROM news WHERE is_published = TRUE LIMIT 1$$);
SELECT _smoke_assert_exec('anon_can_read_public_documents', 'anon', '{}', $$SELECT 1 FROM documents WHERE is_archived = FALSE LIMIT 1$$);
SELECT _smoke_assert_exec('anon_can_create_suggestion', 'anon', '{}', $$
  INSERT INTO suggestions (name, email, type, message)
  VALUES ('Smoke Anon', 'anon-smoke@example.com', 'general', 'anon insert')
$$);

-- -------------------------
-- owner
-- -------------------------
SELECT _smoke_assert_exec('owner_can_read_documents', 'authenticated', '{"role":"owner","email":"owner-smoke@example.com"}', $$SELECT 1 FROM documents LIMIT 1$$);
SELECT _smoke_assert_exec('owner_can_insert_documents', 'authenticated', '{"role":"owner","email":"owner-smoke@example.com"}', $$
  INSERT INTO documents (title_ru, title_en, category, file_url)
  VALUES ('smoke-owner-ru', 'smoke-owner-en', 'other', 'https://example.com/owner.pdf')
$$);
SELECT _smoke_assert_exec('owner_can_delete_documents', 'authenticated', '{"role":"owner","email":"owner-smoke@example.com"}', $$
  DELETE FROM documents WHERE title_en = 'smoke-owner-en'
$$);
SELECT _smoke_assert_count('owner_can_manage_admin_users', 'authenticated', '{"role":"owner","email":"owner-smoke@example.com"}', $$
  WITH target AS (
    SELECT id FROM admin_users LIMIT 1
  ),
  updated AS (
    UPDATE admin_users
    SET role = 'reviewer'
    WHERE id IN (SELECT id FROM target)
    RETURNING id
  )
  SELECT COUNT(*)::int FROM updated
$$, 1);

-- -------------------------
-- admin
-- -------------------------
SELECT _smoke_assert_exec('admin_can_read_staff', 'authenticated', '{"role":"admin","email":"admin-smoke@example.com"}', $$SELECT 1 FROM staff_members LIMIT 1$$);
SELECT _smoke_assert_exec('admin_can_create_news', 'authenticated', '{"role":"admin","email":"admin-smoke@example.com"}', $$
  INSERT INTO news (
    title_ru, title_en, description_ru, description_en, content_ru, content_en, category, slug
  )
  VALUES (
    'smoke-admin-ru', 'smoke-admin-en', 'desc-ru', 'desc-en', 'content-ru', 'content-en', 'news',
    'smoke-admin-' || floor(random() * 1000000)::text
  )
$$);
SELECT _smoke_assert_exec('admin_can_update_suggestions', 'authenticated', '{"role":"admin","email":"admin-smoke@example.com"}', $$
  UPDATE suggestions
  SET status = 'in_review'
  WHERE status = 'pending'
$$);

-- -------------------------
-- editor
-- -------------------------
SELECT _smoke_assert_exec('editor_can_read_news', 'authenticated', '{"role":"editor","email":"editor-smoke@example.com"}', $$SELECT 1 FROM news LIMIT 1$$);
SELECT _smoke_assert_exec('editor_can_create_documents', 'authenticated', '{"role":"editor","email":"editor-smoke@example.com"}', $$
  INSERT INTO documents (title_ru, title_en, category, file_url)
  VALUES ('smoke-editor-ru', 'smoke-editor-en', 'other', 'https://example.com/editor.pdf')
$$);
SELECT _smoke_assert_count('editor_denied_delete_documents', 'authenticated', '{"role":"editor","email":"editor-smoke@example.com"}', $$
  WITH deleted AS (
    DELETE FROM documents WHERE title_en = 'smoke-editor-en'
    RETURNING id
  )
  SELECT COUNT(*)::int FROM deleted
$$, 0);

-- -------------------------
-- reviewer
-- -------------------------
SELECT _smoke_assert_exec('reviewer_can_read_news', 'authenticated', '{"role":"reviewer","email":"reviewer-smoke@example.com"}', $$SELECT 1 FROM news LIMIT 1$$);
SELECT _smoke_assert_exec('reviewer_can_publish_news', 'authenticated', '{"role":"reviewer","email":"reviewer-smoke@example.com"}', $$
  UPDATE news
  SET is_published = TRUE
  WHERE is_published = FALSE
$$);
SELECT _smoke_assert_exec('reviewer_denied_insert_documents', 'authenticated', '{"role":"reviewer","email":"reviewer-smoke@example.com"}', $$
  INSERT INTO documents (title_ru, title_en, category, file_url)
  VALUES ('smoke-reviewer-ru', 'smoke-reviewer-en', 'other', 'https://example.com/reviewer.pdf')
$$, TRUE);

SELECT * FROM rls_smoke_results ORDER BY test_name;

DROP FUNCTION IF EXISTS _smoke_assert_exec(TEXT, TEXT, TEXT, TEXT, BOOLEAN);
DROP FUNCTION IF EXISTS _smoke_assert_count(TEXT, TEXT, TEXT, TEXT, INTEGER);
ROLLBACK;
