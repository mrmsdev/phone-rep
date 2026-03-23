import { Lucia } from 'lucia'
import { PrismaAdapter } from '@lucia-auth/adapter-prisma'
import { prisma } from './prisma'

const adapter = new PrismaAdapter(prisma.session, prisma.user)

export const lucia = new Lucia(adapter, {
    sessionCookie: {
        attributes: {
            secure: !process.env.dev
        }
    },
    getUserAttributes: (attributes) => {
        return {
            email: attributes.email,
            name: attributes.name,
            role: attributes.role
        }
    }
})

declare module 'lucia' {
    interface Register {
        Lucia: typeof lucia
        UserId: number
        DatabaseUserAttributes: DatabaseUserAttributes
    }
}

interface DatabaseUserAttributes {
    email: string
    name: string | null
    role: string
}
