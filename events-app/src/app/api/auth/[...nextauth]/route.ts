import NextAuth from 'next-auth'

import {authOptions} from '@/lib/auth.lib/options.auth'

const handler = NextAuth(authOptions)

export {handler as GET, handler as POST}