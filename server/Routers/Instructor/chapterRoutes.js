import express from 'express';
import { addChapter, deleteChapter } from '../../Controllers/Instructor/chapterController.js';
import { Instructor } from '../../Middleware/authInstructor.js';

const router = express.Router();

// Add a chap
router.post('/:moduleId', Instructor, addChapter);

//delete a chap(lesson==chapter)
router.delete('/:lessonId', Instructor, deleteChapter);

export default router;