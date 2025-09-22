import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Landing from './components/Landing';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import ForgotPassword from './components/auth/ForgotPassword';
import PricingPage from './components/auth/PricingPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import AdminPanel from './components/recruiterDashboard/AdminPanel';
import Candidates from './components/recruiterDashboard/Candidates';
import RecruiterDashboardLayout from './components/recruiterDashboard/RecruiterDashboardLayout';
import CreateJob from './components/CreateJob';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Landing />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/login' element={<Login />} />
      <Route path='/ForgotPassword' element={<ForgotPassword />} />
      <Route path='/pricing' element={<PricingPage />} />

      <Route
        path='/dashboard'
        element={
          <ProtectedRoute>
            <AdminPanel />
          </ProtectedRoute>
        }
      />

      <Route
        path='/candidates'
        element={
          <ProtectedRoute>
            <RecruiterDashboardLayout>
              <Candidates />
            </RecruiterDashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path='/jobs/new'
        element={
          <ProtectedRoute>
            <RecruiterDashboardLayout>
              <CreateJob />
            </RecruiterDashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route path='*' element={<Navigate to='/' replace />} />
    </Routes>
  );
};

export default App;




