import Sidebar from '@/components/sidebar/Sidebar'
import React from 'react'
import ConversationList from './components/ConversationList'
import getConversations from '@/actions/getConversations'
import getUsers from '@/actions/getUsers'

const layout = async ({children} : {children : React.ReactNode}) => {

    const conversations = await getConversations()
    const users = await getUsers() ;

  return (
        <Sidebar>
            <div className='h-full'>
                <ConversationList
                users={users}
                initialItems={conversations}/>
        {children}
            </div>
        </Sidebar>
        
  )
}

export default layout