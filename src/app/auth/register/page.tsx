"use client"
import { ICreateContext, noteContext } from '@/context/AppContext'
import PasswordInput from '@/components/PasswordInput'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import Link from 'next/link'
import { redirect,useRouter } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import Spin from '@/icons/Spin'
import Loading from '@/components/Loading'
import { toast } from 'react-toastify'
import { RadioGroup } from '@/components/ui/radio-group'
import { RadioGroupItem } from '@radix-ui/react-radio-group'
import { cn } from '@/lib/utils'

type Props = {}

const formSchama = z.object({
  name: z.string().min(1, 'Name is required'),
  username: z.string().min(1, 'Username is required').max(20, 'Username must be less than 20 characters'),
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  gender: z.enum(['male', 'female'],{message:"Gender is required"}),
  imageUrl: z.string(),
  password: z.string().min(1, 'Password is required').min(6, 'Password must be at least 6 characters').max(32, 'Password must be less than 32 characters'),
  confirmPassword: z.string().min(1, 'Password is required').min(6, 'Password must be at least 6 characters').max(32, 'Password must be less than 32 characters'),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})


const Register = (props: Props) => {

  const {me,isFetching} = useContext<ICreateContext>(noteContext as any);

  const form = useForm<z.infer<typeof formSchama>>({
    resolver:zodResolver(formSchama),
    defaultValues:{
      name:"",
      username:"",
      email:"",
      gender:undefined,
      imageUrl:"",
      password:"",
      confirmPassword:""
    }
  })

  const [isLoading,setLoading] = useState(false);

  const selectedGender = form.watch('gender');
  const userName=form.watch('username');

  useEffect(()=>{
    form.setValue("imageUrl",`https://avatar.iran.liara.run/public/${selectedGender === "male" ? "boy" : "girl"}?username=${userName}`)
  },[form,selectedGender,userName])

  const router = useRouter();

  const onSubmit = async(data: z.infer<typeof formSchama>) => {
    setLoading(true);
    try {
      await axios.post('/api/auth/register', data);
      form.reset();
      toast.success('User created successfully');
      router.push('/auth/login')
    } catch (error:any) {
      console.log("error",error)
      toast.error(error?.response?.data?.message);
    } finally{
      setLoading(false)
    }
  }

  if (isFetching){
    return <Loading/>
  }

  if (me) {
    redirect("/")
  }

  return (
    <Card className='w-full md:w-1/3 '>
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
            name='gender'
            render={({field})=>(
              <FormItem>
                <div className='flex gap-2'>
                  <FormLabel className='required'>Gender</FormLabel>
                  <FormMessage className='text-xs leading-3'/>
                </div>
                <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex items-center gap-4"
                >
                  <FormItem className={cn("flex items-center group  space-y-0 border-2 p-2 rounded-md border-transparent",field.value === "male" && "border-yellow-600")}>
                    <FormControl>
                      <RadioGroupItem value="male" />
                    </FormControl>
                    <FormLabel className="font-normal group-hover:cursor-pointer">
                      👦Male
                    </FormLabel>
                  </FormItem>
                  <FormItem className={cn("flex items-center group space-y-0 border-2 p-2 rounded-md border-transparent ",field.value === "female" && "border-yellow-600")} >
                    <FormControl>
                      <RadioGroupItem value="female" />
                    </FormControl>
                    <FormLabel className="font-normal group-hover:cursor-pointer">
                     👧Female
                    </FormLabel>
                  </FormItem>
                  
                </RadioGroup>
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

            <Button type='submit' className='w-full' size={'lg'} variant={"default"} disabled={isLoading} >{isLoading ? <Spin/> : "Register"}</Button>


          </form>

        </Form>

        <div className='text-sm text-right mt-2 font-light'>Already have an account ? <Link href='/auth/login' className='text-blue-500'>Login</Link></div>

      </CardContent>
    </Card>
  )
}

export default Register