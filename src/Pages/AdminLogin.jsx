import React, { useContext, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { myContext } from '../Components/Context'

const AdminLogin = () => {
  const { username, setUserName } = useContext(myContext)
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("admin name:", name)
    console.log("admin pwd", password)
    navigate('/AdminDashboard')
  }
  return (
    <div className='space-y-8'><h1>Admin Login</h1>
      <div className='border rounded space-y-6 p-6 max-w-screen-sm '>

        <form onSubmit={handleSubmit} >
          <div className='space-y-6'>

            <div className='space-x-12'>
              <label htmlFor="name" >name</label>
              <input type="text" id="name" value={username} onChange={(e) => setUserName(e.target.value)} placeholder='Enter your name' autoComplete="current-name" className="border rounded-sm p-2" />
            </div>
            <div className='space-x-2'><label htmlFor="password">password</label>
              <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter your password' autoComplete="current-password"
                className="border rounded-sm p-2" />
            </div>
            <div><button type='onSubmit' className="m-24 border rounded p-2">submit</button></div>
          </div>
        </form>
      </div></div>
  )
}

export default AdminLogin