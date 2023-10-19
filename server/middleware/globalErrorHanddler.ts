import { NextFunction, Request, Response } from 'express';

export const globalErrorHandler = (
    error: any,
    _req: Request,
    res: Response,
    _next: NextFunction
) => {
    return res.status(500).json({
        success: false,
        name: error.name || 'Unknown error',
        message: error.message || 'An unknown error occured.',
    });
};
