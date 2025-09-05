import React from 'react'
import {Route, Routes} from "react-router-dom";

import Login from './components/Login'
import Signup from './components/Signup'
import Dashboard from './components/dashboard/Dashboard';

const App = () => {
  return (
    <>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />  
    </Routes>
    </>
  )
}

export default App