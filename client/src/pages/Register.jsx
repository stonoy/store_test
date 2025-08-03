import React, { useRef, useState } from 'react'
import { InputBox } from '../components'
import { ImSpinner9 } from "react-icons/im";
import { Link, useNavigate } from 'react-router-dom';
import { customApiCall } from '../utils';
import { toast } from 'react-toastify';

const Register = () => {
  const [submitting, setSubmitting] = useState(false)
  const formRef = useRef()
  const navigate = useNavigate()

  const register = async (e) => {
    e.preventDefault()
    const formData = new FormData(formRef.current)
    const data = Object.fromEntries(formData)

    setSubmitting(true)

    try {
        await customApiCall.post("/user/register", data)
        navigate("/login")
    } catch (error) {
        console.log(error?.response?.data?.msg)
        toast.error(error?.response?.data?.msg)
    }

    setSubmitting(false)
  }
  
    return (
      <section className='flex justify-center items-center w-full h-screen bg-white'>
          <form ref={formRef} className='flex gap-2 flex-col items-center justify-start bg-gray-200 text-slate-700 p-2 shadow-lg border-2 md:p-4 md:gap-2'>
              <h1>Register</h1>
              <InputBox type="text" name="name" />
              <InputBox type="text" name="email" />
              <InputBox type="password" name="password" forPassword={true}/>
              <button disabled={submitting} onClick={register} className='w-full mt-2 py-1 px-2 border-2 rounded-md border-green-400'>
                  {
                    submitting ?                   
                     <span className='flex justify-center gap-2 items-center'>
                                         <ImSpinner9 className="animate-spin"/>
                                         <span>Submitting</span>
                                       </span>                 
                    :
                    "Submit"
                  }
              </button>
              <div>
                <p>Already a user <Link className='underline' to="/login">Login</Link></p>
              </div>
          </form>
      </section>
    )
}

export default Register