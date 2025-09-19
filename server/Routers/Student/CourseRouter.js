import express from 'express'
import { courseDetails, enrollment, fetchRelatedCourses, postComment, postReply, viewCommentsWithReplies } from '../../Controllers/Student/CourseController.js';
import { fetchCourses } from "../../Controllers/Student/getAllCoursesController.js";

const courseRouter = express.Router();

courseRouter.get('/:courseId', courseDetails);
courseRouter.post('/enrollment', enrollment);
courseRouter.get("/related-courses/:category",fetchRelatedCourses);
courseRouter.get("/", fetchCourses);
courseRouter.get("/comments-with-replies/:courseId", viewCommentsWithReplies);
courseRouter.post("/create-comment/:courseId", postComment);
courseRouter.post("/create-reply", postReply);



export default courseRouter;