import Header from '@/components/header'
import React from 'react'

type Props = {
    children: React.ReactNode
}

const Mainlayout = ({children}: Props) => {
  return (
    <div className='w-full h-screen overflow-hidden'>
        <Header/>
        {children}
    </div>
  )
}

export default Mainlayout