import { buttonVariants } from '@/components/ui/Button'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const PageNotFound = () => {
  return (
    <div className="flex text-center space-y-8 md:space-y-16 min-h-screen flex-col bg-[url('/noise.png')] items-center justify-center py-2 bg-[#18191b] text-white">
      <header className="space-y-4">
        <h1 className="text-5xl md:text-7xl font-extrabold">Oops!</h1>
        <h5 className="text--xl md:text-2xl font-medium">You are lost</h5>
      </header>
      <Image src="/globe.svg" width={350} height={350} alt="" />
      <footer>
        <Link
          href="/"
          className={buttonVariants({
            variant: 'link',
            className: 'text-white underline text-xl',
          })}
        >
          <Image src="/arrow.svg" alt="arrow" width={35} height={35} />
          <span className="px-1">Go Home</span>
        </Link>
      </footer>
    </div>
  )
}

export default PageNotFound
