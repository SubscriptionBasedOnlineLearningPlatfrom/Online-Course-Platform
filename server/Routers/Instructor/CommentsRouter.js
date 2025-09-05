import express from 'express'
import { createReplyForComment, deleteReply, updateReplyForComment, viewStudentsComments } from '../../Controllers/Instructor/CommentsController.js';

const commentRouter = express.Router();

commentRouter.get("/comments", viewStudentsComments);
commentRouter.post("/:commentId/replies", createReplyForComment);
commentRouter.put("/update-reply/:replyId", updateReplyForComment);
commentRouter.delete("/delete-reply/:replyId", deleteReply);


export default commentRouter;