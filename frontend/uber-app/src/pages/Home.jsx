/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel';
import VehiclePanel from '../components/VehiclePanel';
import ConfirmedRide from '../components/ConfirmedRide';
import LookingForDriver from '../components/LookingForDriver';
import WaitingForDriver from '../components/WaitingForDriver';
import { useContext } from 'react';
import { SocketContext } from '../context/SocketContext';
import { UserDataContext } from '../context/UserContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export const Home = () => {
  const navigate=useNavigate();
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [panelOpen, setPanelOpen] = useState(false);
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null)
  const vehicleref=useRef(null);
  const [ activeField, setActiveField ] = useState(null)
  const [vehiclepanel, setvehiclepanel] = useState(false)
  const [DriverReady, setDriverReady] = useState(false);
  const [Waitingfordriver, setWaitingfordriver] = useState(false);
  const [fare, setfare] = useState(0);
  const vehiclefound=useRef(null);
  const [confirmRidePanel, setconfirmRidePanel] = useState(false);
  const waitingfordriver=useRef(null);
  const confirmref=useRef(null);
  const [ pickupSuggestions, setPickupSuggestions ] = useState([])
    const [ destinationSuggestions, setDestinationSuggestions ] = useState([])
    const [ vehicleType, setVehicleType ] = useState({})
    const [Ride,setRide]=useState(null);
    

    const { socket } = useContext(SocketContext)
    const { user } = useContext(UserDataContext)
    useEffect(() => {
      socket.emit("join", { userType: "user", userId: user._id })
      socket.on('ride-confirmed', ride => {
        setRide(ride)
        setWaitingfordriver(true);

      })
      socket.on('ride-started',ride=>{
        navigate('/riding',{ state: { ride } });
      })
      
  }, [socket, user])



  const HandlePickupChange= async (e)=>{
    setPickup(e.target.value)
    try{
      const response=await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,{
        params: { input: e.target.value },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
      })
      console.log(response.data);
      setPickupSuggestions(response.data);
    }
    catch{
    }
  }

  const handleDestinationChange = async (e) => {
    setDestination(e.target.value)
    try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
            params: { input: e.target.value },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        setDestinationSuggestions(response.data)
    } catch {
    }
}
  const findTrip= async ()=>{
    setvehiclepanel(true);
    setPanelOpen(false);
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
      params: { pickup, destination },
      headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
      }
  })
  console.log(response);
  setfare(response.data)
  }

  async function createRide() {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`, {
        pickup,
        destination,
        vehicleType
    }, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
    console.log(response);
    return response;
  }
  const submitHandler = (e) => { 
    e.preventDefault();
  };

  useGSAP(() => {
    if(panelOpen){
      gsap.to(panelRef.current, {
        height: '70%',
        duration: 0.5,
        ease: 'power2.out',
      });
      gsap.to(panelCloseRef.current, {
        opacity: 1
    })
    }
    else{
      gsap.to(panelRef.current, {
        height: '0%',
        duration: 0.5,
        ease: 'power2.out',
      });
      gsap.to(panelCloseRef.current, {
        opacity: 0
    })
    }
    
    
  }, [panelOpen]); 

  const handleInputClick = () => setPanelOpen(true);

  useGSAP(()=>{
    gsap.set(vehicleref.current, { y: "100%" });
    if(vehiclepanel){
      gsap.to(vehicleref.current,{
        transform:'translateY(0)'
      })
    }
    else{
      gsap.to(vehicleref.current,{
        transform:'translateY(100%)'
      })
    }
  },[vehiclepanel])
  
  useGSAP(()=>{
    if(confirmRidePanel){
      gsap.to(confirmref.current,{
        transform:'translateY(0)'
      })
    }
    else{
      gsap.to(confirmref.current,{
        transform:'translateY(110%)'
      })
    }
  },[confirmRidePanel]);

  useGSAP(()=>{
    if(DriverReady){
      gsap.to(vehiclefound.current,{
        transform:'translateY(0)'
      })
    }
    else{
      gsap.to(vehiclefound.current,{
        transform:'translateY(110%)'
      })
    }
  },[DriverReady])

  useGSAP(()=>{
    if(Waitingfordriver){
      gsap.to(waitingfordriver.current,{
        transform:'translateY(0)'
      })
    }
    else{
      gsap.to(waitingfordriver.current,{
        transform:'translateY(110%)'
      })
    }
  },[Waitingfordriver])

  return (
    <div className="h-screen relative overflow-hidden">
      {/* Logo */}
      <img className="w-16 absolute left-5 top-5" src="/images/OIP.png" alt="" />
      
      {/* Background Image */}
      <div className="h-screen w-screen">
        <img className="h-full w-full object-cover" src="/images/home_img.gif" alt="" />
      </div>

      {/* Bottom Section */}
      <div className="h-screen flex flex-col justify-end absolute bottom-0 w-full">
        {/* Form Section */}
        
        <div className="h-[30%] bg-white p-5 relative">
        <h5 ref={panelCloseRef} 
          onClick={() => {
            setPanelOpen(false)
          }}
          className='absolute opacity-0 right-6 top-6 text-2xl'>
          <i className="ri-arrow-down-wide-line"></i>
        </h5>
          <h4 className="text-2xl font-semibold">Find a trip</h4>
          
          <form onSubmit={submitHandler}>
            {/* Vertical Line */}
            <div className="absolute h-[72px] w-1 top-[42%] left-10 bg-gray-900 rounded-full"></div>

            {/* Pick-up Location Input */}
            <input
              onClick={(e)=>{
                setPanelOpen(true)
                setActiveField('pickup')
              }}
              value={pickup}
              onChange={HandlePickupChange}
              className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-5"
              type="text"
              placeholder="Add a pick-up Location"
            />

            {/* Destination Input */}
            <input
              onClick={(e)=>{
                setPanelOpen(true)
                setActiveField('destination')
              }}
              value={destination}
              onChange={handleDestinationChange}
              className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-3"
              type="text"
              placeholder="Enter your destination"
            />
          </form>
          <button
               onClick={findTrip}
               className='bg-black text-white px-4 py-2 rounded-lg mt-3 w-full'>
               Find Trip
          </button>
        </div>

        {/* Animated Panel */}
        <div ref={panelRef} className="  h-[70%] bg-white  p-0">
          <LocationSearchPanel 
          setPanelOpen={setPanelOpen} setvehiclepanel={setvehiclepanel}
          suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
          setPickup={setPickup}
          setDestination={setDestination}
          activeField={activeField}
          />
        </div>
      </div>
      <div ref={vehicleref} className='fixed w-full z-10 bottom-0 bg-white p-3 py-6 px-3 '>
        <VehiclePanel setconfirmRidePanel={setconfirmRidePanel}
        fare={fare}
        setVehicleType={setVehicleType}
        />
      </div>
      <div ref={confirmref} className='fixed w-full z-10 bottom-0 bg-white translate-y-full py-6 px-3 pt-18'>
        <ConfirmedRide setconfirmRidePanel={setconfirmRidePanel} setDriverReady={setDriverReady}
        pickup={pickup}
        destination={destination}
        vehicleType={vehicleType}
        fare={fare}
        createRide={createRide}
        />
      </div>
      <div ref={vehiclefound} className='fixed w-full z-10 bottom-0 bg-white translate-y-full py-6 px-3 pt-18'>
        <LookingForDriver setDriverReady={setDriverReady}
        pickup={pickup}
        destination={destination}
        vehicleType={vehicleType}
        fare={fare}
        />
      </div>
      <div ref={waitingfordriver} className='fixed w-full z-10 translate-y-full  bottom-0 bg-white py-6 px-3 pt-18'>
        <WaitingForDriver setWaitingfordriver={setWaitingfordriver} Ride={Ride}/>
      </div>
    </div>
  );
};
