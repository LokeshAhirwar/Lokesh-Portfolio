import { createClient } from '@supabase/supabase-js';

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  'https://vyiqqjwaervuwdooalmt.supabase.co';
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'sb_publishable_um6FB8FQrvGn-OMW2KNlpA_5WGLwQ4Q';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
