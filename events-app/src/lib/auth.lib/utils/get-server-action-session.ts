import { getServerSession } from 'next-auth'
import { cookies, headers } from 'next/headers'

import { authOptions } from '../options.auth'

export const getServerActionSession = () => {
  const req = {
    headers: Object.fromEntries(headers()),
    cookies: Object.fromEntries(
      cookies()
        .getAll()
        .map(c => [c.name, c.value])
    )
  } as any

  const res = {
    getHeader() {
      /* empty */
    },
    setCookie() {
      /* empty */
    },
    setHeader() {
      /* empty */
    }
  } as any

  return getServerSession(req, res, authOptions)
}
