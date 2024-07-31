"use client"
import { noteContext } from '@/app/context/AppContext'
import Logo from '@/icons/logo'
import Spin from '@/icons/Spin'
import React, { useContext } from 'react'

type Props = {}

const Header = (props: Props) => {
  const {isSaving} = useContext(noteContext)
  return (
    <div className='w-full h-14 px-10 py-5 flex items-center gap-10 bg-white text-black border-b shadow-lg'>
      <Logo/>
      {
        isSaving && 
        <div className='flex items-center gap-1'>
        <span className='text-xs'>saving..</span>
        <div className='animate-spin'>
        <Spin/>
        </div>
      </div>
      }
    
    </div>
  )
}

export default Header