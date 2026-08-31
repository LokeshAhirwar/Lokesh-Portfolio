import { supabase } from './supabase';
import { Project, Skill, Certification, Message, Experience } from './types';

const DEFAULT_EXPERIENCES: Experience[] = [
  {
    id: 'kadel-labs',
    role: 'Associate Software Engineer',
    company: 'Kadel Labs PVT. LTD',
    location: 'Bhopal, India',
    employment_type: 'Full-time',
    category: 'work',
    start_date: '09 March 2026',
    end_date: 'Present',
    description: [
      'Promoted from Trainee Software Engineer (March 2026 – June 2026) to Associate Software Engineer (July 2026 – Present).',
      'Worked on an Android property auction application using Kotlin and Jetpack Compose.',
      'Developed a Saved Search feature that allowed users to store selected filters along with location for easy access to previously viewed results.',
      'Integrated Visa Cybersource Android SDK to capture and securely encrypt client-side card data into signed JWTs, eliminating the handling of raw cardholder data on native layouts.',
      'Tested application flows, identified issues, and fixed bugs to improve stability and user experience.',
      'Contributed to Android development tasks in a team environment, following clean and maintainable coding practices.'
    ],
    tech_stack: 'Kotlin, Jetpack Compose, Visa Cybersource SDK, JWT, Git, Android Studio',
    sort_order: 1,
  },
  {
    id: 'gdg-sistec',
    role: 'Android Developer Lead',
    company: 'Google Developer Group, SISTec',
    location: 'Bhopal, India',
    employment_type: 'Leadership',
    category: 'leadership',
    start_date: '2024',
    end_date: '2025',
    description: [
      'Organized and led developer meetups, workshops, and hackathons to grow the campus Android community.',
      'Conducted hands-on Android Development Workshops covering Kotlin, Android Studio, and UI Design with Jetpack Compose.',
      'Mentored junior students and community members in mobile app development fundamentals and best practices.'
    ],
    tech_stack: 'Community Leadership, Kotlin, Android Studio, UI Design, Public Speaking',
    sort_order: 2,
  },
];

export async function getExperiences(): Promise<Experience[]> {
  try {
    const { data, error } = await supabase
      .from('experiences')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error || !data || data.length === 0) {
      if (error) console.warn('Note: Could not fetch experiences from Supabase table, using default profile data:', error.message);
      return DEFAULT_EXPERIENCES;
    }

    return data.map((item) => ({
      ...item,
      description: Array.isArray(item.description)
        ? item.description
        : typeof item.description === 'string'
        ? item.description.split('\n').filter(Boolean)
        : [],
    }));
  } catch (err) {
    console.error('Error fetching experiences:', err);
    return DEFAULT_EXPERIENCES;
  }
}


export async function getProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('sort order', { ascending: true });
  if (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
  return data ?? [];
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('sort order', { ascending: true })
    .limit(3);
  if (error) {
    console.error('Error fetching featured projects:', error);
    return [];
  }
  return data ?? [];
}

export async function getSkills(): Promise<Skill[]> {
  const { data, error } = await supabase
    .from('skills')
    .select('*')
    .order('sort_order', { ascending: true });
  if (error) {
    console.error('Error fetching skills:', error);
    return [];
  }
  return data ?? [];
}

export async function getCertifications(): Promise<Certification[]> {
  const { data, error } = await supabase
    .from('certifications')
    .select('*')
    .order('sort_order', { ascending: true });
  if (error) {
    console.error('Error fetching certifications:', error);
    return [];
  }
  return data ?? [];
}

export async function getLatestCertifications(): Promise<Certification[]> {
  const { data, error } = await supabase
    .from('certifications')
    .select('*')
    .order('sort_order', { ascending: true })
    .limit(3);
  if (error) {
    console.error('Error fetching certifications:', error);
    return [];
  }
  return data ?? [];
}

export async function submitMessage(message: Message): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabase.from('messages').insert([message]);
  if (error) {
    console.error('Error submitting message:', error);
    return { success: false, error: error.message };
  }
  return { success: true };
}
