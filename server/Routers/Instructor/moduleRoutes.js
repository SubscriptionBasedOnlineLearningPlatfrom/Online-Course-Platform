import express from 'express';
import { addModule, listModules, deleteModule } from '../../Controllers/Instructor/moduleController.js';
import { Instructor } from '../../Middleware/authInstructor.js';

const router = express.Router();

// Add a new module to a course
router.post('/:courseId', Instructor, addModule);

// Get all modules for a course
router.get('/:courseId', Instructor, listModules);

// delete module
router.delete('/:moduleId', Instructor, deleteModule);


export default router;
