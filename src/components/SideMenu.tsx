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
    <div className='w-48 border-r-2 flex flex-col gap-2'>
        <h3 className='text-xl font-medium mb-3 flex items-center gap-3'><MoveLeft size={20} className='cursor-pointer' onClick={handleBack}/> Setting</h3>
        {
            menuOptions?.map((menu)=>(
                <Link key={menu.title} href={menu.link} className={cn(' border-r-2 -me-0.5 flex items-center gap-4 h-7 text-gray-700 ',menu.link===path?"border-yellow-500 text-yellow-600":"hover:border-gray-500 hover:text-black")}>{menu.icon}<span className='text-sm'>{menu.title}</span></Link>
            ))
        }
    </div>
  )
}

export default SideMenu