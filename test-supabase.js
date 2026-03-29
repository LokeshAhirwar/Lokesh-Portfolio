const { createClient } = require('@supabase/supabase-js');

const url = 'https://vyiqqjwaervuwdooalmt.supabase.co';
const key = 'sb_publishable_um6FB8FQrvGn-OMW2KNlpA_5WGLwQ4Q';
const supabase = createClient(url, key);

async function test() {
  const { data, error } = await supabase.from('projects').select('*');
  console.log('Projects Data:', data);
  if (error) console.log('Projects Error:', error);

  const skills = await supabase.from('skills').select('*');
  console.log('Skills Data:', skills.data);
  if (skills.error) console.log('Skills Error:', skills.error);
}

test();
