import express from 'express'
import { courseDetails, enrollment } from '../../Controllers/Student/CourseController.js';
import { fetchCourses } from "../../Controllers/Student/getAllCoursesController.js";

const courseRouter = express.Router();

courseRouter.get('/:courseId', courseDetails);
courseRouter.post('/enrollment', enrollment);

courseRouter.get("/", fetchCourses);

export default courseRouter;