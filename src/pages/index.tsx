import { EventModal } from '@/components/EventModal'
import TopNav from '@/components/TopNav'
import { Button, buttonVariants } from '@/components/ui/Button'
import useCurrentUser from '@/hooks/useCurrentUser'
import useEvents from '@/hooks/useEvents'
import { useToast } from '@/hooks/useToast'
import axios from 'axios'
import type { NextPage } from 'next'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useCallback, useState } from 'react'

const Home: NextPage = () => {
  const { data: session, status } = useSession()
  const { data: currentUser } = useCurrentUser()

  const { data: events = [] } = useEvents()

  console.log('events :::: ', events)

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [name, setName] = useState<string>(currentUser?.name)

  const { toast } = useToast()

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true)

      await axios.patch('/api/edituser', {
        name,
      })

      toast({
        variant: 'success',
        description: 'Name updated',
      })
    } catch (error) {
      toast({
        variant: 'destructive',
        description: 'Something went wrong',
      })
    } finally {
      setIsLoading(false)
    }
  }, [name])

  if (status === 'authenticated') {
    return (
      <div className="flex text-center space-y-4 min-h-screen flex-col bg-[url('/noise.png')] items-center justify-center py-2 dark:bg-[#18191b] dark:text-white">
        <TopNav />
        <EventModal />
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
