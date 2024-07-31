import axios from "axios";


export const getNotes = async () => {
    const {data} = await axios.get("http://localhost:3000/api/notes")
    return data
}

export const addNote = async (note: any) => {
    const {data} = await axios.post("http://localhost:3000/api/notes", note)
    return data
}

export const updateNote = async (id:string,payload:any)=>{
    const response = await axios.put(`http://localhost:3000/api/notes/${id}`,payload)
    return response;
}

export const deleteNote = async (id:string)=>{
    const result = await axios.delete(`http://localhost:3000/api/notes/${id}`);
    return result;
}