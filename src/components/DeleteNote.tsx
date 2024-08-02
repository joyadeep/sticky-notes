import { IContext, ICreateContext, noteContext } from '@/context/AppContext';
import Trash from '@/icons/Trash'
import { deleteNote } from '@/services/notes.services'
import React, { useContext } from 'react'

type Props = {
    id:string;
}

const DeleteNote = ({id}: Props) => {

  const {setNotes} = useContext<ICreateContext>(noteContext as any);

    const handleDelete = async() => {
        try {
          await deleteNote(id)
          setNotes((prevNotes:IContext) => ({ ...prevNotes, data: prevNotes.data.filter((note) => note.id !== id) }));
        } catch (error) {
          console.log("error")
        }
    }
  return (
    <div onClick={handleDelete}>
        <Trash/>
    </div>
  )
}

export default DeleteNote