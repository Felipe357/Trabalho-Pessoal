import { type Session } from 'next-auth'
import { type JWT } from 'next-auth/jwt'

export async function handleSession(
  token: JWT | any,
  session: Session | any
): Promise<Session> {
  session.access_token = token.access_token
  session.id_token = token.id_token
  session.roles = token.decoded.realm_access.roles
  session.error = token.error
  session.user_id = token.decoded.oid

  return session
}
