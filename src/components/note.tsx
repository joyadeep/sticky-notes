"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import NoteHeader from "./note.header";
import { autoGrow, bodyParser, setNewOffset, setZindex } from "@/utils/utils";
import { updateNote } from "@/services/notes.services";
import { noteContext } from "@/app/context/AppContext";

type Props = {
  note : {
    id:string,
    note:string,
    position:string,
    colors:string
  }
};

const Note = ({note}: Props) => {
  const [position, setPosition] = useState(JSON.parse(note.position));
  const [isSaving,setIsSaving] = useState(false);
  const inputRef = useRef<any>(null);
  const cardRef = useRef(null);
  const keepupTimer = useRef<any|null>(null);

  const {setSelectedNote,handleUpdate} = useContext(noteContext);

  useEffect(() => {
    autoGrow(inputRef);
  }, []);

  const colors = bodyParser(note.colors);

  const width=500; // width of card in px
  let mouseStartPos = { x: 0, y: 0 };


  const mouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLDivElement).id === "header") {
      mouseStartPos.x = e.clientX;
      mouseStartPos.y = e.clientY;

      document.addEventListener("mousemove", mouseMove);
      document.addEventListener("mouseup", mouseUp);
    }
  };

  const mouseMove = (e: any) =>{
    const mouseMoveDir = {
        x: mouseStartPos.x - e.clientX,
        y: mouseStartPos.y - e.clientY,
    }
    mouseStartPos.x = e.clientX;
    mouseStartPos.y = e.clientY;
    const newPosition = setNewOffset(cardRef, mouseMoveDir,window.innerWidth,window.innerHeight,width);
    setPosition(newPosition);
  }

  const mouseUp = ()=>{
    document.removeEventListener("mousemove", mouseMove);
    document.removeEventListener("mouseup", mouseUp);

    const newPosition = setNewOffset(cardRef)
    if (JSON.stringify(position) === JSON.stringify(newPosition)) return
    handleUpdate(note.id,"position",newPosition)

  }

  const keyUp = ()=>{
    if (keepupTimer.current) {
      clearTimeout(keepupTimer.current);
    }
    keepupTimer.current = setTimeout(()=>{
      handleUpdate(note.id,"note",inputRef?.current?.value)
    },2000)
  }

  const handleNoteSelect = ()=>{
    setSelectedNote(note.id)
  }

  


  return (
    <div
      ref={cardRef}
      onClick={handleNoteSelect}
      className={`absolute  rounded-md overflow-hidden`}
      style={{ top: `${position.y}px`, left: `${position.x}px`, width:`${width}px`,backgroundColor:colors.colorBody }}
    >
      <NoteHeader mouseDown={mouseDown} id={note.id} headerColor={colors.colorHeader}  />
      <textarea
        ref={inputRef}
        autoComplete="nope"
        spellCheck="false"
        onInput={() => autoGrow(inputRef)}
        onFocus={() => setZindex(cardRef)}
        onKeyUp={keyUp}
        className="px-2 pt-2 w-full h-auto bg-transparent resize-none outline-none text-sm"
        style={{
          color: colors.colorText}}
        defaultValue={bodyParser(note.note)}
      ></textarea>
    </div>
  );
};

export default Note;
