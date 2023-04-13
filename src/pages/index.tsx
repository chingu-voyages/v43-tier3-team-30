import { EventModal } from '@/components/EventModal'
import FeedIndex from '@/components/FeedIndex'
import TopNav from '@/components/TopNav'
import Layout from '@/components/layouts/Layout'
import { Button, buttonVariants } from '@/components/ui/Button'
import useCurrentUser from '@/hooks/useCurrentUser'
import { useToast } from '@/hooks/useToast'
import axios from 'axios'
import type { NextPage } from 'next'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { ReactElement, useCallback, useState } from 'react'
import { NextPageWithLayout } from './_app'
import ImageUpload from '@/components/ui/ImageUpload'

const Home: NextPageWithLayout = () => {
  const { data: session, status } = useSession()
  const { data: currentUser } = useCurrentUser()

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [img, setImg] = useState<string>('')

  const { toast } = useToast()

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2 bg-[#18191b] text-white">
      <EventModal />
      <ImageUpload value={img} onChange={(e) => setImg(e)} />
      {currentUser && <FeedIndex userId={currentUser.id} />}
    </div>
  )
}

export default Home

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout
      seo={{
        title: 'EventVerse',
        meta: {
          description: 'The event-recording application that you deserve',
        },
      }}
    >
      {page}
    </Layout>
  )
}
