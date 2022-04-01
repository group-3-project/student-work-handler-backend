import express from 'express';
import { getClassrooms, createClassroom, deleteClassroom, searchCode } from '../controllers/classroom.js';

const router = express.Router();

router.get('/', getClassrooms);
router.post('/', createClassroom);
router.post('/searchcode', searchCode);
router.delete('/:id', deleteClassroom);

export default router;