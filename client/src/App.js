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
import AssessmentsLibrary from './components/recruiterDashboard/Assessment/AssessmentsLibrary';
import AssignAssessment from './components/recruiterDashboard/Assessment/AssignAssessment';
import Results from './components/recruiterDashboard/Assessment/Results';
import AIPreScreening from './components/recruiterDashboard/Assessment/AIPreScreening';
import ConfigureAIInterview from './components/recruiterDashboard/Assessment/ConfigureAIInterview';
import ReviewAIInterview from './components/recruiterDashboard/Assessment/ReviewAIInterview';
import OfferTemplates from './components/recruiterDashboard/Assessment/OfferTemplates';
import OfferTracking from './components/recruiterDashboard/Assessment/OfferTracking';


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

      {/* Assessment Routes */}
      <Route
        path='/recruiter/assessments-library'
        element={
          <ProtectedRoute>
            <RecruiterDashboardLayout>
              <AssessmentsLibrary />
            </RecruiterDashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path='/recruiter/assign-assessment'
        element={
          <ProtectedRoute>
            <RecruiterDashboardLayout>
              <AssignAssessment />
            </RecruiterDashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path='/recruiter/results'
        element={
          <ProtectedRoute>
            <RecruiterDashboardLayout>
              <Results />
            </RecruiterDashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path='/recruiter/prescreening'
        element={
          <ProtectedRoute>
            <RecruiterDashboardLayout>
              <AIPreScreening />
            </RecruiterDashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path='/recruiter/ai-interview-configure'
        element={
          <ProtectedRoute>
            <RecruiterDashboardLayout>
              <ConfigureAIInterview />
            </RecruiterDashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path='/recruiter/ai-interview-review'
        element={
          <ProtectedRoute>
            <RecruiterDashboardLayout>
              <ReviewAIInterview />
            </RecruiterDashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path='/recruiter/offer-templates'
        element={
          <ProtectedRoute>
            <RecruiterDashboardLayout>
              <OfferTemplates />
            </RecruiterDashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path='/recruiter/offer-tracking'
        element={
          <ProtectedRoute>
            <RecruiterDashboardLayout>
              <OfferTracking />
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




