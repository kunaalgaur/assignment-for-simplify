import { Router } from 'express';
import upload from '../middleware/multer';
import { uploadFile } from './upload.controller';

const router = Router();

router.route('/').post(upload.single('csvFile'), uploadFile);

export default router;
