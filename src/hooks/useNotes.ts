import useSWR from 'swr'

import fetcher from '@/lib/fetcher'

const useNotes = (eventId?: string) => {
  const url = `/api/events/${eventId}/notes`
  const { data, error, isLoading, mutate } = useSWR(url, fetcher)

  return {
    data,
    error,
    isLoading,
    mutate,
  }
}

export default useNotes
