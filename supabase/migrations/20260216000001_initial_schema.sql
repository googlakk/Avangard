-- Intellect School Website - Database Schema Migration
-- Sprint 0: Infrastructure Setup
-- Task: INT-5 - Design Database Schema for All Features

-- =============================================================================
-- DOCUMENTS TABLE
-- =============================================================================
CREATE TABLE IF NOT EXISTS documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title_ru TEXT NOT NULL,
  title_en TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('academic', 'administrative', 'regulatory', 'reports', 'other')),
  file_url TEXT NOT NULL,
  file_size INTEGER,
  file_type TEXT,
  published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id),
  is_archived BOOLEAN DEFAULT FALSE
);

-- RLS Policies for documents
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Documents are viewable by everyone"
  ON documents FOR SELECT
  USING (is_archived = FALSE);

CREATE POLICY "Admins can insert documents"
  ON documents FOR INSERT
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Admins can update documents"
  ON documents FOR UPDATE
  USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Admins can delete documents"
  ON documents FOR DELETE
  USING (auth.jwt() ->> 'role' = 'admin');

-- =============================================================================
-- ADMINISTRATION TABLE
-- =============================================================================
CREATE TABLE IF NOT EXISTS administration (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name_ru TEXT NOT NULL,
  name_en TEXT NOT NULL,
  position_ru TEXT NOT NULL,
  position_en TEXT NOT NULL,
  photo_url TEXT,
  bio_ru TEXT,
  bio_en TEXT,
  email TEXT,
  phone TEXT,
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS Policies for administration
ALTER TABLE administration ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Administration profiles are viewable by everyone"
  ON administration FOR SELECT
  USING (is_active = TRUE);

CREATE POLICY "Admins can manage administration"
  ON administration FOR ALL
  USING (auth.jwt() ->> 'role' = 'admin');

-- =============================================================================
-- TEACHERS TABLE (Extension)
-- =============================================================================
CREATE TABLE IF NOT EXISTS teachers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name_ru TEXT NOT NULL,
  name_en TEXT NOT NULL,
  position_ru TEXT NOT NULL,
  position_en TEXT NOT NULL,
  photo_url TEXT,
  bio_ru TEXT,
  bio_en TEXT,
  email TEXT,
  phone TEXT,
  type TEXT CHECK (type IN ('teacher', 'admin', 'support')) DEFAULT 'teacher',
  department TEXT CHECK (department IN ('primary', 'middle', 'senior', 'administration', 'support')),
  subjects TEXT[], -- Array of subjects taught
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS Policies for teachers
ALTER TABLE teachers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Teachers are viewable by everyone"
  ON teachers FOR SELECT
  USING (is_active = TRUE);

CREATE POLICY "Admins can manage teachers"
  ON teachers FOR ALL
  USING (auth.jwt() ->> 'role' = 'admin');

-- =============================================================================
-- NEWS TABLE
-- =============================================================================
CREATE TABLE IF NOT EXISTS news (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title_ru TEXT NOT NULL,
  title_en TEXT NOT NULL,
  description_ru TEXT NOT NULL,
  description_en TEXT NOT NULL,
  content_ru TEXT NOT NULL,
  content_en TEXT NOT NULL,
  image_url TEXT,
  category TEXT NOT NULL CHECK (category IN ('news', 'achievement', 'event', 'announcement')),
  priority INTEGER DEFAULT 0 CHECK (priority BETWEEN 0 AND 10),
  slug TEXT UNIQUE NOT NULL,
  published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id),
  is_published BOOLEAN DEFAULT TRUE
);

-- RLS Policies for news
ALTER TABLE news ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published news are viewable by everyone"
  ON news FOR SELECT
  USING (is_published = TRUE);

CREATE POLICY "Admins can manage news"
  ON news FOR ALL
  USING (auth.jwt() ->> 'role' = 'admin');

-- =============================================================================
-- CALENDAR EVENTS TABLE
-- =============================================================================
CREATE TABLE IF NOT EXISTS calendar_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title_ru TEXT NOT NULL,
  title_en TEXT NOT NULL,
  description_ru TEXT,
  description_en TEXT,
  start_date TIMESTAMP WITH TIME ZONE NOT NULL,
  end_date TIMESTAMP WITH TIME ZONE NOT NULL,
  event_type TEXT CHECK (event_type IN ('academic', 'holiday', 'exam', 'event', 'meeting', 'other')),
  grades TEXT[], -- Array of grade levels (e.g., ['1-4', '5-9', '10-11'])
  location TEXT,
  is_published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT valid_date_range CHECK (end_date >= start_date)
);

-- RLS Policies for calendar_events
ALTER TABLE calendar_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published calendar events are viewable by everyone"
  ON calendar_events FOR SELECT
  USING (is_published = TRUE);

CREATE POLICY "Admins can manage calendar events"
  ON calendar_events FOR ALL
  USING (auth.jwt() ->> 'role' = 'admin');

-- =============================================================================
-- GALLERY TABLE
-- =============================================================================
CREATE TABLE IF NOT EXISTS gallery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  album_name_ru TEXT NOT NULL,
  album_name_en TEXT NOT NULL,
  description_ru TEXT,
  description_en TEXT,
  category TEXT CHECK (category IN ('events', 'academics', 'sports', 'arts', 'trips', 'other')),
  cover_image_url TEXT,
  event_date DATE,
  is_published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS Policies for gallery
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published galleries are viewable by everyone"
  ON gallery FOR SELECT
  USING (is_published = TRUE);

CREATE POLICY "Admins can manage galleries"
  ON gallery FOR ALL
  USING (auth.jwt() ->> 'role' = 'admin');

-- =============================================================================
-- GALLERY IMAGES TABLE
-- =============================================================================
CREATE TABLE IF NOT EXISTS gallery_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  gallery_id UUID NOT NULL REFERENCES gallery(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  caption_ru TEXT,
  caption_en TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT unique_gallery_order UNIQUE (gallery_id, order_index)
);

-- RLS Policies for gallery_images
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Gallery images are viewable by everyone"
  ON gallery_images FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM gallery
      WHERE gallery.id = gallery_images.gallery_id
      AND gallery.is_published = TRUE
    )
  );

CREATE POLICY "Admins can manage gallery images"
  ON gallery_images FOR ALL
  USING (auth.jwt() ->> 'role' = 'admin');

-- =============================================================================
-- SUGGESTIONS TABLE
-- =============================================================================
CREATE TABLE IF NOT EXISTS suggestions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  type TEXT NOT NULL CHECK (type IN ('general', 'academic', 'admission', 'complaint', 'other')),
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_review', 'responded', 'closed')),
  response TEXT,
  responded_at TIMESTAMP WITH TIME ZONE,
  responded_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS Policies for suggestions
ALTER TABLE suggestions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own suggestions"
  ON suggestions FOR SELECT
  USING (email = current_setting('request.jwt.claims')::json->>'email');

CREATE POLICY "Anyone can create suggestions"
  ON suggestions FOR INSERT
  WITH CHECK (TRUE);

CREATE POLICY "Admins can view all suggestions"
  ON suggestions FOR SELECT
  USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Admins can update suggestions"
  ON suggestions FOR UPDATE
  USING (auth.jwt() ->> 'role' = 'admin');

-- =============================================================================
-- INDEXES FOR PERFORMANCE
-- =============================================================================
CREATE INDEX idx_documents_category ON documents(category);
CREATE INDEX idx_documents_published_at ON documents(published_at DESC);

CREATE INDEX idx_news_slug ON news(slug);
CREATE INDEX idx_news_category ON news(category);
CREATE INDEX idx_news_published_at ON news(published_at DESC);
CREATE INDEX idx_news_priority ON news(priority DESC);

CREATE INDEX idx_calendar_events_dates ON calendar_events(start_date, end_date);
CREATE INDEX idx_calendar_events_type ON calendar_events(event_type);

CREATE INDEX idx_gallery_event_date ON gallery(event_date DESC);
CREATE INDEX idx_gallery_category ON gallery(category);

CREATE INDEX idx_gallery_images_gallery_id ON gallery_images(gallery_id);
CREATE INDEX idx_gallery_images_order ON gallery_images(gallery_id, order_index);

CREATE INDEX idx_suggestions_status ON suggestions(status);
CREATE INDEX idx_suggestions_created_at ON suggestions(created_at DESC);

-- =============================================================================
-- TRIGGERS FOR UPDATED_AT
-- =============================================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_documents_updated_at BEFORE UPDATE ON documents
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_administration_updated_at BEFORE UPDATE ON administration
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_teachers_updated_at BEFORE UPDATE ON teachers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_news_updated_at BEFORE UPDATE ON news
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_calendar_events_updated_at BEFORE UPDATE ON calendar_events
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_gallery_updated_at BEFORE UPDATE ON gallery
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_suggestions_updated_at BEFORE UPDATE ON suggestions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
