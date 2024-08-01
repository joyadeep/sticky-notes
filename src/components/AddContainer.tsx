import { noteContext, IContext } from '@/app/context/AppContext'
import AddIcon from '@/icons/AddIcon'
import { addNote } from '@/services/notes.services'
import React, { useContext } from 'react'
import colors from "@/assets/colors.json";


type Props = {}

const AddContainer = (props: Props) => {
  const { notes,setNotes,selectedNote,handleUpdate} = useContext(noteContext);
  const createNote = async () => {
    try {
      const newNote = await addNote({ colors: JSON.stringify(colors[0]), note: "", position: JSON.stringify({ x: 0, y: 0 }) })
      console.log(newNote)
      setNotes((prevNotes: IContext) => ({ ...prevNotes, data: [...prevNotes.data,
         newNote.data] }));
    } catch (error: any) {
      setNotes((prevNotes: IContext) => ({ ...prevNotes, isError: true, error: error.response.data.message }));
    }
  }

  const updateNoteColor = async (color:any)=>{
    try {
      const currentNoteIndex = notes.data.findIndex(note => note.id === selectedNote)
      
      handleUpdate(selectedNote,"colors",color);
      const updatedNote = {
        ...notes.data[currentNoteIndex],
        colors: JSON.stringify(color)
      }
      const newNotes =notes;
      newNotes.data[currentNoteIndex] = updatedNote;
      setNotes(newNotes)
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className='absolute z-[1000] select-none flex flex-col gap-5 w-fit h-fit left-1 top-1/2 transform -translate-y-1/2  bg-slate-300 px-3 py-10 rounded-full'>
      <div onClick={createNote} className='cursor-pointer  w-10 h-10 flex items-center justify-center rounded-full bg-purple-600 shadow-lg hover:scale-125 duration-300'>
        <AddIcon />
      </div>
      {
        colors.map((color) => (
          <div onClick={()=>updateNoteColor(color)} key={color.id} className='cursor-pointer  w-10 h-10 flex items-center justify-center rounded-full shadow-lg hover:scale-125 duration-300'
            style={{ backgroundColor: color.colorBody }}
          />

        ))
      }

    </div>
  )
}

export default AddContainer