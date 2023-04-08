import { AiOutlineHeart, AiOutlineSmile } from 'react-icons/ai'
import { MdFlipCameraAndroid } from 'react-icons/md'

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

    return (
        <>
            <div className='px-4'>
                <EventCard eventName="Event Name" eventDescription="A week of cool lights/lantern exhibits in Taipei" isFavorite />
            </div>
            <BottomNav tabs={navList} />
        </>
    )
}