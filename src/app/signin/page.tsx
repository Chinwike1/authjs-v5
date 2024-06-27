'use client'
import { signIn } from 'next-auth/react'
import { Button, buttonVariants } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import Link from 'next/link'

export default function SignInPage() {
    const form = useForm()

    const [isPending, startTransition] = useTransition()

    async function sendMagicLink(data: { email: string }) {
        startTransition(async () => {
            try {
                const signInResult = await signIn('resend', {
                    email: data.email.toLowerCase(),
                    redirect: false,
                    callbackUrl: `/`,
                })

                console.log('signInResult: ', signInResult)

                if (signInResult?.ok && !signInResult.error) {
                    toast('Email delivered', {
                        description: 'Check your inbox and spam',
                        action: {
                            label: 'Close',
                            onClick: () => true,
                        },
                    })
                    return
                }
            } catch (error: any) {
                toast('Oops, we encountered an error', {
                    description:
                        'Sorry, we encountered a problem sending the email',
                    action: {
                        label: 'Close',
                        onClick: () => true,
                    },
                })
            }
        })
    }

    return (
        <main className='flex  min-h-screen flex-col items-center justify-center'>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(sendMagicLink)}
                    className='space-y-8'
                >
                    <FormField
                        control={form.control}
                        name='email'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder='you@email.com'
                                        type='email'
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    We&apos;ll send your login link here.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button
                        className='w-full'
                        type='submit'
                        size='lg'
                        disabled={isPending}
                    >
                        {isPending ? '...' : 'Sign in with Resend'}
                    </Button>
                </form>
            </Form>
            <Button
                variant='outline'
                className='w-30 mt-3'
                onClick={() => {
                    signIn('github', {
                        callbackUrl: '/',
                    })
                }}
            >
                Sign in with GitHub
            </Button>
        </main>
    )
}
