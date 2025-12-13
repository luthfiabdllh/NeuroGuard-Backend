"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('Start seeding...');
    const categories = [
        { name: 'Health', icon: 'heart' },
        { name: 'Lifestyle', icon: 'sun' },
        { name: 'Diet', icon: 'apple' },
        { name: 'Recovery', icon: 'activity' },
    ];
    for (const cat of categories) {
        const existing = await prisma.articleCategory.findFirst({
            where: { name: cat.name }
        });
        if (!existing) {
            await prisma.articleCategory.create({
                data: cat
            });
            console.log(`Created category: ${cat.name}`);
        }
        else {
            console.log(`Category already exists: ${cat.name}`);
        }
    }
    const defaultUser = {
        email: 'admin@neuroguard.com',
        full_name: 'Admin User',
        password: 'password123',
        gender: 'Male',
        dob: new Date('1990-01-01'),
    };
    const bcrypt = require('bcrypt');
    const hashedPassword = await bcrypt.hash(defaultUser.password, 10);
    const existingUser = await prisma.user.findUnique({ where: { email: defaultUser.email } });
    if (!existingUser) {
        await prisma.user.create({
            data: {
                ...defaultUser,
                password: hashedPassword
            }
        });
        console.log(`Created user: ${defaultUser.email}`);
    }
    else {
        console.log(`User already exists: ${defaultUser.email}`);
    }
    console.log('Seeding finished.');
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map