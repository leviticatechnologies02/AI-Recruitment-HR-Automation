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

// Jobs Components
import ActiveJobs from '../components/jobs/jobsList/ActiveJobs';
import ClosedJobs from '../components/jobs/jobsList/ClosedJobs';
import DraftJobs from '../components/jobs/jobsList/DraftJobs';
import JobDetailsCreate from '../components/jobs/jobCreateEdit/JobDetails';
import ApplicationSettings from '../components/jobs/jobCreateEdit/ApplicationSettings';
import VisibilityPositingOptions from '../components/jobs/jobCreateEdit/VisibilityPositingOptions';
import ApplicationsOverView from '../components/jobs/jobDetails/ApplicationsOverView';
import JobDescriptionRequirements from '../components/jobs/jobDetails/JobDescriptionRequirements';
import JobPerformance from '../components/jobs/jobDetails/JobPerformance';

// Recruiter Components
import RecruiterDashboard from '../components/recruiter/RecruiterDashboard';
import PostJob from '../components/recruiter/PostJob';
import Analytics from '../components/recruiter/Analytics';
import Pipeline from '../components/recruiter/Pipeline';
import Candidates from '../components/recruiter/Candidates';
import AssessmentsLibrary from '../components/recruiter/AssessmentsLibrary';
import AssignAssessment from '../components/recruiter/AssignAssessment';
import AssessmentRunner from '../components/recruiter/AssessmentRunner';
import Results from '../components/recruiter/Results';
import AssessmentRunnerAI from '../components/recruiter/AssessmentRunnerAI';
import Prescreening from '../components/recruiter/Prescreening';
import AIInterviewConfigure from '../components/recruiter/AIInterviewConfigure';
import AIInterviewReview from '../components/recruiter/AIInterviewReview';
import OfferTemplates from '../components/recruiter/OfferTemplates';
import OfferTracking from '../components/recruiter/OfferTracking';

// Super Admin Pages
import SuperAdminDashboard from '../pages/superadmin/TenantsList';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route 
        path="/login" 
        element={
          <AuthLayout>
            <Login />
          </AuthLayout>
        } 
      />
      <Route 
        path="/signup" 
        element={
          <AuthLayout>
            <Signup />
          </AuthLayout>
        } 
      />
      <Route 
        path="/forgot-password" 
        element={
          <AuthLayout>
            <ForgotPassword />
          </AuthLayout>
        } 
      />
      
      {/* Protected User Routes */}
      <Route 
        path="/pricing" 
        element={
          <ProtectedRoute requiredRole="user">
            <Pricing />
          </ProtectedRoute>
        } 
      />
      
      {/* Dashboard Route */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute requiredRole="user">
            <DashboardLayout>
              <RecruiterDashboard />
            </DashboardLayout>
          </ProtectedRoute>
        } 
      />
      
      {/* Main Application Routes */}
      <Route 
        path="/jobs/new" 
        element={
          <ProtectedRoute requiredRole="user">
            <DashboardLayout>
              <PostJob />
            </DashboardLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/analytics" 
        element={
          <ProtectedRoute requiredRole="user">
            <DashboardLayout>
              <Analytics />
            </DashboardLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/pipeline" 
        element={
          <ProtectedRoute requiredRole="user">
            <DashboardLayout>
              <Pipeline />
            </DashboardLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/candidates" 
        element={
          <ProtectedRoute requiredRole="user">
            <DashboardLayout>
              <Candidates />
            </DashboardLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/ai/prescreening" 
        element={
          <ProtectedRoute requiredRole="user">
            <DashboardLayout>
              <Prescreening />
            </DashboardLayout>
          </ProtectedRoute>
        } 
      />
      
      {/* Recruiter Routes */}
      <Route 
        path="/recruiter/assessments-library" 
        element={
          <ProtectedRoute requiredRole="user">
            <DashboardLayout>
              <AssessmentsLibrary />
            </DashboardLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/recruiter/assign-assessment" 
        element={
          <ProtectedRoute requiredRole="user">
            <DashboardLayout>
              <AssignAssessment />
            </DashboardLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/recruiter/assessment-runner" 
        element={
          <ProtectedRoute requiredRole="user">
            <DashboardLayout>
              <AssessmentRunner />
            </DashboardLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/recruiter/results" 
        element={
          <ProtectedRoute requiredRole="user">
            <DashboardLayout>
              <Results />
            </DashboardLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/recruiter/assessment-runner-ai" 
        element={
          <ProtectedRoute requiredRole="user">
            <DashboardLayout>
              <AssessmentRunnerAI />
            </DashboardLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/recruiter/prescreening" 
        element={
          <ProtectedRoute requiredRole="user">
            <DashboardLayout>
              <Prescreening />
            </DashboardLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/recruiter/ai-interview-configure" 
        element={
          <ProtectedRoute requiredRole="user">
            <DashboardLayout>
              <AIInterviewConfigure />
            </DashboardLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/recruiter/ai-interview-review" 
        element={
          <ProtectedRoute requiredRole="user">
            <DashboardLayout>
              <AIInterviewReview />
            </DashboardLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/recruiter/offer-templates" 
        element={
          <ProtectedRoute requiredRole="user">
            <DashboardLayout>
              <OfferTemplates />
            </DashboardLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/recruiter/offer-tracking" 
        element={
          <ProtectedRoute requiredRole="user">
            <DashboardLayout>
              <OfferTracking />
            </DashboardLayout>
          </ProtectedRoute>
        } 
      />
      
      {/* Jobs Routes */}
      {/* Jobs List Routes */}
      <Route 
        path="/jobs/list/active" 
        element={
          <ProtectedRoute requiredRole="user">
            <DashboardLayout>
              <ActiveJobs />
            </DashboardLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/jobs/list/closed" 
        element={
          <ProtectedRoute requiredRole="user">
            <DashboardLayout>
              <ClosedJobs />
            </DashboardLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/jobs/list/draft" 
        element={
          <ProtectedRoute requiredRole="user">
            <DashboardLayout>
              <DraftJobs />
            </DashboardLayout>
          </ProtectedRoute>
        } 
      />
      
      {/* Job Create/Edit Routes */}
      <Route 
        path="/jobs/create/details" 
        element={
          <ProtectedRoute requiredRole="user">
            <DashboardLayout>
              <JobDetailsCreate />
            </DashboardLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/jobs/create/settings" 
        element={
          <ProtectedRoute requiredRole="user">
            <DashboardLayout>
              <ApplicationSettings />
            </DashboardLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/jobs/create/visibility" 
        element={
          <ProtectedRoute requiredRole="user">
            <DashboardLayout>
              <VisibilityPositingOptions />
            </DashboardLayout>
          </ProtectedRoute>
        } 
      />
      
      {/* Job Details Routes */}
      <Route 
        path="/jobs/details/applications" 
        element={
          <ProtectedRoute requiredRole="user">
            <DashboardLayout>
              <ApplicationsOverView />
            </DashboardLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/jobs/details/description" 
        element={
          <ProtectedRoute requiredRole="user">
            <DashboardLayout>
              <JobDescriptionRequirements />
            </DashboardLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/jobs/details/performance" 
        element={
          <ProtectedRoute requiredRole="user">
            <DashboardLayout>
              <JobPerformance />
            </DashboardLayout>
          </ProtectedRoute>
        } 
      />
      
      {/* Super Admin Routes */}
      <Route 
        path="/super-admin" 
        element={
          <ProtectedRoute superAdminOnly={true}>
            <DashboardLayout>
              <SuperAdminDashboard />
            </DashboardLayout>
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
};

export default AppRoutes;
