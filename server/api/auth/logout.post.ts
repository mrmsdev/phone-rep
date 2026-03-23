import { lucia } from '../../utils/auth'

export default defineEventHandler(async (event) => {
    const sessionId = getCookie(event, lucia.sessionCookieName)
    if (!sessionId) {
        throw createError({ statusCode: 401 })
    }

    await lucia.invalidateSession(sessionId)
    appendHeader(event, 'Set-Cookie', lucia.createBlankSessionCookie().serialize())

    return { success: true }
})
