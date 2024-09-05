"use client"


import React from 'react'
import Link from 'next/link'
import { signOut } from 'next-auth/react'
export default function Navbar({session}) {
  return (
    <nav>
      <div className="sticky top-0 z-50 py-3   bg-gradient-to-r from-pink-200  to-purple-300">
        <div className="container px-4 mx-auto">
            <div className='flex items-center justify-between px-4'>
                <div>
                    <h1>Next Auth</h1>
                </div>
                <ul className='flex'>
                    {!session ? (
                    <>
                    <li className='mr-4'><Link href='/login'>Sign in</Link></li>
                    <li className='mr-4'><Link href='/register'>Sign up</Link></li>
                    </>
                ):(
                    <li className='mr-4'><a onClick={()=>signOut()} className='bg-red-500 text-white border py-2 px-3 rounded-md text-sm my-2' >log out</a></li>

                )}
                   
                </ul>
            </div>
        </div>

      </div>
    </nav>
  )
}
