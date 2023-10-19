import multer from 'multer';
import { Request } from 'express';

const csvFilter = (
    req: Request,
    file: Express.Multer.File,
    callback: (error: Error | null, acceptFile: boolean) => void
) => {
    if (file.mimetype.includes('csv')) {
        callback(null, true);
    } else {
        callback(new Error('Please upload only csv file'), false);
    }
};

const storage = multer.diskStorage({
    destination: (
        req: Request,
        file: Express.Multer.File,
        callback: (error: Error | null, destination: string) => void
    ) => {
        callback(null, 'uploads/');
    },
    filename: (
        req: Request,
        file: Express.Multer.File,
        callback: (error: Error | null, filename: string) => void
    ) => {
        console.log(file.originalname);
        callback(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage: storage });

export default upload;
