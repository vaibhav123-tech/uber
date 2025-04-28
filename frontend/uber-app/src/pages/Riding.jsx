/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { SocketContext } from '../context/SocketContext'
export const Riding = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { ride } = location.state || {}
  const { socket } = useContext(SocketContext)
  useEffect(() => {
    const handleRideEnded = () => {
      console.log('Ride ended, navigating to home');
      navigate('/home');
    };
  
    socket.on("ride-ended", handleRideEnded);
  },[socket])
  
  return (
    <div className='h-screen'>
        <Link to='/home' className='fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full'>
                <i className="text-lg font-medium ri-home-5-line"></i>
            </Link>
        <div className='h-1/2'>
        <img className="h-99/100 w-full object-cover" src="/images/home_img.gif" alt="" />
        </div>
        <div className='h-1/2 p-4'>
        <div className='flex items-center justify-between'>
            <img className='h-12' src="../../images/OIP2.png" alt="" />
            <div className='text-right'>
                <h2 className='text-lg font-medium'>{ride?.captain.fullname.firstname}</h2>
                <h4 className='text-xl font-semibold -mt-1 -mb-1'>{ride?.captain?.vehicle?.plate
              }</h4>
                <p className='text-sm text-gray-600 '>Maruti Suzuki Alto</p>
            </div>
        </div>
        <div className='flex justify-between flex-col items-center gap-2'>
        <div className='w-full mt-5 '>
          <div className='flex items-center gap-5 p-3 border-b-1 '>
            <i className='text-lg ri-map-pin-user-fill'></i>
              <div>
                <h3 className='text-lg font-medium'>{ride?.pickup}</h3>
                <p className='text-sm text-gray-600 -mt-1'>{ride?.pickup}</p>
              </div>
          </div>
          
          <div className='flex items-center gap-5 p-3  '>
          <i className='text-lg ri-currency-line'></i>
              <div>
                <h3 className='text-lg font-medium'>Rs. {ride?.fare}</h3>
                <p className='text-sm text-gray-600 -mt-1'>Cash</p>
              </div>
          </div>
          <button 
        className='w-full bg-green-600 font-semibold text-white p-2 rounded-lg mt-5'>Make a Payment</button>
          </div>
        </div>
        </div>
    </div>
  )
}
