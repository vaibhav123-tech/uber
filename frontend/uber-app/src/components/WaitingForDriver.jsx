/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'

export default function WaitingForDriver(props) {
  return (
    <div>
       <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={()=>{
        props.setWaitingfordriver(false);
      }}>
        <i className='text-3xl text-gray-200 ri-arrow-down-wide-line'></i>
      </h5>
        <div className='flex items-center justify-between'>
            <img className='h-12' src="../../images/OIP2.png" alt="" />
            <div className='text-right'>
                <h2 className='text-lg font-medium'>{props.Ride?.captain?.fullname.firstname}</h2>
                <h4 className='text-xl font-semibold -mt-1 -mb-1'>{props.Ride?.captain?.vehicle?.plate}</h4>
                <p className='text-sm text-gray-600 '>Maruti Suzuki Alto</p>
                <h1 className='font-semibold'> OTP -{props.Ride?.otp}</h1>
            </div>
        </div>
        <div className='flex justify-between flex-col items-center gap-2'>
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
        </div>
    </div>
  )
}
