"use client"
import { AuthContext } from '@/context/AuthContext';
import Image from 'next/image'
import Link from 'next/link';
import React, { useContext } from 'react'

const Header = () => {
    const { user } = useContext(AuthContext);
  return (
      <header className="w-full realtive border-b border-gray-200">
          <div className="max-w-7xl flex justify-between items-center mx-auto px-4 py-4">
              {/* left-side */}
              <div>
                  <Link href="/" className="md:text-2xl  bg-clip-text text-transparent font-bold bg-gradient-to-r from bg-blue-200 to-blue-500">AI~Assist</Link>
              </div>
              {/* right-side */}
              <div>
                  {user?.picture &&
                      <Image src={user?.picture} alt="logo" width={30} height={30} className="cursor-pointer rounded-full" />}
                  </div>
        </div>
    </header>
  )
}

export default Header
