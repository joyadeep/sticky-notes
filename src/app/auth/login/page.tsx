"use client"
import { ICreateContext, noteContext } from '@/context/AppContext'
import PasswordInput from '@/components/PasswordInput'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import axios, { AxiosError } from 'axios'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import Loading from '@/components/Loading'
import Spin from '@/icons/Spin'
import { toast } from 'react-toastify'

const formSchame = z.object({
  input: z.string().min(1, 'Username/Email is required'),
  password: z.string().min(1, 'Password is required')
})

const Login = () => {
  const {me,isFetching,setMe} = useContext<ICreateContext>(noteContext as any)
  
  const form = useForm<z.infer<typeof formSchame>>({
    resolver:zodResolver(formSchame),
    defaultValues:{
      input:"",
      password:""
    }
  })
  const [isLoading,setLoading] = useState(false);

  const onSubmit = async(data: z.infer<typeof formSchame>) => {
    setLoading(true)
    try {
      const response = await axios.post('/api/auth/login', data)
      setMe(response.data.data)
    } catch (error:AxiosError|any) {
      toast.error(error?.response?.data?.message)
    } finally {
      setLoading(false)
    }
  }

  if (isFetching){
    return <Loading/>
  }

  if (me) {
    redirect("/notes")
  }


  return (
    <Card className='w-1/3'>
      <CardHeader>
        <CardTitle className='text-2xl text-center'>Login</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className='flex flex-col gap-5' onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
            control={form.control}
            name='input'
            render={({field})=>(
              <FormItem>
                <div className='flex gap-2'>
                  <FormLabel className='required'>Username/Email</FormLabel>
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
                  <PasswordInput field={field} />
                </FormControl>
              </FormItem>
            )}
            />

            <Button type='submit' size={"lg"} disabled={isLoading} >{isLoading? <Spin /> : "Login"}</Button>
           
         </form>  
        </Form>
        <div className='text-sm text-right mt-2 font-light'>Don{"'"}t have an account ? <Link href='/auth/register' className='text-blue-500'>Register</Link></div>
      </CardContent>
    </Card>
  )
}

export default Login