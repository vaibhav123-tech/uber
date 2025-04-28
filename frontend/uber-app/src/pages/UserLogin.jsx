/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import axios from 'axios'
import {UserDataContext} from '../context/UserContext'
export const UserLogin =  ()  => {
  const [email,setemail]=useState('');
  const [password,setpassword]=useState('');
  const [userdata,setuserdata]=useState({});

  const { user, setuser } = useContext(UserDataContext)
  const navigate = useNavigate()
  const submithandler= async(e)=>{
    e.preventDefault();
    console.log('hello');
    const userData = {
      email: email,
      password: password
    }
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData)

    if (response.status === 200) {
      const data = response.data
      setuser(data.user)
      localStorage.setItem('token',data.token);
      navigate('/home')
    }
    setemail('');
    setpassword('');
  }
  return (
    <div className='p-7 flex flex-col justify-between h-screen'>
      <div>
      <img className='w-16 mb-10' src="../../images/OIP.png" alt="" />
      <form action="" onSubmit={submithandler}>
      <h3 className='text-lg mb-2 font-medium'>What's your email</h3>
      <input 
      className='bg-[#eeeeee]  mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
      required 
      value={email}
      onChange={(e)=>{setemail(e.target.value)}}
      type="email"
       placeholder='email@example.com' 
       />
      <h3 className='text-lg mb-2 font-medium'>Enter password</h3>
      <input 
      className='bg-[#eeeeee]  mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
      type="password" 
      placeholder='password' 
      value={password}
      onChange={(e)=>{setpassword(e.target.value)}}
      />
      <button className='bg-[#111] text-white font-semibold mb-7 rounded px-4 py-2  w-full text-lg placeholder:text-base'
      >Login</button>
      <p className='text-center'>New here? <Link to='/signup' className='text-blue-600'>Create a new Account</Link></p>
      </form>
      </div>
      <div>
      <Link
          to='/captain-login'
          className='bg-[#10b461] flex items-center justify-center text-white font-semibold mb-5 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
        >Sign in as Captain</Link>
      </div>
    </div>
  )
}
