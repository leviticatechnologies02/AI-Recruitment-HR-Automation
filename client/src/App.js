import React from 'react'
import {Route, Routes} from "react-router-dom";

import Login from './components/Login'
import Signup from './components/Signup'
import ForgotPassword from './components/ForgotPassword';
import Dashboard from './components/dashboard/Dashboard';

const App = () => {
  return (
    <>
    <Routes>
      <Route path="/" element={<Signup />} />  
      <Route path="/login" element={<Login />} />  
      <Route path="/ForgotPassword" element={<ForgotPassword />} />
      <Route path="/Dashboard" element={<Dashboard />} />

    </Routes>
    </>
  )
}

export default App