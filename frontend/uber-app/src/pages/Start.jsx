/* eslint-disable no-unused-vars */
import "tailwindcss";
import React from 'react'
import {Link, Links} from 'react-router-dom';

export const Start = () => {
  return (
    <div>
        <div className='bg-cover bg-center bg-[url(../../images/OIP.jpg)] h-screen pt-8 flex justify-between flex-col w-full bg-red-400'>
            <img className='w-14 ml-8' src="../../images/OIP.png" alt="" />
            <div className='bg-white py-5 px-8 pb-8'>
                <h2 className=' text-3xl font-bold'>Get Started with Uber</h2>
                <Link to='/login' className='flex items-center justify-center w-full bg-black text-white py-3 rounded mt-3'>Continue</Link>
            </div>
        </div>
    </div>
  )
}
