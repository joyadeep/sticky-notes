"use client"
import { ICreateContext, noteContext } from '@/context/AppContext'
import Logo from '@/icons/logo'
import Spin from '@/icons/Spin'
import React, { useContext } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Avatar, AvatarFallback } from './ui/avatar'
import SettingIcon from '@/icons/SettingIcon'
import UserIcon from '@/icons/UserIcon'
import LogoutIcon from '@/icons/LogoutIcon'
import axios from 'axios'
import { toast } from 'react-toastify'



const Header = () => {
  const { isSaving,resetContext } = useContext<ICreateContext>(noteContext as any)
  const handleLogout = async()=>{
    try {
      await axios.post("/api/auth/logout")
      resetContext();
    } catch (error) {
      console.log("error",error)
    }
  }

  const handleClick =()=>{
    toast.success("saved successfully")
  }

  return (
    <div className='w-full h-14 px-10 py-5 flex items-center gap-10 bg-white text-black border-b shadow-lg'>
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
            <div className=''>Joyadeep</div>
            <div className='text-xs'>@joyadeep</div>
           </div>
           <DropdownMenuSeparator/>
           <DropdownMenuGroup className='flex flex-col gap-1' >
            <DropdownMenuItem>
              <UserIcon/>
              <span className='ml-2'>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleClick}>
              <SettingIcon/>
              <span className='ml-2'>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout}>
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