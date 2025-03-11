'use client'
import useConversation from '@/hooks/useConversation';
import { FullMessageType } from '@/types'
import React, { useEffect, useRef } from 'react'
import MessageBox from './MessageBox';
import axios from 'axios';


interface BodyProps {
    initialMessages: FullMessageType[]
}

const Body : React.FC<BodyProps> = ({initialMessages}) => {

  const [messages , setMessages] = React.useState(initialMessages);
  const bottomRef = useRef<HTMLDivElement>(null);

  const {conversationId} = useConversation()
  //When entering a new chat , send a post request to the seen messages to check
  useEffect(()=> {
    axios.post(`/api/conversations/${conversationId}/seen`)
  },[conversationId])


  return (
    <div className='flex-1 overflow-y-auto'>
      {messages?.map((message , i)=> (
        <MessageBox key={message?.id} data={message} isLast={i === messages.length - 1}/>
      ))}
        <div ref={bottomRef} className='pt-24'/>
    </div>
  )
}

export default Body