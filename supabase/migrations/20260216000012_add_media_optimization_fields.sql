-- Stage 3 - INT-37
-- Media optimization fields for gallery images

ALTER TABLE gallery_images
  ADD COLUMN IF NOT EXISTS alt_ru TEXT NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS alt_en TEXT NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS focal_x NUMERIC(4,3) NOT NULL DEFAULT 0.5,
  ADD COLUMN IF NOT EXISTS focal_y NUMERIC(4,3) NOT NULL DEFAULT 0.5,
  ADD COLUMN IF NOT EXISTS optimization_variants JSONB NOT NULL DEFAULT '{}'::jsonb;

ALTER TABLE gallery_images
  DROP CONSTRAINT IF EXISTS gallery_images_focal_x_range;

ALTER TABLE gallery_images
  ADD CONSTRAINT gallery_images_focal_x_range CHECK (focal_x >= 0 AND focal_x <= 1);

ALTER TABLE gallery_images
  DROP CONSTRAINT IF EXISTS gallery_images_focal_y_range;

ALTER TABLE gallery_images
  ADD CONSTRAINT gallery_images_focal_y_range CHECK (focal_y >= 0 AND focal_y <= 1);
