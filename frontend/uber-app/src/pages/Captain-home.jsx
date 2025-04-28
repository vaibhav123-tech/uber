/* eslint-disable no-unused-vars */
import React, { useRef, useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Captainetails from '../components/Captainetails';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import RidePopup from '../components/RidePopup';
import ConfirmRidePopup from './ConfirmRidePopup';
import { CaptainDataContext } from '../context/CaptainContext';
import { SocketContext } from '../context/SocketContext';
import axios from 'axios';
import LiveTracking from './LiveTracking'; // Import LiveTracking

export default function Captain_home() {
  const [ridePopupPanel, setridePopupPanel] = useState(false);
  const ridePopupPanelRef = useRef(null);
  const [ConfirmridePopupPanel, setConfirmridePopupPanel] = useState(false);
  const ConfirmridePopupPanelRef = useRef(null);
  const [tracking, setTracking] = useState(false); // Track if geolocation is enabled
  const [currentPosition, setCurrentPosition] = useState({ lat: 0, lng: 0 }); // Store location
  const [Ride, setRide] = useState(null);
  const { socket } = useContext(SocketContext);
  const { captain } = useContext(CaptainDataContext);

  const confirmed = async () => {
    await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`, {
      rideId: Ride._id,
      captainId: captain._id,
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  };

  useEffect(() => {
    socket.emit('join', {
      userId: captain._id,
      userType: 'captain',
    });
  });

  const startLocationTracking = () => {
    if (!navigator.geolocation) {
      console.log("Geolocation is not supported by this browser.");
      return;
    }

    const updateLocation = () => {
      navigator.geolocation.getCurrentPosition(position => {
        const newPosition = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        setCurrentPosition(newPosition);

        socket.emit('update-location-captain', {
          userId: captain._id,
          location: newPosition,
        });
      });
    };

    updateLocation(); // Get location immediately
    const locationInterval = setInterval(updateLocation, 1000);
    setTracking(true);

    return () => clearInterval(locationInterval);
  };

  socket.on('new-ride', (data) => {
    setRide(data);
    setridePopupPanel(true);
  });

  useGSAP(() => {
    gsap.to(ridePopupPanelRef.current, {
      transform: ridePopupPanel ? 'translateY(0)' : 'translateY(110%)',
    });
  }, [ridePopupPanel]);

  useGSAP(() => {
    gsap.to(ConfirmridePopupPanelRef.current, {
      transform: ConfirmridePopupPanel ? 'translateY(0)' : 'translateY(110%)',
    });
  }, [ConfirmridePopupPanel]);

  return (
    <div className='h-screen'>
      <div className='fixed p-6 top-0 flex items-center justify-between w-full'>
        <img className="w-16 absolute left-5 top-5" src="/images/OIP.png" alt="" />
        <Link to='/captain-login' className='fixed h-10 w-10 bg-white flex items-center right-2 top-9 justify-center rounded-full'>
          <i className="text-lg font-medium ri-logout-box-r-line"></i>
        </Link>
      </div>

      {/* Replace image with LiveTracking */}
      <div className='h-3/5'>
        {tracking ? (
          <LiveTracking currentPosition={currentPosition} />
        ) : (
          <img className="h-full w-full object-cover" src="/images/home_img.gif" alt="" />
        )}
      </div>

      <div className='h-2/5 p-6'>
        <Captainetails />
      </div>

      <div className='p-6 text-center'>
        {!tracking ? (
          <button
            className='bg-blue-500 text-white px-4 py-2 rounded-md'
            onClick={startLocationTracking}
          >
            Start Location Tracking
          </button>
        ) : (
          <p className='text-green-500'>Location tracking is active...</p>
        )}
      </div>

      <div ref={ridePopupPanelRef} className='fixed w-full z-10 bottom-0 bg-white translate-y-full py-6 px-3 pt-18'>
        <RidePopup setridePopupPanel={setridePopupPanel} setConfirmridePopupPanel={setConfirmridePopupPanel} Ride={Ride} confirmed={confirmed} />
      </div>

      <div ref={ConfirmridePopupPanelRef} className='fixed w-full z-10 translate-y-full bottom-0 bg-white py-6 px-3 pt-18 h-screen'>
        <ConfirmRidePopup Ride={Ride} setConfirmridePopupPanel={setConfirmridePopupPanel} setridePopupPanel={setridePopupPanel} />
      </div>
    </div>
  );
}
