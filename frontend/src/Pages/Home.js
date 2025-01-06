import React from 'react'
import { Link } from 'react-router-dom'


export default function Home() {

  return (
    <div>
      <div className=' bg-slate-200 bg-opacity-50 h-screen flex justify-center items-center  text-white' >
        <div className='flex gap-3' >
          <Link to="/departments" className='bg-black p-3 rounded active:scale-90 transition-all' >Generate a TimeTable</Link>
          {/* <Link to="/timetables" className='bg-black p-3 rounded active:scale-90 transition-all' >Regenerate a TimeTable</Link> */}
          </div>
      </div>
    </div>
  )
}
