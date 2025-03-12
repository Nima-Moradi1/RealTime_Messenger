/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { User } from '@prisma/client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import Modal from '../Modal'
import Input from '../inputs/Input'
import Image from 'next/image'
import { CldUploadButton } from 'next-cloudinary'
import Button from '../Button'

interface SettingsModalProps {
    isOpen? : boolean , 
    onClose : () => void , 
    currentUser : User
}

const SettingsModal : React.FC<SettingsModalProps> = ({isOpen , onClose , currentUser}) => {

    const router = useRouter()
    const [isLoading, setIsLoading] = React.useState(false)

    const {register , setValue , watch , handleSubmit , formState : {errors}} = useForm<FieldValues>({
        defaultValues : {
            name : currentUser?.name , 
            image : currentUser?.image
        }
    })

    const image = watch('image')
    

    const handleUpload = (result: any) => {
        setValue('image', result?.info?.secure_url, {
            shouldValidate: true
        });
        router.refresh()
    };
    const onSubmit : SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true) ;
        axios.post('/api/settings' , data)
        .then(()=> {
            router.refresh() 
            onClose() ;
        })
        .catch(()=> toast.error('Something went Wrong !'))
        .finally(()=> setIsLoading(false))
    }

  return (
    <>
    <Modal isOpen={isOpen} onClose={onClose}>
    <form onSubmit={handleSubmit(onSubmit)}>
    <div className='space-y-12'>
        <div className='pb-12'>
            <h2
            className='text-base font-semibold leading-7 text-foreground'
            >Profile
            </h2>
            <p className='mt-1 text-sm leading-6 text-foreground/50'>
                Edit your Information
            </p>
            <div className='mt-10 flex flex-col gap-y-6'>
                <Input disabled={isLoading} id='name' label='Name'
                errors={errors} register={register} required />
                <label
                className='block text-sm font-medium leading-6 text-foreground'
                >Photo
                </label>
                <div className='mt-2 flex items-center gap-x-3'>
                <Image width={60} height={60} className='rounded-full'
                 alt='upload' src={image || currentUser?.image || '/images/placeholder.jpg'}/>
                 <CldUploadButton options={{maxFiles : 1}}
                 onSuccess={handleUpload}
                 uploadPreset='dubh24hb'
                 >
                <div aria-disabled={isLoading} className='cursor-pointer text-sm border p-3 rounded-lg border-gray
                 text-foreground/90 aria-disabled:text-gray/80 aria-disabled:border-gray/50 aria-disabled:cursor-not-allowed'>
                    {isLoading ? 'Loading ... ' : "Change Profile Photo"}
                </div>
                 </CldUploadButton>
                </div>
            </div>
        </div>
        <div className='mt-6 flex items-center justify-end gap-x-6'>
            <Button type='submit' disabled={isLoading} fullWidth>
                Save
            </Button>
            <Button disabled={isLoading} secondary onClick={onClose}>
                Cancel
            </Button>
        </div>
    </div>
    </form>
    </Modal>
    </>
  )
}

export default SettingsModal