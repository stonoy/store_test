import React, { useState } from 'react'
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";

const InputBox = ({name, type, forPassword = false}) => {
  const [show, setShow] = useState(false)

  const eyeCss = 'absolute right-2 top-3'

  const eyeBtn = show ? <FaEyeSlash className={eyeCss} onClick={() => setShow(false)}/> : <FaEye className={eyeCss} onClick={() => setShow(true)}/>
  return (
    <div className='flex gap-2 flex-col'>
        <label className='capitalize'>{name}</label>
        <div className='relative'>
          <input className='bg-white p-1 rounded-md border-2 border-gray-500' type={show ? "text" : type} name={name} />
          {
            forPassword && eyeBtn
          }
        </div>
    </div>
  )
}

export default InputBox