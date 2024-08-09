"use client"
import PasswordInput from '@/components/PasswordInput'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import Spin from '@/icons/Spin'
import { zodResolver } from '@hookform/resolvers/zod'
import { Key } from 'lucide-react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

type Props = {}

const formSchame = z.object({
  currentPassword: z.string().min(1, 'current password is required'),
  newpassword: z.string().min(1, 'new passowrd is required'),
  verifynewpassword: z.string().min(1, 'verify password is required')
}).refine(data => data.newpassword === data.verifynewpassword, {
  message: 'Passwords do not match',
  path: ['verifynewpassword'],
})

const ChangePassword = (props: Props) => {
  const [isLoading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchame>>({
    resolver: zodResolver(formSchame),
    defaultValues: {
      currentPassword: "",
      newpassword: "",
      verifynewpassword: ""
    }
  })
  return (
    <div className='flex-1 flex flex-col gap-2 items-center'>
      <Card className='w-1/2 shadow-none' >
        <CardHeader className=' flex items-center'>
          <div className='p-5 w-fit bg-purple-100 rounded-full'>
            <Key size={32} className='text-purple-800' />
          </div>
          <h2 className=' font-medium tracking-tight text-black/80'>Change Password</h2>
        </CardHeader>
        <CardContent>
          <Form {...form} >
            <form className='flex flex-col gap-5' onSubmit={form.handleSubmit(() => { })}>

              <FormField
                control={form.control}
                name='currentPassword'
                render={({ field }) => (
                  <FormItem>
                    <div className='flex gap-2'>
                      <FormLabel className='required'>Current Password</FormLabel>
                      <FormMessage className='text-xs leading-3' />
                    </div>
                    <FormControl>
                      <PasswordInput field={field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='newpassword'
                render={({ field }) => (
                  <FormItem>
                    <div className='flex gap-2'>
                      <FormLabel className='required'>New Password</FormLabel>
                      <FormMessage className='text-xs leading-3' />
                    </div>
                    <FormControl>
                      <PasswordInput field={field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='verifynewpassword'
                render={({ field }) => (
                  <FormItem>
                    <div className='flex gap-2'>
                      <FormLabel className='required'>Reenter New Password</FormLabel>
                      <FormMessage className='text-xs leading-3' />
                    </div>
                    <FormControl>
                      <PasswordInput field={field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <Button type='submit' size={"lg"} disabled={isLoading} >{isLoading ? <Spin /> : "Change Password"}</Button>

            </form>

          </Form>

        </CardContent>
      </Card>
    </div>
  )
}

export default ChangePassword;