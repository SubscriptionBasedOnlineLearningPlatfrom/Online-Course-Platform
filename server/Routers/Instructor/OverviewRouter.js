import express from 'express';
import { EnrollementOverview, viewCreatedCourses } from '../../Controllers/Instructor/OverviewController.js';
import { Instructor } from '../../Middleware/authInstructor.js';

const OverviewRouter = express.Router();

OverviewRouter.get("/enrollment",Instructor, EnrollementOverview);
OverviewRouter.get("/created-courses", viewCreatedCourses);


export default OverviewRouter;