
import { IconType } from 'react-icons'
import React from 'react'

interface AuthSocialButtonProps {
    icon : IconType ,
    onClick : () => void
}

const AuthSocialButton : React.FC<AuthSocialButtonProps> = ({icon:Icon , onClick}) => {
  return (
   <button
   type='button'
   onClick={onClick}
   className='inline-flex w-full justify-center rounded-md bg-background px-4 py-2 text-foreground/60 shadow-sm ring-1 hover:bg-gray-50
   focus:outline-offset-0 cursor-pointer'
   >
    <Icon />
   </button>
  )
}

export default AuthSocialButton