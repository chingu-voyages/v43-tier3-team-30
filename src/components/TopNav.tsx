import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { AiOutlineHome, AiOutlinePlus, AiOutlineUser } from 'react-icons/ai'
import Container from './Container'
import Image from 'next/image'
import { Button, buttonVariants } from './ui/Button'
import Input from './ui/Input'
import { signOut, useSession } from 'next-auth/react'
import { ThemeToggle } from './ThemeToggle'

type Props = {}

const navList = [
  {
    link: '/',
    text: 'Home',
    icon: <AiOutlineHome size={24} />,
  },
  {
    link: '/addevent',
    text: 'Add Event',
    icon: <AiOutlinePlus size={24} />,
  },
  {
    link: '/auth/signup',
    text: 'Account',
    icon: <AiOutlineUser size={24} />,
  },
]

const TopNav = (props: Props) => {
  const router = useRouter()

  const checkCurrentRoute = (route: string) => {
    return router.asPath === route || router.asPath.split('/')[1] === route
  }

  const { data: session, status } = useSession()

  console.log('gg', status)

  return (
    <>
      <nav className="hidden fixed mx-auto max-w-[1120px] px-3 md:flex items-center justify-center left-0 right-0 top-0 z-[10] py-4 backdrop-blur-2xl shadow-xl transition-all duration-500">
        <ul className="flex w-full justify-between items-center">
          <Link href="/" className="flex items-center space-x-1">
            <Image alt="" src="/logo2.png" width={36} height={36} />
            <span className=" font-extrabold text-xl">name</span>
          </Link>
          {/* <li>
            <Input className="rounded-2xl" placeholder="Search here" />
          </li> */}
          <li className="space-x-6">
            <ThemeToggle />
            {status === 'authenticated' ? (
              <Button onClick={() => signOut()} className="">
                Sign Out
              </Button>
            ) : (
              <div className="space-x-3">
                <Button className="">Sign In</Button>
                <Button
                  className={buttonVariants({
                    variant: 'outline',
                    className: '',
                  })}
                >
                  Sign Up
                </Button>
              </div>
            )}
          </li>
        </ul>
      </nav>
    </>
  )
}

export default TopNav
