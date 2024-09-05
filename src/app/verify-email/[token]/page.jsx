'use client'
import React, { useEffect } from 'react'
import { VerifyEmailAction } from '@/app/components/actions/VerifyEmailAction'
export default function VerifyEmail({params}) {
    const token = params.token
    useEffect(() => {
      
      const data =  VerifyEmailAction({ token })
      if(data.message){
        console.log(data.message)
      }
    },[token])
  return (
    <div>
      <h1>VerifyEmail</h1>
     <h1>Success</h1>

      </div>
  )
}
