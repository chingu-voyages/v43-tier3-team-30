import useSWR from 'swr'

import fetcher from '@/lib/fetcher'

const useEvent = (eventId: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    eventId ? `/api/events/${eventId}` : null,
    fetcher,
  )

  return {
    data,
    error,
    isLoading,
    mutate,
  }
}

export default useEvent
