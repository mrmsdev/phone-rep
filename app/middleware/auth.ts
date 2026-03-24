export default defineNuxtRouteMiddleware(async (to, from) => {
    try {
        const userFetch = useRequestFetch()
        const { user } = await userFetch<{ user: any }>('/api/auth/user')
        if (!user) {
            return navigateTo('/admin/login')
        }
    } catch (e) {
        return navigateTo('/admin/login')
    }
})
