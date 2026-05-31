import { prisma } from '../../utils/prisma'
import { verifyPasswordScrypt } from '../../utils/crypto'

export default defineEventHandler(async (event) => {
    const { email, password } = await readBody(event)

    if (typeof email !== 'string' || typeof password !== 'string') {
        throw createError({ statusCode: 400, message: 'Invalid email or password' })
    }

    const user = await prisma.user.findUnique({
        where: { email }
    })

    if (!user || !verifyPasswordScrypt(password, user.passwordHash)) {
        throw createError({ statusCode: 401, message: 'Incorrect email or password' })
    }

    await setUserSession(event, {
        user: {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role
        }
    })

    return { id: user.id, email: user.email, name: user.name, role: user.role }
})
