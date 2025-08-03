import React, { useState } from 'react'
import { IoIosArrowDropdown } from "react-icons/io";
import { IoIosArrowDropup } from "react-icons/io";
import { toast } from 'react-toastify';
import { customApiCall } from '../utils';
import { ImSpinner9 } from 'react-icons/im';
import { useNavigate } from 'react-router-dom';

const UserTab = ({_id, name,email, forRequests = false}) => {
    const [show, setShow] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const navigate = useNavigate()

    const arrowBtn = show ? <IoIosArrowDropup/> : <IoIosArrowDropdown/>

    const authenticate = async (userId) => {
        setSubmitting(true)

        try {
            const resp = await customApiCall.patch("/user/authenticate", {userId, permission: true})
            navigate(0)
            toast.success(resp?.data?.msg)
        } catch (error) {
            toast.error(error?.resp?.data?.msg)
        }

        setSubmitting(false)
    }

  return (
    <div className='border-2 border-slate-500 bg-gray-300'>
        <div className='w-full shadow-lg text-black p-2 flex justify-between items-center md:p-4'>
        <h1>{name}</h1>
        {
            forRequests && <button onClick={() => setShow(prev => !prev)}>{arrowBtn}</button>
        }
    </div>
    {
            show && <div className='p-2 flex justify-between items-center md:p-4'>
                <h1>{email}</h1>
                <button disabled={submitting} onClick={() => authenticate(_id)} className='py-2 px-1 text-center rounded-md border-2 border-zinc-500'>
                    {
                                      submitting ?
                                      <ImSpinner9 className="animate-spin"/>
                                      :
                                      "Authenticate"
                                    }
                </button>
            </div>
        }
    </div>
  )
}

export default UserTab