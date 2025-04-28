/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'

export default function ConfirmedRide(props) {
  return (
    <div>
      <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={()=>{
        props.setconfirmRidePanel(false);
      }}>
        <i className='text-3xl text-gray-200 ri-arrow-down-wide-line'></i>
      </h5>
        <h3 className='text-2xl font-semibold mb-3'>Confirm your Ride</h3>
        <div className='flex justify-between flex-col items-center gap-2'>
        <img className='h-20' src="../../images/OIP2.png" alt="" /></div>
        <div className='w-full mt-5 '>
          <div className='flex items-center gap-5 p-3 border-b-1 '>
            <i className='text-lg ri-map-pin-user-fill'></i>
              <div>
                <h3 className='text-lg font-medium'>{props.pickup}</h3>
                <p className='text-sm text-gray-600 -mt-1'>{props.pickup}</p>
              </div>
          </div>
          <div className='flex items-center gap-5 p-3 border-b-1 '>
          <i className='text-lg ri-map-pin-2-fill'></i>
              <div>
                <h3 className='text-lg font-medium'>{props.destination}</h3>
                <p className='text-sm text-gray-600 -mt-1'>{props.destination}</p>
              </div>
          </div>
          <div className='flex items-center gap-5 p-3  '>
          <i className='text-lg ri-currency-line'></i>
              <div>
              <h3 className='text-lg font-medium'>{props.fare[props.vehicleType]}</h3>

                <p className='text-sm text-gray-600 -mt-1'>Total Fare</p>
              </div>
          </div>
        </div>
        <button 
        onClick={()=>{
          props.setDriverReady(true);
          props.setconfirmRidePanel(false);
          props.createRide()
        }}
        className='w-full bg-green-600 font-semibold text-white p-2 rounded-lg mt-5'>Confirm</button>
        
    </div>
  )
}
