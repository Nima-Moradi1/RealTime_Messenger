'use client'

import { MdOutlineGroupAdd } from "react-icons/md";
import useConversation from '@/hooks/useConversation';
import { FullConversationType } from '@/types'
import clsx from 'clsx';
import React, { useState } from 'react'
import ConversationBox from "./ConversationBox";
import GroupChatModal from "./GroupChatModal";
import { User } from "@prisma/client";

const ConversationList = ({initialItems , users}:{initialItems : FullConversationType[] , users : User[]}) => {

    const [items , setItems] = useState(initialItems);
    const [isModalOpen , setIsModalOpen] = useState(false) ;

    const {conversationId,isOpen} = useConversation()


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