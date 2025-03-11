import { User } from '@prisma/client'
import React from 'react'
import UserBox from './UserBox'

interface UserListProps {
    items : User[]
}

const UserList : React.FC<UserListProps> = ({items}) => {
  return (
    <aside
    className='fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:block overflow-y-auto
    lg:w-80 w-full left-0 border-r border-gray-2'>
        <div
        className='px-5'>
            <div
            className='flex flex-col'>
                    <div
                    className='text-2xl font-bold text-foreground py-4'>
                        People
                    </div>
            </div>
            {items?.map((item)=> (
                <UserBox key={item.id} data={item}/>
            ))}
        </div>
    </aside>
  )
}

export default UserList