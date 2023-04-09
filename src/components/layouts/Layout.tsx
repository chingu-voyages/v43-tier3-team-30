import React from 'react'
import TopNav from '../TopNav'
import BottomNav from '../BottomNav'
import { SEO, SEOProps } from './Seo'

type LayoutProps = {
  children: React.ReactNode
  seo: SEOProps
}

const Layout: React.FC<LayoutProps> = ({ children, seo }: any) => {
  return (
    <>
      <SEO {...seo} />
      <TopNav />
      {children}
    </>
  )
}

export default Layout