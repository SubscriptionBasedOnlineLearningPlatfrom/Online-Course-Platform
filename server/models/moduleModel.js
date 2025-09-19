import { supabase } from '../config/supabaseClient.js';

export const createModule = async (courseId, title) => {
  // Get the last module order for this course
  const { data: lastModule, error: fetchError } = await supabase
    .from('modules')
    .select('module_order')
    .eq('course_id', courseId)
    .order('module_order', { ascending: false })
    .limit(1)
    .single();

  if (fetchError && fetchError.code !== 'PGRST116') throw fetchError; // ignore "no rows" error

  const nextOrder = lastModule ? lastModule.module_order + 1 : 1;

  const { data, error } = await supabase
    .from('modules')
    .insert([{ course_id: courseId, module_title: title, module_order: nextOrder }])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const getModulesByCourse = async (courseId) => {
  const { data, error } = await supabase
    .from('modules')
    .select('*')
    .eq('course_id', courseId)
    .order('module_order', { ascending: true });

  if (error) throw error;
  return data;
};
