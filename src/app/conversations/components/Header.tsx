'use client'

import Avatar from '@/components/Avatar'
import useOtherUser from '@/hooks/useOtherUser'
import { Conversation, User } from '@prisma/client'
import Link from 'next/link'
import React, { useMemo } from 'react'
import { HiChevronLeft, HiEllipsisHorizontal } from 'react-icons/hi2'
import ProfileDrawer from './ProfileDrawer'

interface HeaderProps {
    conversation : Conversation & {
        users : User[]
    }
}

const Header : React.FC<HeaderProps> = ({conversation}) => {

    const otherUser = useOtherUser(conversation)
    const [drawerOpen , setDrawerOpen] = React.useState<boolean>(false)

    const statusText = useMemo(()=> {
        if(conversation.isGroup) {
            return `${conversation.users.length} Members`
        }
        //It's hard-coded for now , later we'll make it dynamic
        return "Active"
    },[conversation])


  return (
    <>
    <ProfileDrawer
    data={conversation} isOpen={drawerOpen} onClose={()=>setDrawerOpen(false)} />
      <div
    className='bg-background w-full flex border-b border-gray-2/50 sm:px-4 py-3 
    px-4 lg:px-6 justify-between items-center shadow-sm'>
        <div className='flex gap-3 items-center'>
        <Link href='/conversations'
        className='lg:hidden block text-primary hover:text-primary/75 transition cursor-pointer'>
            <HiChevronLeft size={32}/>
        </Link>
        <Avatar user={otherUser}/>
        <div className='flex flex-col'>
            <div>
                {conversation?.name || otherUser?.name}
            </div>
            <div className='text-sm font-light text-foreground/60'>
                {statusText}
            </div>
        </div>
        </div>
        <HiEllipsisHorizontal size={32}
        onClick={()=> setDrawerOpen(true)}
        className='text-primary cursor-pointer hover:text-primary/75 transition'/>
    </div>
    </>
  
  )
}

export default Header