import express from 'express';
import { loadQuiz, quizCreation } from '../../controllers/instructor/quizController.js';

const QuizRouter = express.Router();

QuizRouter.post('/create', quizCreation);
QuizRouter.get('/:lessonId', loadQuiz);

export default QuizRouter;