import { Request } from 'express';
import multer, { Multer, diskStorage } from 'multer';

const storage = diskStorage({
    destination: function (
        req: Request,
        file: Express.Multer.File,
        cb: Function
    ) {
        cb(null, 'uploads/');
    },
    filename: function (req: Request, file: Express.Multer.File, cb: Function) {
        cb(null, file.originalname);
    },
});

const upload: Multer = multer({ storage });

export default upload;
