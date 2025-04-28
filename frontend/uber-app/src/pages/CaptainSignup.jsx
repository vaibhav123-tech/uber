/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios   from 'axios' 
import { useNavigate } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext';
export const CaptainSignup = () => {

  const navigate = useNavigate()
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [color, setColor] = useState('');
  const [plate, setplate] = useState('');
  const [capacity, setCapacity] = useState('');
  const [vehicleType, setvehicleType] = useState('');
  const { captain, setCaptain } = React.useContext(CaptainDataContext)

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log('hello');
    const NewCaptain = {
      fullname: {
        firstname,
        lastname,
      },
      email,
      password,
      vehicle: {
        color,
        plate,
        capacity,
        vehicleType: vehicleType,
      },
    };
    console.log(NewCaptain);
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captain/register`, NewCaptain);

    if (response.status === 201) {
      const data = response.data
      setCaptain(data.captain)
      localStorage.setItem('token', data.token)
      navigate('/captain-home')
    }
    setFirstname('');
    setLastname('');
    setEmail('');
    setPassword('');
    setColor('');
    setplate('');
    setCapacity('');
    setvehicleType('');
  };

  return (
    <div className="p-7 flex flex-col justify-between h-screen">
      <div>
        <img className="w-16 mb-5" src="../../images/OIP.png" alt="" />
        <form action="" onSubmit={submitHandler}>
          <div className="grid grid-cols-2 gap-4">
            {/* First Name */}
            <div>
              <h3 className="text-lg mb-2 font-medium">First Name</h3>
              <input
                className="bg-[#eeeeee] mb-5 rounded px-4 py-2 border text-lg placeholder:text-base w-full"
                required
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                type="text"
                placeholder="First name"
              />
            </div>

            {/* Last Name */}
            <div>
              <h3 className="text-lg mb-2 font-medium">Last Name</h3>
              <input
                className="bg-[#eeeeee] mb-5 rounded px-4 py-2 border text-lg placeholder:text-base w-full"
                required
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                type="text"
                placeholder="Last name"
              />
            </div>

            {/* Email */}
            <div>
              <h3 className="text-lg mb-2 font-medium">Email</h3>
              <input
                className="bg-[#eeeeee] mb-5 rounded px-4 py-2 border text-lg placeholder:text-base w-full"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="email@example.com"
              />
            </div>

            {/* Password */}
            <div>
              <h3 className="text-lg mb-2 font-medium">Password</h3>
              <input
                className="bg-[#eeeeee] mb-5 rounded px-4 py-2 border text-lg placeholder:text-base w-full"
                type="password"
                required
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Vehicle Color */}
            <div>
              <h3 className="text-lg mb-2 font-medium">Vehicle Color</h3>
              <select
                className="bg-[#eeeeee] mb-5 rounded px-4 py-2 border text-lg w-full"
                required
                value={color}
                onChange={(e) => setColor(e.target.value)}
              >
                <option value="">Select a color</option>
                <option value="White">White</option>
                <option value="Red">Red</option>
                <option value="Black">Black</option>
                <option value="Blue">Blue</option>
                <option value="Gray">Gray</option>
              </select>
            </div>

            {/* Vehicle Number */}
            <div>
              <h3 className="text-lg mb-2 font-medium">Vehicle Number</h3>
              <input
                type="text"
                className="bg-[#eeeeee] mb-5 rounded px-4 py-2 border text-lg placeholder:text-base w-full"
                required
                value={plate}
                onChange={(e) => setplate(e.target.value)}
                placeholder="Vehicle number"
              />
            </div>

            {/* Vehicle Capacity */}
            <div>
              <h3 className="text-lg mb-2 font-medium">Vehicle Capacity</h3>
              <input
                type="number"
                className="bg-[#eeeeee] mb-5 rounded px-4 py-2 border text-lg placeholder:text-base w-full"
                required
                min="1"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                placeholder="Capacity (e.g. 1, 2, 4)"
              />
            </div>

            {/* Vehicle Type */}
            <div>
              <h3 className="text-lg mb-2 font-medium">Vehicle Type</h3>
              <select
                className="bg-[#eeeeee] mb-5 rounded px-4 py-2 border text-lg w-full"
                required
                value={vehicleType}
                onChange={(e) => setvehicleType(e.target.value)}
              >
                <option value="">Select a type</option>
                <option value="car">Car</option>
                <option value="motorcycle">Motorcycle</option>
                <option value="auto">Auto</option>
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <button className="bg-[#111] text-white font-semibold  mt-4 mb-5 rounded px-4 py-2 w-full text-lg">
            Create Captain's Account
          </button>

          <p className="text-center">
            Already have an account? <Link to="/Captain-login" className="text-blue-600">Login here</Link>
          </p>
        </form>
      </div>

      <div className="ml-2">
        <p className="text-[10px] leading-tight">
          This site is protected by reCAPTCHA and the <span className="underline">Google Privacy Policy</span> and terms of service apply.
        </p>
      </div>
    </div>
  );
};
