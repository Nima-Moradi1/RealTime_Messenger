import Sidebar from '@/components/sidebar/Sidebar'
import React from 'react'
import ConversationList from './components/ConversationList'
import getConversations from '@/actions/getConversations'

const layout = async ({children} : {children : React.ReactNode}) => {

    const conversations = await getConversations()

  return (
        <Sidebar>
            <div className='h-full'>
                <ConversationList initialItems={conversations}/>
        {children}
            </div>
        </Sidebar>
        
  )
}

export default layout