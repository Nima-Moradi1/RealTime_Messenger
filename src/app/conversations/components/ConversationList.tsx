'use client'

import { MdOutlineGroupAdd } from "react-icons/md";
import useConversation from '@/hooks/useConversation';
import { FullConversationType } from '@/types'
import clsx from 'clsx';
import React, { useEffect, useMemo, useState } from 'react'
import ConversationBox from "./ConversationBox";
import GroupChatModal from "./GroupChatModal";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { pusherClient } from "@/libs/pusher";
import { find } from "lodash";

const ConversationList = ({initialItems , users}:{initialItems : FullConversationType[] , users : User[]}) => {

    const [items , setItems] = useState(initialItems);
    const [isModalOpen , setIsModalOpen] = useState(false) ;
    const session = useSession()
    const {conversationId,isOpen} = useConversation()

    const pusherKey = useMemo(()=> {
        return session?.data?.user?.email
    },[session]) ;

    useEffect(()=> {
        if(!pusherKey) return ;
        const newHandler = (conversation: FullConversationType) => {
            setItems((current)=> {
                if(find(current , { id: conversation.id})) {
                    return current
                }
                return [...current , conversation]
            })
        }
        const updateHandler = (conversation : FullConversationType) => {
            setItems((current)=>
                current.map((currentConversation)=> {
                    if(currentConversation.id === conversation.id) {
                        return {
                            ...conversation , 
                            messages : conversation.messages
                        }
                    }
                    return currentConversation ;
                })
            )
        }
        pusherClient.subscribe(pusherKey);
        pusherClient.bind('conversations:new' , newHandler) ;
        pusherClient.bind('conversations:update' , updateHandler)

        

        //As Always, Do not forget the cleanup Function
        return () => {
            pusherClient.unsubscribe(pusherKey);
            pusherClient.unbind('conversations:new' , newHandler);
            pusherClient.unbind('conversations:update' , updateHandler)

        }
    },[pusherKey])

  return (
    <><GroupChatModal users={users} isOpen={isModalOpen} onClose={()=> setIsModalOpen(false)}/>
     <aside
    className={clsx(`
    fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto
    border-r border-gray-2/70 
    ` , 
    isOpen ? "hidden" : "block w-full left-0"
    )}>
        <div
        className='px-5'
        >
            <div
            className='flex justify-between items-center mb-4 pt-4 '
            >
                <div
                className='text-2xl font-bold text-foreground'>
                    Messages
                </div>
                <div onClick={()=> setIsModalOpen(true)}
                 className="rounded-full  bg-gray-2/40 cursor-pointer
                hover:opacity-70 transition">
                <MdOutlineGroupAdd size={24}/>
                </div>
            </div>
            {items?.map((item)=> (
                <ConversationBox key={item.id} data={item} selected={conversationId === item.id}/>
            ))}
        </div>
    </aside>
    </>
   
  )
}

export default ConversationList