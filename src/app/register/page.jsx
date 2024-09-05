"use client"


import React,{useState} from 'react'
import Navbar from '../components/Navbar'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { MailAction } from '../components/actions/MailAction'

export default function RegisterPage() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const [success , setSuccess] = useState('')

    const {data:session}= useSession();
    if(session) redirect("/welcome")

    const handleRegister = async(e) => {
        e.preventDefault();
        if(password !== confirmPassword){
            setError("Password does not match")
            return;
        }
        if(!name || !email || !password || !confirmPassword){
            setError("Please fill all the fields")
            return;
        }
        try {

            const resCheckUser = await fetch("http://localhost:3000/api/checkuser", {
                method:"POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({email})
            })
            const data = await resCheckUser.json();
            console.log(data)
            if(data.dataUser){
                setError("User already exists")
                return;
            }

            const res = await fetch("http://localhost:3000/api/register", {
                method:"POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    email,
                    password
                })
            })



            if(res.ok){
                const form = e.target;

                const data = await MailAction({email})
                if(data.message){
                    setSuccess("User created successfully and verification link sent to your email");
                }
                setError("");
                
                form.reset();
            }else{
                console.log("Something went wrong")
            }

        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div>
      <Navbar/>
      <div className='container mx-auto py-5'>
        <h3>Register Page</h3>
        <hr className='m-y3'/>
        <form onSubmit={handleRegister}>
            {error && <p className='text-red-500'>{error}</p>}
            {success && <p className='text-green-500'>{success}</p>}
            <input onChange={(e)=> setName(e.target.value)} className='block bg-gray-200 p-2 my-2 rounded-md' type="text" placeholder='Enter your name' />
            <input onChange={(e)=> setEmail(e.target.value)} className='block bg-gray-200 p-2 my-2 rounded-md' type="email" placeholder='Enter your email' />
            <input onChange={(e)=> setPassword(e.target.value)} className='block bg-gray-200 p-2 my-2 rounded-md' type="password" placeholder='Enter your password' />
            <input onChange={(e)=> setConfirmPassword(e.target.value)} className='block bg-gray-200 p-2 my-2 rounded-md' type="password" placeholder='Confirm your password' />
            <button type='submit' className='block bg-green-200 p-2 my-2 rounded-md'>Register</button>
        </form>
      </div>
    </div>
  )
}
