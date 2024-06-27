import NextAuth from 'next-auth'
import type { NextAuthConfig } from 'next-auth'
import { authConfig } from './auth.config'
import { MongoDBAdapter } from '@auth/mongodb-adapter'
import clientPromise from './lib/mongo-client'
import Github from 'next-auth/providers/github'
import Resend from 'next-auth/providers/resend'

export const { handlers, auth } = NextAuth({
    ...authConfig,
    providers: [
        Github,
        Resend({
            from: 'onboarding@resend.dev',
        }),
    ],
    adapter: MongoDBAdapter(clientPromise),
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            return true
        },
    },
    pages: {
        signIn: '/signin',
    },
    session: {
        strategy: 'jwt',
        // how long (seconds) a user's session is valid before expiring
        maxAge: 432000, // 5days
    },
} satisfies NextAuthConfig)
