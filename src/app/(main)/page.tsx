"use client"
import AddContainer from '@/components/AddContainer'
import Note from '@/components/note'
import React, { useContext, useRef } from 'react'
import { noteContext,IContext } from '../context/AppContext'

type Props = {}



const Page = (props: Props) => {
  const mainRef = useRef<HTMLDivElement | null>(null)
  const {notes} = useContext(noteContext);
  const {isLoading,isError,error,data} = notes;


  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>{error}</div>
  }
 
  return (
    <div ref={mainRef} className='w-full h-full relative bg-white'>
     
     {
        data?.map(note => <Note key={note.id} note={note}/>)
     }

     <AddContainer/>

    </div>
  )
}

export default Page