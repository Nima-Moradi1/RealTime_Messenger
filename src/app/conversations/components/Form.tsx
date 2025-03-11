'use client'

import useConversation from '@/hooks/useConversation'
import axios from 'axios'
import React from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { HiPaperAirplane, HiPhoto } from 'react-icons/hi2'
import MessageInput from './MessageInput'
import {CldUploadButton} from 'next-cloudinary'

const Form = () => {

    const {conversationId} = useConversation()
    const {register , handleSubmit , setValue , formState : {errors}} = useForm<FieldValues>({
        defaultValues : {
            message : ''
        }
    })

    const onSubmit : SubmitHandler<FieldValues> = (data) => {
        setValue('message' , '' , {shouldValidate : true});
        axios.post('/api/messages' , {
            ...data , 
            conversationId : conversationId
        })
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleUpload = (result :any) => {
        axios.post('/api/messages' , {
            image : result?.info?.secure_url , 
            conversationId
        })
    }

  return (
    <div
    className='flex py-4 px-4 bg-background border-t border-gray/80 items-center gap-2 lg:gap-4 w-full'>
        <CldUploadButton 
        uploadPreset='dubh24hb'
        options={{maxFiles : 1}}
        onSuccess={handleUpload}>
        <HiPhoto size={30} className='text-primary'/>
        </CldUploadButton>
        <form
        className='flex items-center lg:gap-4 gap-2 w-full'
        onSubmit={handleSubmit(onSubmit)}>
            <MessageInput id='message' register={register}
            required errors={errors} placeholder='Write a Message'/>
            <button type='submit'
            className='rounded-full p-2 bg-primary hover:bg-primary/80 transition cursor-pointer'
            >
            <HiPaperAirplane size={18} className='text-background'/>
            </button>
        </form>
    </div>
  )
}

export default Form