export type WarcraftLogsSession = {
  access_token: string
  token_type: string
  expires_in: number
}
export const useAuth = () => {
  const tokenUri = 'https://www.warcraftlogs.com/oauth/token'

  const sessionCookie = useCookie<WarcraftLogsSession | null>('session', {
    default: () => null,
  })

  const clientId = useRuntimeConfig().public.warcraftlogs.clientId
  const clientSecret = useRuntimeConfig().public.warcraftlogs.clientSecret
  const getAccessToken = async (): Promise<WarcraftLogsSession | null> => {
    if (sessionCookie.value) {
      return sessionCookie.value
    }
    try {
      const response = await $fetch<WarcraftLogsSession>(tokenUri, {
        method: 'POST',
        body: JSON.stringify({
          grant_type: 'client_credentials',
          client_id: clientId,
          client_secret: clientSecret,
        }),
        headers: { 'Content-Type': 'application/json' },
      })
      sessionCookie.value = response
      return response
    } catch (e) {
      console.error('Error getting access token', e)
      return null
    }
  }

  return {
    getAccessToken,
  }
}
