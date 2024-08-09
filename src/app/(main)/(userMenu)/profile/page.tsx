"use client"
import SideMenu from '@/components/SideMenu'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ICreateContext, IMe, noteContext } from '@/context/AppContext'
import { modalContext } from '@/context/ModalContext'
import React, { useContext } from 'react'

type Props = {}



const Profile = (props: Props) => {
  const {me} = useContext<ICreateContext>(noteContext as any)
  const {onOpen} = useContext(modalContext);
  const {id,imageUrl,...rest}=me;

  const handleClick = ()=>{
    onOpen('deleteAccount')
  }
  return (
    <div className='flex-1'>
      <h1 className='text-xl font-medium tracking-tight'>User Info</h1>
      <hr className='mb-1'/>
      <section className='grid grid-cols-2 w-full gap-3'>
      {
        Object?.entries(rest)?.map(([key,value]:[string, string|any] )=>{
          return(
           <div key={key}>
              <Label>{key}</Label>
              <Input value={value} readOnly/>
           </div>
          )
        })
      }
      </section>

      {/* delete profile section */}
      <section className=' border-2 border-red-500 border-dotted  rounded-md p-2 mt-10'>
        <h1 className='text-xl font-medium tracking-tight '>Delete Account</h1>
        <p className='text-sm mt-4 mb-2'>Once you delete your account, there is no going back. Please be certain.</p>
        <Button size={'lg'} variant={"destructive"} onClick={handleClick}>Delete Account </Button>
      </section>
    </div>
  )
}

export default Profile