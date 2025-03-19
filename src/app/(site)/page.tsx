import Image from 'next/image'
import React from 'react'
import AuthForm from './components/AuthForm'
import getSession from '@/actions/getSession'
import { redirect } from 'next/navigation'

const page = async () => {
  const {user} = await getSession() || {}
  if(user) {
    redirect('/conversations')
  }
  return (
    <div
    className='flex min-h-full flex-col justify-center lg:pt-12 sm:px-6 lg:px-8 bg-gray-100 dark:bg-background/80 '>
   <div
   className='sm:mx-auto sm:w-full sm:max-w-md'
   >
    <Image src='/images/logo.png' alt='logo' height={170} width={250}
    className='mx-auto w-auto'/>
 
   </div>
   {/* our authForm starts here */}
   <AuthForm />
    </div>
  )
}

export default page