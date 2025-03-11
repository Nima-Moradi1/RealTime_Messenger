'use client'
import Avatar from '@/components/Avatar'
import { FullMessageType } from '@/types'
import clsx from 'clsx'
import { format } from 'date-fns'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import React from 'react'

interface MessageBoxProps {
    data : FullMessageType
    isLast? : boolean
}

const MessageBox : React.FC<MessageBoxProps> = ({data , isLast}) => {
    const session = useSession()
    //since i included the sender in the getMessages() , here we can compare it to know if it's our message our others
    const isOwn = session?.data?.user?.email === data?.sender?.email
    //The list of name of users (or user) that has seen a message as a text 
    const seenList = (data.seen || []).filter((user)=> user?.email !== data?.sender?.email)
    .map((user)=> user?.name).join(', ')

    //? Dynamic Styling (since it's too much , i'd rather put them here for better code reading)
    const container = clsx(`flex gap-3 p-4` , isOwn && "justify-end")
    const avatar = clsx(isOwn && "order-2")
    const body = clsx(`flex flex-col gap-2` , isOwn && "items-end")
    const message = clsx(`text-sm w-fit overflow-hidden` , 
        isOwn ? 'bg-primary text-background' : "bg-gray-2" ,
        data.image ? "rounded-md p-0" : "rounded-full py-2 px-3"
    )

  return (
    <div className={container}>
        <div className={avatar}>
            <Avatar user={data?.sender}/>
        </div>
        <div className={body}>
            <div className='flex flex-col items-center gap-1'>
            <div className='text-sm text-foreground/70'>
            {data?.sender?.name}
            </div>
            <div className='text-xs text-gray'>
                {format(new Date(data?.createdAt) , 'p')}
            </div>
            </div>
            <div className={message}>
                {data?.image ? (
                    <Image alt='image' height={288} width={288}
                    src={data?.image}
                    className='object-cover hover:scale-105 transition translate' />
                ) : 
                <p>{data?.body}</p>
                }
            </div>
            {isLast && isOwn && seenList.length > 0 && (
                <div
                className='text-xs font-light text-gray'>
                    {`Seen by ${seenList}`}
                </div>
            )}
        </div>
    </div>
  )
}

export default MessageBox