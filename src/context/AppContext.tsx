"use client"

import { updateNote } from "@/services/notes.services";
import { INote } from "@/types/note.types";
import axios from "axios";
import { createContext, Dispatch, SetStateAction, useEffect, useState } from "react"

export interface ICreateContext {
  notes: IContext;
  setNotes:Dispatch<SetStateAction<IContext>>;
  selectedNote: string;
  setSelectedNote:Dispatch<SetStateAction<string>>;
  isSaving:boolean;
  setIsSaving:Dispatch<SetStateAction<boolean>>;
  isFetching:boolean;
  handleUpdate:(id:string,prop:string,value:any)=>void;
  me:any;
  setMe:Dispatch<SetStateAction<any>>;
  resetContext:()=>void;
}

export interface IContext {
  isLoading: boolean;
  data: INote[];
  isError: boolean;
  error: string;
}

export const noteContext = createContext<ICreateContext | undefined>(undefined);

const NoteProvider = ({ children }: { children: React.ReactNode }) => {

    const [notes, setNotes] = useState<IContext>({ isLoading: false, data: [], isError: false, error: "" });
    const [selectedNote,setSelectedNote] = useState("");
    const [isSaving,setIsSaving] = useState(false);
    const [isFetching,setIsFetching] = useState(true); // for me state. can be used single loading for all requests. future implememtation
    const [me,setMe] = useState(undefined);

    useEffect(() => {
      getMe();
    }, []);

    const getMe = async()=>{
      setIsFetching(true);
      try {
        const response  = await axios.get("/api/users/me");
        setMe(response.data)
      } catch (error) {
        console.log("error",error)
      } finally {
        setIsFetching(false);
      }
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


    const resetContext = ()=>{
      setNotes({ isLoading: false, data: [], isError: false, error: "" });
      setSelectedNote("");
      setMe(undefined);
    }


    const contextData = { notes, setNotes,selectedNote,setSelectedNote,isSaving,setIsSaving,handleUpdate,me,setMe,isFetching,resetContext };
    return <noteContext.Provider value={contextData}>{children}</noteContext.Provider>;
}

export default NoteProvider;