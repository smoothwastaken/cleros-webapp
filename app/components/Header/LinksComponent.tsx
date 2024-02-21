import React from 'react'
import Link from 'next/link'

function Links() {
  return (
    <ul className='rounded-xl select-none text-sm hidden sm:flex'>
        <Link href={"/"}><li className='px-2 py-1 rounded-md text-gray-400 hover:text-gray-200 bg-white bg-opacity-0 hover:bg-opacity-5 transition-all duration-300 cursor-pointer'>Accueil</li></Link>
        <Link href={"/films/"}><li className='px-2 py-1 rounded-md text-gray-400 hover:text-gray-200 bg-white bg-opacity-0 hover:bg-opacity-5 transition-all duration-300 cursor-pointer'>Films</li></Link>
        <Link href={"/series/"}><li className='px-2 py-1 rounded-md text-gray-400 hover:text-gray-200 bg-white bg-opacity-0 hover:bg-opacity-5 transition-all duration-300 cursor-pointer'>Séries</li></Link>
        <Link href={"/animes/"}><li className='px-2 py-1 rounded-md text-gray-400 hover:text-gray-200 bg-white bg-opacity-0 hover:bg-opacity-5 transition-all duration-300 cursor-pointer'>Animes</li></Link>
        <Link href={"/documentaires/"}><li className='px-2 py-1 rounded-md text-gray-400 hover:text-gray-200 bg-white bg-opacity-0 hover:bg-opacity-5 transition-all duration-300 cursor-pointer'>Documentaires</li></Link>
        <Link href={"/spectacles/"}><li className='px-2 py-1 rounded-md text-gray-400 hover:text-gray-200 bg-white bg-opacity-0 hover:bg-opacity-5 transition-all duration-300 cursor-pointer'>Spectacles</li></Link>
    </ul>
  )
}

export default Links