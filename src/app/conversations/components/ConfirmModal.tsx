import Button from '@/components/Button'
import Modal from '@/components/Modal'
import useConversation from '@/hooks/useConversation'
import { DialogTitle } from '@headlessui/react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useCallback } from 'react'
import toast from 'react-hot-toast'
import {FiAlertTriangle} from 'react-icons/fi'

interface ConfirmModalProps {
    isOpen? : boolean , 
    onClose : () => void
}

const ConfirmModal : React.FC<ConfirmModalProps> = ({isOpen , onClose}) => {

    const router = useRouter()
    const {conversationId} = useConversation()
    const [isLoading, setIsLoading] = React.useState(false);

    const onDelete = useCallback(()=> {
        setIsLoading(true) ; 
        axios.delete(`/api/conversations/${conversationId}`)
        .then(()=> 
        {
            onClose();
        router.push('/conversations');
        router.refresh()
        }
        )
        .catch(()=> toast.error('Something went Wrong!'))
        .finally(()=> setIsLoading(false))
    },[conversationId, onClose, router])

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
        <div className='sm:flex sm:items-start'>
            <div className='mx-auto flex size-12 shrink-0 items-center justify-center rounded-full
            bg-destructive/10 sm:mx-0 sm:size-10'>
                <FiAlertTriangle className='size-6 text-destructive'/>
          </div>
          <div className='mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left'>
            <DialogTitle as='h3' 
            className='text-base font-semibold text-foreground leading-6'>
                Delete Conversation
            </DialogTitle>
            <div className='text-sm text-foreground/70 mt-2'>
                <p>
                    Are you sure you want to delete this conversation ?
                </p>
                <p>This action cannot be undone!</p>
            </div>
          </div>
        </div>
        <div className='mt-5 sm:mt-4 sm:flex sm:flex-row-reverse gap-3'>
            <Button disabled={isLoading} danger onClick={onDelete}>
                Delete
            </Button>
            <Button disabled={isLoading} secondary onClick={onClose}>
                Cancel
            </Button>
        </div>
    </Modal>
  )
}

export default ConfirmModal