import supabase from "../config/supabaseClient.js";

// Fetch all courses
export const getAllCourses = async () => {
  const { data, error } = await supabase.from("courses").select("*");
  if (error) throw error;
  return data;
};



// Create a new course

