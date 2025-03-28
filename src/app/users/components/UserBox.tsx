'use client'

import Avatar from '@/components/Avatar'
import LoadingModal from '@/components/LoadingModal'
import { User } from '@prisma/client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useCallback, useState } from 'react'



const UserBox = ({data}:{data : User}) => {
    const router = useRouter()
    const [isLoading,setIsLoading] = useState(false) ;

    const handleClick = useCallback(()=> {
        setIsLoading(true)
        axios.post('/api/conversations' , {
            userId : data.id
        })
        .then((data)=> router.push(`/conversations/${data.data.id}`))
    },[data , router])


  return (
    <>
    {isLoading && (
      <LoadingModal />
    )}
    
     <div
    onClick={handleClick}
    className='w-full relative flex items-center space-x-3 bg-background p-3 
    hover:bg-gray-2/50 rounded-lg transition cursor-pointer'
    >
        <Avatar user={data}/>
        <div className='min-w-0 flex-1'>
            <div className='focus:outline-none'>
              <div className='flex justify-between items-center mb-1'>
                    <p className='text-sm font-medium text-foreground'>
                        {data?.name}
                    </p>
              </div>
            </div>
        </div>
    </div>
    </>
   
  )
}

export default UserBox