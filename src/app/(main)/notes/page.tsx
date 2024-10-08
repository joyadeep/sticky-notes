"use client"
import AddContainer from '@/components/AddContainer'
import Note from '@/components/note'
import React, { useContext, useEffect, useRef } from 'react'
import { noteContext,IContext, ICreateContext } from '@/context/AppContext'
import NoData from '@/components/NoData'
import { getNotes } from '@/services/notes.services'
import { INote } from '@/types/note.types'
import Loading from '@/components/Loading'
import useDeviceDetector from "next-device-detection";

type Props = {}



const Page = (props: Props) => {
  
  const mainRef = useRef<HTMLDivElement | null>(null)
  const {notes,setNotes} = useContext<ICreateContext>(noteContext as any);
  const {isLoading,isError,error,data} = notes;
  const device = useDeviceDetector();

  useEffect(() => {
    const init = () => {
        setNotes({ isLoading: true, data: [], isError: false, error: "" });
        getNotes()
            .then((result) => {
                setNotes((prevNotes:IContext) => ({ ...prevNotes, data: result.data }));
            })
            .catch((error) => {
                setNotes((prevNotes:IContext) => ({ ...prevNotes, isError: true, error: error.response.data.message }));
            })
            .finally(() => {
                setNotes((prevNotes:IContext) => ({ ...prevNotes, isLoading: false }));
            });
    };
    if (notes?.data?.length === 0) {
      
      init();
    }
  }, [notes?.data?.length,setNotes])

  if(isLoading){
    return <Loading/>
  }

  if (isError) {
    return <div className='w-full h-full'>{error}</div>
  }
 
  return (
    <>
    <div ref={mainRef} className=' w-full h-full relative bg-white'>
     
  {

      data?.length === 0 ? <NoData/>
      :

       data?.map((note:INote) => <Note key={note.id} note={note}/>)
      }


     <AddContainer/>
     {device?.isDesktop===false && <section className='absolute bg-black/60 backdrop-blur-sm  inset-0 z-50 flex items-center justify-center text-white text-center px-5'>
        Please Switch to Desktop to use sticky notes.
        </section>}
    </div>
      </>
  )
}

export default Page