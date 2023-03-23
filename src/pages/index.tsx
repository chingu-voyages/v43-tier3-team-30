import useCurrentUser from '@/hooks/useCurrentUser'
import type { NextPage } from 'next'
import { signOut, useSession } from 'next-auth/react'

const Home: NextPage = () => {
  const { data: session, status } = useSession()
  const { data: currentUser } = useCurrentUser()

  console.log("current : " , currentUser)

  console.log(status === 'authenticated' && session.user)

  if (status === 'authenticated') {
    return (
      <>
        <p>Signed in as {session.user.email}</p>
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }

  return <a href="/auth/signin">Sign in</a>
}

export default Home
