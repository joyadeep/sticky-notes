"use client"
import Header from '@/components/header'
import React, { useContext } from 'react'
import { ICreateContext, noteContext } from '../../context/AppContext'
import { redirect } from 'next/navigation'
import Loading from '@/components/Loading'

type Props = {
    children: React.ReactNode
}

const Mainlayout = ({children}: Props) => {
  const {me,isFetching} = useContext<ICreateContext>(noteContext as any);

  if (isFetching) {
    return <div className='w-full h-screen'>
      <Loading/>
    </div>
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