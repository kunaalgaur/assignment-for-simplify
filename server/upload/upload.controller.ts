import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import fs from 'fs';
import { ServerResponse } from '../utils/ServerResponse';

const prisma = new PrismaClient();

export const uploadFile = async (req: Request, res: Response) => {
    const csvFilePath = (req.file as Express.Multer.File).path;
    const csvData = fs.readFileSync(csvFilePath, 'utf8');

    const rows = csvData.split('\n');
    if (rows.length > 0) {
        rows.shift();
    }

    for (const row of rows) {
        const [name, age, marks1, marks2, marks3] = row.split(',');

        await prisma.students.create({
            data: {
                name,
                age: parseInt(age, 10),
                mark1: parseInt(marks1, 10),
                mark2: parseInt(marks2, 10),
                mark3: parseInt(marks3, 10),
            },
        });
    }

    await prisma.$disconnect();
    return ServerResponse.success(res, 200, 'Data entered', null);
};
