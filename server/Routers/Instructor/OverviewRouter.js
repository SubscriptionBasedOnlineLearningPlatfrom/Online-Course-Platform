import express from 'express';
import { editCreatedCourse, EnrollementOverview, viewCreatedCourses } from '../../Controllers/Instructor/OverviewController.js';
import { Instructor } from '../../Middleware/authInstructor.js';

const OverviewRouter = express.Router();

OverviewRouter.get("/enrollment",Instructor, EnrollementOverview);
OverviewRouter.get("/created-courses",Instructor, viewCreatedCourses);
OverviewRouter.put("/edit-course-details/:courseId", editCreatedCourse);


export default OverviewRouter;