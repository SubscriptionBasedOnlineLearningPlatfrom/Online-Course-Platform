import express from 'express';
import { EnrollementOverview, viewCreatedCourses } from '../../Controllers/Instructor/OverviewController.js';

const OverviewRouter = express.Router();

OverviewRouter.get("/enrollment", EnrollementOverview);
OverviewRouter.get("/created-courses", viewCreatedCourses);


export default OverviewRouter;