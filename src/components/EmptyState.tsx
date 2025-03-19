import React from 'react'

const EmptyState = () => {
  return (
    <div
    className='px-4 py-10 sm:px-6 lg:px-8 h-full flex justify-center bg-gray-2 dark:bg-gray-950'
    >
        <div
        className='text-center items-center flex justify-center flex-col'>
            <h3
            className='mt-2 text-2xl font-semibold text-foreground'
            >Select a chat or start a conversation</h3>
        </div>
    </div>
  )
}

export default EmptyState