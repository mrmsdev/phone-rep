import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../lib/prisma-client/client'
import { Bcrypt } from 'oslo/password'

// Standalone Prisma initialization for the seed script
const connectionString = process.env.DATABASE_URL
const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
    console.log('Starting seed...')

    if (!connectionString) {
        throw new Error('DATABASE_URL is not set')
    }

    const passwordHash = await new Bcrypt().hash('admin123')

    const admin = await prisma.user.upsert({
        where: { email: 'admin@mustachphone.com' },
        update: {},
        create: {
            email: 'admin@mustachphone.com',
            name: 'Admin',
            passwordHash,
            role: 'ADMIN'
        }
    })

    console.log('Admin user created/updated:', admin.email)
}

main()
    .then(async () => {
        await prisma.$disconnect()
        console.log('Seed completed successfully.')
    })
    .catch(async (e) => {
        console.error('Error during seed:', e)
        await prisma.$disconnect()
        process.exit(1)
    })
