import express from 'express';
import { dashboardController, enrolledCourses } from '../../Controllers/Student/dashboardController.js';

const dashboardRouter = express.Router();

dashboardRouter.get('/', dashboardController)
dashboardRouter.get('/enrolled-courses', enrolledCourses)

export default dashboardRouter;