'use client'

import useOtherUser from '@/hooks/useOtherUser';
import { Conversation, User } from '@prisma/client';
import { format } from 'date-fns';
import React, { Fragment, useMemo } from 'react'
import {Dialog, DialogPanel, Transition, TransitionChild} from '@headlessui/react'
import {IoClose} from 'react-icons/io5'
import Avatar from '@/components/Avatar';
import ConfirmModal from './ConfirmModal';
import Button from '@/components/Button';
import AvatarGroup from '@/components/AvatarGroup';


interface ProfileDrawerProps {
    isOpen : boolean ; 
    onClose : () => void ,
    data : Conversation & {
        users : User[]
    }
}

const ProfileDrawer : React.FC<ProfileDrawerProps> = ({isOpen,data,onClose}) => {
    const [confirmOpen , setConfirmOpen] = React.useState(false)
    const otherUser = useOtherUser(data)
    const joinedDate = useMemo(()=> {
        return format(new Date(otherUser.createdAt), 'PP')
    },[otherUser.createdAt])
    const title = useMemo(()=> {
        return data?.name || otherUser?.name
    },[data.name , otherUser.name])
    const statusText = useMemo(()=> {
        if(data.isGroup){
            return `${data?.users?.length} Members`
        }
        return 'Active'
    },[data])


  return (
    <>
    <ConfirmModal isOpen={confirmOpen} onClose={()=> setConfirmOpen(false)}/>
        
    <Transition show={isOpen} as={Fragment}> 
    <Dialog as='div' className='relative z-50' onClose={onClose}>
    <TransitionChild as={Fragment} enter='ease-out duration-500' enterFrom='opacity-0'
     enterTo='opacity-100' leaveFrom='opacity-100' leaveTo='opacity-0'>
        <div className='fixed inset-0 bg-foreground/80'/>
    </TransitionChild>
    <div
    className='fixed inset-0 overflow-hidden'>
        <div
        className='absolute inset-0 overflow-hidden'>
            <div
            className='pointer-events-none inset-y-0 justify-end flex max-w-full'>
                <TransitionChild as={Fragment} 
                enter='transform transition ease-in-out duration-500'
                enterFrom='translate-x-full' enterTo='translate-x-0'
                leave='transform transition ease-in-out duration-500'
                leaveTo='translate-x-full'>
                    <DialogPanel
                    className='pointer-events-auto w-screen max-w-md'
                    >
                        <div
                        className='flex min-h-screen flex-col overflow-y-scroll bg-background py-6 shadow-xl'>
                            <div className='px-4 sm:px-6'>
                                <div className='flex
                                items-start justify-end'>
                                    <div
                                    className='ml-3 flex h-7 items-center'>
                                         <button
                                         onClick={onClose}
                                         type='button'
                                         className='rounded-lg bg-background text-gray focus:outline-none
                                         hover:text-foreground/80 cursor-pointer
                                         focus:ring-2 focus:ring-primary focus:ring-offset-2'>
                                            <span className='sr-only'>
                                                Close Panel
                                            </span>
                                            <IoClose size={30}/>
                                         </button>
                                    </div>
                                </div>
                            </div>
                            <div className='relative mt-6 flex-1 px-4 sm:px-6'>
                                <div className='flex flex-col items-center'>
                                    <div className='mb-3'>
                                        {
                                            data.isGroup ? (
                                            <AvatarGroup users={data.users}/>
                                            ) : (
                                            <Avatar user={otherUser}/>  
                                            )
                                        }
                                    
                                    </div>
                                    <div>
                                    {title}
                                    </div>
                                    <div className='text-sm text-foreground/70'>
                                    {statusText}
                                    </div>
                                    <div className='w-full pb-5 pt-5 sm:px-0 sm:pt-0'>
                                <dl
                                className='space-y-8 px-4 sm:space-y-6 sm:px-6'>
                                    {
                                        data.isGroup && (
                                            <div>
                                                <dt
                                                className='text-base font-medium text-foreground/70 sm:shrink-0 sm:w-40'>
                                                    Members
                                                </dt>
                                                <dd
                                                className='mt-1 text-sm text-foreground sm:col-span-2'>
                                                    {data?.users?.map((user)=> (
                                                        <div key={user?.id}
                                                        className='flex flex-col gap-2 font-semibold'>
                                                            {user?.email}
                                                        </div>
                                                    ))}
                                                </dd>
                                            </div>
                                        )
                                    }
                                    {!data.isGroup && (
                                        <div>
                                            <dt
                                            className='text-sm font-medium text-foreground/70 sm:w-40 sm:shrink-0'>
                                                Email
                                            </dt>
                                            <dd
                                            className='mt-1 text-sm text-foreground sm:col-span-2'>
                                                {otherUser.email}
                                            </dd>
                                        </div>
                                    )}
                                    {!data.isGroup && (
                                        <>
                                        <hr />
                                        <div>
                                            <dt className='text-sm font-medium text-foreground/70
                                            sm:w-40 sm:shrink-0'>
                                                Joined
                                            </dt>
                                            <dd className='mt-1 text-sm text-foreground/90
                                            sm:col-span-2'>
                                                <time dateTime={joinedDate}>
                                                {joinedDate}
                                                </time>
                                            </dd>
                                        </div>
                                        </>
                                    )}
                                </dl>
                                    </div>
                                </div>
                                <Button fullWidth danger onClick={()=>setConfirmOpen(true)}>
                                 {
                                    data.isGroup ? 'Delete Group' : 'Delete Chat'
                                 }
                                </Button>
                            </div>
                        </div>
                    </DialogPanel>
                </TransitionChild>
            </div>
        </div>
    </div>
    </Dialog>
   </Transition>
    </>
   
  )
}

export default ProfileDrawer