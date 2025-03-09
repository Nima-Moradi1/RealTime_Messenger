import Image from 'next/image'
import React from 'react'

const page = () => {
  return (
    <div
    className='flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-100 '>
   <div
   className='sm:mx-auto sm:w-full sm:max-w-md'
   >
    <Image src='/images/logo.png' alt='logo' height={100} width={100}
    className='mx-auto w-auto'/>
    <h2
    className='mt-6 text-center text-3xl font-bold tracking-tight text-gray-900'
    >
Sign in to Your Account
    </h2>
   </div>
   {/* our authForm starts here */}
    </div>
  )
}

export default page