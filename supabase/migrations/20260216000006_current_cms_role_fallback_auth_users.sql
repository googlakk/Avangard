-- Stage 2 stabilization
-- Ensure CMS role resolution works even when JWT does not carry custom role claims.

CREATE OR REPLACE FUNCTION current_cms_role()
RETURNS TEXT
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public, auth
AS $$
DECLARE
  claim_role TEXT;
  stored_role TEXT;
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

  SELECT LOWER(
    COALESCE(
      u.raw_app_meta_data ->> 'role',
      u.raw_user_meta_data ->> 'role',
      ''
    )
  )
  INTO stored_role
  FROM auth.users AS u
  WHERE u.id = auth.uid()
  LIMIT 1;

  RETURN COALESCE(stored_role, '');
END;
$$;

GRANT EXECUTE ON FUNCTION current_cms_role() TO anon, authenticated, service_role;
