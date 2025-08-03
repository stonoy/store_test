import React, { useRef, useState } from 'react'
import { InputBox } from '../components'
import { ImSpinner9 } from "react-icons/im";
import { Link, useNavigate } from 'react-router-dom';
import { customApiCall } from '../utils';
import { toast } from 'react-toastify';

const Login = () => {
    const [submitting, setSubmitting] = useState(false)
    const formRef = useRef()
      const navigate = useNavigate()
    
      const login = async (e) => {
        e.preventDefault()
        const formData = new FormData(formRef.current)
        const data = Object.fromEntries(formData)
    
        setSubmitting(true)
    
        try {
            const resp = await customApiCall.post("/user/login", data)
            localStorage.setItem("user", JSON.stringify(resp?.data?.theUser))
            navigate("/")
        } catch (error) {
            console.log(error?.response?.data?.msg)
            toast.error(error?.response?.data?.msg)
        }
    
        setSubmitting(false)
      }

      const testAdmin = async (e) => {
        e.preventDefault()
        const data = {email: "t1@gmail.com", password: "1234567"}
        setSubmitting(true)
    
        try {
            const resp = await customApiCall.post("/user/login", data)
            localStorage.setItem("user", JSON.stringify(resp?.data?.theUser))
            navigate("/")
        } catch (error) {
            console.log(error?.response?.data?.msg)
            toast.error(error?.response?.data?.msg)
        }
    
        setSubmitting(false)
      }

  return (
    <section className='flex justify-center items-center w-full h-screen bg-white'>
        <form ref={formRef} className='flex gap-2 flex-col items-center justify-start bg-gray-200 text-slate-700 p-2 shadow-lg border-2 md:p-4 md:gap-2'>
            <h1>Login</h1>
            <InputBox type="text" name="email" />
            <InputBox type="password" name="password" forPassword={true}/>
            <button disabled={submitting} onClick={login} className='w-full text-center mt-2 py-1 px-2 border-2 rounded-md border-green-400'>
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
            <div className='flex flex-col gap-2 mt-2 '>
                <button onClick={testAdmin} className='ml-auto text-center py-1 px-2 border-2 rounded-md border-zinc-400'>
                    {
                  submitting ?
                  <ImSpinner9 className="w-fit max-auto animate-spin"/>
                  :
                  "Test Admin"
                }
                </button>
                <p>New here <Link className='underline' to="/register">Register</Link></p>
              </div>
        </form>
    </section>
  )
}

export default Login