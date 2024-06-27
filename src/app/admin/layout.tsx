"use client"

import Login from '@/components/admin-panel/Login';
import { useAppSelector } from '@/redux/hooks'
import { useSession } from 'next-auth/react';
import React from 'react'

const layout = ({children}:{children:React.ReactNode}) => {
  const isLoading = useAppSelector((store)=> store.loadingReducer);
  const {data:session}=useSession();
  if(!session?.user)
    {
      return <Login/>
    }


  return (
    <div className='flex'>
      <div className='w-full h-full'>
        <div className='bg-gray-200 p-4 h-[calc(100vh-64px)]'></div>
      {children}

      </div>
    </div>
  )
}

export default layout
