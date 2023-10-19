import { NextFunction, Request, Response } from 'express';

export const catchAsyncError =
    (controller: any) => (req: Request, res: Response, next: NextFunction) => {
        try {
            controller(req, res);
        } catch (error) {
            console.log(error);
            next(error);
        }
    };
