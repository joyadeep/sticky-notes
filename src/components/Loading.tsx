import Logo from '@/icons/logo'
import React from 'react'

type Props = {}

const Loading = (props: Props) => {
  return (
    <div className='w-full h-full flex flex-col gap-5 items-center justify-center'>
      <div className='w-24 h-24 rounded-full flex items-center justify-center bg-slate-100'>
      <Logo/>
      </div>
      <div className='w-48 h-1 bg-gray-200 relative overflow-hidden'>
        <div className='absolute w-24 h-1 bg-yellow-500 animate-slide'></div>
      </div>
    </div>
  )
}

export default Loading