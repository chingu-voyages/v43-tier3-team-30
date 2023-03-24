import { Button, buttonVariants } from '@/components/Button'
import Input from '@/components/Input'
import axios from 'axios'
import { NextPage } from 'next'
import { signIn } from 'next-auth/react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useCallback, useState } from 'react'
import { AiOutlineGoogle, AiOutlineMail } from 'react-icons/ai'

type Values = {
  name: string
  email: string
  password: string
}

const SignUp: NextPage = () => {
  const router = useRouter()
  
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [values, setValues] = useState<Values>({
    name: '',
    email: '',
    password: '',
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [event.target.name]: event.target.value })
  }

  const handleSubmit = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      setIsLoading(true)

      await axios.post('/api/register', values)

      setIsLoading(false)

      signIn('credentials', {
        email: values.email,
        password: values.password,
      })
      
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  },[values])

  return (
    <div className="flex min-h-screen flex-col bg-[url('/noise.png')] items-center justify-center py-2 bg-[#18191b]">
      <Head>
        <title>Sign Up</title>
      </Head>
      <form
        onSubmit={(e) => {
          handleSubmit(e)
        }}
        className="flex border-[1px] border-gray-400 border-solid rounded-2xl max-h-[600px] bg-[#16181A] flex-1 flex-col items-center py-12 px-8 md:px-20 text-center"
      >
        <header className="space-y-8 mb-6 flex flex-col items-center">
          <Image alt="" src="/logo2.png" width={60} height={60} />
          <div className="space-y-1 flex flex-col">
            <h2 className="text-3xl font-semibold text-gray-100 bg-clip-text">
              <span className="heading-fade-line">Create an account </span>
            </h2>
            <p className="text-xs text-gray-400">
              Already have an account?
              <Link
                className={buttonVariants({
                  variant: 'link',
                  size: 'sm',
                  className: 'w-fit text-xs px-1',
                })}
                href={'/auth/signin'}
              >
                Sign In
              </Link>
            </p>
          </div>
        </header>
        <main className="mt-4 w-full">
          <Input
            id="name"
            type="text"
            name="name"
            required
            onChange={handleChange}
            placeholder="User Name"
            className=" mb-4"
            disabled={isLoading}
          />
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
            required
            onChange={handleChange}
            placeholder="Password"
            className=""
            disabled={isLoading}
          />
        </main>
        <footer className="w-full">
          <Button
            type="submit"
            className="flex mt-6 w-full justify-center items-center text-center"
          >
            Sign Up
          </Button>
        </footer>
      </form>
    </div>
  )
}

export default SignUp
