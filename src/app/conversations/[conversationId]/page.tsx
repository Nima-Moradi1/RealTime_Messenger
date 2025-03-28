import getConversationById from '@/actions/getConversationById'
import getMessages from '@/actions/getMessages'
import EmptyState from '@/components/EmptyState'
import React from 'react'
import Header from '../components/Header'
import Body from '../components/Body'
import Form from '../components/Form'

type Params = { conversationId: string };


const SingleConversation = async ({params}: { params: Promise<Params> }) => {
  const {conversationId} = await params
  const conversation = await getConversationById(conversationId)
  const messages = await getMessages(conversationId)

  if(!conversation) return (
    <div className='lg:pl-80 h-full'>
      <div className='h-full flex flex-col'>
      <EmptyState />
      </div>
    </div>
  )

  return (
    <div
    className='lg:pl-80 h-full'>
      <div className='h-full flex flex-col'>
      <Header conversation={conversation} />
      <Body initialMessages={messages}/>
      <Form />
      </div>
    </div>
  )
}

export default SingleConversation