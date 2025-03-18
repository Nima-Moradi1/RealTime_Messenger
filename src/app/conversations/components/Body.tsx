'use client'
import useConversation from '@/hooks/useConversation';
import { FullMessageType } from '@/types'
import React, { useEffect, useRef } from 'react'
import MessageBox from './MessageBox';
import axios from 'axios';
import { pusherClient } from '@/libs/pusher';
import { find } from 'lodash';


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
  //Subscribe to pusher 
  useEffect(()=> {
    pusherClient.subscribe(conversationId) ;
    bottomRef.current?.scrollIntoView();

    const messageHandler = (message : FullMessageType) => {
      axios.post(`/api/conversations/${conversationId}/seen`)
      // We Simply Check if the new message that has arrived is already in the list of our
      // Messages or not, so we Prevent message Duplicating.
      setMessages((current)=> {
        if(find(current , {id : message.id})) {
          return current ;
        }
        return [...current , message];
      })
      bottomRef.current?.scrollIntoView();
    }
    const updateMessageHandler = (newMsg : FullMessageType) => {
      setMessages((current)=> current.map((msg)=> {
        if(msg.id === newMsg.id) {
          return newMsg;
        }
        return msg;
      }))
    }

    pusherClient.bind('messages:new' , messageHandler) ;
    pusherClient.bind('messages:update' , updateMessageHandler);
    //Cleanup function
    return () => {
      pusherClient.unsubscribe(conversationId)
      pusherClient.unbind('messages:new' , messageHandler) ;
      pusherClient.unbind('messages:update' , updateMessageHandler) ;
    }
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