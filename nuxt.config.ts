export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  ssr: true,
  css: ['~/assets/css/main.css'],
  modules: [
    '@nuxt/image',
    '@nuxtjs/google-fonts',
    '@sidebase/nuxt-auth'
  ],
  auth: {
    globalAppMiddleware: false,
    baseURL: 'http://localhost:3000/api/auth',
    provider: {
      type: 'authjs',
      defaultProvider: 'credentials'
    }
  },
  googleFonts: {
    families: {
      Outfit: [300, 400, 500, 600, 700]
    },
    display: 'swap',
    prefetch: true,
    preconnect: true,
  },
  image: {
    format: ['webp']
  },
  app: {
    head: {
      title: 'MustachPhone - On-Site Device Repair',
      htmlAttrs: {
        lang: 'en'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ]
    }
  }
})
