"use client";

import React, { useContext, useState } from 'react'
import { AuthContext } from '@/app/contexts/authContext';
import auth from '@/app/lib/firebase';
import Link from 'next/link';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { set } from 'firebase/database';

function Auth() {
  const { user } = useContext(AuthContext) ?? { user: null };

  const [logPopUp, setLogPopUp] = useState(false);
  const [logEmail, setLogEmail] = useState('');
  const [logPassword, setLogPassword] = useState('');
  const [logSaveCreds, setLogSaveCreds] = useState(false);

  const [registerPopUp, setRegisterPopUp] = useState(false);
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regSaveCreds, setRegSaveCreds] = useState(false);

  return (
    <div>
      { user ? (
        <div className='flex items-center gap-2 transition-all duration-500'>
          <div onClick={() => {signOut(auth)}} className='p-1 px-2 cursor-pointer text-black border-gray-300 bg-white bg-opacity-100 border-[1px] rounded-xl select-none text-sm hover:bg-opacity-75 transition-all duration-300'>Déconnexion</div>
        </div>
        ) : (
          <>
          <div className='flex items-center gap-2 transition-all duration-500'>
            <div onClick={() => {setLogPopUp(true)}} className='p-1 px-2 cursor-pointer text-gray-400 border-gray-700 bg-white bg-opacity-0 border-[1px] rounded-xl select-none text-sm hover:bg-opacity-5 hover:text-gray-200 transition-all duration-300'>Connexion</div>
            <div onClick={() => {setRegisterPopUp(true)}} className='p-1 px-2 cursor-pointer text-black border-gray-300 bg-white bg-opacity-100 border-[1px] rounded-xl select-none text-sm hover:bg-opacity-75 transition-all duration-300'>Inscription</div>
          </div>
          {logPopUp ? (
            <div className='absolute z-10 w-full h-full bg-black bg-opacity-40 inset-0 bg-clip-padding' style={{backdropFilter: 'blur(2px)'}}>
              <div className='absolute z-20 w-3/6 h-3/6 bg-transparent inset-1/4 rounded-xl border-gray-700 border-[1px] p-5'>
                <div className='flex items-center justify-between'>
                  <h1 className='text-xl select-none text-gray-200'>Connexion</h1>
                  <div onClick={() => {setLogPopUp(false)}} className='cursor-pointer text-gray-200 hover:text-white transition-all duration-300'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM8.28 7.22a.75.75 0 0 0-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 1 0 1.06 1.06L10 11.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L11.06 10l1.72-1.72a.75.75 0 0 0-1.06-1.06L10 8.94 8.28 7.22Z" clipRule="evenodd" /></svg></div>
                </div>
                <div className='flex flex-col gap-2 mt-5 px-5'>
                  <input onChange={(event) => {
                    setLogEmail(event.currentTarget.value)
                  }} value={logEmail} className='p-2 border-gray-700 text-gray-200 bg-white bg-opacity-0 border-[1px] rounded-xl outline-none focus:bg-opacity-5 hover:bg-opacity-5 transition-all duration-300' type="email" placeholder="Email" />
                  <input onChange={(event) => {
                    setLogPassword(event.currentTarget.value)
                  }} value={logPassword} className='p-2 border-gray-700 text-gray-200 bg-white bg-opacity-0 border-[1px] rounded-xl outline-none focus:bg-opacity-5 hover:bg-opacity-5 transition-all duration-300' type="password" placeholder="Mot de passe" />
                  <div className='flex items-center justify-between mb-4'>
                    <div className='flex items-center gap-2'>
                      <div className="flex items-center">
                        <input onChange={() => {
                          setLogSaveCreds(!logSaveCreds)
                        }} id="custom-checkbox" type="checkbox" className="hidden peer" />
                        <label htmlFor="custom-checkbox" className="cursor-pointer p-[0.5px] bg-gray-200 border-2 border-gray-300 rounded-md peer-checked:bg-gray-600 peer-checked:border-gray-600">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-gray-200">
                            <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
                          </svg>
                        </label>
                        <label htmlFor="custom-checkbox" className="ms-2 text-gray-400 select-none">Se souvenir de moi</label>
                      </div>
                    </div>
                    <p className='text-gray-400 select-none hover:text-gray-200 transition-all duration-300 cursor-pointer'>Mot de passe oublié ?</p>
                  </div>
                  <button onClick={() => {
                    signInWithEmailAndPassword(auth, logEmail, logPassword)
                    setLogEmail('')
                    setLogPassword('')
                    setLogPopUp(false)
                  }} className='p-2 select-none border-gray-700 text-gray-200 bg-white bg-opacity-0 border-[1px] rounded-xl outline-none focus:bg-opacity-5 hover:bg-opacity-5 transition-all duration-300'>Connexion</button>
                </div>
              </div>
            </div>
          ) : (<></>)}
          {registerPopUp ? (
            <div className='absolute z-10 w-full h-full bg-black bg-opacity-40 inset-0 bg-clip-padding' style={{backdropFilter: 'blur(2px)'}}>
              <div className='absolute z-20 w-3/6 h-3/6 bg-transparent inset-1/4 rounded-xl border-gray-700 border-[1px] p-5'>
                <div className='flex items-center justify-between'>
                  <h1 className='text-xl select-none text-gray-200'>Inscription</h1>
                  <div onClick={() => {setRegisterPopUp(false)}} className='cursor-pointer text-gray-200 hover:text-white transition-all duration-300'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM8.28 7.22a.75.75 0 0 0-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 1 0 1.06 1.06L10 11.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L11.06 10l1.72-1.72a.75.75 0 0 0-1.06-1.06L10 8.94 8.28 7.22Z" clipRule="evenodd" /></svg></div>
                </div>
                <div className='flex flex-col gap-2 mt-5 px-5'>
                  <input onChange={(event) => {
                    setRegEmail(event.currentTarget.value)
                  }} value={regEmail} className='p-2 border-gray-700 text-gray-200 bg-white bg-opacity-0 border-[1px] rounded-xl outline-none focus:bg-opacity-5 hover:bg-opacity-5 transition-all duration-300' type="email" placeholder="Email" />
                  <input onChange={(event) => {
                    setRegPassword(event.currentTarget.value)
                  }} value={regPassword} className='p-2 border-gray-700 text-gray-200 bg-white bg-opacity-0 border-[1px] rounded-xl outline-none focus:bg-opacity-5 hover:bg-opacity-5 transition-all duration-300' type="password" placeholder="Mot de passe" />
                  <div className='flex items-center justify-between mb-4'></div>
                  <button onClick={() => {
                    createUserWithEmailAndPassword(auth, regEmail, regPassword)
                    setRegEmail('')
                    setRegPassword('')
                    setRegisterPopUp(false)
                  }} className='p-2 select-none border-gray-700 text-gray-200 bg-white bg-opacity-0 border-[1px] rounded-xl outline-none focus:bg-opacity-5 hover:bg-opacity-5 transition-all duration-300'>Inscription</button>
                </div>
              </div>
            </div>
          ) : (<></>)}
          </>
        )
      }
    </div>
  )
}

export default Auth