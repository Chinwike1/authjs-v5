import Link from 'next/link'
import React from 'react'

export default function ProtectedPage() {
    return (
        <div className='min-h-screen flex flex-col gap-3 items-center justify-center'>
            <h2 className='text-3xl font-bold'>Protected Page</h2>
            <Link href='/' className='underline'>
                Back Home
            </Link>
        </div>
    )
}
