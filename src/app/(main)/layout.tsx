"use client"
import Header from '@/components/header'
import React, { useContext } from 'react'
import { ICreateContext, noteContext } from '../../context/AppContext'
import { redirect } from 'next/navigation'

type Props = {
    children: React.ReactNode
}

const Mainlayout = ({children}: Props) => {
  const {me,isFetching} = useContext<ICreateContext>(noteContext as any);

  if (isFetching) {
    return <div className='text-green-500 bg-blue-200 w-full h-screen flex items-center justify-center'>FETCHING....</div>
  }

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