import NextAuth from 'next-auth'
import { authConfig } from '@/auth.config'

const { auth } = NextAuth(authConfig)

export default auth((req) => {
    const { nextUrl } = req

    console.log('req.auth.user: ' + req.auth?.user?.email)

    // set isAuthenticated to true if req.auth is a truthy value. otherwise set to false.
    const isAuthenticated = !!req.auth

    // use boolean value to determine if route is a protected route
    const isProtectedRoute = ['/protected'].includes(nextUrl.pathname)

    // redirect to signin if on a protected route and user is not authenticated
    if (isProtectedRoute && !isAuthenticated)
        return Response.redirect(new URL('/signin', nextUrl))
})

// apply middleware to all routes excluding API routes, static asset routes, image optimization routes, and the favicon
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
