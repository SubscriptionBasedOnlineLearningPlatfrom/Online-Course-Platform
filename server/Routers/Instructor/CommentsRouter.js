import express from 'express'
import { createReplyForComment, deleteReply, updateReplyForComment, viewStudentsComments } from '../../Controllers/Instructor/CommentsController.js';
import { Instructor } from '../../Middleware/authInstructor.js';

const commentRouter = express.Router();

commentRouter.get("/comments",Instructor, viewStudentsComments);
commentRouter.post("/:commentId/replies",Instructor, createReplyForComment);
commentRouter.put("/update-reply/:replyId", updateReplyForComment);
commentRouter.delete("/delete-reply/:replyId", deleteReply);


export default commentRouter;