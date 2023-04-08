
import { FC } from 'react'

import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import Image from 'next/image'

import { Typography } from './ui/Typography';

interface EventCardProps {
    thumbnail?: string,
    eventName: string,
    eventDescription?: string,
    isFavorite: boolean
}

const EventCard: FC<EventCardProps> = ({
    thumbnail,
    eventName,
    eventDescription,
    isFavorite
}) => {

    return (
        <div className='flex p-2 mb-4 bg-white border rounded shadow-md border-slate-100'>
            <Image src={thumbnail || '/thumbnail-placeholder.svg'} width={92} height={92} alt={eventName} />
            <div className='ml-4 text-left'>
                <Typography variant="subhead2" children={eventName} />
                <Typography variant="bodytext1" children={eventDescription} />
            </div>
            <div>
                {isFavorite ? <AiFillHeart /> : <AiOutlineHeart />}
            </div>
        </div>
    )
}

export default EventCard;