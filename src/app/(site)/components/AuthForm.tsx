'use client'

import React, { useCallback, useEffect } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import Input from '@/components/inputs/Input'
import Button from '@/components/Button'
import AuthSocialButton from './AuthSocialButton'
import { BsGithub, BsGoogle } from 'react-icons/bs'
import axios from 'axios'
import toast from 'react-hot-toast'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

type Variant = 'LOGIN' | 'REGISTER'

const AuthForm = () => {

    //Here, we check if the user is authenticated to redirect it (save user auth by context)
    const router = useRouter()
    const session = useSession()
    useEffect(()=> {
        if(session?.status === 'authenticated') {
            router.push('/users')
        }
    },[session?.status,router])

    const [variant,setVariant] = React.useState<Variant>('LOGIN')
    const [isLoading , setIsLoading] = React.useState(false)

    const toggleVariant = useCallback(()=> {
        if(variant === 'LOGIN'){
            setVariant('REGISTER')
        }else {
            setVariant('LOGIN')
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
            // We use Axios and register api
            axios.post('/api/register' , data)
            .then(()=> signIn('credentials',data))
            .catch(()=> toast.error('Something went wrong!'))
            .finally(()=> setIsLoading(false))
        } else {
            //Next auth SignIn function 
            signIn('credentials' , {
                ...data , 
                redirect : false
            })
            .then((callback)=> {
                if(callback?.error) {
                    toast.error('Invalid Credentials')
                }
                if(callback?.ok && !callback?.error) {
                    toast.success('Successfully Logged In!')
                    router.push('/users')
                }
            })
            .finally(()=> setIsLoading(false))
        }
    }

    const socialAction = (action : string) => {
        setIsLoading(true)
        // Nextauth Social SignIn
        signIn(action , {
            redirect: false
        })
        .then((callback)=> {
            if(callback?.error) {
                toast.error('Invalid Credentials')
            }
            if(callback?.ok && !callback?.error) {
                toast.success('Successfully Logged In!')
                router.push('/users')
            }
        })
        .finally(()=> setIsLoading(false))
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
        <Input disabled={isLoading} errors={errors} register={register} id='name' label='Name'/>
    )
}
        <Input  errors={errors} register={register} id='email' label='Email Address' type='email'/>
        <Input  errors={errors} register={register} id='password' label='Password' type='password'/>

        <div>
            <Button
            disabled={isLoading}
            fullWidth
            type='submit'
            >{isLoading ? "Loading ..." : variant === 'LOGIN' ? 'Sign in' : 'Register'}</Button>
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