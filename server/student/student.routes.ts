import { Router } from 'express';
import { getAllPassedStudent, getStudentResult } from './student.controller';

const router = Router();

router.route('/:id').get(getStudentResult);
router.route('/').get(getAllPassedStudent);

export default router;
