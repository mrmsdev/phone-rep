export default defineEventHandler(async (event) => {
    // basic CSRF protection
    if (event.method !== 'GET') {
        const originHeader = getHeader(event, 'Origin') ?? null
        const hostHeader = getHeader(event, 'Host') ?? null
        if (originHeader && hostHeader) {
            const originHost = originHeader.replace(/^https?:\/\//, '')
            if (originHost !== hostHeader) {
                return event.node.res.writeHead(403).end()
            }
        }
    }

    const session = await getUserSession(event)
    event.context.user = session.user || null
    event.context.session = session.user ? { id: 'cookie-session', userId: session.user.id } : null
})

declare module 'h3' {
    interface H3EventContext {
        user: {
            id: number
            email: string
            name: string | null
            role: string
        } | null
        session: any | null
    }
}
