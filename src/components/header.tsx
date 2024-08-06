"use client"
import { ICreateContext, noteContext } from '@/context/AppContext'
import Logo from '@/icons/logo'
import Spin from '@/icons/Spin'
import React, { useContext } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Avatar, AvatarFallback } from './ui/avatar'
import SettingIcon from '@/icons/SettingIcon'
import LogoutIcon from '@/icons/LogoutIcon'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'



const Header = () => {
  const { isSaving,resetContext,me } = useContext<ICreateContext>(noteContext as any)
  const router= useRouter();
  const handleLogout = async()=>{
    try {
      await axios.post("/api/auth/logout")
      resetContext();
      toast.success("logged out successfully")
    } catch (error) {
      console.log("error",error)
    }
  }

  const handleClick =()=>{
    router.push("/profile")
  }


  return (
    <div className='w-full h-14 px-10 py-5 flex items-center gap-10 bg-white text-black border-b '>
      <Logo />
      {
        isSaving &&
        <div className='flex items-center gap-1'>
          <span className='text-xs'>saving..</span>
          <div className='animate-spin'>
            <Spin />
          </div>
        </div>
      }

      <div className='ml-auto'>
        <DropdownMenu>
          <DropdownMenuTrigger>
           <Avatar>
            <AvatarFallback>CN</AvatarFallback>
           </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-64 p-2'>
           <div>
            <div className=''>{me.name}</div>
            <div className='text-xs'>@{me.username}</div>
           </div>
           <DropdownMenuSeparator/>
           <DropdownMenuGroup className='flex flex-col gap-1' >
            <DropdownMenuItem onClick={handleClick} className='cursor-pointer'>
              <SettingIcon/>
              <span className='ml-2'>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout} className='cursor-pointer'>
              <LogoutIcon/>
              <span className='ml-2'>Logout</span>
            </DropdownMenuItem>
           </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

      </div>


    </div>
  )
}

export default Header