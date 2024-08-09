"use client"
import DeleteAccountModal from '@/modals/delete.account.modal';
import React, { useEffect, useState } from 'react'



const ModalProvider = () => {
    const [isMounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, [])

    if (!isMounted) {
        return null;
    }
    return (
       <>
        <DeleteAccountModal/>
       </>
    )
}

export default ModalProvider