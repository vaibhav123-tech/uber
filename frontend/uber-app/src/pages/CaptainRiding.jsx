/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import FinishRiding from './FinishRiding';
import { useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
export default function CaptainRiding() {
  const navigate=useNavigate();
  const [finishRidePanel, setfinishRidePanel] = useState(false);
  const FinishRidePanleRef=useRef(null);
  const location=useLocation();
  const rideData=location.state?.Ride;

  const handler=async()=>{
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/end-ride`, {
      rideId: rideData._id
  }, {
      headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
      }
  })
  if (response.status === 200) {
    navigate('/captain-home')
}

  }

  useGSAP(()=>{
    if(finishRidePanel){
      gsap.to(FinishRidePanleRef.current,{
        transform:'translateY(0)'
      })
    }
    else{
      gsap.to(FinishRidePanleRef.current,{
        transform:'translateY(110%)'
      })
    }
  },[finishRidePanel])



  return (
        <div className='h-screen'>
        <div className='fixed p-6 top-0 flex items-center justify-between w-full'>
        <img className="w-16 absolute left-5 top-5" src="/images/OIP.png" alt="" />
        <Link to='/captain-login' className=' fixed h-10 w-10 bg-white flex items-center right-2 top-9 justify-center rounded-full'>
                    <i className="text-lg font-medium ri-logout-box-r-line"></i>
                </Link>
      </div>
      <div className='h-4/5'>
      <img className="h-full w-full object-cover" src="/images/home_img.gif" alt="" />
      </div>
      <div className='h-1/5 p-6 bg-yellow-300 flex  items-center justify-between relative'
      onClick={()=>{
        setfinishRidePanel(true);
      }}
      >
        <h5 className='p-1 text-center w-[90%] absolute top-0' onClick={()=>{}}>
        <i className=' text-3xl text-gray-700 ri-arrow-up-wide-line '></i>
        </h5>
        <h4 className='text-xl font-semibold'>4 KM away</h4>
        <button 
        className=' bg-green-600 font-semibold text-white p-3 px-10 rounded-lg '>Complete Ride</button>
        </div>
        <div ref={FinishRidePanleRef} className='fixed w-full z-10 bottom-0 bg-white translate-y-full py-6 px-3 pt-18'>
                <FinishRiding handler={handler} rideData={rideData}/>
              </div>
    </div>
  )
}
