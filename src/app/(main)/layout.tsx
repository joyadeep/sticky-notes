"use client"
import Header from '@/components/header'
import React, { useContext } from 'react'
import { ICreateContext, noteContext } from '../../context/AppContext'
import { redirect } from 'next/navigation'
import Loading from '@/components/Loading'
import useDeviceDetector from "next-device-detection";

type Props = {
    children: React.ReactNode
}

const Mainlayout = ({children}: Props) => {
  const {me,isFetching} = useContext<ICreateContext>(noteContext as any);

  const device = useDeviceDetector();

  if (isFetching) {
    return <div className='w-full h-screen'>
      <Loading/>
    </div>
  }

  if (!me) {
    redirect("/auth/login")
  }


  return (
    <div className='relative w-full h-screen overflow-hidden '>
        {device?.isDesktop===false && <section className='absolute bg-black/60 backdrop-blur-sm  inset-0 z-50 flex items-center justify-center text-white text-center px-5'>
        Please Switch to Desktop to use sticky notes.
        </section>}
        <Header/>
        {children}
    </div>
  )
}

export default Mainlayout