"use client"
import { Button } from '@/components/ui/button'
import Logo from '@/icons/logo'
import Image from 'next/image'
import Link from 'next/link'
import React, { useContext } from 'react'
import {Linkedin,Github,Brain} from "lucide-react"
import { ICreateContext, noteContext } from '@/context/AppContext'
import { redirect, } from 'next/navigation'

type Props = {}

const Landingpage = (props: Props) => {
    const {me} = useContext<ICreateContext>(noteContext as any)

    
    if (me) {
        redirect("/notes")
    }
  return (
    <div className='w-full h-full'>
        <header className='w-full h-14 border-b flex px-24 items-center justify-between'>
            <Logo/>
            <div className='space-x-5'>
                <Link href={'/auth/register'}><Button variant={"outline"}>Register</Button></Link>
                <Link href={'/auth/login'}><Button>Sign In</Button></Link>
            </div>
        </header>

        <section className='flex items-center flex-col justify-center my-10 text-center'>
       <h1 className='text-7xl font-semibold tracking-tight mb-5 '> Organize Your Thoughts <br /> with Ease.</h1>
        <p className='px-36  tracking-tight font-light text-black/70'>Keep your thoughts organized and accessible anytime, anywhere. <br /> Our app brings you an intuitive and powerful way to manage your ideas with customizable sticky notes. <br /> Start organizing your world today!</p>
        </section>

        <div className='relative w-full h-96 px-24'>
            <Image src={'/images/notes.png'} alt='notes' fill={true} className='object-contain' />

        </div>

        <footer className='w-full h-max px-24 border-t py-5'>
            <Logo/>

            <section className='py-10 flex gap-4'>
                <Link href={"https://joyadeep.com.np"} target='_blank'><Brain/></Link>
                <Link href={"https://github.com/joyadeep"} target='_blank'><Github/></Link>
                <Link href={"https://www.linkedin.com/in/joyadeep/"} target='_blank'><Linkedin/></Link>
            </section>
            
            <p className='text-center text-gray-500'>© Sticky Notes</p>
        </footer>

    </div>
  )
}

export default Landingpage