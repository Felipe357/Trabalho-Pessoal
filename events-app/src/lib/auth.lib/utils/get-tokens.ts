'server-only'

import { getServerSession } from 'next-auth'

import { authOptions } from '../options.auth'

export async function getAccessToken() {
  const session: any = await getServerSession(authOptions)

  if (session) {
    const accessTokenDecrypted = session.access_token
    return accessTokenDecrypted
  }

  return null
}

export async function getIdToken() {
  const session: any = await getServerSession(authOptions)

  if (session) {
    const idTokenDecrypted = session.id_token

    return idTokenDecrypted
  }

  return null
}
