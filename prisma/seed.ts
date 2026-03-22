import { prisma } from '../server/utils/prisma'
import bcrypt from 'bcryptjs'

async function main() {
    const passwordHash = bcrypt.hashSync('admin123', 10)
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
    console.log('Admin user created:', admin.email)
}

main().then(async () => {
    await prisma.$disconnect()
}).catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
})
