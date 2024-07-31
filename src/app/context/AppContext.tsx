"use client"

import { getNotes, updateNote } from "@/services/notes.services";
import { createContext, useEffect, useState } from "react"

export const noteContext = createContext<any | null>(null);

export interface IContext {
    isLoading: boolean;
    data: any[];
    isError: boolean;
    error: string;
}

const NoteProvider = ({ children }: { children: React.ReactNode }) => {

    const [notes, setNotes] = useState<IContext>({ isLoading: false, data: [], isError: false, error: "" });
    const [selectedNote,setSelectedNote] = useState("");
    const [isSaving,setIsSaving] = useState(false);

    useEffect(() => {
        init();
    }, []);

    
    
    const init = () => {
        setNotes({ isLoading: true, data: [], isError: false, error: "" });
        getNotes()
            .then((result) => {
                setNotes(prevNotes => ({ ...prevNotes, data: result.data }));
            })
            .catch((error) => {
                setNotes(prevNotes => ({ ...prevNotes, isError: true, error: error.response.data.message }));
            })
            .finally(() => {
                setNotes(prevNotes => ({ ...prevNotes, isLoading: false }));
            });
    }



    const handleUpdate = async (id:string,key:string,value:any) => {
        try {
          setIsSaving(true);
          const payload = {[key]:JSON.stringify(value)}
          await updateNote(id, payload);
        } catch (error) {
          console.log(error);
        } finally{
          setIsSaving(false);
        }
      }


    const contextData = { notes, setNotes,selectedNote,setSelectedNote,isSaving,setIsSaving,handleUpdate };
    return <noteContext.Provider value={contextData}>{children}</noteContext.Provider>;
}

export default NoteProvider;