import express from 'express'
import { viewStudentsComments } from '../../Controllers/Instructor/CommentsController.js';

const commentRouter = express.Router();

commentRouter.get("/comments", viewStudentsComments);

export default commentRouter;