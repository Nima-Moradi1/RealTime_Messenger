'use client'

import { User } from '@prisma/client'
import Image from 'next/image'
import React from 'react'

interface AvatarProps {
    user? : User ,
}

const Avatar : React.FC<AvatarProps> = ({user}) => {
    console.log(user);
  return (
    <div className='relative'>
        <div
        className='relative inline-block rounded-full overflow-hidden size-9 md:size-11'>
            <Image src={user?.image || '/images/placeholder.jpg'} alt='avatar'
            fill
            />
        </div>
    </div>
  )
}

export default Avatar