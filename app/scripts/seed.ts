import { faker } from '@faker-js/faker';
import User from '@/app/models/user';
import dbConnect from '@/lib/mongodb';
import { loadEnvConfig } from '@next/env'


console.log(process.cwd())
loadEnvConfig(process.cwd())

async function seedUsers(num: number) {
    await dbConnect();

    const users = Array.from({ length: num }, () => ({
        username: faker.internet.username(),
        email: faker.internet.email(),
        phone: faker.phone.number({ style: 'international' })
    }));

    await User.insertMany(users);
    console.log(`Seeded ${num} users`);
    process.exit();
}

seedUsers(100).catch((err) => {
    console.error('Seeding failed:', err);
    process.exit(1);
});
