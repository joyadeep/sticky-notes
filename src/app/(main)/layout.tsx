"use client"
import Header from '@/components/header'
import React, { useContext } from 'react'
import { noteContext } from '../context/AppContext'
import { redirect } from 'next/navigation'

type Props = {
    children: React.ReactNode
}

const Mainlayout = ({children}: Props) => {
  const {me} = useContext(noteContext);
  if (!me) {
    redirect("/auth/login")
  }
  return (
    <div className='w-full h-screen overflow-hidden'>
        <Header/>
        {children}
    </div>
  )
}

export default Mainlayout