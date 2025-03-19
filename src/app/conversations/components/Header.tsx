'use client'

import Avatar from '@/components/Avatar'
import useOtherUser from '@/hooks/useOtherUser'
import { Conversation, User } from '@prisma/client'
import Link from 'next/link'
import React, { useMemo } from 'react'
import { HiChevronLeft, HiEllipsisHorizontal } from 'react-icons/hi2'
import ProfileDrawer from './ProfileDrawer'
import AvatarGroup from '@/components/AvatarGroup'
import useActiveList from '@/hooks/useActive'

interface HeaderProps {
    conversation : Conversation & {
        users : User[]
    }
}

const Header : React.FC<HeaderProps> = ({conversation}) => {

    const otherUser = useOtherUser(conversation)
    const [drawerOpen , setDrawerOpen] = React.useState<boolean>(false)
    const {members} = useActiveList()
    const isActive = members.indexOf(otherUser.email!) !== -1 ; 

    const statusText = useMemo(()=> {
        if(conversation.isGroup) {
            return `${conversation.users.length} Members`
        }
        return isActive ? "Active" : "Offline"
    },[conversation , isActive])


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
        {conversation.isGroup ? (
            <AvatarGroup users={conversation.users}/>
        ) : (
            <Avatar user={otherUser}/>
        )}
        <div className='flex flex-col'>
            <div>
                {conversation?.name || otherUser?.name}
            </div>
            <div className={` ${isActive ? "text-green-700" : "text-foreground/60" } text-sm font-light `}>
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