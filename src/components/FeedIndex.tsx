import { signOut, useSession } from 'next-auth/react'

import { AiOutlineHeart } from 'react-icons/ai'
import { FaSignOutAlt } from 'react-icons/fa'
import { MdFlipCameraAndroid } from 'react-icons/md'

import useEvents from '@/hooks/useEvents'

import { Event } from '@/lib/schema'

import BottomNav from '@/components/BottomNav'
import EventCard from '@/components/EventCard'
import { EventModal } from './EventModal'

interface FeedIndexProps {
  userId?: string
}

const FeedIndex: React.FC<FeedIndexProps> = ({ userId }) => {
  const { data: session } = useSession()
  const { data: events } = useEvents(session?.user.id)

  const navList = [
    {
      name: 'Favorite',
      href: '/',
      tabName: 'Favorite',
      icon: <AiOutlineHeart size={24} color='#384DFF' />,
    },
    {
      name: 'Capture',
      href: '/capture',
      tabName: 'Capture',
      icon: <MdFlipCameraAndroid size={24} color='#384DFF' />,
    },
    {
      name: 'SignOut',
      href: '/',
      tabName: 'SignOut',
      icon: <FaSignOutAlt onClick={() => signOut()} size={24} color='#384DFF' />,
    },
  ]

  return (
    <>
      <EventModal />
      <div className="w-full px-4 pb-24">
        {events &&
          events.map(({ id, brochure_img, favorite, title }: Event) => {
            return (
              <EventCard
                key={id}
                userId={userId}
                eventId={id}
                eventName={title}
                thumbnail={brochure_img}
                isFavorite={Boolean(favorite)}
              />
            )
          })}
      </div>
      <BottomNav tabs={navList} />
    </>
  )
}

export default FeedIndex
