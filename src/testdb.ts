
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const newUser = await prisma.user.create({
        data: {
            username: 'JohnDoe',
            email: 'johndoe@example.com',
            password: 'yourpassword123',
        },
    });
    console.log('New User:', newUser);

    const users = await prisma.user.findMany();
    console.log('All Users:', users);
}

main()
    .catch(e => {
        console.error(e);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
