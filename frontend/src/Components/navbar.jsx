import React from 'react'

const NavBar = ({userName}) => {
    const name=userName
  return (
    <div className='flex flex-row w-screen h-10 items-center justify-between bg-blue-200 p-2'>
        <div className='font-bold text-2xl'>PalsFeed</div>
        <div className='font-semibold'>{name? name: "Name Props sent failed..."}</div>
    </div>
  )
}

export default NavBar