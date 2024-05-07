import type { CookiesOptions, NextAuthOptions } from 'next-auth'
import KeycloakProvider from 'next-auth/providers/keycloak'

import { handleJWT } from './handlers/jwt.handler'
import { handleSession } from './handlers/session.handler'
import { handleSignoutEvent } from './handlers/signout.handler'

const getDomainWithoutSubdomain = (url: string) => {
  const urlParts = new URL(url).hostname.split('.')

  return urlParts
    .slice(0)
    .slice(-(urlParts.length === 4 ? 3 : 2))
    .join('.')
}

const useSecureCookies = process.env.NEXTAUTH_URL!.startsWith('https://')
const cookiePrefix = useSecureCookies ? '__Secure-' : ''
const hostName = getDomainWithoutSubdomain(process.env.NEXTAUTH_URL!)

const cookies: Partial<CookiesOptions> = {
  sessionToken: {
    name: `${cookiePrefix}next-auth.session-token`,
    options: {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      secure: useSecureCookies,
      domain: hostName === 'localhost' ? hostName : '.' + hostName // add a . in front so that subdomains are included
    }
  }
}

const keycloakOAuthProvider = KeycloakProvider({
  clientId: process.env.NEXTAUTH_CLIENT_ID ?? '',
  clientSecret: process.env.NEXTAUTH_CLIENT_SECRET ?? '',
  issuer: process.env.NEXTAUTH_ISSUER_URL
})

export const authOptions: NextAuthOptions = {
  useSecureCookies,
  cookies,
  providers: [keycloakOAuthProvider],
  callbacks: {
    jwt: async ({ token, account }) =>
      await handleJWT(token, account ?? undefined),
    session: async ({ token, session }) => await handleSession(token, session)
  },
  events: {
    signOut: async () => {
      await handleSignoutEvent()
    }
  }
}
