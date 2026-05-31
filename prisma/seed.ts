import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import pkg from '@prisma/client'
const { PrismaClient } = pkg
import { hashPasswordScrypt } from '../server/utils/crypto'
import { loadEnvFile } from 'node:process'

// Try to load .env if DATABASE_URL is not set
if (!process.env.DATABASE_URL) {
    try {
        loadEnvFile()
    } catch (e) {
        // .env might not exist in some environments, ignore
    }
}

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

    const passwordHash = hashPasswordScrypt('admin123')

    const admin = await prisma.user.upsert({
        where: { email: 'driss@maouni.com' },
        update: {
            passwordHash // force update the password hash to the new scrypt algorithm
        },
        create: {
            email: 'driss@maouni.com',
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
