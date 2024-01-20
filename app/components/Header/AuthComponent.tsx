"use client";

import React, { useContext } from 'react'
import { AuthContext } from '../../contexts/authContext';

function Auth() {
  const { user } = useContext(AuthContext) ?? { user: null };
  return (
    <div className='flex items-center gap-2'>
      { user ? (
          <div></div>
        ) : (
          <>
            <div className='p-1 px-2 cursor-pointer text-gray-400 border-gray-700 bg-white bg-opacity-0 border-[1px] rounded-xl select-none text-sm hover:bg-opacity-5 hover:text-gray-200 transition-all duration-300'>Connexion</div>
            <div  className='p-1 px-2 cursor-pointer text-black border-gray-300 bg-white bg-opacity-100 border-[1px] rounded-xl select-none text-sm hover:bg-opacity-75 transition-all duration-300'>Inscription</div>
          </>
        )
      }
    </div>
  )
}

export default Auth