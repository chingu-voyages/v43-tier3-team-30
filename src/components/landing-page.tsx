import Image from 'next/image'
import Link from 'next/link'

import { Button, buttonVariants } from './ui/Button'

export function LandingPage() {

    return (
        <>
            <section className="w-screen px-4 mb-9">
                <form action="#">
                    <div className="relative">
                        <Image className="absolute top-3.5 left-3.5" src="/search.svg" alt="search" width={35} height={35} />
                        <input type="text" id="search-event" name="search-event" placeholder="Search here"
                            className="w-full p-4 bg-transparent border-2 pl-14 rounded-3xl" />
                    </div>
                </form>
            </section>
            <section className='px-4'>
                <h1 className='text-4xl font-light leading-tight text-center'>Get Dopamine<br></br> hit from events<br></br> you love</h1>
                <h4 className='mt-4 text-center text-gray-400'>Enjoy your fullest, happy to share and save your experience with ease.</h4>
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
                            className: 'rounded-3xl ml-2 focus:text-black'
                        })}
                        // TODO: decide where to direct
                        href="#"
                    >
                        Explore
                    </Link>
                </div>
                <div className='mt-4'>
                    <div className='relative'>
                        <div className='drop-shadow-[0_0px_12px_rgba(167,243,208,1)]'>

                        </div>
                        <Button className={buttonVariants({
                            variant: 'outline',
                            size: 'xs',
                            className: 'bg-emerald-200 border-none text-green-600 py-2 px-4 backdrop-blur-sm rounded-full focus:bg-transparent focus:border-none',
                        })}>tags</Button>
                    </div>


                </div>
            </section>
        </>
    )
}