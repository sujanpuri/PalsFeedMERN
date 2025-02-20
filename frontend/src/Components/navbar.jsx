import React from 'react'

const NavBar = ({userName}) => {
    const name=userName
  return (
    <div className='flex flex-row w-screen justify-between bg-blue-200'>
        <div>PalsFeed</div>
        <div>{name? name: "Name Props sent failed..."}</div>
    </div>
  )
}

export default NavBar