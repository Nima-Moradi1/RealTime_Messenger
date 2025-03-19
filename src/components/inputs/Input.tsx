'use client'

import React from 'react'
import clsx from 'clsx'
import {
    FieldErrors , 
    FieldValues , 
    UseFormRegister
} from 'react-hook-form'

interface InputProps {
    label : string ,
    id : string , 
    type? : string , 
    required? : boolean , 
    register: UseFormRegister<FieldValues> ,
    errors : FieldErrors , 
    disabled? : boolean
}

const Input : React.FC<InputProps> = ({label,id,type,required,register,errors,disabled}) => {
  return (
    <div>
        <label htmlFor={id}
        className='block text-sm font-medium leading-6 text-foreground'
        >
            {label}
        </label>
        <div
        className='mt-2'
        >
        <input 
        className={clsx(`
            form-input
            text-black
            block 
            w-full
            rounded-lg
            border-0 py-1.5 shadow-sm
            ring-1 ring-inset ring-gray/80
            placeholder:text-gray
            focus:ring-2 focus:ring-inset focus:ring-primary
            sm:text-sm sm:leading-6` , 
        errors[id] && "focus:ring-destructive" ,
        disabled && "opacity-50 cursor-default"
        )}
        type={type} id={id} autoComplete={id} disabled={disabled}
            {...register(id , {required})}/>
        </div>
    </div>
  )
}

export default Input