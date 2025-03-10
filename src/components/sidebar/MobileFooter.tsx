'use client'

import useConversation from '@/hooks/useConversation'
import useRoutes from '@/hooks/useRoutes'
import React from 'react'
import MobileItem from './MobileItem'

const MobileFooter = () => {
    const routes = useRoutes()
    const {isOpen} = useConversation()

    if(isOpen) return null;

  return (
    <div
    className='fixed justify-between w-full bottom-0 z-40 flex items-center bg-background
    border-t- lg:hidden'
    >
        {
            routes?.map((route) => (
                <MobileItem 
                key={route.label} label={route.label} 
                active={route.active} icon={route.icon}
                onClick={route.onClick} href={route.href}
                />
            ))
        }
    </div>
  )
}

export default MobileFooter