import useSWR from 'swr'

import fetcher from '@/lib/fetcher'

const useEvents = (userId?: string) => {
  const url = userId ? `/api/events?userId=${userId}` : '/api/events'
  const { data, error, isLoading, mutate } = useSWR(url, fetcher)

  return {
    data,
    error,
    isLoading,
    mutate,
  }
}

export default useEvents
