'use client'
import Button from '@/components/Button'
import Input from '@/components/inputs/Input'
import Select from '@/components/inputs/Select'
import Modal from '@/components/Modal'
import { User } from '@prisma/client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

interface GroupChatModalProps {
    isOpen? : boolean , 
    onClose : () => void
    users : User[]
}

const GroupChatModal : React.FC<GroupChatModalProps> = ({isOpen, onClose , users}) => {
    const router = useRouter()
    const [isLoading,setIsLoading] = React.useState(false);
    const {register , handleSubmit , setValue , watch , formState : { errors }} 
    = useForm<FieldValues>({
        defaultValues : {
            name : '' ,
            members : []
        }
    }) ;

    const members = watch('members')
    const onSubmit : SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        axios.post('/api/conversations' , {
            ...data , 
            isGroup : true
        })
        .then(()=>{
            router.refresh()
            onClose()
        })
        .catch(()=> {
            toast.error('Something went Wrong!')
        })
        .finally(()=> {
            setIsLoading(false)
        })
    }

  return (
    <>
    <Modal isOpen={isOpen} onClose={onClose} >
        <form onSubmit={handleSubmit(onSubmit)}>
            <div
            className='space-y-12 pt-4'>
                <div
                className='border-b border-foreground/10 pb-12'>
                    <h2
                    className='text-base font-semibold leading-7 text-foreground'>
                        Create a Group Chat
                    </h2>
                    <p
                    className='mt-1 text-sm leading-6 text-foreground/70'>
                        Create a Chat with more than 2 People
                    </p>
                    <div
                        className='mt-10 flex flex-col gap-y-8'>
                            <Input register={register} errors={errors}
                            id='name' label='Name' required disabled={isLoading}/>
                           <Select label='Members' disabled={isLoading}
                           options={users?.map((user)=> ({
                            value : user?.id ,
                            label : user?.name
                           }))}
                           onChange={(value)=> setValue('members' , value , {shouldValidate : true})}
                           value={members}
                           />
                                
                           
                    </div>
                </div>
            </div>
            <div
            className='mt-6 flex items-center justify-end gap-x-6'>
                <Button secondary disabled={isLoading} onClick={onClose} type='button'>
                    Cancel
                </Button>
                <Button disabled={isLoading} type='submit'>
                    Create Group
                </Button>
            </div>
        </form>
    </Modal>
    </>
  )
}

export default GroupChatModal