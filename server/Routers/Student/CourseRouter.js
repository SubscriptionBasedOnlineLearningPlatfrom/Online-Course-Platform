import express from 'express'
import { courseDetails, enrollment } from '../../Controllers/Student/CourseController.js';

const courseRouter = express.Router();

courseRouter.get('/:courseId', courseDetails);
courseRouter.post('/enrollment', enrollment);

export default courseRouter;