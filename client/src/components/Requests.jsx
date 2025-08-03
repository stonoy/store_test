import React, { useEffect, useState } from 'react'
import { customApiCall } from '../utils'
import { toast } from 'react-toastify'
import UserTab from './UserTab'

const Requests = () => {
    const [requests, setRequests] = useState(null)

    useEffect(() => {
        async function fetchData(){
            try {
                const resp = await customApiCall("/user/getuserrequest")
                
                setRequests(resp?.data?.userRequests)
            } catch (error) {
                toast.error(error?.resp?.data?.msg)
            }
        }

        fetchData()
    }, [])

    if (!requests){
        return <h1>Loading...</h1>
    }

    if (requests.length === 0){
        return <h1>No requests pending</h1>
    }

  return (
    <div>
        <h1 className='w-fit my-2 mx-auto font-semibold text-xl'>User Requests</h1>
        <div className='flex flex-col gap-2 md:gap-4'>
            {
                requests.map(request => <UserTab key={request._id} {...request} forRequests={true}/>)
            }
        </div>
    </div>
  )
}

export default Requests