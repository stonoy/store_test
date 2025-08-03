import React from 'react'
import { useOutletContext } from 'react-router-dom'

const DashBoard = () => {
  const {theUser} = useOutletContext()
  return (
    <div className="flex h-screen justify-center items-center">
      <h1 className='text-2xl font-bold text-green-500'>Welcome {theUser?.role === "admin" ? "Admin" : "User"}</h1>
    </div>
  )
}

export default DashBoard