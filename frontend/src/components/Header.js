import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <div className=' bg-black bg-opacity-80 text-white py-4   fixed w-screen overflow-hidden  ' >

      <Link to={"/"} className='font-bold text-2xl text-center' > <h1>TimeTable Generater</h1></Link>
    
    </div>
  )
}
