import Logo from '@/icons/logo'
import React from 'react'

type Props = {}

const NoData = (props: Props) => {
  return (
    <>
    <div className='text-black absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center flex-col ' >
        <div className='bg-gray-200 rounded-full p-2 size-24 flex items-center justify-center'>
        <Logo/>
        </div>
        <h3 className='text-black/80 mt-2 '>No notes found</h3>
        <h5 className='text-sm text-black/60'>Click + icon to add new Note</h5>
    </div>
       
    </>
  )
}

export default NoData