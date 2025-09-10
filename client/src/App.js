import React from 'react';
import { Route, Routes } from "react-router-dom";

// Authentication Components
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import ForgotPassword from './components/auth/ForgotPassword';
import PricingPage from './components/auth/PricingPage';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Layout Components
import Dashboard from './components/layout/dashboard/Dashboard';

// Job Components
import PostJob from './components/jobs/PostJob';
import HiringFunnel from './components/jobs/HiringFunnel';
import TimeToHire from './components/jobs/TimeToHire';
import SelectedCandidates from './components/jobs/SelectedCandidates';

// Admin Components
import SuperAdminPanel from './components/admin/SuperAdminPanel';

const App = () => {
  return (
    <Routes>
      {/* Public Authentication Routes */}
      <Route path="/" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      
      {/* Protected User Routes */}
      <Route 
        path="/pricing" 
        element={
          <ProtectedRoute requiredRole="user">
            <PricingPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute requiredRole="user">
            <Dashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/post-job" 
        element={
          <ProtectedRoute requiredRole="user">
            <PostJob />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/hiring-funnel" 
        element={
          <ProtectedRoute requiredRole="user">
            <HiringFunnel />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/time-to-hire" 
        element={
          <ProtectedRoute requiredRole="user">
            <TimeToHire />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/selected-candidates" 
        element={
          <ProtectedRoute requiredRole="user">
            <SelectedCandidates />
          </ProtectedRoute>
        } 
      />
      
      {/* Super Admin Only Routes */}
      <Route 
        path="/super-admin" 
        element={
          <ProtectedRoute superAdminOnly={true}>
            <SuperAdminPanel />
          </ProtectedRoute>
        } 
      />
      
    </Routes>
  );
};

export default App;