import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../prisma'
import bcrypt from 'bcryptjs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { email, password } = req.body;

        try {
            const user = await prisma.user.findUnique({ where: { email } });

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Invalid password' });
            } else {
                return res.status(200).json({ message: 'Login successful', user });
            }
        } catch (error) {
            console.error('Prisma Error:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
