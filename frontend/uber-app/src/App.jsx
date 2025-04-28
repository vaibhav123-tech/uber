/* eslint-disable no-unused-vars */
import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import { Start } from './pages/Start'
import { UserLogin } from './pages/UserLogin'
import { UserSignup } from './pages/UserSignup'
import { CaptainLogin } from './pages/CaptainLogin'
import { CaptainSignup } from './pages/CaptainSignup'
import { Home } from './pages/Home'
import Userprotection from './pages/Userprotection'
import Userlogout from './pages/Userlogout'
import Captain_home from './pages/Captain-home'
import CaptainProtectWrapper from './pages/CaptainProtectWrapper'
import CaptainLogout from './pages/CaptainLogout'
import { Riding } from './pages/Riding'
import CaptainRiding from './pages/CaptainRiding'

function App() { 
  return (
    <>
      <Routes>
        <Route path='/' element={<Start />} />
        <Route path='/login' element={<UserLogin />} />
        <Route path='/riding' element={<Riding />} />
        <Route path='/signup' element={<UserSignup />} />
        <Route path='/captain-riding' element={<CaptainRiding />} />
        <Route path='/captain-signup' element={<CaptainSignup />} />
        <Route path='/captain-login' element={<CaptainLogin />} />
        <Route path='/home' element={<Userprotection><Home /></Userprotection>} />
        <Route path='/logout' element={<Userprotection><Userlogout /></Userprotection>} />
        <Route path='/profile' element={<Userprotection/>}/>
        <Route path='/captain-home'
  element={
    <CaptainProtectWrapper>
      <Captain_home/>
    </CaptainProtectWrapper>}/> 
    <Route path='/captain/logout' element={
          <CaptainProtectWrapper>
            <CaptainLogout />
          </CaptainProtectWrapper>
        } /> 
      </Routes>
    </>
  );
}

export default App;
