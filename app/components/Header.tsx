import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Links from './Header/LinksComponent'
import Logo from './Header/LogoComponent'
import SearchBar from './Header/SearchBarComponent'
import Auth from './Header/AuthComponent'

function Header() {
  return (
    <div className="flex items-center sm:grid sm:grid-cols-2 sm:justify-between">
      {/* Left Part */}
      <div className='flex items-center gap-5 justify-start w-fit sm:full'>
        <Logo />
        <Links />
      </div>
      
      {/* Right Part */}
      <div className='flex items-center gap-3 sm:gap-5 justify-end'>
        <SearchBar />
        {/* Vertical Divider */}
        <div className="divider border-gray-700 border-[0.5px] h-8"></div>
        <Auth />
      </div>
    </div>
  )
}

export default Header