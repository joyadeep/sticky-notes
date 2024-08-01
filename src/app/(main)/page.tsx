"use client"
import AddContainer from '@/components/AddContainer'
import Note from '@/components/note'
import React, { useContext, useRef } from 'react'
import { noteContext,IContext } from '../context/AppContext'
import NoData from '@/components/NoData'

type Props = {}



const Page = (props: Props) => {
  const mainRef = useRef<HTMLDivElement | null>(null)
  const {notes} = useContext(noteContext);
  const {isLoading,isError,error,data} = notes;

  if (isError) {
    return <div>{error}</div>
  }
 
  return (
    <>
    <div ref={mainRef} className='w-full h-full relative bg-white'>

    {

      isLoading && <div>Loading...</div> 
    }
      
     
     {

      data?.length === 0 ? <NoData/>
      :

       data?.map(note => <Note key={note.id} note={note}/>)
      }


     <AddContainer/>
    </div>
      </>
  )
}

export default Page