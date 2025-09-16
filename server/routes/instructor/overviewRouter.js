import express from 'express';
import { EnrollementOverview, viewCreatedCourses } from '../../controllers/instructor/overviewController.js';

const OverviewRouter = express.Router();

OverviewRouter.get("/enrollment", EnrollementOverview);
OverviewRouter.get("/created-courses", viewCreatedCourses);


export default OverviewRouter;