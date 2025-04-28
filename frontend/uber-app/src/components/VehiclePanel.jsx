/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'

export default function VehiclePanel(props) {
  return (
    <div><h3 className='text-xl font-semibold mb-3'>Choose A Vehicle</h3>
    <div onClick={()=>{
        props.setconfirmRidePanel(true)
        props.setVehicleType('car');
    }}
    className='flex w-full border-2 py-3 px-2 active:border-black rounded-xl items-center justify-between mb-5'>
    <img className='h-12' src="../../images/OIP2.png" alt="" />
    <div className=' w-1/2'>
      <h4 className='font-medium text-sm'>UBERGO <span><i className='ri-user-3-fill'></i> 4 </span></h4>
      <h5 className='font-medium text-sm'>2 mins away</h5>
      <p className='font-medium text-xs'>Affordable, Compact rides</p>
    </div>
    <h2 className='text-xl font-semibold'>Rs {props.fare.car}</h2>
    </div>
    <div onClick={()=>{
        props.setconfirmRidePanel(true)
        props.setVehicleType('moto')
    }}
    className='flex w-full border-2 py-3 px-2 border-black rounded-xl items-center justify-between mb-5'>
    <img className='h-12' src="../../images/OIP3.webp" alt="" />
    <div className=' w-1/2'>
      <h4 className='font-medium text-sm'>UBERGO <span><i className='ri-user-3-fill'></i> 4 </span></h4>
      <h5 className='font-medium text-sm'>8 mins away</h5>
      <p className='font-medium text-xs'>affordable, compact rides</p>
    </div>
    <h2 className='text-xl font-semibold'>Rs {props.fare.moto}</h2>
    </div>
    <div onClick={()=>{
        props.setconfirmRidePanel(true)
        props.setVehicleType('auto');
    }} className='flex w-full border-2 py-3 px-2 border-black rounded-xl items-center justify-between mb-5'>
    <img className='h-12' src="../../images/OIP4.png" alt="" />
    <div className=' w-1/2'>
      <h4 className='font-medium text-sm'>UBERGO <span><i className='ri-user-3-fill'></i> 4 </span></h4>
      <h5 className='font-medium text-sm'>4 mins away</h5>
      <p className='font-medium text-xs'>affordable, compact rides</p>
    </div>
    <h2 className='text-xl font-semibold'>Rs {props.fare.auto}</h2>
    </div></div>
  )
}
