import { jwtDecode } from 'jwt-decode'
import { type Account } from 'next-auth'
import { type JWT } from 'next-auth/jwt'

async function refreshAccessToken(token: JWT) {
  const resp = await fetch(
    `${process.env.NEXTAUTH_ISSUER_URL}/protocol/openid-connect/token`,
    {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: process.env.NEXTAUTH_CLIENT_ID ?? '',
        client_secret: process.env.NEXTAUTH_CLIENT_SECRET ?? '',
        grant_type: 'refresh_token',
        refresh_token: String(token.refresh_token)
      }),
      method: 'POST'
    }
  )

  const refreshToken = await resp.json()

  if (!resp.ok) throw refreshToken

  return {
    ...token,
    access_token: refreshToken.access_token,
    decoded: jwtDecode(refreshToken.access_token),
    id_token: refreshToken.id_token,
    expires_at: Math.floor(Date.now() / 1000) + refreshToken.expires_in,
    refresh_token: refreshToken.refresh_token
  }
}

export async function handleJWT(
  token: JWT,
  account: Account | undefined
): Promise<any> {
  const nowTimeStamp = Math.floor(Date.now() / 1000)

  if (account !== undefined) {
    token.decoded = jwtDecode(account.access_token as string)
    token.access_token = account.access_token
    token.id_token = account.id_token
    token.expires_at = account.expires_at
    token.refresh_token = account.refresh_token
    return token
  } else if (nowTimeStamp < (token.expires_at as unknown as number)) {
    return token
  } else {
    try {
      const refreshedToken = await refreshAccessToken(token)

      return refreshedToken
    } catch (error) {
      return { ...token, error: 'RefreshAccessTokenError' }
    }
  }
}
