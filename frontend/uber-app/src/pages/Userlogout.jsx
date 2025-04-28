/* eslint-disable no-unused-vars */
import React from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export default function Userlogout () {
    const navigate=useNavigate();
    const token=localStorage.getItem("token");
    axios.get(`${import.meta.env.VITE_API_URL}/users/logout`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((response) => {
        if (response.status === 200) {
            localStorage.removeItem('token')
            navigate('/login')
        }
    })
  return (
    <div>Userlogout</div>
  )
}
