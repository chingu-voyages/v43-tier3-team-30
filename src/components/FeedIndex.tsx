import { AiOutlineHeart, AiOutlineSmile } from 'react-icons/ai'
import { MdFlipCameraAndroid } from 'react-icons/md'

import useEvents from '@/hooks/useEvents';
import { useSession } from 'next-auth/react';
import { Event } from '@/lib/schema';

import BottomNav from '@/components/BottomNav';
import EventCard from '@/components/EventCard';

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

export function FeedIndex() {
    const { data: session } = useSession()
    const { data: events } = useEvents(session?.user.id);

    return (
        <>
            <div className='w-full px-4'>
                {
                    events && events.map(({ id, brochure_img, favorite, notes, title }: Event) => {
                        return <EventCard key={id} eventId={id} eventName={title} eventDescription={notes?.join('')} thumbnail={brochure_img} isFavorite={Boolean(favorite)} />
                    })
                }
            </div>
            <BottomNav tabs={navList} />
        </>
    )
}