-- Stage 3 - INT-34
-- Content lifecycle workflow for CMS pages:
-- draft -> review -> scheduled -> published (+ archive paths), transition validation,
-- scheduler-ready fields, and audit log.

ALTER TABLE cms_pages
  ADD COLUMN IF NOT EXISTS scheduled_at TIMESTAMP WITH TIME ZONE;

ALTER TABLE cms_pages
  DROP CONSTRAINT IF EXISTS cms_pages_status_check;

ALTER TABLE cms_pages
  ADD CONSTRAINT cms_pages_status_check
  CHECK (status IN ('draft', 'review', 'scheduled', 'published', 'archived'));

CREATE OR REPLACE FUNCTION cms_validate_page_transition(from_status TEXT, to_status TEXT)
RETURNS BOOLEAN
LANGUAGE SQL
IMMUTABLE
AS $$
  SELECT CASE
    WHEN from_status = to_status THEN TRUE
    WHEN from_status = 'draft' AND to_status IN ('review', 'scheduled', 'published', 'archived') THEN TRUE
    WHEN from_status = 'review' AND to_status IN ('draft', 'scheduled', 'published', 'archived') THEN TRUE
    WHEN from_status = 'scheduled' AND to_status IN ('draft', 'review', 'published', 'archived') THEN TRUE
    WHEN from_status = 'published' AND to_status IN ('draft', 'archived') THEN TRUE
    WHEN from_status = 'archived' AND to_status IN ('draft', 'review') THEN TRUE
    ELSE FALSE
  END;
$$;

CREATE OR REPLACE FUNCTION cms_enforce_page_workflow()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  IF NEW.status IS DISTINCT FROM OLD.status THEN
    IF NOT cms_validate_page_transition(OLD.status, NEW.status) THEN
      RAISE EXCEPTION 'Invalid cms_pages status transition: % -> %', OLD.status, NEW.status;
    END IF;
  END IF;

  IF NEW.status = 'scheduled' THEN
    IF NEW.scheduled_at IS NULL THEN
      RAISE EXCEPTION 'scheduled_at is required when status is scheduled';
    END IF;

    NEW.published_at := NULL;
  ELSIF NEW.status = 'published' THEN
    NEW.published_at := COALESCE(NEW.published_at, NOW());
    NEW.scheduled_at := NULL;
  ELSE
    NEW.scheduled_at := NULL;

    IF NEW.status IN ('draft', 'review') THEN
      NEW.published_at := NULL;
    END IF;
  END IF;

  NEW.updated_at := NOW();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_cms_enforce_page_workflow ON cms_pages;
CREATE TRIGGER trg_cms_enforce_page_workflow
BEFORE UPDATE ON cms_pages
FOR EACH ROW
EXECUTE FUNCTION cms_enforce_page_workflow();

CREATE TABLE IF NOT EXISTS cms_page_status_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id UUID NOT NULL REFERENCES cms_pages(id) ON DELETE CASCADE,
  from_status TEXT,
  to_status TEXT NOT NULL,
  changed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  changed_by UUID NULL REFERENCES auth.users(id) ON DELETE SET NULL,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb
);

CREATE INDEX IF NOT EXISTS idx_cms_page_status_logs_page_changed
  ON cms_page_status_logs(page_id, changed_at DESC);

ALTER TABLE cms_page_status_logs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admins can view cms page status logs" ON cms_page_status_logs;
CREATE POLICY "Admins can view cms page status logs"
  ON cms_page_status_logs FOR SELECT
  USING (auth.jwt() ->> 'role' = 'admin');

DROP POLICY IF EXISTS "Admins can manage cms page status logs" ON cms_page_status_logs;
CREATE POLICY "Admins can manage cms page status logs"
  ON cms_page_status_logs FOR ALL
  USING (auth.jwt() ->> 'role' = 'admin')
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');

CREATE OR REPLACE FUNCTION cms_log_page_status_change()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    INSERT INTO cms_page_status_logs(page_id, from_status, to_status, changed_by, metadata)
    VALUES (
      NEW.id,
      NULL,
      NEW.status,
      auth.uid(),
      jsonb_build_object('event', 'created')
    );
    RETURN NEW;
  END IF;

  IF NEW.status IS DISTINCT FROM OLD.status THEN
    INSERT INTO cms_page_status_logs(page_id, from_status, to_status, changed_by, metadata)
    VALUES (
      NEW.id,
      OLD.status,
      NEW.status,
      auth.uid(),
      jsonb_build_object(
        'scheduled_at', NEW.scheduled_at,
        'published_at', NEW.published_at
      )
    );
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_cms_log_page_status_insert ON cms_pages;
CREATE TRIGGER trg_cms_log_page_status_insert
AFTER INSERT ON cms_pages
FOR EACH ROW
EXECUTE FUNCTION cms_log_page_status_change();

DROP TRIGGER IF EXISTS trg_cms_log_page_status_update ON cms_pages;
CREATE TRIGGER trg_cms_log_page_status_update
AFTER UPDATE ON cms_pages
FOR EACH ROW
WHEN (OLD.status IS DISTINCT FROM NEW.status)
EXECUTE FUNCTION cms_log_page_status_change();
