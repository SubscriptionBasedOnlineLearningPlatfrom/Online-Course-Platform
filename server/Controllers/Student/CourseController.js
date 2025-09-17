import { supabase } from "../../config/supabaseClient.js";
import { z } from 'zod';

export const courseDetails = async (req, res) => {

    try {
        const courseId = req.params.courseId;

        const { data: course, error: courseError } = await supabase
            .from("course_details")
            .select("*")
            .eq("course_id", courseId)
            .single();

        if (courseError) {
            return res.status(500).json({ error: courseError });
        }

        const { data: modules, error: modulesError } = await supabase
            .from("modules_lessons")
            .select('*')
            .eq("course_id", courseId)
            .order("module_order", { ascending: true })

        if (modulesError) {
            return res.status(500).json({ error: modulesError });
        }

        return res.json({ course, modules })

    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error : ", details: error.message });
    }
}

const enrollmentSchema = z.object({
    course_id: z.uuid(),
    student_id: z.uuid()
})

export const enrollment = async (req, res) => {
    try {
        const parsed = enrollmentSchema.safeParse(req.body);

        if (!parsed.success) {
            return res.status(400).json({ error: parsed.error })
        }

        const { course_id, student_id } = parsed.data;

        const { data, error } = await supabase
            .from('enrollments')
            .insert({ course_id, student_id })
            .select("*")
            .single();

        if (error) {
            return res.status(500).json({ error: error.message });
        }

        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({error:"Internal Server Error", details:error.message});
    }

}