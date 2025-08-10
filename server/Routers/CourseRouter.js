import express from 'express'
import { course_details, get_comments } from '../Controllers/CourseController.js';

const courseRouter = express.Router();

courseRouter.get('/get_course_details/:courseId',course_details);
courseRouter.get('/comments/:courseId',get_comments);


export default courseRouter;