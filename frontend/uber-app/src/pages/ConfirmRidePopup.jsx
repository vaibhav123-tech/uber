/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import CaptainRiding from './CaptainRiding';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export default function ConfirmRidePopup(props) {
  const navigate=useNavigate()
  const submitHandler=async (e)=>{
    e.preventDefault();

    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/start-ride`, {
        params: {
          otp: otp,
          rideId: props.Ride?._id
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
  
      console.log("Response received:", response.data);
  
      if (response.status === 200) {
        props.setConfirmridePopupPanel(false);
        navigate('/captain-riding', { state: { Ride: props.Ride } });
      }
    } catch (error) {
      console.error("Error response:", error.response?.data || error.message);
    }
  }
  const [otp, setotp] = useState('');
  return (
    <div className=' h-screen'>
      <h5 className='p-1 text-center w-[93%] absolute top-0 mb-0' onClick={()=>{
        props.setConfirmridePopupPanel(false);
      }}>
        <i className='text-3xl text-gray-200 ri-arrow-down-wide-line'></i>
      </h5>
        <h3 className='text-2xl font-semibold mb-1 mt-0'>Confirm This Ride To Start!</h3>
        <div className='flex items-center justify-between p-3 mt-3 bg-yellow-400 rounded-lg '>
          <div className='flex items-center gap-3 '>
          <img className='h-10 w-10 rounded-full object-cover' src="../../images/User.jpeg" alt="" />
          <h2 className='text-xl font-medium'>{props.Ride?.user?.fullname?.firstname}</h2>
          </div>
          <h5 className='text-lg font-semibold'>2.2 Km</h5>
        </div>
        <div className='flex justify-between flex-col items-center gap-2'>
        <img className='h-20' src="../../images/OIP2.png" alt="" />
        </div>
        <div className='w-full mt-2 '>
          <div className='flex items-center gap-5 p-3 border-b-1 '>
            <i className='text-lg ri-map-pin-user-fill'></i>
              <div>
                <h3 className='text-lg font-medium'>{props.Ride?.pickup}</h3>
                <p className='text-sm text-gray-600 -mt-1'>{props.Ride?.pickup}</p>
              </div>
          </div>
          <div className='flex items-center gap-5 p-3 border-b-1 '>
          <i className='text-lg ri-map-pin-2-fill'></i>
              <div>
                <h3 className='text-lg font-medium'>{props.Ride?.destination}</h3>
                <p className='text-sm text-gray-600 -mt-1'>{props.Ride?.destination}</p>
              </div>
          </div>
          <div className='flex items-center gap-5 p-3  '>
          <i className='text-lg ri-currency-line'></i>
              <div>
                <h3 className='text-lg font-medium'>{props.Ride?.fare}</h3>
                <p className='text-sm text-gray-600 -mt-1'>Cash</p>
              </div>
          </div>
        </div>
        
        <div className='mt-0 w-full'>
        <form onSubmit={(e)=>{
            submitHandler(e);
        }}>
          <input value={otp} 
          onChange={(e)=>{
            setotp(e.target.value);
          }}
          type="text" placeholder='Enter OTP'
          className="bg-[#c9c4c4] px-6 py-3 text-lg font-mono rounded-lg w-full mt-5 text-center  "
          />
        <button 
        className='w-full bg-green-600 flex justify-center  font-semibold text-white p-3 rounded-lg mt-3'>Confirm</button>
        <button 
        onClick={()=>{
          props.setConfirmridePopupPanel(false);
          props.setridePopupPanel(false);
        }}
        className='w-full bg-red-600 text-white font-semibold p-3 rounded-lg mt-2'>Cancel</button>
        </form>
        </div>
    </div>
  )
}
