-- ============================================================
-- maxromeexecutivechauffeur — Database Schema
-- Run this in the Supabase SQL Editor (supabase.com/dashboard)
-- ============================================================

-- 1. Reservations table
CREATE TABLE IF NOT EXISTS reservations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  route_type TEXT NOT NULL CHECK (route_type IN ('transfer', 'tour', 'custom')),
  route_label TEXT NOT NULL,
  route_id TEXT,
  price NUMERIC NOT NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  reservation_date DATE NOT NULL,
  reservation_time TIME NOT NULL,
  vehicle_type TEXT NOT NULL DEFAULT 'van' CHECK (vehicle_type IN ('car', 'van')),
  pickup_location TEXT NOT NULL,
  special_requests TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled'))
);

-- 2. Contact messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  preferred_date DATE NOT NULL,
  preferred_time TIME NOT NULL,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'replied'))
);

-- 3. Reviews table (public display + public submission)
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  name TEXT NOT NULL,
  origin TEXT,
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL,
  approved BOOLEAN NOT NULL DEFAULT true
);

-- 4. Enable Row Level Security
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- 5. Allow public (anonymous) inserts for the booking forms
CREATE POLICY "Allow public insert on reservations"
  ON reservations FOR INSERT TO anon
  WITH CHECK (true);

CREATE POLICY "Allow public insert on contact_messages"
  ON contact_messages FOR INSERT TO anon
  WITH CHECK (true);

CREATE POLICY "Allow public insert on reviews"
  ON reviews FOR INSERT TO anon
  WITH CHECK (true);

CREATE POLICY "Allow public read on reviews"
  ON reviews FOR SELECT TO anon
  USING (true);

-- 6. Restrict reads to authenticated users only (no policy = denied by default)
-- (No SELECT policies for anon role — only authenticated users can read)

-- 7. Migration for existing databases (run these lines on a live DB):
-- ALTER TABLE reservations ADD COLUMN IF NOT EXISTS vehicle_type TEXT NOT NULL DEFAULT 'van';
-- CREATE TABLE IF NOT EXISTS reviews (
--   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
--   created_at TIMESTAMPTZ DEFAULT now(),
--   name TEXT NOT NULL,
--   origin TEXT,
--   rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
--   comment TEXT NOT NULL,
--   approved BOOLEAN NOT NULL DEFAULT true
-- );
-- ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "Allow public insert on reviews" ON reviews FOR INSERT TO anon WITH CHECK (true);
-- CREATE POLICY "Allow public read on reviews" ON reviews FOR SELECT TO anon USING (true);
