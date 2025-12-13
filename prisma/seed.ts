import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

// --- Helpers ---
function randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomElement<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

function randomFloat(min: number, max: number, decimals: number = 2): number {
    const val = Math.random() * (max - min) + min;
    return parseFloat(val.toFixed(decimals));
}

// Data Sets
const firstNames = ['John', 'Jane', 'Michael', 'Emily', 'David', 'Sarah', 'Robert', 'Jessica', 'William', 'Olivia'];
const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];
const workTypes = ['Private', 'Self-employed', 'Govt_job', 'children', 'Never_worked'];
const residenceTypes = ['Urban', 'Rural'];
const smokingStatuses = ['formerly smoked', 'never smoked', 'smokes', 'Unknown'];

async function main() {
    console.log('Start seeding...');

    // 1. Seed Article Categories
    console.log('Seeding Categories...');
    const categoriesData = [
        { name: 'Health', icon: 'heart' },
        { name: 'Lifestyle', icon: 'sun' },
        { name: 'Diet', icon: 'apple' },
        { name: 'Recovery', icon: 'activity' },
        { name: 'Mental Health', icon: 'smile' },
    ];

    const categoryMap = new Map<string, string>(); // Name -> ID

    for (const cat of categoriesData) {
        let category = await prisma.articleCategory.findFirst({ where: { name: cat.name } });
        if (!category) {
            category = await prisma.articleCategory.create({ data: cat });
        }
        categoryMap.set(cat.name, category.id);
    }

    // 2. Seed Users
    console.log('Seeding Users...');
    const users: any[] = [];

    // Default Admin User
    const adminPassword = await bcrypt.hash('password123', 10);
    const adminUserComp = {
        email: 'admin@neuroguard.com',
        full_name: 'Admin User',
        password: adminPassword,
        gender: 'Male',
        dob: new Date('1985-06-15'),
    };

    const admin = await prisma.user.upsert({
        where: { email: adminUserComp.email },
        update: {},
        create: adminUserComp,
    });
    users.push(admin);

    // Random Users
    const commonPassword = await bcrypt.hash('user123', 10);

    for (let i = 0; i < 5; i++) {
        const fName = randomElement(firstNames);
        const lName = randomElement(lastNames);
        const gender = Math.random() > 0.5 ? 'Male' : 'Female';
        const birthYear = randomInt(1950, 2000);
        const email = `${fName.toLowerCase()}.${lName.toLowerCase()}${i}@example.com`;

        const userData = {
            email,
            full_name: `${fName} ${lName}`,
            password: commonPassword,
            gender,
            dob: new Date(`${birthYear}-${randomInt(1, 12)}-${randomInt(1, 28)}`),
        };

        const user = await prisma.user.upsert({
            where: { email: userData.email },
            update: {},
            create: userData,
        });
        users.push(user);
    }

    // 3. Seed Articles
    console.log('Seeding Articles...');
    const articlesData = [
        {
            cat: 'Health',
            title: 'Understanding Stroke Symptoms',
            content: 'Stroke is a medical emergency. Learn the FAST signs: Face drooping, Arm weakness, Speech difficulty, Time to call emergency services. Early detection is crucial for effective treatment.'
        },
        {
            cat: 'Diet',
            title: 'Top 10 Foods for Heart Health',
            content: 'A diet rich in fruits, vegetables, whole grains, and healthy fats can significantly reduce your risk of stroke. Consider adding salmon, avocados, and berries to your daily meals.'
        },
        {
            cat: 'Lifestyle',
            title: 'The Importance of Daily Exercise',
            content: 'Regular physical activity helps control weight, lower blood pressure, and improve overall cardiovascular health. Aim for at least 30 minutes of moderate exercise most days of the week.'
        },
        {
            cat: 'Recovery',
            title: 'Rehabilitation After Stroke',
            content: 'Recovery from a stroke is a journey. Rehabilitation therapies can help you regain independence and improve your quality of life. Physical, occupational, and speech therapy are common components.'
        },
        {
            cat: 'Mental Health',
            title: 'Managing Stress and Anxiety',
            content: 'Chronic stress can contribute to high blood pressure, a major risk factor for stroke. Practice relaxation techniques like deep breathing, meditation, or yoga to keep your stress levels in check.'
        }
    ];

    const createdArticles: any[] = [];
    for (const art of articlesData) {
        const catId = categoryMap.get(art.cat);
        if (catId) {
            // check if article exists to avoid dups on re-run (simple check by title)
            const existing = await prisma.article.findFirst({ where: { title: art.title } });
            if (!existing) {
                const newArt = await prisma.article.create({
                    data: {
                        title: art.title,
                        content: art.content,
                        category_id: catId,
                        image_url: `https://placehold.co/600x400?text=${encodeURIComponent(art.title)}`,
                    }
                });
                createdArticles.push(newArt);
            } else {
                createdArticles.push(existing);
            }
        }
    }

    // 4. Seed Predictions (for random users)
    console.log('Seeding Predictions...');
    for (const user of users) {
        // Generate 1-3 predictions per user
        const numPreds = randomInt(1, 3);
        const age = new Date().getFullYear() - new Date(user.dob).getFullYear();

        for (let j = 0; j < numPreds; j++) {
            // Randomize health stats
            const bmi = randomFloat(18, 35);
            const glucose = randomFloat(70, 250);
            const hypertension = Math.random() > 0.8 ? 1 : 0;
            const heartDisease = Math.random() > 0.9 ? 1 : 0;
            const probability = randomFloat(0.01, 0.99); // Mock probability
            const riskLabel = probability > 0.7 ? 'High Risk' : (probability > 0.3 ? 'Moderate Risk' : 'Low Risk');

            await prisma.prediction.create({
                data: {
                    user_id: user.id,
                    gender: user.gender,
                    age: age,
                    height: randomFloat(150, 190),
                    weight: randomFloat(50, 100),
                    bmi: bmi,
                    avg_glucose_level: glucose,
                    hypertension: hypertension,
                    heart_disease: heartDisease,
                    example_married: randomElement(['Yes', 'No']), // mapped to ever_married
                    work_type: randomElement(workTypes),
                    residence_type: randomElement(residenceTypes),
                    smoking_status: randomElement(smokingStatuses),
                    stroke_probability: probability,
                    risk_label: riskLabel,
                }
            });
        }
    }

    // 5. Seed Reminders
    console.log('Seeding Reminders...');
    for (const user of users) {
        // 50% chance to have a reminder
        if (Math.random() > 0.5) {
            await prisma.predictionReminder.create({
                data: {
                    user_id: user.id,
                    frequency_days: randomElement([7, 14, 30]),
                    next_reminder_date: new Date(new Date().setDate(new Date().getDate() + randomInt(1, 10))),
                    is_active: true,
                }
            });
        }
    }

    // 6. Seed UserSavedArticles
    console.log('Seeding Saved Articles...');
    for (const user of users) {
        if (createdArticles.length > 0 && Math.random() > 0.5) {
            const randomArticle = randomElement(createdArticles);
            // Check existence
            const existing = await prisma.userSavedArticle.findFirst({
                where: { user_id: user.id, article_id: randomArticle.id }
            });

            if (!existing) {
                await prisma.userSavedArticle.create({
                    data: {
                        user_id: user.id,
                        article_id: randomArticle.id
                    }
                });
            }
        }
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

