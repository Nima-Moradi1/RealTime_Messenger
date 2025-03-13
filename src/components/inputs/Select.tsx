/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React from 'react'
import ReactSelect from 'react-select'

interface SelectProps {
    label? : string  ,
    value? : Record<string , any> ,
    onChange : (value : Record<string , any>) => void , 
    options : Record<string , any>[] ,
    disabled? : boolean 
}

const Select : React.FC<SelectProps> = ({label , value , onChange , options , disabled}) => {
  return (
    <div
    className='z-[100]'>
        <label htmlFor=""
        className='block text-sm font-medium leading-6 text-foreground/90'>
            {label}
        </label>
        <div className='mt-2'>
            <ReactSelect isDisabled={disabled} value={value} onChange={onChange}
            isMulti options={options} 
            //I wrote this because auto-select is inside a modal and causes the z-index problems
            menuPortalTarget={document.body}
            styles={{
                menuPortal : (base) => ({
                    ...base , 
                    zIndex : 9999 , 
                    fontSize : '13px'
                })
            }}
            classNames={{
                control : () => 'text-sm'
            }}
            />
            
        </div>
    </div>
  )
}

export default Select