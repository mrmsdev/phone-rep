import { lucia } from '../../utils/auth'
import { prisma } from '../../utils/prisma'
import { Bcrypt } from 'oslo/password'

export default defineEventHandler(async (event) => {
    const { email, password } = await readBody(event)

    if (typeof email !== 'string' || typeof password !== 'string') {
        throw createError({ statusCode: 400, message: 'Invalid email or password' })
    }

    const user = await prisma.user.findUnique({
        where: { email }
    })

    // Hash match 
    if (!user || !(await new Bcrypt().verify(user.passwordHash, password))) {
        throw createError({ statusCode: 401, message: 'Incorrect email or password' })
    }

    const session = await lucia.createSession(user.id, {})
    appendHeader(event, 'Set-Cookie', lucia.createSessionCookie(session.id).serialize())

    return { id: user.id, email: user.email, name: user.name, role: user.role }
})
