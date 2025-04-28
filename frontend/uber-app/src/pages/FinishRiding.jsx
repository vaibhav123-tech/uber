/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import { Link } from 'react-router-dom';

export default function FinishRiding(props) {
  return (
    <div className=' '>
      <h5 className='p-2 text-center w-[93%] absolute top-0 mb-0' onClick={()=>{
        props.setConfirmridePopupPanel(false);
      }}>
        <i className='text-3xl text-gray-200 ri-arrow-down-wide-line'></i>
      </h5>
        <h3 className='text-2xl font-semibold mb-1 mt-0'>Finish This Ride !</h3>
        <div className='flex items-center justify-between p-3 mt-3 bg-yellow-400 rounded-lg '>
          <div className='flex items-center gap-3 '>
          <img className='h-10 w-10 rounded-full object-cover' src="../../images/User.jpeg" alt="" />
          <h2 className='text-xl font-medium'>{props.rideData?.user?.fullname?.firstname}</h2>
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
                <h3 className='text-lg font-medium'>{props.rideData.pickup}</h3>
                <p className='text-sm text-gray-600 -mt-1'>{props.rideData.pickup}</p>
              </div>
          </div>
          <div className='flex items-center gap-5 p-3 border-b-1 '>
          <i className='text-lg ri-map-pin-2-fill'></i>
              <div>
                <h3 className='text-lg font-medium'>{props.rideData.destination}</h3>
                <p className='text-sm text-gray-600 -mt-1'>{props.rideData.destination}</p>
              </div>
          </div>
          <div className='flex items-center gap-5 p-3  '>
          <i className='text-lg ri-currency-line'></i>
              <div>
                <h3 className='text-lg font-medium'>Rs. {props.rideData.fare}</h3>
                <p className='text-sm text-gray-600 -mt-1'>Cash</p>
              </div>
          </div>
        </div>
        
        <div className='mt-0 w-full'>
          
        <button onClick={()=>{
          props.handler();
        }}
        className='w-full bg-green-600 flex justify-center  font-semibold text-white p-3 rounded-lg mt-3'>Ride Completed</button>
        <p className='mt-10 text-xs'>Click on Ride Completed option if have recieved the payment from the user</p>
        </div>
    </div>
  )
}
