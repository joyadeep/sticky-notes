"use client"
import { noteContext } from '@/app/context/AppContext'
import PasswordInput from '@/components/PasswordInput'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

type Props = {}

const formSchama = z.object({
  name: z.string().min(1, 'Name is required'),
  username: z.string().min(1, 'Username is required').max(20, 'Username must be less than 20 characters'),
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  password: z.string().min(1, 'Password is required').min(6, 'Password must be at least 6 characters').max(32, 'Password must be less than 32 characters'),
  confirmPassword: z.string().min(1, 'Password is required').min(6, 'Password must be at least 6 characters').max(32, 'Password must be less than 32 characters'),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})


const Register = (props: Props) => {

  const {me} = useContext(noteContext);

  const form = useForm<z.infer<typeof formSchama>>({
    resolver:zodResolver(formSchama),
    defaultValues:{
      name:"",
      username:"",
      email:"",
      password:"",
      confirmPassword:""
    }
  })

  const onSubmit = async(data: z.infer<typeof formSchama>) => {
    try {
      await axios.post('/api/users/register', data)
    } catch (error) {
      console.log("error",error)
    }
  }

  if (me) {
    redirect("/")
  }

  return (
    <Card className='w-1/3'>
      <CardHeader>
        <CardTitle className='text-2xl text-center'>Register</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className='flex flex-col gap-5' onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
            control={form.control}
            name='name'
            render={({field})=>(
              <FormItem>
                <div className='flex gap-2'>
                  <FormLabel className='required'>Fullname</FormLabel>
                  <FormMessage className='text-xs leading-3'/>
                </div>
                <FormControl>
                  <Input {...field}  />
                </FormControl>
              </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name='username'
            render={({field})=>(
              <FormItem>
                <div className='flex gap-2'>
                  <FormLabel className='required'>Username</FormLabel>
                  <FormMessage className='text-xs leading-3'/>
                </div>
                <FormControl>
                  <Input {...field}  />
                </FormControl>
              </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name='email'
            render={({field})=>(
              <FormItem>
                <div className='flex gap-2'>
                  <FormLabel className='required'>Email</FormLabel>
                  <FormMessage className='text-xs leading-3'/>
                </div>
                <FormControl>
                  <Input {...field}  />
                </FormControl>
              </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name='password'
            render={({field})=>(
              <FormItem>
                <div className='flex gap-2'>
                  <FormLabel className='required'>Password</FormLabel>
                  <FormMessage className='text-xs leading-3'/>
                </div>
                <FormControl>
                  <PasswordInput field={field}  />
                </FormControl>
              </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name='confirmPassword'
            render={({field})=>(
              <FormItem>
                <div className='flex gap-2'>
                  <FormLabel className='required'>Confirm Password</FormLabel>
                  <FormMessage className='text-xs leading-3'/>
                </div>
                <FormControl>
                  <PasswordInput field={field}  />
                </FormControl>
              </FormItem>
            )}
            />

            <Button type='submit' className='w-full' size={'lg'} variant={"destructive"} >Register</Button>


          </form>

        </Form>

        <div className='text-sm text-right mt-2 font-light'>Already have an account ? <Link href='/auth/login' className='text-blue-500'>Login</Link></div>

      </CardContent>
    </Card>
  )
}

export default Register