import axios from 'axios'
import { useCallback, useMemo } from 'react'

import useCurrentUser from './useCurrentUser'
import useEvent from './useEvent'
import useEvents from './useEvents'
import { useToast } from './useToast'
import { useRouter } from 'next/router'

const useLike = ({ eventId, userId }: { eventId: string; userId?: string }) => {
  const { data: currentUser } = useCurrentUser()
  const {data: fetchedEvent, mutate: mutateFetchedEvent} = useEvent(eventId)
  const { mutate: mutateFetchedEvents } = useEvents(userId)

  const { toast } = useToast()
  const router = useRouter()

  const hasLiked = useMemo(() => {
    const list = fetchedEvent?.likedIds || []

    return list.includes(currentUser?.id)
  }, [fetchedEvent, currentUser])

  const toggleLike = useCallback(async () => {
    if (!currentUser) {
      return router.push('/signup')
    }

    try {
      let request

      if (hasLiked) {
        request = () => axios.delete('/api/like', { data: { eventId } })
      } else {
        request = () => axios.post('/api/like', { eventId })
      }

      await request()
      mutateFetchedEvent()
      mutateFetchedEvents()

      toast({
        variant: 'success',
        description: 'Event Liked',
      })
    } catch (error) {
      toast({
        variant: 'destructive',
        description: 'Something went wrong',
      })
    }
  }, [currentUser, hasLiked, eventId, mutateFetchedEvents, mutateFetchedEvent])

  return {
    hasLiked,
    toggleLike,
  }
}

export default useLike
