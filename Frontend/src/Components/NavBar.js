import React from 'react'
import '@fontsource/ubuntu'; // Default weight
import '@fontsource/ubuntu/400.css'; // Regular weight
import '@fontsource/ubuntu/700.css'; // Bold weight


import logo from '../Images/logo.png'

const NavBar = () => {
  return (
    <div className='bg-mainCol w-full p-2 flex justify-between items-center'>
        <div className='flex items-center'>
            <img src={logo} alt="Logo" className='h-11'/>
            <h1 className='text-4xl ml-4 font-bold font-ubuntu'>PALSFEED</h1>
        </div>
        <div className='flex items-center gap-3'>
            <div>
                User_Name
            </div>
            <div>
                User_Photo

            </div>
        </div>
    </div>
  )
}

export default NavBar