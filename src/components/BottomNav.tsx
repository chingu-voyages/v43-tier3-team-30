import Link, { LinkProps } from 'next/link'
import { useRouter } from 'next/router'
import React, { FC } from 'react'
import { AiOutlineHome, AiOutlinePlus, AiOutlineUser } from 'react-icons/ai'

interface NavTabProps {
  tabs?: {
    name: string
    href?: any
    tabName?: string
    icon?: JSX.Element
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

  const checkCurrentRoute = (route: string) => {
    return router.asPath === route || router.asPath.split('/')[1] === route
  }

  return (
    <nav
      className="fixed bottom-0 z-40 w-full h-16 bg-gray-300 dark:bg-[#16181A] border-t-[0.25px] border-gray-600 dark:border-gray-400 md:hidden"
      {...props}
    >
      <div className="grid grid-cols-3 items-center h-full max-w-[250px] sm:max-w-[350px] mx-auto">
        {tabs.map((nav) => (
          <Link
            key={nav.tabName}
            href={nav.href}
            className={`flex flex-col items-center px-3 transition duration-500 hover:scale-110" mr-1
            ${checkCurrentRoute(nav.href)
                ? ''
                : 'text-gray-800 dark:text-gray-500 text-opacity-50'
              }`}
          >
            {nav.icon}
            {/* <span className="mt-1 text-xs dark:text-gray-500">Home</span> */}
          </Link>
        ))}
      </div>
    </nav>
  )
}

export default BottomNav
