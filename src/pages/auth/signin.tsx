import { Button, buttonVariants } from '@/components/Button'
import Input from '@/components/Input'
import { useToast } from '@/hooks/useToast'
import {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage,
} from 'next'
import { getServerSession } from 'next-auth'
import { getCsrfToken, getProviders, signIn } from 'next-auth/react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React, { useCallback, useState } from 'react'
import { AiOutlineGoogle, AiOutlineMail } from 'react-icons/ai'
import { authOptions } from '../api/auth/[...nextauth]'

type Values = {
  email: string
  password: string
}

export default function SignIn({
  providers,
  csrfToken,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {

  const { toast } = useToast()

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [values, setValues] = useState<Values>({
    email: '',
    password: '',
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [event.target.name]: event.target.value })
  }

  const handleSubmit = useCallback(async () => {
    try {
      setIsLoading(true)

      await signIn('credentials', {
        email: values.email,
        password: values.password,
      })

      toast({
        variant: 'success',
        description: 'Signed in',
      })

    } catch (error) {
      toast({
        variant: 'destructive',
        description: 'Something went wrong',
      })
    } finally {
      setIsLoading(false)
    }
  }, [values])

  return (
    <div className="flex min-h-screen flex-col bg-[url('/noise.png')] items-center justify-center py-2 bg-[#18191b]">
      <Head>
        <title>Sign In</title>
      </Head>
      <form
        method="post"
        action="/api/auth/callback/credentials"
        className="flex border-[1px] border-gray-400 border-solid rounded-2xl max-h-[600px] bg-[#16181A] flex-1 flex-col items-center py-12 px-8 md:px-20 text-center"
      >
        <header className="space-y-8 mb-6 flex flex-col items-center">
          <Image alt="" src="/logo2.png" width={60} height={60} />
          <div className="space-y-1 flex flex-col">
            <h2 className="text-3xl font-semibold text-gray-100 capitalize bg-clip-text">
              👋<span className="heading-fade-line">Welcome Back</span>
            </h2>
            <p className="text-xs text-gray-400">
              Don't have an account?
              <Link
                className={buttonVariants({
                  variant: 'link',
                  size: 'sm',
                  className: 'w-fit text-xs px-1',
                })}
                href={'/auth/signup'}
              >
                Sign Up
              </Link>
            </p>
          </div>
        </header>
        <main className="w-full">
          <Input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          <Input
            id="email"
            type="email"
            name="email"
            required
            onChange={handleChange}
            placeholder="Email Address"
            className="mb-4"
            disabled={isLoading}
          />
          <Input
            id="password"
            type="password"
            name="password"
            onChange={handleChange}
            required
            placeholder="Password"
            className=""
            disabled={isLoading}
          />
        </main>
        <footer className="w-full">
          <Button
            onClick={handleSubmit}
            className="flex mt-6 justify-center items-center w-full text-center"
          >
            Sign In
          </Button>
          <div className="flex w-full">
            <hr className="border mt-6 bg-gray-800 border-gray-700 h-[1px] w-full" />
            <span className="text-sm mt-4 px-2 text-gray-500 uppercase">
              or
            </span>
            <hr className="border mt-6 border-gray-700 h-[1px] w-full" />
          </div>
          {Object.values(providers)
            .filter((provider) => provider.name != 'Credentials')
            .map((provider) => (
              <div key={provider.name}>
                <Button
                  className="flex mt-6 justify-center items-center w-full text-center"
                  onClick={() => signIn(provider.id)}
                >
                  <AiOutlineGoogle className="mr-2 h-4 w-4" />
                  Continue with {provider.name}
                </Button>
              </div>
            ))}
        </footer>
      </form>
    </div>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions)

  if (session) {
    return { redirect: { destination: '/' } }
  }

  const providers = await getProviders()

  return {
    props: {
      providers: providers ?? [],
      csrfToken: await getCsrfToken(context),
    },
  }
}
