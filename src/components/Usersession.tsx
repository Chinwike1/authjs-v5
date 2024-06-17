'use client'
import { useSession, signIn, signOut } from 'next-auth/react'
import { Button } from './ui/button'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

export default function UserSession() {
    const { data: session } = useSession()
    const pathname = usePathname()

    return (
        <main
            className={cn(
                'mt-5 flex justify-center text-white w-[350px] p-3 rounded-md',
                session && 'bg-slate-300/90'
            )}
        >
            <div className='flex flex-col space-y-4'>
                {session && (
                    <>
                        <h2 className='text-xl font-bold'>
                            You&apos;re signed in as:
                        </h2>
                        <pre>
                            <code>{JSON.stringify(session.user?.email)}</code>
                        </pre>
                        <Button className='mt-3' onClick={() => signOut()}>
                            Sign out
                        </Button>
                    </>
                )}
                {!session && pathname !== '/signin' && (
                    <Button onClick={() => signIn()}>Sign In</Button>
                )}
            </div>
        </main>
    )
}
