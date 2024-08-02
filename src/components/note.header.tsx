"use client"
import Spin from '@/icons/Spin'
import Trash from '@/icons/Trash'
import React, { useContext } from 'react'
import DeleteNote from './DeleteNote'
import { noteContext } from '@/context/AppContext'

type Props = {
    mouseDown: (e:any) => void;
    id:string;
    headerColor:string;
}

const NoteHeader = ({mouseDown,id,headerColor}: Props) => {
    return (
    <div id='header' 
    onMouseDown={mouseDown} 
    style={{backgroundColor:headerColor}}
    className='p-2 text-sm cursor-pointer select-none flex items-center justify-between gap-3 '>
     <DeleteNote id={id}/>
    </div>
  )
}

export default NoteHeader