export default defineNuxtRouteMiddleware(async (to, from) => {
    try {
        const { user } = await $fetch('/api/auth/user')
        if (!user) {
            return navigateTo('/admin/login')
        }
    } catch (e) {
        return navigateTo('/admin/login')
    }
})
