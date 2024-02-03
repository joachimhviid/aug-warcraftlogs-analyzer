// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/apollo'],
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  runtimeConfig: {
    public: {
      warcraftlogs: {
        clientId: process.env.WARCRAFTLOGS_CLIENT_ID,
        clientSecret: process.env.WARCRAFTLOGS_SECRET,
      },
    },
  },
  apollo: {
    clients: {
      default: {
        httpEndpoint: 'https://www.warcraftlogs.com/api/v2/client',
      },
    },
  },
})
