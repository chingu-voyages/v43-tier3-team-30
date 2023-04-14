import { AiOutlineHeart, AiOutlineSmile } from 'react-icons/ai'
import { MdFlipCameraAndroid } from 'react-icons/md'

import useEvents from '@/hooks/useEvents'
import { useSession } from 'next-auth/react'

import { Event } from '@/lib/schema'

import BottomNav from '@/components/BottomNav'
import EventCard from '@/components/EventCard'
import { EventModal } from './EventModal'

const navList = [
  {
    name: 'Favorite',
    href: '/',
    tabName: 'Favorite',
    icon: <AiOutlineHeart size={24} />,
  },
  {
    name: 'Capture',
    href: '/capture',
    tabName: 'Capture',
    icon: <MdFlipCameraAndroid size={24} />,
  },
  {
    name: 'Profile',
    href: '/profile',
    tabName: 'Profile',
    icon: <AiOutlineSmile size={24} />,
  },
]
interface FeedIndexProps {
  userId?: string
}

const FeedIndex: React.FC<FeedIndexProps> = ({ userId }) => {

  const { data: session } = useSession()
  const { data: events } = useEvents(session?.user.id)

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
