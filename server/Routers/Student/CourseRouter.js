import express from 'express'
import { courseDetails, enrollment, fetchRelatedCourses } from '../../Controllers/Student/CourseController.js';
import { fetchCourses } from "../../Controllers/Student/getAllCoursesController.js";

const courseRouter = express.Router();

courseRouter.get('/:courseId', courseDetails);
courseRouter.post('/enrollment', enrollment);
courseRouter.get("/related-courses/:category",fetchRelatedCourses);
courseRouter.get("/", fetchCourses);

export default courseRouter;