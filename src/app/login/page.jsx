"use client"


import React,{useState} from 'react'
import Navbar from '../components/Navbar'
import {signIn} from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'




export default function RegisterPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const router = useRouter();
    const {data:session}= useSession();
    if(session) router.replace("/welcome")

    const handleLogin = async(e) => {
        e.preventDefault();
    try {
        const res = await signIn('credentials', {
            email,password,redirect:false
        })
        
        if(res.error){
            setError(res.error)
            return
        }
        

        router.replace("welcome")
        
    } catch (error) {
        console.log(error);
    }
    
    
    }
  return (
    <div>
      <Navbar/>
      <div className='container mx-auto py-5'>
        <h3>Login Page</h3>
        <hr className='m-y3'/>
        <form onSubmit={handleLogin}>
        {error && <p className='text-red-500'>{error}</p>}
       
            <input onChange={(e)=> setEmail(e.target.value)} className='block bg-gray-200 p-2 my-2 rounded-md' type="email" placeholder='Enter your email' />
            <input onChange={(e)=> setPassword(e.target.value)} className='block bg-gray-200 p-2 my-2 rounded-md' type="password" placeholder='Enter your password' />
            <button type='submit' className='block bg-green-200 p-2 my-2 rounded-md'>Login</button>
        </form>
      </div>
    </div>
  )
}
