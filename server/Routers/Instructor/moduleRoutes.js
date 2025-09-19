import express from 'express';
import { addModule, listModules } from '../../Controllers/Instructor/moduleController.js';
import { Instructor } from '../../Middleware/authInstructor.js';

const router = express.Router();

// Add a new module to a course
router.post('/:courseId', Instructor, addModule);

// Get all modules for a course
router.get('/:courseId', Instructor, listModules);

export default router;
