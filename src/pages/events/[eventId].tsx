import useEvent from '@/hooks/useEvent'
import { useRouter } from 'next/router'
import React from 'react'

const ViewEvent = () => {
  const router = useRouter()
  const { eventId } = router.query

  console.log(eventId)

  const { data: fetchedPost, isLoading } = useEvent(eventId as string)
  console.log(fetchedPost)
  return (
    <div className="flex text-center space-y-4 min-h-screen flex-col bg-[url('/noise.png')] items-center justify-center py-2 bg-[#18191b] text-white">
      {fetchedPost?.title}
    </div>
  )
}

export default ViewEvent
