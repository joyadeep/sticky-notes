"use client"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger,DialogFooter } from '@/components/ui/dialog'
import { modalContext } from '@/context/ModalContext'
import React, { useContext, useEffect, useState } from 'react'
import {TriangleAlert} from "lucide-react"
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { toast } from 'react-toastify'
import axios, { AxiosError } from 'axios'
import { ICreateContext, noteContext } from '@/context/AppContext'

type Props = {}

const DeleteAccountModal = (props: Props) => {

  const [isChecked,setChecked] = useState(false);

  const {resetContext}=useContext<ICreateContext>(noteContext as any);
    const {isOpen,onClose,type,resetModalContext} = useContext(modalContext);
    const isModalOpen = isOpen && type === 'deleteAccount';

    const handleClose = () => {
        onClose();
        setChecked(false);
    }
    
    const onSubmit = async() => {
      try {
        await axios.delete("/api/users");
        resetContext();
        resetModalContext();
        setChecked(false);
        onClose();
      } catch (error:AxiosError|any) {
        toast.error(error?.response?.data?.message)
      }
    }
  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
  <DialogContent className='flex flex-col items-center justify-center'>
    <div className='bg-red-500 p-3 rounded-full flex items-center justify-center'>
        <TriangleAlert className='text-white' size={48}/>
    </div>
        <h3 className='text-base font-medium '>Are you sure you want to delete your account ?</h3>
        <p className='text-xs leading-4 text-black/70 text-center'>By doing this, your account will be deleted permanently and you will not be able to recover your account anytime. </p>
        <div className="flex items-center space-x-2">
        <Checkbox id="confirm" onClick={()=>{setChecked(!isChecked)}} checked={isChecked} />
      <Label
        htmlFor="confirm"
        className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        I understand the consequences of deleting my account.
      </Label>
    </div>   
  <DialogFooter className='w-full flex flex-col gap-2'>
    <Button variant={'outline'} disabled={!isChecked} onClick={onSubmit} >Delete</Button>
    <Button variant='default' onClick={handleClose}>Cancel</Button>
  </DialogFooter>
  </DialogContent>
</Dialog>
  )
}

export default DeleteAccountModal