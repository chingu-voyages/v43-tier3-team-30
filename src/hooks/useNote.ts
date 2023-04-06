import useSWR from 'swr'

import fetcher from '@/lib/fetcher'

const useNote = (eventId?: string, noteId?: string) => {
  const url = `/api/events/${eventId}/notes/${noteId}`
  const { data, error, isLoading, mutate } = useSWR(url, fetcher)

  return {
    data,
    error,
    isLoading,
    mutate,
  }
}

export default useNote
