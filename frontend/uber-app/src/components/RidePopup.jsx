/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'

export default function RidePopup(props) {
  return (
    <div>
      <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={()=>{
        props.setridePopupPanel(false);
      }}>
        <i className='text-3xl text-gray-200 ri-arrow-down-wide-line'></i>
      </h5>
        <h3 className='text-2xl font-semibold mb-3'>New Ride Available!</h3>
        <div className='flex items-center justify-between p-3 mt-4 bg-yellow-400 rounded-lg '>
          <div className='flex items-center gap-3 '>
          <img className='h-10 w-10 rounded-full object-cover' src="../../images/User.jpeg" alt="" />
          <h2 className='text-xl font-medium'>{props.Ride?.user.fullname.firstname}</h2>
          </div>
          <h5 className='text-lg font-semibold'>2.2 Km</h5>
        </div>
        <div className='flex justify-between flex-col items-center gap-2'>
        <img className='h-20' src="../../images/OIP2.png" alt="" />
        </div>
        <div className='w-full mt-5 '>
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
                <h3 className='text-lg font-medium'> Rs. {props.Ride?.fare}</h3>
                <p className='text-sm text-gray-600 -mt-1'>Cash</p>
              </div>
          </div>
        </div>
        <div className='flex gap-3 justify-between items-center w-full mt-5'>
        <button 
        onClick={()=>{
          props.setridePopupPanel(false);
        }}
        className='w-full bg-gray-300 text-gray-700 font-semibold p-2 rounded-lg  px-10'>Ignore</button>
        <button 
        onClick={()=>{
          props.setConfirmridePopupPanel(true);
          props.setridePopupPanel(false);
          props.confirmed()
        }}
        className='w-full bg-green-600 font-semibold text-white p-2 rounded-lg  px-10'>Accept</button>
        </div>
    </div>
  )
}
