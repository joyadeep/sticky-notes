"use client"
import Link from 'next/link'
import React from 'react'
import {UserRound,Key,MoveLeft, Move} from "lucide-react"
import {usePathname,useRouter} from "next/navigation"
import { cn } from '@/lib/utils'
type Props = {}

const menuOptions = [
    {
        title:"Profile",
        link:"/profile",
        icon:<UserRound size={20}/>,
    },
    {
        title:"Change Password",
        link:"/change-password",
        icon:<Key size={20}/>,
    }
]

const SideMenu = (props: Props) => {
    const path = usePathname();
    const router= useRouter();
    const handleBack = ()=>{
        router.push("/")
    }
  return (
    <div className='w-10 md:w-52 border-r-2 flex flex-col gap-2'>
        <h3 className='text-xl font-medium mb-3 flex items-center gap-3'><MoveLeft size={20} className='cursor-pointer' onClick={handleBack}/> <span className='hidden md:block'>Setting</span></h3>
        <div className='flex flex-wrap -mr-px gap-3'>
        {
            menuOptions?.map((menu)=>(
                <Link key={menu.title} href={menu.link} className={cn('border-r-2 border-transparent flex items-center gap-4 w-full h-7 text-gray-700 ',menu.link===path?"border-yellow-500 text-yellow-600":"hover:border-gray-500 hover:text-black")}>{menu.icon}<span className='hidden md:block text-sm text-nowrap'>{menu.title}</span></Link>
            ))
        }
        </div>
    </div>
  )
}

export default SideMenu