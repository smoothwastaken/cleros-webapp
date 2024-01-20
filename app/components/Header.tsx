import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Links from './Header/LinksComponent'
import Logo from './Header/LogoComponent'
import SearchBar from './Header/SearchBarComponent'
import Auth from './Header/AuthComponent'

function Header() {
  return (
    <div className="grid grid-cols-2 justify-between">
      {/* Left Part */}
      <div className='flex items-center gap-5 justify-start'>
        <Logo />
        <Links />
      </div>
      
      {/* Right Part */}
      <div className='flex items-center gap-5 justify-end'>
        <SearchBar />
        {/* Vertical Divider */}
        <div className="divider border-gray-700 border-[0.5px] h-8"></div>
        <Auth />
      </div>
    </div>
  )
}

export default Header