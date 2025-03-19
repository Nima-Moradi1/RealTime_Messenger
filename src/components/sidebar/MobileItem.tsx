/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import clsx from 'clsx'
import Link from 'next/link'
import React from 'react'

interface MobileItemProps {
    label : string , 
    icon : any, 
    href : string,
    onClick? : () => void , 
    active? : boolean
}

const MobileItem : React.FC<MobileItemProps> = ({label , icon:Icon , href , onClick , active}) => {

    const handleClick = () => {
        if(onClick) return onClick();
    }

  return (
    <Link
    className={clsx(`
        group flex gap-x-3 text-sm leading-6 font-semibold rounded-r-lg
        w-full justify-center p-4 hover:text-foreground hover:bg-gray-2
        ` , 
    active && "bg-gray-2 text-foreground"
    )}
    href={href} onClick={handleClick}>
    <Icon className='size-6'/>
    <span className='sr-only'>{label}</span>
    </Link>
  )
}

export default MobileItem