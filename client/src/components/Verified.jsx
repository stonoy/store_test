import React, { useEffect, useState } from 'react'
import { customApiCall } from '../utils'
import { toast } from 'react-toastify'
import UserTab from './UserTab'

const Verified = () => {
  const [verifieds, setVerifieds] = useState(null)
  
      useEffect(() => {
          async function fetchData(){
              try {
                  const resp = await customApiCall("/user/getauthenticateduser")
                  
                  setVerifieds(resp?.data?.authenticatedUsers)
              } catch (error) {
                  toast.error(error?.resp?.data?.msg)
              }
          }
  
          fetchData()
      }, [])
  
      if (!verifieds){
          return <h1>Loading...</h1>
      }
  
      if (verifieds.length === 0){
          return <h1>No verified users</h1>
      }
  
    return (
      <div>
          <h1 className='w-fit my-2 mx-auto font-semibold text-xl'>Verified Users</h1>
          <div className='flex flex-col gap-2 md:gap-4'>
              {
                  verifieds.map(user => <UserTab key={user._id} {...user}/>)
              }
          </div>
      </div>
    )
}

export default Verified