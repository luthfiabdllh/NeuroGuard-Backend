import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Start seeding...');

    // 1. Seed Article Categories
    const categories = [
        { name: 'Health', icon: 'heart' },
        { name: 'Lifestyle', icon: 'sun' },
        { name: 'Diet', icon: 'apple' },
        { name: 'Recovery', icon: 'activity' },
    ];

    for (const cat of categories) {
        // Upsert ensures we don't create duplicates if run multiple times.
        // Since we don't have a unique 'name' constraint in the schema (only id),
        // we use findFirst to check manually or just created it.
        // Ideally, 'name' should be unique, but following the current schema:

        // Check if exists to be safe
        const existing = await prisma.articleCategory.findFirst({
            where: { name: cat.name }
        });

        if (!existing) {
            await prisma.articleCategory.create({
                data: cat
            });
            console.log(`Created category: ${cat.name}`);
        } else {
            console.log(`Category already exists: ${cat.name}`);
        }
    }

    // 2. Seed Default User
    const defaultUser = {
        email: 'admin@neuroguard.com',
        full_name: 'Admin User',
        password: 'password123', // In real app, hash this! But for seed, we might need to hash it using bcrypt if the app expects it.
        // However, importing bcrypt here might be tricky if it's not in dependencies of ts-node execution context properly or if we want to keep seed likely raw.
        // Let's assume we use a hardcoded hash for 'password123'. 
        // $2b$10$EpIxNwllq/O.g/.. matches 'password123' (example)
        // Actually, let's just use the service logic or import bcrypt.
        // Better: import bcrypt.
        gender: 'Male',
        dob: new Date('1990-01-01'),
    };

    // Note: We need to hash the password. 
    // We can't easily import bcrypt here if it's strictly a module. 
    // Let's rely on the fact that we can npm install bcrypt as dev dependency or it is present.
    // It is present in dependencies.
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
    } else {
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
