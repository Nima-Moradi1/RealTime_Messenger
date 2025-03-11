'use client'

import clsx from 'clsx'
import React from 'react'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'


interface MessageInputProps {
    id : string , 
    placeholder? : string ,
    type?:string ,
    required? : boolean
    register : UseFormRegister<FieldValues>
    errors: FieldErrors
}

const MessageInput : React.FC<MessageInputProps> = ({register , errors , type , required , placeholder , id}) => {
  return (
    <div className='relative w-full'>
        <input
        className={clsx(`text-foreground font-light py-2 px-4 bg-background 
        border-gray w-full rounded-full focus:outline-none` ,
            errors[id] && "focus:ring-destructive"
    )}
        type={type} id={id}
        {...register(id , {required})}
        placeholder={placeholder}
        />
    </div>
  )
}

export default MessageInput