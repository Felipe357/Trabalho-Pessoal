import { getIdToken } from '../utils/get-tokens'

export async function handleSignoutEvent(): Promise<void> {
  const id_token = await getIdToken()

  if (id_token) {
    try {
      const params = new URLSearchParams()

      params.append('id_token_hint', id_token)

      await fetch(
        `${
          process.env.NEXTAUTH_ISSUER_URL
        }/protocol/openid-connect/logout?${params.toString()}`
      )
    } catch (e: any) {
      console.error('Unable to perform post-logout handshake')
    }
  }
}
