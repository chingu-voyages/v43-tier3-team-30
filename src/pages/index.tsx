import type { NextPage } from 'next'
import Head from 'next/head'
import Input from '../components/Input'
import Image from 'next/image'
import { Button } from '@/components/Button'

const Home: NextPage = () => {
  return (
    <div className="flex text-white min-h-screen flex-col items-center justify-center py-2 bg-[#18191b]">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex space-y-8 flex-1 flex-col items-center py-12 px-8 md:px-20 text-center">
        Hii
      </main>
    </div>
  )
}

export default Home
