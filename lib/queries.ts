import { supabase } from './supabase';
import { Project, Skill, Certification, Message } from './types';

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
