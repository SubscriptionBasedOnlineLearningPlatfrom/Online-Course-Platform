import express from 'express'
import { course_details } from '../Controllers/CourseController.js';

const courseRouter = express.Router();

courseRouter.get('/get_course_details/:courseId',course_details);


export default courseRouter;