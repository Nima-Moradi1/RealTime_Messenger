'use client'

import { FullConversationType } from '@/types'
import { useRouter } from 'next/navigation'
import React, { useCallback, useMemo } from 'react'
import {format} from 'date-fns'
import { useSession } from 'next-auth/react'
import useOtherUser from '@/hooks/useOtherUser'
import clsx from 'clsx'
import Avatar from '@/components/Avatar'

interface ConversationBoxProps {
    selected? : boolean , 
    data : FullConversationType
}
//! DO NOT FORGET THAT WE USE "USEMEMO" TO IMMIDIATELY UPDATE THE DEPENDENCIES ONCE THEY'RE FETCHED OR STOPPED LOADING

const ConversationBox : React.FC<ConversationBoxProps> = ({selected , data}) => {

    const router = useRouter()
    const session = useSession()
    const otherUser = useOtherUser(data)

    const handleClick = useCallback(()=> {
        router.push(`/conversations/${data.id}`)
    },[data.id, router])

    const lastMessage = useMemo(()=> {
        const messages = data?.messages || {} 
        return messages[messages.length - 1]
    },[data?.messages]) ;

    const userEmail = useMemo(()=> {
        return session?.data?.user?.email ;
    },[session?.data?.user?.email]) ;

    const hasSeen = useMemo(()=> {
        if(!lastMessage) return false ;
        const seenArray = lastMessage.seen || [] ;
        if(!userEmail) return false ;
        return seenArray.filter((user)=> user.email === userEmail).length !== 0 ;
    },[lastMessage , userEmail])

    const lastMessageText = useMemo(()=> {
        if(lastMessage?.image) {
            return 'Sent an Image '
        }
        if(lastMessage?.body) {
            return lastMessage.body
        }
        return "Started a Conversation "

    },[lastMessage])

  return (
    <div
    onClick={handleClick}
    className={clsx(`
    w-full relative flex items-center space-x-3 hover:bg-gray-2/60 transition rounded-lg cursor-pointer p-3
    ` , 
    selected ? "bg-gray-2/60" : "bg-background"
    )}>
        <Avatar user={otherUser}/>
        <div
        className='min-w-0 flex-1'>
            <div
            className='focus:outline-none'>
                <div
                className='flex justify-between items-center mb-1'>
                    <p
                    className='text-sm font-medium text-foreground/90'>
                        {data?.name || otherUser?.name}
                    </p>
                    {
                        lastMessage?.createdAt && (
                            <p
                            className='text-xs text-gray font-light'>
                                {format(new Date(lastMessage.createdAt) , 'p')}
                            </p>
                        )
                    }
                </div>
                <p
                className={clsx(`
                truncate text-xs
                ` , 
                hasSeen ? "text-gray" : "text-foreground font-bold"
                )}>
                    {lastMessageText}
                </p>
            </div>
        </div>
    </div>
  )
}

export default ConversationBox