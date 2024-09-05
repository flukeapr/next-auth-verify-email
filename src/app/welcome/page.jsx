"use client"

import React from 'react'
import Navbar from '../components/Navbar'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

export default function WelcomePage() {
    const {data:session}= useSession();
    if(!session) redirect("/login")
    console.log(session);

  return (
    <div>
      <Navbar session={session}/>
      <div className="container mx-auto">
        <h3>welcome user</h3>
        <h1>{session.user.name}</h1>
      </div>
    </div>
  )
}