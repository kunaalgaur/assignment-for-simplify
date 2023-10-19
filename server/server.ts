import express from 'express';
import dotenv from 'dotenv';
import studentRouter from './student/student.routes';
import uploadRouter from './upload/upload.routes';
import { globalErrorHandler } from './middleware/globalErrorHanddler';

dotenv.config({ path: '.env' });

const app = express();

const PORT: string | number | undefined = process.env.PORT;

app.use('/api/students', studentRouter);
app.use('/api/upload', uploadRouter);

app.use('*', globalErrorHandler);

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
