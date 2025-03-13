'use client'

import Modal from '@/components/Modal'
import Image from 'next/image'
import React from 'react'

interface ImageModalProps {
    isOpen? : boolean , 
    onClose : () => void ,
    src? : string | null
}

const ImageModal : React.FC<ImageModalProps> = ({isOpen , onClose , src}) => {

    if(!src) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
        <div
        className='size-80'>
            <Image alt='image' 
            className='object-cover'
            fill
            src={src}/>
        </div>
    </Modal>
  )
}

export default ImageModal