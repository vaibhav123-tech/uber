/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useContext } from 'react'
import { CaptainDataContext } from '../context/CaptainContext';
import { useNavigate } from 'react-router-dom'
export const CaptainLogin = () => {
  const [email,setemail]=useState('');
  const [password,setpassword]=useState('');
  const [Captaindata,setCaptaindata]=useState({});
  const navigate=useNavigate();
  const { captain, setCaptain } = React.useContext(CaptainDataContext)
  const submithandler= async (e)=>{
    e.preventDefault();
    console.log('hello');
    const newcaptaindata={
      email:email,
      password:password
    };
    const response= await axios.post(`${import.meta.env.VITE_BASE_URL}/captain/login`,newcaptaindata);
    
      if (response.status === 200 || response.status === 201)  {
        const data = response.data
        setCaptain(data.captain)
        localStorage.setItem('token', data.token)
        console.log(newcaptaindata)
        navigate('/captain-home')
      }
    
    console.log(Captaindata);
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
      <p className='text-center'>  Join as a fleet? <Link to='/Captain-signup' className='text-blue-600'>Register as a captain</Link></p>
      </form>
      </div>
      <div>
      <Link
                to='/login'
                className='bg-[#c17914] flex items-center justify-center text-white font-semibold mb-5 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
              >Sign in as User</Link>
      </div>
    </div>
  )
}
