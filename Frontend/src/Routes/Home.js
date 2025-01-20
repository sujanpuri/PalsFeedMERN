import React from 'react'
import Data from '../Components/Data'

const Home = () => {
  return (
    <div className='bg-light m-2 h-full w-full'>
      Add Post:
      <form action="submit">
        Name:
        <input type='text' className='border-2 border-gray-300' />
        <br />
        User:
        <input list='suggestion' type="text" className='border-2 border-gray-300' />
        <datalist id='suggestion'>
          <option value="Sujan">Sujan Puri</option>
          <option value="Ankit">Ankit Khanal</option>
          <option value="Sabin">Sabin Bhandari</option>
        </datalist>
      </form>
      <Data />
    
    
    </div>
  )
}

export default Home