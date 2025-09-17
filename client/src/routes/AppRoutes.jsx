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
import PostNewJob from '../components/jobs/PostNewJob';
import JobsList from '../components/jobs/JobsList';

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

//super admin 
import TenantsInfo from '../components/superadmin/Tenants Management/TenantsInfo';
import Actions from '../components/superadmin/Tenants Management/Actions';
import TenantDetailsPage from '../components/superadmin/Tenants Management/TenantDetailsPage';
import PlansList from '../components/superadmin/plans&Credits/PlansList';
import CreditsAllocation from '../components/superadmin/plans&Credits/CreditsAllocation';
import UsageTracking from '../components/superadmin/plans&Credits/UsageTracking';
import APIErrors from '../components/superadmin/SystemHealth/ApiError';
import Uptime from '../components/superadmin/SystemHealth/Uptime';
import Usage from '../components/superadmin/SystemHealth/Usage';
import Description from '../components/superadmin/FeatureFlags/Description';
import ToggleSwitch from '../components/superadmin/FeatureFlags/ToggleSwitch';
import TargetTenants from '../components/superadmin/FeatureFlags/TargetTenants';
import RollOutStatus from '../components/superadmin/FeatureFlags/RollOutStatus';

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
      
      <Route 
        path="/jobs/post-new" 
        element={
          <ProtectedRoute requiredRole="user">
            <DashboardLayout>
              <PostNewJob/>
            </DashboardLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/jobs/list" 
        element={
          <ProtectedRoute requiredRole="user">
            <DashboardLayout>
              <JobsList/>
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
        path="/tenants/management/info" 
        element={
          <ProtectedRoute requiredRole="user">
            <DashboardLayout>
              <TenantsInfo />
            </DashboardLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/tenants/management/actions" 
        element={
          <ProtectedRoute requiredRole="user">
            <DashboardLayout>
              <Actions/>
            </DashboardLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/tenants/management/details" 
        element={
          <ProtectedRoute requiredRole="user">
            <DashboardLayout>
              <TenantDetailsPage />
            </DashboardLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/plans/credits/list" 
        element={
          <ProtectedRoute requiredRole="user">
            <DashboardLayout>
              <PlansList />
            </DashboardLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/plans/credits/allocation" 
        element={
          <ProtectedRoute requiredRole="user">
            <DashboardLayout>
              <CreditsAllocation/>
            </DashboardLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/plans/credits/usage-tracking" 
        element={
          <ProtectedRoute requiredRole="user">
            <DashboardLayout>
              <UsageTracking/>
            </DashboardLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/system/health/errors" 
        element={
          <ProtectedRoute requiredRole="user">
            <DashboardLayout>
              <APIErrors />
            </DashboardLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/system/health/uptime" 
        element={
          <ProtectedRoute requiredRole="user">
            <DashboardLayout>
              <Uptime/>
            </DashboardLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/system/health/usage" 
        element={
          <ProtectedRoute requiredRole="user">
            <DashboardLayout>
              <Usage/>
            </DashboardLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/feature/flags/description" 
        element={
          <ProtectedRoute requiredRole="user">
            <DashboardLayout>
              <Description />
            </DashboardLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/feature/flags/toggle-switch" 
        element={
          <ProtectedRoute requiredRole="user">
            <DashboardLayout>
              <ToggleSwitch/>
            </DashboardLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/feature/flags/target-tenants" 
        element={
          <ProtectedRoute requiredRole="user">
            <DashboardLayout>
              <TargetTenants/>
            </DashboardLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/feature/flags/rollout-status" 
        element={
          <ProtectedRoute requiredRole="user">
            <DashboardLayout>
              <RollOutStatus/>
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
