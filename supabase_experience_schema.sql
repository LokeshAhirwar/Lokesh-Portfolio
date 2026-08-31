-- ==============================================================================
-- SUPABASE EXPERIENCES TABLE SETUP & SEED SCRIPT
-- Run this in your Supabase SQL Editor (Dashboard > SQL Editor > New Query)
-- ==============================================================================

-- 1. Create experiences table
CREATE TABLE IF NOT EXISTS public.experiences (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  role TEXT NOT NULL,
  company TEXT NOT NULL,
  location TEXT,
  employment_type TEXT DEFAULT 'Work', -- e.g. 'Trainee', 'Internship', 'Leadership', 'Full-time'
  category TEXT DEFAULT 'work',        -- 'work' or 'leadership'
  start_date TEXT NOT NULL,
  end_date TEXT DEFAULT 'Present',
  description TEXT[] NOT NULL,         -- Array of bullet points
  tech_stack TEXT,                     -- Comma-separated technologies
  company_url TEXT,
  logo_url TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Enable Row Level Security (RLS) & Public Read Policy
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read-only access" ON public.experiences;
CREATE POLICY "Allow public read-only access"
ON public.experiences FOR SELECT
TO public
USING (true);

-- 3. Insert Initial Experiences from Resume
INSERT INTO public.experiences (
  role, 
  company, 
  location, 
  employment_type, 
  category, 
  start_date, 
  end_date, 
  description, 
  tech_stack, 
  sort_order
)
VALUES
(
  'Associate Software Engineer',
  'Kadel Labs PVT. LTD',
  'Bhopal, India',
  'Full-time',
  'work',
  '09 March 2026',
  'Present',
  ARRAY[
    'Promoted from Trainee Software Engineer (March 2026 – June 2026) to Associate Software Engineer (July 2026 – Present).',
    'Worked on an Android property auction application using Kotlin and Jetpack Compose.',
    'Developed a Saved Search feature that allowed users to store selected filters along with location for easy access to previously viewed results.',
    'Integrated Visa Cybersource Android SDK to capture and securely encrypt client-side card data into signed JWTs, eliminating the handling of raw cardholder data on native layouts.',
    'Tested application flows, identified issues, and fixed bugs to improve stability and user experience.',
    'Contributed to Android development tasks in a team environment, following clean and maintainable coding practices.'
  ],
  'Kotlin, Jetpack Compose, Visa Cybersource SDK, JWT, Git, Android Studio',
  1
),
(
  'Android Developer Lead',
  'Google Developer Group, SISTec',
  'Bhopal, India',
  'Leadership',
  'leadership',
  '2024',
  '2025',
  ARRAY[
    'Organized and led developer meetups, workshops, and hackathons to grow the campus Android community.',
    'Conducted hands-on Android Development Workshops covering Kotlin, Android Studio, and UI Design with Jetpack Compose.',
    'Mentored junior students and community members in mobile app development fundamentals and best practices.'
  ],
  'Community Leadership, Kotlin, Android Studio, UI Design, Public Speaking',
  2
)
ON CONFLICT DO NOTHING;
