import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { username, email, password } = req.body;

        try {
            const existingUser = await prisma.user.findUnique({
                where: { email },
            });

            if (existingUser) {
                return res.status(400).json({ message: 'Email already exists. Please use a different email.' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = await prisma.user.create({
                data: {
                    username,
                    email,
                    password: hashedPassword,
                },
            });

            res.status(200).json({ message: 'Signup successful', user: newUser });
        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).json({ message: 'Error creating user', error });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
