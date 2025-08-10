import { get_course_details, getComments } from "../../Database/Course.js";
import pool from "../Config/database.js";

const course_details = async (req,res) => {
    
    try {
        const course_id = req.params.courseId;
        console.log(course_id)
        const result = await pool.query(get_course_details(course_id));
        console.log(result.rows);
        return res.json(result.rows)
    } catch (error) {
        console.error(error.message);
        return res.status(500).json(error.message);
        
    }

}

const get_comments = async (req, res) => {
    try {
        const course_id = req.params.courseId;
        const result = await pool.query(getComments(course_id));
        return res.json(result.rows);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json(error.message);
    }
}

export {course_details, get_comments};