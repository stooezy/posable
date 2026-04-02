import { drizzleAdapter } from '@better-auth/drizzle-adapter'
import { betterAuth } from 'better-auth'
import { username } from 'better-auth/plugins'
import { tanstackStartCookies } from 'better-auth/tanstack-start'
import { db } from '../db/index'
import * as schema from '../db/schema'

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema,
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [username(), tanstackStartCookies()],
  basePath: '/api/auth',
  baseURL:
    process.env.BETTER_AUTH_URL ??
    process.env.SERVER_URL ??
    'http://localhost:3000',
  secret:
    process.env.BETTER_AUTH_SECRET ??
    'development-only-better-auth-secret-change-me',
})
