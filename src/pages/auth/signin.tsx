import { Button } from '@/components/Button'
import Input from '@/components/Input'
import { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import React, { useState } from 'react'
import { AiOutlineGoogle } from 'react-icons/ai'

type Values = {
  email: string
  password: string
}

const SignIn: NextPage = () => {
  const [values, setValues] = useState<Values>({
    email: '',
    password: '',
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [event.target.name]: event.target.value })
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log(values)
  }

  return (
    <div className="flex min-h-screen flex-col bg-[url('/noise.png')] items-center justify-center py-2 bg-[#18191b]">
      <Head>
        <title>Sign In</title>
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
            <h2 className="text-3xl font-semibold text-gray-100 capitalize bg-clip-text">
              👋<span className="heading-fade-line">Welcome Back</span>
            </h2>
            <p className="text-xs text-gray-400">
              Sign In using Google or Email
            </p>
          </div>
        </header>
        <main className="w-full">
          <Input
            id="email"
            type="email"
            name="email"
            required
            onChange={handleChange}
            placeholder="Email Address"
            className="mb-4"
          />
          <Input
            id="password"
            type="password"
            name="password"
            required
            onChange={handleChange}
            placeholder="Password"
            className=""
          />
        </main>
        <footer className="w-full">
          <Button
            type="submit"
            className="flex mt-6 justify-center items-center w-full text-center"
          >
            Sign Up
          </Button>
          <div className="flex w-full">
            <hr className="border mt-6 bg-gray-800 border-gray-700 h-[1px] w-full" />
            <span className="text-sm mt-4 px-2 text-gray-500 uppercase">
              or
            </span>
            <hr className="border mt-6 border-gray-700 h-[1px] w-full" />
          </div>
          <Button className="flex mt-6 justify-center items-center w-full text-center">
            <AiOutlineGoogle className="mr-2 h-4 w-4" />
            Sign In with Google
          </Button>
        </footer>
      </form>
    </div>
  )
}

export default SignIn
