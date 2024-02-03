import { useAuth } from '#imports'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('apollo:auth', async ({ token }) => {
    const session = await useAuth().getAccessToken()
    if (!session) return
    token.value = session.access_token
  })
})
