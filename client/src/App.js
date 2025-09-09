import React from 'react';
import { Route, Routes } from "react-router-dom";

// Authentication Components
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import ForgotPassword from './components/auth/ForgotPassword';
import PricingPage from './components/auth/PricingPage';

// Layout Components
import Dashboard from './components/layout/dashboard/Dashboard';

// Job Components
import PostJob from './components/jobs/PostJob';
import HiringFunnel from './components/jobs/HiringFunnel';
import TimeToHire from './components/jobs/TimeToHire';
import SelectedCandidates from './components/jobs/SelectedCandidates';

const App = () => {
  return (
    <Routes>
      {/* Authentication Routes */}
      <Route path="/" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/pricing" element={<PricingPage />} />
      
      {/* Main Application Routes */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/post-job" element={<PostJob />} />
      <Route path="/hiring-funnel" element={<HiringFunnel />} />
      <Route path="/time-to-hire" element={<TimeToHire />} />
      <Route path="/selected-candidates" element={<SelectedCandidates/>} />
      
    </Routes>
  );
};

export default App;