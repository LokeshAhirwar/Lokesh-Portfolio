export interface Project {
  id: number;
  title: string;
  created_at: string;
  short_desc: string;
  description: string;
  tech_stack: string | null;
  github_url: string | null;
  demo_url: string | null;
  img_url1: string | null;
  img_url2: string | null;
  img_url3: string | null;
  img_url4: string | null;
  'sort order': number;
}

export interface Skill {
  id: string;
  name: string;
  created_at: string;
  category: string;
  icon: string | null;
  sort_order: number;
}

export interface Certification {
  id: string;
  title: string;
  created_at: string;
  issuer: string;
  date: string;
  credential_url: string | null;
  image_url: string | null;
  sort_order: number;
}

export interface Message {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location?: string | null;
  employment_type?: string | null; // e.g. 'Trainee', 'Internship', 'Leadership', 'Full-time'
  category?: 'work' | 'leadership' | string;
  start_date: string;
  end_date?: string | null;
  description: string[] | string;
  tech_stack?: string | null;
  company_url?: string | null;
  logo_url?: string | null;
  sort_order: number;
  created_at?: string;
}

