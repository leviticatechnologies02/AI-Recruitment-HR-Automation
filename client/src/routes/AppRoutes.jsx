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

// Pipeline Components
import PipelineView from '../components/pipeline/PipelineView';
import Stages from '../components/pipeline/Stages';
import DragDrop from '../components/pipeline/DragDrop';
import CollabrationTools from '../components/pipeline/CollabrationTools';

// Analytics Components
import RecruiterPerformance from '../components/analytics/RecruiterPerformance';
import TimeToHire from '../components/analytics/TimeToHire';
import CandidateSourcing from '../components/analytics/candidateSourcing';
import AnalyticsJobPerformance from '../components/analytics/Jobperformance';

// Company Settings Components
import CompanyInfo from '../components/companySettings/CompanyInfo';
import CompanyUsers from '../components/companySettings/CompanyUsers';
import CompanyBilling from '../components/companySettings/CompanyBilling';
import CompanyIntegration from '../components/companySettings/CompanyIntegartion';

// HR Suite Components
import WhiteLabel from '../components/hrSuite/WhiteLabel';
import EmployeeAnalytics from '../components/hrSuite/EmployeeAnalytics';
import Attendance from '../components/hrSuite/Attendance';
import PayrollDashboard from '../components/hrSuite/PayrollDashboard';
import Esign from '../components/hrSuite/Esign';
import OnboardingDocuments from '../components/hrSuite/OnboardingDocuments';

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
      
      {/* Pipeline Routes */}
      <Route 
        path="/pipeline/view" 
        element={
          <ProtectedRoute requiredRole="user">
            <DashboardLayout>
              <PipelineView />
            </DashboardLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/pipeline/stages" 
        element={
          <ProtectedRoute requiredRole="user">
            <DashboardLayout>
              <Stages />
            </DashboardLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/pipeline/drag-drop" 
        element={
          <ProtectedRoute requiredRole="user">
            <DashboardLayout>
              <DragDrop />
            </DashboardLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/pipeline/collaboration" 
        element={
          <ProtectedRoute requiredRole="user">
            <DashboardLayout>
              <CollabrationTools />
            </DashboardLayout>
          </ProtectedRoute>
        } 
      />
      
      {/* Analytics Routes */}
      <Route 
        path="/analytics/recruiter-performance" 
        element={
          <ProtectedRoute requiredRole="user">
            <DashboardLayout>
              <RecruiterPerformance />
            </DashboardLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/analytics/time-to-hire" 
        element={
          <ProtectedRoute requiredRole="user">
            <DashboardLayout>
              <TimeToHire />
            </DashboardLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/analytics/candidate-sourcing" 
        element={
          <ProtectedRoute requiredRole="user">
            <DashboardLayout>
              <CandidateSourcing />
            </DashboardLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/analytics/job-performance" 
        element={
          <ProtectedRoute requiredRole="user">
            <DashboardLayout>
              <AnalyticsJobPerformance />
            </DashboardLayout>
          </ProtectedRoute>
        } 
      />
      
      {/* Company Settings Routes */}
      <Route 
        path="/company-settings/info" 
        element={
          <ProtectedRoute requiredRole="user">
            <DashboardLayout>
              <CompanyInfo />
            </DashboardLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/company-settings/users" 
        element={
          <ProtectedRoute requiredRole="user">
            <DashboardLayout>
              <CompanyUsers />
            </DashboardLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/company-settings/billing" 
        element={
          <ProtectedRoute requiredRole="user">
            <DashboardLayout>
              <CompanyBilling />
            </DashboardLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/company-settings/integration" 
        element={
          <ProtectedRoute requiredRole="user">
            <DashboardLayout>
              <CompanyIntegration />
            </DashboardLayout>
          </ProtectedRoute>
        } 
      />
      
      {/* HR Suite Routes */}
      <Route 
        path="/hr-suite/white-label" 
        element={
          <ProtectedRoute requiredRole="user">
            <DashboardLayout>
              <WhiteLabel />
            </DashboardLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/hr-suite/employee-analytics" 
        element={
          <ProtectedRoute requiredRole="user">
            <DashboardLayout>
              <EmployeeAnalytics />
            </DashboardLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/hr-suite/attendance" 
        element={
          <ProtectedRoute requiredRole="user">
            <DashboardLayout>
              <Attendance />
            </DashboardLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/hr-suite/payroll-dashboard" 
        element={
          <ProtectedRoute requiredRole="user">
            <DashboardLayout>
              <PayrollDashboard />
            </DashboardLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/hr-suite/esign" 
        element={
          <ProtectedRoute requiredRole="user">
            <DashboardLayout>
              <Esign />
            </DashboardLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/hr-suite/onboarding-documents" 
        element={
          <ProtectedRoute requiredRole="user">
            <DashboardLayout>
              <OnboardingDocuments />
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
