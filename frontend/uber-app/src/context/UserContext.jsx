/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { createContext, use, useState } from 'react'
export const UserDataContext =createContext();
export const UserContext = ({children}) => {
     const [user,setuser] =useState({
        email:'',
        fullname:{
            firstname:'',
            lastname:'',
        }
     })
  return (
    <div>
        <UserDataContext.Provider value={{ user, setuser }}>
            {children}
        </UserDataContext.Provider>
    </div>
  )
}
