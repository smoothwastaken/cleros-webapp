import Link from 'next/link'
import React from 'react'

function Logo() {
  return (
    <>
    {/* <Image src={""} alt="clErOS's logo" /> */}
    <Link href={"/"}><h1 className='select-none text-white'>clErOS</h1></Link>
    </>
  )
}

export default Logo