'use client'

import React from 'react'
import clsx from 'clsx'


interface ButtonProps {
    type? : 'button' | 'submit' | 'reset' | undefined ,
    fullWidth? : boolean
    children? : React.ReactNode ,
    onClick? : () => void ,
    secondary? : boolean
    danger? : boolean
    disabled? : boolean
}

const Button : React.FC<ButtonProps> = ({type,fullWidth,children,onClick,secondary,danger,disabled}) => {
  return (
    <button
    onClick={onClick}
    type={type}
    disabled={disabled}
    className={clsx(`
        flex justify-center rounded-lg py-2 px-3 text-sm font-semibold cursor-pointer
         focus-visible:outline-2 focus-visible:outline-offset-2
        ` ,
    disabled && "opacity-50 cursor-default" , 
    fullWidth && "w-full" , 
    danger && "bg-destructive/90 hover:bg-destructive focus-visible:outline-destructive" , 
    secondary ? "text-foreground" : "text-primary-foreground" ,
    !secondary && !danger && "bg-primary/90 hover:bg-primary focus-visible:outline-primary"
    )}
    >
{children}
    </button>
  )
}

export default Button