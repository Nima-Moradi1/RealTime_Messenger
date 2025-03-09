'use client'

import React, { useCallback } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import Input from '@/components/inputs/Input'
import Button from '@/components/Button'
import AuthSocialButton from './AuthSocialButton'
import { BsGithub, BsGoogle } from 'react-icons/bs'

type Variant = 'LOGIN' | 'REGISTER'

const AuthForm = () => {

    const [variant,setVariant] = React.useState<Variant>('LOGIN')
    const [isLoading , setIsLoading] = React.useState(false)

    const toggleVariant = useCallback(()=> {
        if(variant === 'LOGIN'){
            setVariant('REGISTER')
        }else {
            setVariant('REGISTER')
        }
    },[variant]) ;

    const {handleSubmit , register, formState : {errors}} = useForm<FieldValues>({
        mode : 'onTouched' , 
        defaultValues : {
            name : '' , 
            email : '' , 
            password : ''
        }
    })

    const onSubmit : SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)
        if(variant === 'REGISTER') {
            // Axios register
        } else {
            //Next auth SignIn function 
        }
    }

    const socialAction = (action : string) => {
        setIsLoading(true)
        // Nextauth Social SignIn
    }

  return (
    <div
    className='mt-8 mx-4 sm:mx-auto sm:w-full sm:max-w-md'
    >
        <h2
            className='mb-6 text-center text-3xl font-bold tracking-tight text-foreground'
            >
                {variant === 'REGISTER' ? "Create an Account" : "Sign in to Your Account"}
            </h2>
        <div
        className='bg-background px-4 py-8 shadow-sm rounded-lg sm:px-10'
        >
            <form
            className='space-y-6'
            onSubmit={handleSubmit(onSubmit)}
            >
                {variant === 'REGISTER' && 
                (
        <Input errors={errors} register={register} id='name' label='Name'/>
    )
}
        <Input errors={errors} register={register} id='email' label='Email Address' type='email'/>
        <Input errors={errors} register={register} id='password' label='Password' type='password'/>

        <div>
            <Button
            disabled={isLoading}
            fullWidth
            type='submit'
            >{variant === 'LOGIN' ? 'Sign in' : 'Register'}</Button>
        </div>
            </form>
            {/* this is a line seperator and the text between */}
            <div
            className='mt-6'
            >
                <div
                className='relative'
                >
                    <div
                    className='absolute inset-0 flex items-center'
                    >
                        <div 
                        className='w-full border-t border-gray'/>
                    </div>
            <div
            className='relative flex justify-center text-sm'
            >
                <span
                className='bg-background px-2 text-gray'
                >
                    Or continue with
                </span>
            </div>
                </div>

            <div className='mt-6 flex gap-3'>
                <AuthSocialButton icon={BsGithub} onClick={()=> socialAction('github')}/>
                <AuthSocialButton icon={BsGoogle} onClick={()=> socialAction('google')}/>
            </div>
            </div>
            {/* the section to toggle between register and login */}
            <div className='flex gap-2 justify-center text-sm mt-6 px-2 text-foreground/60'>
            {variant === 'LOGIN' ? "New to Nimagram ? " : "Already have an Account ?"}
            <div onClick={toggleVariant}
            className='underline cursor-pointer text-foreground'>
                {variant === 'LOGIN' ? 'Create an Account' : 'Login'}
            </div>
            </div>
        </div>
    </div>
  )
}

export default AuthForm