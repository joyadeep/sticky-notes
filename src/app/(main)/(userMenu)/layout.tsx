import SideMenu from '@/components/SideMenu'
import React from 'react'

type Props = {
    children: React.ReactNode
}

const UserMenuLayout = ({children}: Props) => {
  return (
    <div className='w-2/3 h-full mx-auto pt-10 flex gap-3 '>
        <SideMenu/>
        {children}
    </div>
  )
}

export default UserMenuLayout