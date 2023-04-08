import { AiOutlineHeart, AiOutlineSmile } from 'react-icons/ai'
import { MdFlipCameraAndroid } from 'react-icons/md'

import BottomNav from '@/components/BottomNav';

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
            <h1>hello</h1>
            <BottomNav tabs={navList} />
        </>
    )
}