import { useMemo } from 'react';
import { useRouter } from 'next/router'
import 'swiper/css';
import { v4 as uuidv4 } from 'uuid';

import Image from 'next/image'
import Link from 'next/link'
import { HiOutlineArrowUturnRight } from 'react-icons/hi2';
import { AiFillHeart } from 'react-icons/ai';
import { RiMapPinLine } from 'react-icons/ri';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Button, buttonVariants } from '@/components/ui/Button'
import { Typography } from '@/components/ui/Typography';
import Chip from '@/components/ui/Chip';
import BottomNav from '@/components/BottomNav';

const reasons = [
    {
        imgSrc: '/reason.svg',
        title: 'Digital Brochures and Photos',
        content: 'Collect digital copies of brochures and photos from events you attend!'
    },
    {
        imgSrc: '/reason.svg',
        title: 'Event Discovery',
        content: 'Easily discover upcoming exhibitions and events in your area.'
    },
    {
        imgSrc: '/reason.svg',
        title: 'Ratings and Reviews',
        content: 'Rate and review events you attend, and help other users discover new and interesting events.'
    }
]

const teamMember = [
    {
        profile: '/team/devansh.jpeg',
        name: 'Devansh Tiwari',
        github: 'https://github.com/Devansh-365',
        role: 'Developer'
    },
    {
        profile: '/team/horus.png',
        name: 'Horus',
        github: 'https://github.com/horus2121',
        role: 'Developer'
    },
    {
        profile: '/team/ivy.jpeg',
        name: 'Ivy Chen',
        github: 'https://github.com/ivavay',
        role: 'UI/UX Designer'
    },
    {
        profile: '/team/cassie.jpeg',
        name: 'Cassie',
        github: 'https://github.com/12cassie34',
        role: 'Developer'
    },
    {
        profile: '/team/hazri.png',
        name: 'Hazri',
        github: 'https://github.com/Pixelshot',
        role: 'Developer'
    },
]

export function LandingPage() {
    const router = useRouter()

    const tagsArr = useMemo(() => [
        // TODO: on click => search by tags
        {
            label: 'tags',
            textColor: 'text-[#51A84D]',
            bgColor: 'bg-[#2E4A2D]',
            onClick: () => { }
        },
        {
            label: 'adventure',
            textColor: 'text-[#52B5FF]',
            bgColor: 'bg-[#315D7E]',
            onClick: () => { }
        },
        {
            label: 'informative',
            textColor: 'text-[#E754FF]',
            bgColor: 'bg-[#753382]',
            onClick: () => { }
        }, {
            label: 'fun',
            textColor: 'text-[#AAD150]',
            bgColor: 'bg-[#797C11]',
            onClick: () => { }
        }
    ], []);
    const events = [
        {
            brochure_img: '/event.svg',
            eventName: 'Event Name',
            eventDescription: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...',
            likes: "20k"
        },
        {
            brochure_img: '/event.svg',
            eventName: 'Event Name',
            eventDescription: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...',
            likes: 240
        },
        {
            brochure_img: '/event.svg',
            eventName: 'Event Name',
            eventDescription: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...',
            likes: 25
        },
        {
            brochure_img: '/event.svg',
            eventName: 'Event Name',
            eventDescription: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...',
            likes: 100
        }
    ];

    const handleExploreAll = () => {
        // TODO: explore all events
        return router.push('/auth/signin')
    }

    return (
        <>
            <div className='mb-20'>
                <section className="w-screen px-4 mb-9">
                    <form action="#">
                        <div className="relative">
                            <Image className="absolute top-3.5 left-3.5" src="/search.svg" alt="search" width={35} height={35} />
                            {/* TODO: search */}
                            <input type="text" id="search-event" name="search-event" placeholder="Search here"
                                className="w-full p-4 bg-transparent border-2 pl-14 rounded-3xl" />
                        </div>
                    </form>
                </section>
                <section className='px-5 mb-20 text-center'>
                    <Typography variant="h3" className='font-light leading-tight'>Get Dopamine<br></br> hit from events<br></br> you love</Typography>
                    <Typography variant="h6" className='mt-4 text-center text-gray-400'>Enjoy your fullest, happy to share and save your experience with ease.</Typography>
                    <div className='flex justify-center mt-4'>
                        <Link
                            className={buttonVariants({
                                variant: 'subtle',
                                className: 'rounded-3xl mr-2'
                            })}
                            href="/auth/signin"
                        >
                            Get Started
                        </Link>
                        <Link
                            className={buttonVariants({
                                variant: 'outline',
                                className: 'rounded-3xl ml-2 text-white focus:text-black'
                            })}
                            // TODO: decide where to direct
                            href="#"
                        >
                            Explore
                        </Link>
                    </div>
                    <div className='mt-4'>
                        <div className='flex flex-wrap justify-center gap-2'>
                            {tagsArr.map(({ label, textColor, bgColor, onClick }) => <Chip key={label} label={label} textColor={textColor} bgColor={bgColor} onClick={onClick} />)}
                        </div>
                    </div>
                    <div className='mt-6'>
                        <div className='flex items-center justify-between'>
                            <Typography variant="h6" className='font-bold'>Featured Fun Events</Typography>
                            <Typography variant="link" className='text-[#FD3221] no-underline flex' onClick={handleExploreAll}>
                                <span className='mr-1'>Explore All</span>
                                <span><HiOutlineArrowUturnRight /></span>
                            </Typography>
                        </div>
                        <div className='mt-4 max-w-[88vw] overflow-hidden text-white text-left'>
                            <Swiper
                                spaceBetween={7}
                                slidesPerView={2}
                                onSlideChange={() => console.log('slide change')}
                                onSwiper={(swiper) => console.log(swiper)}
                            >
                                {events.map(({ brochure_img, eventName, eventDescription, likes }, index) => {
                                    return (
                                        <SwiperSlide key={uuidv4()}>
                                            <div className='relative mb-2'>
                                                <Image src={brochure_img} alt={eventName}
                                                    width="0"
                                                    height="0"
                                                    className="w-full h-auto" />
                                                <div className='fixed right-0 flex mr-2 top-2'>
                                                    <AiFillHeart color='#EB3323' />
                                                    <Typography variant="bodytext2" className='ml-1'>{likes}</Typography>
                                                </div>
                                            </div>
                                            <Typography variant="h6" className=''>{eventName}</Typography>
                                            <Typography variant="bodytext2" className=''>{eventDescription}</Typography>
                                        </SwiperSlide>
                                    )
                                })}
                            </Swiper>
                        </div>
                    </div>
                </section>
                <section className='bg-[#E5E5E5] px-4 py-8 w-full'>
                    <Typography variant="h6" className='mb-4 font-bold text-black'>Why us?</Typography>
                    <div>
                        {reasons.map(({ imgSrc, title, content }, index) => {
                            return (
                                <div className='flex gap-6 mb-6' key={uuidv4()}>
                                    <div className='relative flex-[0_0_33%]'>
                                        <Image src={imgSrc} alt={title}
                                            width="0"
                                            height="0"
                                            className="w-full h-auto" />
                                    </div>
                                    <div className='flex flex-col gap-2 text-black'>
                                        <Typography variant="h6" className=''>{title}</Typography>
                                        <Typography variant="bodytext2" className=''>{content}</Typography>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </section>
                <section className='bg-[#18191B] px-4 py-8 w-full'>
                    <Typography variant="h6" className='mb-4 font-bold text-white'>Our team</Typography>
                    <div className='flex flex-wrap justify-between gap-6 text-center'>
                        {teamMember.map(({ profile, name, github, role }, index) => {
                            return (
                                <a href={github} key={uuidv4()} target="_blank" rel="noopener noreferrer" className='block px-4 py-4 flex-[0_0_45%] bg-[#D1D1D1] rounded-lg text-black'>
                                    <div className='relative mb-4'>
                                        <Image src={profile} alt={name}
                                            width="200"
                                            height="200"
                                        />
                                    </div>
                                    <Typography variant="h6" className='mb-4'>{name}</Typography>
                                    <Typography variant="bodytext1" className='flex items-center justify-center mb-4'>
                                        <span className='mr-1'><RiMapPinLine /></span>
                                        <span>{role}</span>
                                    </Typography>
                                </a>
                            )
                        })}
                    </div>
                </section>
            </div>
            <BottomNav />
        </>
    )
}