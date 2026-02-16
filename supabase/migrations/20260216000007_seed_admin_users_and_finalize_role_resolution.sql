-- Stage 2 stabilization
-- Ensure admin role can be resolved from admin_users and seed admin_users from auth metadata.

CREATE OR REPLACE FUNCTION current_cms_role()
RETURNS TEXT
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public, auth
AS $$
DECLARE
  claim_role TEXT;
  admin_users_role TEXT;
  metadata_role TEXT;
BEGIN
  claim_role := LOWER(
    COALESCE(
      auth.jwt() ->> 'role',
      auth.jwt() -> 'app_metadata' ->> 'role',
      auth.jwt() -> 'user_metadata' ->> 'role',
      ''
    )
  );

  IF claim_role <> '' THEN
    RETURN claim_role;
  END IF;

  SELECT LOWER(au.role)
  INTO admin_users_role
  FROM public.admin_users AS au
  WHERE au.id = auth.uid()
  LIMIT 1;

  IF COALESCE(admin_users_role, '') <> '' THEN
    RETURN admin_users_role;
  END IF;

  SELECT LOWER(
    COALESCE(
      u.raw_app_meta_data ->> 'role',
      u.raw_user_meta_data ->> 'role',
      ''
    )
  )
  INTO metadata_role
  FROM auth.users AS u
  WHERE u.id = auth.uid()
  LIMIT 1;

  RETURN COALESCE(metadata_role, '');
END;
$$;

GRANT EXECUTE ON FUNCTION current_cms_role() TO anon, authenticated, service_role;

INSERT INTO public.admin_users (id, email, role)
SELECT
  u.id,
  u.email,
  LOWER(COALESCE(u.raw_app_meta_data ->> 'role', u.raw_user_meta_data ->> 'role'))
FROM auth.users AS u
WHERE LOWER(COALESCE(u.raw_app_meta_data ->> 'role', u.raw_user_meta_data ->> 'role', '')) IN ('owner', 'admin', 'editor', 'reviewer')
  AND NOT EXISTS (
    SELECT 1
    FROM public.admin_users AS au
    WHERE au.id = u.id
  );
