import React, { ReactNode } from 'react'
import Header from './Header'

interface ContainerProps {
    children: ReactNode;
  }

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <main
    className="max-h-fit bg-gradient-to-br from-gray-950 to-gray-800 bg-clip-padding p-5"
    style={{
      backdropFilter: "blur(40px)",
    }}>
      <Header />
      <div className='absolute z-50 inset-x-0 bottom-0 h-1/2 w-screen bg-gradient-to-b from-transparent to-black'></div>
      <div className='p-[1px] min-h-screen bg-gradient-to-br from-gray-700 via-black to-gray-500 rounded-3xl shadow-xl mt-5'>
        <div className='bg-black bg-opacity-50 min-h-screen w-full bg-clip-padding rounded-3xl border-[1px] border-opacity-5 border-gray-400 p-5' style={{backdropFilter: 'blur(1000px)'}}>
          {children}
        </div>
      </div>
    </main>
  )
}

export default Container