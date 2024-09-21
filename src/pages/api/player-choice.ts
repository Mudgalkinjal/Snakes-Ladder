import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { userId, numPlayers } = req.body;

        try {
            const playerChoice = await prisma.playerChoice.create({
                data: {
                    userId,
                    numPlayers,
                },
            });
            res.status(201).json(playerChoice);
        } catch (error) {
            res.status(500).json({ error: 'Failed to save player choice.' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
