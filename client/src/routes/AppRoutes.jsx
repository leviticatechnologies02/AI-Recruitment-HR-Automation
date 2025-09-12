import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import DashboardLayout from '../layouts/DashboardLayout';
import AuthLayout from '../layouts/AuthLayout';

// Public Pages
import Home from '../pages/public/Home';
import Login from '../pages/public/Login';
import Signup from '../pages/public/Signup';
import ForgotPassword from '../pages/public/ForgotPassword';
import Pricing from '../pages/public/Pricing';

// Recruiter Pages
import RecruiterDashboard from '../pages/recruiter/Dashboard';
import JobsList from '../pages/recruiter/jobs/JobsList';
import JobForm from '../pages/recruiter/jobs/JobForm';
import JobDetail from '../pages/recruiter/jobs/JobDetail';
import CandidatesList from '../pages/recruiter/candidates/CandidatesList';
import CandidateProfile from '../pages/recruiter/candidates/CandidateProfile';
import Analytics from '../pages/recruiter/Analytics';
import Pipeline from '../pages/recruiter/Pipeline';
import AIPrescreening from '../pages/recruiter/ai/AIPrescreening';
import CandidatesGenerator from '../components/recruitment/CandidatesGenerator';

// Super Admin Pages
import SuperAdminDashboard from '../pages/superadmin/TenantsList';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<AuthLayout><Login /></AuthLayout>} />
      <Route path="/signup" element={<AuthLayout><Signup /></AuthLayout>} />
      <Route path="/forgot-password" element={<AuthLayout><ForgotPassword /></AuthLayout>} />

      {/* Protected User Routes */}
      <Route path="/pricing" element={<ProtectedRoute requiredRole="user"><Pricing /></ProtectedRoute>} />

      {/* Recruiter Dashboard Routes */}
      <Route path="/dashboard" element={<ProtectedRoute requiredRole="user"><DashboardLayout><RecruiterDashboard /></DashboardLayout></ProtectedRoute>} />

      {/* Recruiter Job Management Routes */}
      <Route path="/jobs" element={<ProtectedRoute requiredRole="user"><DashboardLayout><JobsList /></DashboardLayout></ProtectedRoute>} />
      <Route path="/jobs/new" element={<ProtectedRoute requiredRole="user"><DashboardLayout><JobForm /></DashboardLayout></ProtectedRoute>} />
      <Route path="/jobs/:id" element={<ProtectedRoute requiredRole="user"><DashboardLayout><JobDetail /></DashboardLayout></ProtectedRoute>} />
      <Route path="/JobsList" element={<ProtectedRoute requiredRole="user"><DashboardLayout><JobsList /></DashboardLayout></ProtectedRoute>} />

      {/* Recruiter Candidate Management Routes */}
      <Route path="/candidates" element={<ProtectedRoute requiredRole="user"><DashboardLayout><CandidatesList /></DashboardLayout></ProtectedRoute>} />
      <Route path="/candidates/:id" element={<ProtectedRoute requiredRole="user"><DashboardLayout><CandidateProfile /></DashboardLayout></ProtectedRoute>} />

      {/* Recruiter Analytics Routes */}
      <Route path="/analytics" element={<ProtectedRoute requiredRole="user"><DashboardLayout><Analytics /></DashboardLayout></ProtectedRoute>} />
      <Route path="/pipeline" element={<ProtectedRoute requiredRole="user"><DashboardLayout><Pipeline /></DashboardLayout></ProtectedRoute>} />

      {/* Recruiter Candidates Generator */}
      <Route path="/candidates-generator" element={<ProtectedRoute requiredRole="user"><DashboardLayout><CandidatesGenerator /></DashboardLayout></ProtectedRoute>} />

      {/* AI Features Routes */}
      <Route path="/ai/prescreening" element={<ProtectedRoute superAdminOnly={true}><DashboardLayout><AIPrescreening /></DashboardLayout></ProtectedRoute>} />

      {/* Super Admin Routes */}
      <Route path="/super-admin" element={<ProtectedRoute superAdminOnly={true}><DashboardLayout><SuperAdminDashboard /></DashboardLayout></ProtectedRoute>} />
    </Routes>

  );
};

export default AppRoutes;
