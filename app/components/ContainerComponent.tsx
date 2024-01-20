import React, { ReactNode } from 'react'
import Header from './Header'

interface ContainerProps {
    children: ReactNode;
  }

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <main
    className="h-fit bg-gradient-to-br from-gray-950 to-gray-800 bg-clip-padding p-5"
    style={{
      backdropFilter: "blur(40px)",
    }}>
      <Header />
      <div className='border-[1px] p-5 h-screen border-gray-700 rounded-xl shadow-xl mt-5'>
        {children}
      </div>
    </main>
  )
}

export default Container