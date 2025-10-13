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
import JobList from './components/JobList';
import PipelineView from './components/pipeline/PipelineView';
import Stages from './components/pipeline/Stages';
import DragDrop from './components/pipeline/DragDrop';
import CollaborationTools from './components/pipeline/CollaborationTools';
import RecruiterPerformance from './components/analytics/RecruiterPerformance';
import TimeToHire from './components/analytics/TimeToHire';
import CandidateSourcing from './components/analytics/CandidateSourcing';
import JobPerformance from './components/analytics/JobPerformance';
import Settings from './components/Settings';
import CandidateLogin from './components/candidateDashboard/CandidateLogin';
import CandidateDashboard from './components/candidateDashboard/CandidateDashboard';
import CandidateDashboardLayout from './components/candidateDashboard/CandidateDashboardLayout';
import JobSearch from './components/candidateDashboard/JobSearch';
import Applications from './components/candidateDashboard/Applications';
import Profile from './components/candidateDashboard/Profile';
import CandidateSettings from './components/candidateDashboard/CandidateSettings';


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

      <Route
        path='/jobslist'
        element={
          <ProtectedRoute>
            <RecruiterDashboardLayout>
              <JobList />
            </RecruiterDashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path='/pipeline/view'
        element={
          <ProtectedRoute>
            <RecruiterDashboardLayout>
              <PipelineView />
            </RecruiterDashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path='/pipeline/stages'
        element={
          <ProtectedRoute>
            <RecruiterDashboardLayout>
              <Stages />
            </RecruiterDashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path='/pipeline/drag-drop'
        element={
          <ProtectedRoute>
            <RecruiterDashboardLayout>
              <DragDrop />
            </RecruiterDashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path='/pipeline/collaboration'
        element={
          <ProtectedRoute>
            <RecruiterDashboardLayout>
              <CollaborationTools />
            </RecruiterDashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path='/analytics/recruiter-performance'
        element={
          <ProtectedRoute>
            <RecruiterDashboardLayout>
              <RecruiterPerformance />
            </RecruiterDashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path='/analytics/time-to-hire'
        element={
          <ProtectedRoute>
            <RecruiterDashboardLayout>
              <TimeToHire />
            </RecruiterDashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path='/analytics/job-sourcing'
        element={
          <ProtectedRoute>
            <RecruiterDashboardLayout>
              <CandidateSourcing />
            </RecruiterDashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path='/analytics/job-performance'
        element={
          <ProtectedRoute>
            <RecruiterDashboardLayout>
              <JobPerformance />
            </RecruiterDashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path='/settings'
        element={
          <ProtectedRoute>
            <RecruiterDashboardLayout>
              <Settings />
            </RecruiterDashboardLayout>
          </ProtectedRoute>
        }
      />

      {/* Candidate Routes */}
      <Route path='/candidate/login' element={<CandidateLogin />} />
      <Route
        path='/candidate/dashboard'
        element={
          <ProtectedRoute>
            <CandidateDashboardLayout>
              <CandidateDashboard />
            </CandidateDashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path='/candidate/jobs'
        element={
          <ProtectedRoute>
            <CandidateDashboardLayout>
              <JobSearch />
            </CandidateDashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path='/candidate/applications'
        element={
          <ProtectedRoute>
            <CandidateDashboardLayout>
              <Applications />
            </CandidateDashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path='/candidate/profile'
        element={
          <ProtectedRoute>
            <CandidateDashboardLayout>
              <Profile />
            </CandidateDashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path='/candidate/settings'
        element={
          <ProtectedRoute>
            <CandidateDashboardLayout>
              <CandidateSettings />
            </CandidateDashboardLayout>
          </ProtectedRoute>
        }
      />

      

      <Route path='*' element={<Navigate to='/' replace />} />
    </Routes>
  );
};

export default App;




