/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React from 'react'
import clsx from 'clsx'
import Link from 'next/link'

interface DesktopItemProps {
    label : string , 
    icon : any, 
    href : string,
    onClick? : () => void , 
    active? : boolean
}

const DesktopItem : React.FC<DesktopItemProps> = ({label , icon : Icon, href , onClick , active}) => {
    const handleClick = () => {
        if(onClick) return onClick()
    }


  return (
    
    <li onClick={handleClick}>
        <Link className={clsx(`
        group flex gap-x-2 rounded-lg p-3 text-sm leading-6
        font-semibold hover:text-foreground hover:bg-gray-2/50` , 
    active && "bg-gray-2 text-foreground" ,
    !active && "text-foreground/70"
    )}
        href={href}>
        <Icon className='size-6 shrink-0'/>
        <span className='sr-only'>{label}</span>
        </Link>
    </li>
  )
}

export default DesktopItem