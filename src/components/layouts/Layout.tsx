import React from 'react'
import TopNav from '../TopNav'
import BottomNav from '../BottomNav'
import { SEO, SEOProps } from './Seo'
import { AiOutlineHome, AiOutlinePlus, AiOutlinePlusSquare, AiOutlineUser } from 'react-icons/ai'

type LayoutProps = {
  children: React.ReactNode
  seo: SEOProps
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
    icon: <AiOutlinePlusSquare size={24} />,
  },
]

const Layout: React.FC<LayoutProps> = ({ children, seo }: any) => {
  return (
    <>
      <SEO {...seo} />
      <TopNav />
      <BottomNav tabs={navList} />
      {children}
    </>
  )
}

export default Layout
