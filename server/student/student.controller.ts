import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { ServerResponse } from '../utils/ServerResponse';

const prisma = new PrismaClient();

export const getStudentResult = async (req: Request, res: Response) => {
    const studentId = req.params.id;
    const student = await prisma.students.findUnique({
        where: { id: parseInt(studentId) },
    });

    const total =
        (student?.mark1 as number) +
        (student?.mark2 as number) +
        (student?.mark3 as number);
    const percentage = (total / 300) * 100;

    const marksheet = {
        mark1: student?.mark1 as number,
        mark2: student?.mark2 as number,
        mark3: student?.mark3 as number,
    };

    if (percentage >= 33) {
        return ServerResponse.success(
            res,
            200,
            'Congratulations your have passed',
            marksheet
        );
    } else {
        return ServerResponse.success(
            res,
            200,
            'Sorry, Better luck next time',
            marksheet
        );
    }
};

export const getAllPassedStudent = async (req: Request, res: Response) => {
    const { resultStatus } = req.query;
    const passingMarks = 33;

    if (!resultStatus) {
        const students = await prisma.students.findMany({
            where: {
                AND: [
                    { mark1: { gte: passingMarks } },
                    { mark2: { gte: passingMarks } },
                    { mark3: { gte: passingMarks } },
                ],
            },
        });

        return ServerResponse.success(res, 200, 'Success', students);
    }

    if (resultStatus === 'passed') {
        const students = await prisma.students.findMany({
            where: {
                AND: [
                    { mark1: { gte: passingMarks } },
                    { mark2: { gte: passingMarks } },
                    { mark3: { gte: passingMarks } },
                ],
            },
        });

        return ServerResponse.success(res, 200, 'Success', students);
    }

    if (resultStatus === 'failed') {
        const students = await prisma.students.findMany({
            where: {
                OR: [
                    { mark1: { lt: passingMarks } },
                    { mark2: { lt: passingMarks } },
                    { mark3: { lt: passingMarks } },
                ],
            },
        });

        return ServerResponse.success(res, 200, 'Success', students);
    }
};
