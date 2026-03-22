import { NuxtAuthHandler } from '#auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { prisma } from '../../utils/prisma'
import bcrypt from 'bcryptjs'

export default NuxtAuthHandler({
    secret: process.env.NUXT_SECRET,
    pages: {
        signIn: '/admin/login'
    },
    providers: [
        // @ts-expect-error default export discrepancy in next-auth modules
        CredentialsProvider.default({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: 'Password', type: 'password' }
            },
            async authorize(credentials: any) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Missing credentials')
                }

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email }
                })

                if (!user || !bcrypt.compareSync(credentials.password, user.passwordHash)) {
                    throw new Error('Invalid credentials')
                }

                return { id: user.id.toString(), email: user.email, name: user.name, role: user.role }
            }
        })
    ],
    callbacks: {
        jwt({ token, user }: any) {
            if (user) {
                token.role = user.role
            }
            return token
        },
        session({ session, token }: any) {
            if (session.user) {
                session.user.role = token.role
            }
            return session
        }
    }
})
