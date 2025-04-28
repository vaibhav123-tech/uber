/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react'
import { Link ,useNavigate } from 'react-router-dom'
import axios from 'axios'
import {UserDataContext} from '../context/UserContext'
export const UserSignup = () => {
  const [firstname,setfirstname]=useState('');
  const [lastname,setlastname]=useState('');
  const [email,setemail]=useState('');
  const [password,setpassword]=useState('');
  const [userdata,setuserdata]=useState({});
  const navigate = useNavigate()
  const { user, setuser } = useContext(UserDataContext)
  const submithandler=async (e)=>{
    e.preventDefault();
    console.log('hello');
    const newUser={
        fullname:{
          firstname:firstname,
          lastname:lastname,
        },
        email:email,
        password:password
    }
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser);

    if (response.status === 201) {
      const data = response.data
      setuser(data.user)
      localStorage.setItem('token',data.token);
      navigate('/home')
    }

    console.log(userdata);
    setfirstname('');
    setlastname('');
    setemail('');
    setpassword('');
  }
  return (
    <div className='p-7 flex flex-col justify-between h-screen'>
      <div >
      <img className='w-16 mb-10' src="../../images/OIP.png" alt="" />
      <form action="" onSubmit={submithandler}>
      <h3 className='text-lg mb-2 font-medium'>Enter your Name </h3>
      <div className='flex gap-3'>
      <input 
      className='bg-[#eeeeee]  mb-7 rounded px-4 py-2 border text-lg placeholder:text-base w-1/2'
      required 
      value={firstname}
      onChange={(e)=>{setfirstname(e.target.value)}}
      type="text"
       placeholder='First name ' 
       />
      <input 
      className='bg-[#eeeeee]  mb-7 rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base'
      required 
      value={lastname}
      onChange={(e)=>{setlastname(e.target.value)}}
      type="text"
       placeholder='Last name ' 
       />
      </div>
      <h3 className='text-lg mb-2 font-medium'>Enter your email </h3>
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
      >Signup</button>
      <p className='text-center'>  Already have an account? <Link to='/login' className='text-blue-600'>Login here </Link></p>
      </form>
      </div>
      <div className=' ml-2'>
      <p className='text-[10px] leading-tight'>By proceeding ,you consent to get calls ,whatsapp or sms messages,including by automated means, from Uber and its affiliates to the number provided.</p>
      </div>
    </div>
  )
}
