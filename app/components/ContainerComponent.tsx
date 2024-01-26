import React, { ReactNode } from 'react'
import Header from './Header'

interface ContainerProps {
    children: ReactNode;
  }

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <main
    // className="max-h-screen overflow-hidden bg-gradient-to-br from-black to-gray-800 bg-clip-padding p-5"
    className="h-screen overflow-hidden bg-gradient-to-br from-black to-gray-800 bg-clip-padding p-5"
    style={{
      backdropFilter: "blur(40px)",
    }}>
      <Header />
      <div className='absolute pointer-events-none z-10 bottom-0 h-1/2 w-screen bg-gradient-to-b from-transparent via-black to-black' />
      <div className='scale-90 hover:scale-95 ease-in-out transition-all duration-300 '>
        <div className='p-[1.5px] min-h-screen bg-gradient-to-br from-gray-700 via-black to-gray-500 rounded-3xl shadow-xl mt-5'>
          <div className='bg-black bg-opacity-50 min-h-screen w-full bg-clip-padding rounded-3xl p-5' style={{backdropFilter: 'blur(100px)'}}>
            {children}
          </div>
        </div>
      </div>
    </main>
  )
}

export default Container