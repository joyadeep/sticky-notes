"use client"

import { createContext, useState } from "react";

export type ModalType = "deleteAccount"|"createAccount";

export interface IModalContext {
    type: ModalType| null;
    isOpen: boolean;
    data:any;
    onOpen: (type:ModalType,data?:any) => void;
    onClose: () => void;
}

export const modalContext = createContext<any|undefined>(undefined);

 
const ModalContextProvider = ({ children }: { children: React.ReactNode }) => {

    // INFO: data might be required for edit modal in future.
    const [isOpen,setOpen] = useState(false);
    const [data,setData] = useState(undefined);
    const [type,setType] = useState<ModalType|null>(null);

    const onOpen = (type:ModalType,data?:any) => {
        setOpen(true);
        setData(data);
        setType(type);
    }

    const onClose = () => {
        setOpen(false);
        setData(undefined);
        setType(null);
    }

    const contextData={isOpen,data,onOpen,onClose,type}
    return <modalContext.Provider value={contextData}>{children}</modalContext.Provider>
}

export default ModalContextProvider