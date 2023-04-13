import Link, { LinkProps } from 'next/link'
import { useRouter } from 'next/router'
import React, { FC, ReactNode } from 'react'
import { IconType } from 'react-icons'
import { AiOutlineHome, AiOutlinePlus, AiOutlineUser } from 'react-icons/ai'
import { Button, buttonVariants } from './ui/Button'
import { EventModal } from './EventModal'
import { useSession } from 'next-auth/react'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import useCurrentUser from '@/hooks/useCurrentUser'

interface NavTabProps {
  tabs: {
    href?: any
    tabName?: string
    icon?: ReactNode
    className?: string
  }[]
  linkProps?: Omit<LinkProps, 'href'>
}

const navList = [
  {
    href: '/',
    tabName: 'Home',
    icon: <AiOutlineHome size={24} />,
  },
  {
    href: '/addevent',
    tabName: 'Add Event',
    icon: <AiOutlinePlus size={24} />,
  },
  {
    href: '/auth/signup',
    tabName: 'Account',
    icon: <AiOutlineUser size={24} />,
  },
]

const BottomNav: FC<NavTabProps> = ({
  tabs = navList,
  linkProps,
  ...props
}) => {
  const router = useRouter()
  const { data: session, status } = useSession()
  const { data: currentUser } = useCurrentUser()

  console.log(currentUser)

  const checkCurrentRoute = (route: string) => {
    return router.asPath === route || router.asPath.split('/')[1] === route
  }

  return (
    <nav
      className="fixed bottom-0 z-40 w-full h-16 bg-gray-300 dark:bg-[#16181A] border-t-[0.25px] border-gray-600 dark:border-gray-400 md:hidden"
      {...props}
    >
      <div className="grid gap-3 grid-cols-3 items-center h-full max-w-[250px] sm:max-w-[350px] mx-auto">
        {tabs.map((nav) => {
          return (
            <>
              {nav.tabName != 'Add Event' ? (
                <Link
                  key={nav.tabName}
                  href={nav.href}
                  className={`flex flex-col items-center px-3 transition duration-500 hover:scale-110" mr-1
              ${
                checkCurrentRoute(nav.href)
                  ? ''
                  : 'text-gray-800 dark:text-gray-500 text-opacity-50'
              }`}
                >
                  {nav.icon}
                  {/* <span className="mt-1 text-xs dark:text-gray-500">Home</span> */}
                </Link>
              ) : (
                <EventModal>
                  <span
                    className={`flex flex-col items-center px-3 transition duration-500 hover:scale-110" mr-1 ${
                      checkCurrentRoute(nav.href)
                        ? ''
                        : 'text-gray-800 dark:text-gray-500 text-opacity-50'
                    }`}
                  >
                    {nav.icon}
                  </span>
                </EventModal>
              )}
            </>
          )
        })}
        {status === 'authenticated' ? (
          <Avatar className='w-6 h-6 rounded-2xl mx-auto'>
            <AvatarImage src={currentUser.image} alt={currentUser.name} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        ) : (
          <Button
            className={buttonVariants({
              size: 'sm',
              className: 'rounded-xl',
            })}
          >
            Sign In
          </Button>
        )}
      </div>
    </nav>
  )
}

export default BottomNav
