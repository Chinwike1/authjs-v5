import NextAuth from 'next-auth'
import Github from 'next-auth/providers/github'
import Resend from 'next-auth/providers/resend'
import type { NextAuthConfig } from 'next-auth'
import { MongoDBAdapter } from '@auth/mongodb-adapter'
import clientPromise from './lib/mongo-client'

export const { handlers, auth } = NextAuth({
    adapter: MongoDBAdapter(clientPromise),
    providers: [
        Github,
        Resend({
            from: 'onboarding@resend.dev',
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            return true
        },
        async session({ session, user }) {
            // session.sessionToken = session.sessionToken
            // session.userId = user.id
            return session
        },
    },
    pages: {
        signIn: '/signin',
    },
    session: {
        strategy: 'database',
        // how long (seconds) a user's session is valid before expiring
        maxAge: 432000, // 5days
    },
} satisfies NextAuthConfig)
