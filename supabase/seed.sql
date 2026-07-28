-- Lentera Baca V2 — Seed Data for Local Development
-- This file provides minimal test data for development and testing.
-- Run with: npx supabase db reset (applies migrations + seed)

-- ============================================================================
-- NOTE: Seed data for auth.users cannot be inserted directly here.
-- Use the Supabase Dashboard or Auth API to create test users.
-- After creating a test user, their profile will be auto-created
-- by the handle_new_user() trigger.
--
-- For local testing, you can manually insert a profile:
-- ============================================================================

-- Insert a test parent profile (simulate Google OAuth user)
-- Replace the UUID below with an actual auth.users.id after creating a test user
INSERT INTO public.profiles (id, full_name, email, avatar_url)
VALUES (
  '00000000-0000-0000-0000-000000000001',
  'Ibu Tester',
  'ibu.tester@example.com',
  null
) ON CONFLICT (id) DO NOTHING;

-- Insert test child profiles
INSERT INTO public.child_profiles (id, parent_id, display_name, avatar_emoji, age)
VALUES
  ('10000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', 'Adik Budi', '🦁', 6),
  ('10000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000001', 'Kakak Sari', '🦋', 8)
ON CONFLICT (id) DO NOTHING;

-- Insert sample letter progress for Adik Budi
INSERT INTO public.letter_progress (child_id, letter, completed, completed_at)
VALUES
  ('10000000-0000-0000-0000-000000000001', 'A', true, now() - interval '5 days'),
  ('10000000-0000-0000-0000-000000000001', 'B', true, now() - interval '4 days'),
  ('10000000-0000-0000-0000-000000000001', 'C', true, now() - interval '3 days'),
  ('10000000-0000-0000-0000-000000000001', 'D', true, now() - interval '2 days'),
  ('10000000-0000-0000-0000-000000000001', 'E', false, null)
ON CONFLICT (child_id, letter) DO NOTHING;

-- Insert sample letter progress for Kakak Sari
INSERT INTO public.letter_progress (child_id, letter, completed, completed_at)
VALUES
  ('10000000-0000-0000-0000-000000000002', 'A', true, now() - interval '10 days'),
  ('10000000-0000-0000-0000-000000000002', 'B', true, now() - interval '9 days'),
  ('10000000-0000-0000-0000-000000000002', 'C', true, now() - interval '8 days'),
  ('10000000-0000-0000-0000-000000000002', 'D', true, now() - interval '7 days'),
  ('10000000-0000-0000-0000-000000000002', 'E', true, now() - interval '6 days'),
  ('10000000-0000-0000-0000-000000000002', 'F', true, now() - interval '5 days'),
  ('10000000-0000-0000-0000-000000000002', 'G', true, now() - interval '4 days'),
  ('10000000-0000-0000-0000-000000000002', 'H', false, null)
ON CONFLICT (child_id, letter) DO NOTHING;

-- Insert sample reading progress
INSERT INTO public.reading_progress (child_id, exercise_id, level, score, completed, completed_at)
VALUES
  ('10000000-0000-0000-0000-000000000001', 'read-01-ba-bi-bu', 'easy', 80, true, now() - interval '3 days'),
  ('10000000-0000-0000-0000-000000000001', 'read-02-ma-mi-mu', 'easy', 60, false, null),
  ('10000000-0000-0000-0000-000000000002', 'read-01-ba-bi-bu', 'easy', 100, true, now() - interval '7 days'),
  ('10000000-0000-0000-0000-000000000002', 'read-02-ma-mi-mu', 'easy', 90, true, now() - interval '5 days'),
  ('10000000-0000-0000-0000-000000000002', 'read-03-pa-pi-pu', 'medium', 70, false, null)
ON CONFLICT (child_id, exercise_id) DO NOTHING;

-- Insert sample point events
INSERT INTO public.point_events (child_id, event_type, points, description, event_date)
VALUES
  ('10000000-0000-0000-0000-000000000001', 'letter_complete', 10, 'Menyelesaikan huruf A', CURRENT_DATE - 5),
  ('10000000-0000-0000-0000-000000000001', 'letter_complete', 10, 'Menyelesaikan huruf B', CURRENT_DATE - 4),
  ('10000000-0000-0000-0000-000000000001', 'streak_bonus', 5, 'Bonus streak 2 hari', CURRENT_DATE - 4),
  ('10000000-0000-0000-0000-000000000001', 'letter_complete', 10, 'Menyelesaikan huruf C', CURRENT_DATE - 3),
  ('10000000-0000-0000-0000-000000000001', 'reading_complete', 15, 'Latihan membaca ba-bi-bu selesai', CURRENT_DATE - 3),
  ('10000000-0000-0000-0000-000000000001', 'streak_bonus', 10, 'Bonus streak 3 hari', CURRENT_DATE - 3),
  ('10000000-0000-0000-0000-000000000001', 'daily_login', 5, 'Login harian', CURRENT_DATE),
  ('10000000-0000-0000-0000-000000000002', 'letter_complete', 10, 'Menyelesaikan huruf A', CURRENT_DATE - 10),
  ('10000000-0000-0000-0000-000000000002', 'letter_complete', 10, 'Menyelesaikan huruf B', CURRENT_DATE - 9),
  ('10000000-0000-0000-0000-000000000002', 'reading_complete', 15, 'Latihan membaca ba-bi-bu selesai', CURRENT_DATE - 7),
  ('10000000-0000-0000-0000-000000000002', 'streak_bonus', 20, 'Bonus streak 7 hari!', CURRENT_DATE - 4);
