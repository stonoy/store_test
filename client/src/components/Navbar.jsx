import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { customApiCall } from '../utils'
import { toast } from 'react-toastify'

const Navbar = ({theUser}) => {
    const [submitting, setSubmitting] = useState(false)

    const navigate = useNavigate()

    const logout = async () => {
        setSubmitting(true)

        try {
            await customApiCall.post("/user/logout")
            localStorage.clear()
            navigate("/login")
        } catch (error) {
            console.log(error?.response?.data?.msg)
            toast.error(error?.response?.data?.msg)
        }

        setSubmitting(false)
    }

  return (
    <div className='bg-base-100 w-full'>
        <div className="navbar shadow-sm max-w-4xl mx-auto p-2 md:p-2">
  <div className="flex-1">
    <Link to="/" className="btn btn-ghost text-xl">Store</Link>
  </div>
  <div className="flex-none ">
    <ul className="menu menu-horizontal items-center px-1">
      <li className='text-md capitalize'>{theUser?.name}</li>
      <li>
        <details>
          <summary>Menu</summary>
          <ul className="bg-base-100 rounded-t-none p-2">
            {theUser?.role === "admin" && <li><Link to="/users">Users</Link></li>}
            <li><button disabled={submitting} onClick={logout}>Logout</button></li>
          </ul>
        </details>
      </li>
    </ul>
  </div>
</div>
    </div>
  )
}

export default Navbar