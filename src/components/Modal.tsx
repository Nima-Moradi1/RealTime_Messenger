"use client"

import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react';
import React, { Fragment } from 'react'
import { IoClose } from 'react-icons/io5';

interface ModalProps {
    isOpen? : boolean ;
    onClose : () => void ;
    children: React.ReactNode
}

const Modal : React.FC<ModalProps> = ({onClose , isOpen , children}) => {

  return (
    <Transition show={isOpen} as={Fragment}>
        <Dialog onClose={onClose} as='div' className='relative z-50'>
            <TransitionChild
            as={Fragment} enter='ease-out duration-300'
            enterFrom='opacity-0' enterTo='opacity-100'
            leave='ease-in duration-200' leaveFrom='opacity-100' leaveTo='opacity-0'>
                <div className='fixed inset-0 bg-gray/60 transition-opacity'/>
            </TransitionChild>
            <div className='fixed inset-0 z-50 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center sm:p-0'>
                <TransitionChild as={Fragment} 
                enter='ease-out duration-300' enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                enterTo='opacity-100 translate-y-0 sm:scale-100'
                leave='ease-in duration-200' leaveFrom='opacity-100 translate-y-0 scale-100'
                leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'>
                    <DialogPanel
                    className='relative transform overflow-hidden rounded-lg bg-background px-4
                    pb-4 text-left shadow-xl transition-all w-full sm:my-8 sm:w-full sm:max-w-lg sm:p-6'>
                        <div
                        className='absolute right-0 top-0 hidden pr-4 pt-4 sm:block z-10'>
                            <button type='button' onClick={onClose}
                            className='rounded-lg bg-background text-gray hover:text-foreground/70
                            focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'>
                                <span className='sr-only'>Close</span>
                                <IoClose className='size-6'/>
                            </button>
                        </div>
                        {children}
                    </DialogPanel>
                </TransitionChild>
            </div>
            </div>
        </Dialog>
    </Transition>
  )
}

export default Modal