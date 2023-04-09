import { FC } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router';

import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import Image from 'next/image'

import useEvents from '@/hooks/useEvents';
import { useToast } from '@/hooks/useToast'

import { Typography } from './ui/Typography';

interface EventCardProps {
    eventId: string,
    thumbnail?: string,
    eventName: string,
    eventDescription?: string,
    isFavorite: boolean
}

const EventCard: FC<EventCardProps> = ({
    eventId,
    thumbnail,
    eventName,
    eventDescription,
    isFavorite
}) => {
    const { mutate: mutateEvents } = useEvents()
    const { toast } = useToast()
    const router = useRouter();

    const toggleFavorite = async () => {
        try {

            await axios.patch(`/api/events/${eventId}`, {
                title: eventName,
                brochure_img: thumbnail,
                favorite: !isFavorite
            })

            toast({
                variant: 'success',
                description: !isFavorite ? 'Set the event to the favorite list' : 'Remove the event from the favorite list.',
            })

            mutateEvents()
            window.location.reload()
        } catch (error) {
            toast({
                variant: 'destructive',
                description: 'Something went wrong',
            })
        } finally {
            window.location.reload()
        }
    }

    const navigateToEventPage = () => {
        router.push(`/events/${eventId}`)
    }

    return (
        <div onClick={navigateToEventPage} className='flex p-2 mb-4 bg-white border rounded shadow-md border-slate-100'>
            <div className='rounded'>
                <Image src={thumbnail || '/thumbnail-placeholder.svg'} width={92} height={92} alt={eventName} />
            </div>
            <div className='w-7/12 ml-4 text-left'>
                <Typography variant="subhead2" children={eventName} />
                <Typography variant="bodytext1" children={eventDescription} />
            </div>
            <div onClick={toggleFavorite}>
                {isFavorite ? <AiFillHeart /> : <AiOutlineHeart />}
            </div>
        </div>
    )
}

export default EventCard;