import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { Navbar } from '../components'

const HomeLayOut = () => {
  const [theUser, setTheUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))

    if (!user?.name){
      navigate("/login")
    }

    setTheUser(user)
  },[])

  if (!theUser){
    return <h1>Login first</h1>
  }

  return (
    <main className='bg-white'>
      <Navbar theUser={theUser} />
      <section className='max-w-4xl mx-auto p-2 w-full h-screen text-black md:p-2'>
          <Outlet context={{theUser}}/>
      </section>
    </main>
  )
}

export default HomeLayOut