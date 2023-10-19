import { Response } from 'express';

export class ServerResponse {
    static success(
        res: Response,
        statusCode: number,
        message: string,
        data: any
    ) {
        return res.status(statusCode).json({
            success: true,
            message: message,
            data: data,
        });
    }

    static error(res: Response, statusCode: number, message: string) {
        return res.status(500).json({
            success: false,
            name: 'Custom Error',
            message: message,
        });
    }
}
