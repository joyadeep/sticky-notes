"use client"
import React, { useState } from 'react'
import { Input } from './ui/input'
import OpenEyeIcon from '@/icons/OpenEyeIcon'
import CloseEyeIcon from '@/icons/CloseEyeIcon'
type Props = {
    field:any;
}

const PasswordInput = ({field}: Props) => {
    const [showPassword,setShowPassword] = useState(false)
    const toggleShowPassword = () => setShowPassword(!showPassword)
    return (
    <div className='relative'>
        <Input type={showPassword ? "text" : "password"}  {...field} className='pr-10'/>
        <div className='absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer'>
        {showPassword ? <CloseEyeIcon onClick={toggleShowPassword} /> : <OpenEyeIcon onClick={toggleShowPassword} />}
        </div>
    </div>
  )
}

export default PasswordInput