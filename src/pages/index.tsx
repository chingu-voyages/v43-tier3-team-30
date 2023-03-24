import { Button, buttonVariants } from '@/components/Button'
import useCurrentUser from '@/hooks/useCurrentUser'
import type { NextPage } from 'next'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'

const Home: NextPage = () => {
  const { data: session, status } = useSession()
  const { data: currentUser } = useCurrentUser()

  console.log("current : " , currentUser)

  console.log(status === 'authenticated' && session.user)

  if (status === 'authenticated') {
    return (
      <div className="flex min-h-screen flex-col bg-[url('/noise.png')] items-center justify-center py-2 bg-[#18191b] text-white">
        {currentUser?.image != null && <Image src={currentUser?.image} width={10} height={10} alt="" /> }
        <p>Signed in as {currentUser?.email} & {currentUser?.name}</p>
        <Button className='my-2' onClick={() => signOut()}>Sign out</Button>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-[url('/noise.png')] items-center justify-center py-2 bg-[#18191b] text-white">
      <Link
        className={buttonVariants({
          variant: 'default',
        })}
        href="/auth/signin"
      >
        Sign in
      </Link>
    </div>
  )
}

export default Home
