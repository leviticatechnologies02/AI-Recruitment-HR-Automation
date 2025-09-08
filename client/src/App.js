import React from 'react';
import { Route, Routes } from "react-router-dom";

// Authentication Components
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import ForgotPassword from './components/auth/ForgotPassword';

// Layout Components
import Dashboard from './components/layout/dashboard/Dashboard';

// Job Components
import PostJobPage from './components/jobs/PostJobPage';

const App = () => {
  return (
    <Routes>
      {/* Authentication Routes */}
      <Route path="/" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      
      {/* Main Application Routes */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/post-job" element={<PostJobPage />} />
    </Routes>
  );
};

export default App;