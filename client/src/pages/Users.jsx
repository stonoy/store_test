import React, { useState } from 'react'
import { Requests, Verified } from '../components'

const Users = () => {
  const [comName, setComName] = useState("requests")
  return (
    <div>
      <ul className='flex gap-2 mx-auto w-fit bg-base-100 rounded-md text-white p-2'>
  <button className={`rounded-md border-2 py-1 px-2 ${comName === "requests" ? "border-green-400" : "border-white"}`} onClick={() => setComName("requests")}>Requests</button>
  <button className={`rounded-md border-2 py-1 px-2 ${comName === "verified" ? "border-green-400" : "border-white"}`} onClick={() => setComName("verified")}>Verified Users</button>
</ul>

{
  comName === "requests" && <Requests />
}
{
  comName === "verified" && <Verified />
}
    </div>
  )
}

export default Users