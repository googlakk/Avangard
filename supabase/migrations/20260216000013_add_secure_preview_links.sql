-- Stage 3 - INT-38
-- Secure preview links for draft/review content

CREATE TABLE IF NOT EXISTS cms_preview_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_type TEXT NOT NULL CHECK (entity_type IN ('page', 'news')),
  entity_id UUID NOT NULL,
  slug TEXT NOT NULL,
  token_hash TEXT NOT NULL UNIQUE,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  max_uses INTEGER NOT NULL DEFAULT 1 CHECK (max_uses >= 1),
  used_count INTEGER NOT NULL DEFAULT 0 CHECK (used_count >= 0),
  revoked_at TIMESTAMP WITH TIME ZONE,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_cms_preview_links_entity
  ON cms_preview_links(entity_type, entity_id, slug);

CREATE INDEX IF NOT EXISTS idx_cms_preview_links_expiry
  ON cms_preview_links(expires_at);

ALTER TABLE cms_preview_links ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admins can manage cms preview links" ON cms_preview_links;
CREATE POLICY "Admins can manage cms preview links"
  ON cms_preview_links FOR ALL
  USING (auth.jwt() ->> 'role' = 'admin')
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');
