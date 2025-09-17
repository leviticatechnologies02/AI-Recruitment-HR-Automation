import React, { useState } from 'react'
import { Icon } from "@iconify/react/dist/iconify.js";
import { NavLink } from "react-router-dom";
import { getUserRole } from "../../utils/auth";

const SidebarNames = () => {
  const userRole = getUserRole();
  const isSuperAdmin = userRole === 'superadmin';
  const [recruiterMenuOpen, setRecruiterMenuOpen] = useState(false);
  const [jobsMenuOpen, setJobsMenuOpen] = useState(false);
  const [pipelineMenuOpen, setPipelineMenuOpen] = useState(false);
  const [analyticsMenuOpen, setAnalyticsMenuOpen] = useState(false);
  const [companySettingsMenuOpen, setCompanySettingsMenuOpen] = useState(false);
  const [hrSuiteMenuOpen, setHrSuiteMenuOpen] = useState(false);
  const [tenantsmanagemantOpen, setTenantsManagementOpen] = useState(false);
  const [planscreditsOpen, setPlansCredits] = useState(false);
  const [systemhealthOpen, setSystemHealth] = useState(false);
  const [featureflagsOpen, setFeatureFlags] = useState(false);

  const toggleRecruiterMenu = () => {
    setRecruiterMenuOpen(!recruiterMenuOpen);
  };

  const toggleJobsMenu = () => {
    setJobsMenuOpen(!jobsMenuOpen);
  };
  const togglePipelineMenu = () => {
    setPipelineMenuOpen(!pipelineMenuOpen);
  };

  const toggleAnalyticsMenu = () => {
    setAnalyticsMenuOpen(!analyticsMenuOpen);
  };

  const toggleCompanySettingsMenu = () => {
    setCompanySettingsMenuOpen(!companySettingsMenuOpen);
  };

  const toggleHrSuiteMenu = () => {
    setHrSuiteMenuOpen(!hrSuiteMenuOpen);
  };
  const toggleTenantsManagement = () => {
    setTenantsManagementOpen(!tenantsmanagemantOpen);
  };
  const togglePlansCredits = () => {
    setPlansCredits(!planscreditsOpen);
  };
  const toggleSystemHealth = () => {
    setSystemHealth(!systemhealthOpen);
  };
  const toggleFeatureFlags = () => {
    setFeatureFlags(!featureflagsOpen);
  };
  return (
    <>
      <div className='sidebar-menu-area'>
        <ul className='sidebar-menu' id='sidebar-menu'>
          {/* Dashboard - Different for Super Admin */}
          <li>
            <NavLink
              to={isSuperAdmin ? '/super-admin' : '/dashboard'}
              className={(navData) => (navData.isActive ? "active-page" : "")}
            >
              <Icon
                icon={isSuperAdmin ? 'heroicons:shield-check' : 'solar:home-smile-angle-outline'}
                className='menu-icon'
              />
              <span>{isSuperAdmin ? 'Super Admin Panel' : 'Dashboard'}</span>
            </NavLink>
          </li>

          {/* Show regular application menu only for regular users */}
          {!isSuperAdmin && (
            <>
              {/* Recruiter Section */}
              <li className='sidebar-menu-group-title'>Recruiter</li>
              <li className="dropdown">
                <a
                  href="#"
                  className="d-flex align-items-center justify-content-between"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleRecruiterMenu();
                  }}
                >
                  <div className="d-flex align-items-center">
                    <Icon icon='heroicons:briefcase' className='menu-icon' />
                    <span>Recruiter</span>
                  </div>
                  <Icon
                    icon={recruiterMenuOpen ? 'heroicons:chevron-up' : 'heroicons:chevron-down'}
                    className='submenu-arrow'
                  />
                </a>
                <ul className={`sidebar-submenu ${recruiterMenuOpen ? 'show' : ''}`}>
                  <li>
                    <NavLink
                      to='/recruiter/assessments-library'
                      className={(navData) => (navData.isActive ? "active-page" : "")}
                    >
                      <Icon icon='heroicons:document-text' className='menu-icon' />
                      <span>Assessments Library</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to='/recruiter/assign-assessment'
                      className={(navData) => (navData.isActive ? "active-page" : "")}
                    >
                      <Icon icon='heroicons:user-plus' className='menu-icon' />
                      <span>Assign Assessment</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to='/recruiter/assessment-runner'
                      className={(navData) => (navData.isActive ? "active-page" : "")}
                    >
                      <Icon icon='heroicons:play' className='menu-icon' />
                      <span>Assessment Runner</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to='/recruiter/results'
                      className={(navData) => (navData.isActive ? "active-page" : "")}
                    >
                      <Icon icon='heroicons:chart-bar' className='menu-icon' />
                      <span>Results</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to='/recruiter/assessment-runner-ai'
                      className={(navData) => (navData.isActive ? "active-page" : "")}
                    >
                      <Icon icon='heroicons:cpu-chip' className='menu-icon' />
                      <span>Assessment Runner AI</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to='/recruiter/prescreening'
                      className={(navData) => (navData.isActive ? "active-page" : "")}
                    >
                      <Icon icon='heroicons:magnifying-glass' className='menu-icon' />
                      <span>AI Prescreening</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to='/recruiter/ai-interview-configure'
                      className={(navData) => (navData.isActive ? "active-page" : "")}
                    >
                      <Icon icon='heroicons:cog-6-tooth' className='menu-icon' />
                      <span>Configure AI Interview</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to='/recruiter/ai-interview-review'
                      className={(navData) => (navData.isActive ? "active-page" : "")}
                    >
                      <Icon icon='heroicons:eye' className='menu-icon' />
                      <span>Review AI Interview</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to='/recruiter/offer-templates'
                      className={(navData) => (navData.isActive ? "active-page" : "")}
                    >
                      <Icon icon='heroicons:document-duplicate' className='menu-icon' />
                      <span>Offer Templates</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to='/recruiter/offer-tracking'
                      className={(navData) => (navData.isActive ? "active-page" : "")}
                    >
                      <Icon icon='heroicons:clipboard-document-list' className='menu-icon' />
                      <span>Offer Tracking</span>
                    </NavLink>
                  </li>
                </ul>
              </li>


















              {/* Jobs Section */}
              <li className='sidebar-menu-group-title'>Jobs</li>

              <li className="dropdown">
                <a
                  href="#"
                  className="d-flex align-items-center justify-content-between"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleJobsMenu();
                  }}
                >
                  <div className="d-flex align-items-center">
                    <Icon icon='heroicons:list-bullet' className='menu-icon' />
                    <span>Jobs</span>
                  </div>
                  <Icon
                    icon={jobsMenuOpen ? 'heroicons:chevron-up' : 'heroicons:chevron-down'}
                    className='submenu-arrow'
                  />
                </a>
                <ul className={`sidebar-submenu ${jobsMenuOpen ? 'show' : ''}`}>
                  <li>
                    <NavLink
                      to='/jobs/post-new'
                      className={(navData) => (navData.isActive ? "active-page" : "")}
                    >
                      <Icon icon='heroicons:play-circle' className='menu-icon' />
                      <span>Post New Job</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to='/jobs/list'
                      className={(navData) => (navData.isActive ? "active-page" : "")}
                    >
                      <Icon icon='heroicons:x-circle' className='menu-icon' />
                      <span>Jobs List</span>
                    </NavLink>
                  </li>
                </ul>
              </li>

              {/* Pipeline Section */}
              <li className='sidebar-menu-group-title'>Pipeline</li>
              <li className="dropdown">
                <a
                  href="#"
                  className="d-flex align-items-center justify-content-between"
                  onClick={(e) => {
                    e.preventDefault();
                    togglePipelineMenu();
                  }}
                >
                  <div className="d-flex align-items-center">
                    <Icon icon='heroicons:queue-list' className='menu-icon' />
                    <span>Pipeline Management</span>
                  </div>
                  <Icon
                    icon={pipelineMenuOpen ? 'heroicons:chevron-up' : 'heroicons:chevron-down'}
                    className='submenu-arrow'
                  />
                </a>
                <ul className={`sidebar-submenu ${pipelineMenuOpen ? 'show' : ''}`}>
                  <li>
                    <NavLink
                      to='/pipeline/view'
                      className={(navData) => (navData.isActive ? "active-page" : "")}
                    >
                      <Icon icon='heroicons:eye' className='menu-icon' />
                      <span>Pipeline View</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to='/pipeline/stages'
                      className={(navData) => (navData.isActive ? "active-page" : "")}
                    >
                      <Icon icon='heroicons:bars-3' className='menu-icon' />
                      <span>Stages</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to='/pipeline/drag-drop'
                      className={(navData) => (navData.isActive ? "active-page" : "")}
                    >
                      <Icon icon='heroicons:arrows-pointing-out' className='menu-icon' />
                      <span>Drag & Drop</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to='/pipeline/collaboration'
                      className={(navData) => (navData.isActive ? "active-page" : "")}
                    >
                      <Icon icon='heroicons:users' className='menu-icon' />
                      <span>Collaboration Tools</span>
                    </NavLink>
                  </li>
                </ul>
              </li>

              {/* Analytics Section */}
              <li className='sidebar-menu-group-title'>Analytics</li>
              <li className="dropdown">
                <a
                  href="#"
                  className="d-flex align-items-center justify-content-between"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleAnalyticsMenu();
                  }}
                >
                  <div className="d-flex align-items-center">
                    <Icon icon='heroicons:chart-bar-square' className='menu-icon' />
                    <span>Analytics Dashboard</span>
                  </div>
                  <Icon
                    icon={analyticsMenuOpen ? 'heroicons:chevron-up' : 'heroicons:chevron-down'}
                    className='submenu-arrow'
                  />
                </a>
                <ul className={`sidebar-submenu ${analyticsMenuOpen ? 'show' : ''}`}>
                  <li>
                    <NavLink
                      to='/analytics/recruiter-performance'
                      className={(navData) => (navData.isActive ? "active-page" : "")}
                    >
                      <Icon icon='heroicons:user-group' className='menu-icon' />
                      <span>Recruiter Performance</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to='/analytics/time-to-hire'
                      className={(navData) => (navData.isActive ? "active-page" : "")}
                    >
                      <Icon icon='heroicons:clock' className='menu-icon' />
                      <span>Time to Hire</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to='/analytics/candidate-sourcing'
                      className={(navData) => (navData.isActive ? "active-page" : "")}
                    >
                      <Icon icon='heroicons:magnifying-glass' className='menu-icon' />
                      <span>Candidate Sourcing</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to='/analytics/job-performance'
                      className={(navData) => (navData.isActive ? "active-page" : "")}
                    >
                      <Icon icon='heroicons:chart-bar' className='menu-icon' />
                      <span>Job Performance</span>
                    </NavLink>
                  </li>
                </ul>
              </li>

              {/* Company Settings Section */}
              <li className='sidebar-menu-group-title'>Company Settings</li>
              <li className="dropdown">
                <a
                  href="#"
                  className="d-flex align-items-center justify-content-between"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleCompanySettingsMenu();
                  }}
                >
                  <div className="d-flex align-items-center">
                    <Icon icon='heroicons:building-office' className='menu-icon' />
                    <span>Company Management</span>
                  </div>
                  <Icon
                    icon={companySettingsMenuOpen ? 'heroicons:chevron-up' : 'heroicons:chevron-down'}
                    className='submenu-arrow'
                  />
                </a>
                <ul className={`sidebar-submenu ${companySettingsMenuOpen ? 'show' : ''}`}>
                  <li>
                    <NavLink
                      to='/company-settings/info'
                      className={(navData) => (navData.isActive ? "active-page" : "")}
                    >
                      <Icon icon='heroicons:information-circle' className='menu-icon' />
                      <span>Company Info</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to='/company-settings/users'
                      className={(navData) => (navData.isActive ? "active-page" : "")}
                    >
                      <Icon icon='heroicons:user-group' className='menu-icon' />
                      <span>Company Users</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to='/company-settings/billing'
                      className={(navData) => (navData.isActive ? "active-page" : "")}
                    >
                      <Icon icon='heroicons:credit-card' className='menu-icon' />
                      <span>Company Billing</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to='/company-settings/integration'
                      className={(navData) => (navData.isActive ? "active-page" : "")}
                    >
                      <Icon icon='heroicons:puzzle-piece' className='menu-icon' />
                      <span>Company Integration</span>
                    </NavLink>
                  </li>
                </ul>
              </li>

              {/* HR Suite Section */}
              <li className='sidebar-menu-group-title'>HR Suite</li>
              <li className="dropdown">
                <a
                  href="#"
                  className="d-flex align-items-center justify-content-between"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleHrSuiteMenu();
                  }}
                >
                  <div className="d-flex align-items-center">
                    <Icon icon='heroicons:users' className='menu-icon' />
                    <span>HR Management</span>
                  </div>
                  <Icon
                    icon={hrSuiteMenuOpen ? 'heroicons:chevron-up' : 'heroicons:chevron-down'}
                    className='submenu-arrow'
                  />
                </a>
                <ul className={`sidebar-submenu ${hrSuiteMenuOpen ? 'show' : ''}`}>
                  <li>
                    <NavLink
                      to='/hr-suite/white-label'
                      className={(navData) => (navData.isActive ? "active-page" : "")}
                    >
                      <Icon icon='heroicons:paint-brush' className='menu-icon' />
                      <span>White Label</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to='/hr-suite/employee-analytics'
                      className={(navData) => (navData.isActive ? "active-page" : "")}
                    >
                      <Icon icon='heroicons:chart-bar-square' className='menu-icon' />
                      <span>Employee Analytics</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to='/hr-suite/attendance'
                      className={(navData) => (navData.isActive ? "active-page" : "")}
                    >
                      <Icon icon='heroicons:clock' className='menu-icon' />
                      <span>Attendance</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to='/hr-suite/payroll-dashboard'
                      className={(navData) => (navData.isActive ? "active-page" : "")}
                    >
                      <Icon icon='heroicons:currency-dollar' className='menu-icon' />
                      <span>Payroll Dashboard</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to='/hr-suite/esign'
                      className={(navData) => (navData.isActive ? "active-page" : "")}
                    >
                      <Icon icon='heroicons:pencil-square' className='menu-icon' />
                      <span>E-Sign</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to='/hr-suite/onboarding-documents'
                      className={(navData) => (navData.isActive ? "active-page" : "")}
                    >
                      <Icon icon='heroicons:document-text' className='menu-icon' />
                      <span>Onboarding Documents</span>
                    </NavLink>
                  </li>
                </ul>
              </li>



            </>
          )}


          {/* Show Super Admin specific menu items */}
          {isSuperAdmin && (
            <>
              <li className='sidebar-menu-group-title'>Administration</li>
              <li>
                <NavLink
                  to='/super-admin'
                  className={(navData) => (navData.isActive ? "active-page" : "")}
                >
                  <Icon icon='heroicons:home' className='menu-icon' />
                  <span>Admin Dashboard</span>
                </NavLink>
              </li>

              {/* Recruiter Section */}
              <li className='sidebar-menu-group-title'>Recruiter</li>
              <li className="dropdown">
                <a
                  href="#"
                  className="d-flex align-items-center justify-content-between"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleRecruiterMenu();
                  }}
                >
                  <div className="d-flex align-items-center">
                    <Icon icon='heroicons:briefcase' className='menu-icon' />
                    <span>Recruiter</span>
                  </div>
                  <Icon
                    icon={recruiterMenuOpen ? 'heroicons:chevron-up' : 'heroicons:chevron-down'}
                    className='submenu-arrow'
                  />
                </a>
                <ul className={`sidebar-submenu ${recruiterMenuOpen ? 'show' : ''}`}>
                  <li>
                    <NavLink
                      to='/recruiter/assessments-library'
                      className={(navData) => (navData.isActive ? "active-page" : "")}
                    >
                      <Icon icon='heroicons:document-text' className='menu-icon' />
                      <span>Assessments Library</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to='/recruiter/assign-assessment'
                      className={(navData) => (navData.isActive ? "active-page" : "")}
                    >
                      <Icon icon='heroicons:user-plus' className='menu-icon' />
                      <span>Assign Assessment</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to='/recruiter/assessment-runner'
                      className={(navData) => (navData.isActive ? "active-page" : "")}
                    >
                      <Icon icon='heroicons:play' className='menu-icon' />
                      <span>Assessment Runner</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to='/recruiter/results'
                      className={(navData) => (navData.isActive ? "active-page" : "")}
                    >
                      <Icon icon='heroicons:chart-bar' className='menu-icon' />
                      <span>Results</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to='/recruiter/assessment-runner-ai'
                      className={(navData) => (navData.isActive ? "active-page" : "")}
                    >
                      <Icon icon='heroicons:cpu-chip' className='menu-icon' />
                      <span>Assessment Runner AI</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to='/recruiter/prescreening'
                      className={(navData) => (navData.isActive ? "active-page" : "")}
                    >
                      <Icon icon='heroicons:magnifying-glass' className='menu-icon' />
                      <span>AI Prescreening</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to='/recruiter/ai-interview-configure'
                      className={(navData) => (navData.isActive ? "active-page" : "")}
                    >
                      <Icon icon='heroicons:cog-6-tooth' className='menu-icon' />
                      <span>Configure AI Interview</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to='/recruiter/ai-interview-review'
                      className={(navData) => (navData.isActive ? "active-page" : "")}
                    >
                      <Icon icon='heroicons:eye' className='menu-icon' />
                      <span>Review AI Interview</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to='/recruiter/offer-templates'
                      className={(navData) => (navData.isActive ? "active-page" : "")}
                    >
                      <Icon icon='heroicons:document-duplicate' className='menu-icon' />
                      <span>Offer Templates</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to='/recruiter/offer-tracking'
                      className={(navData) => (navData.isActive ? "active-page" : "")}
                    >
                      <Icon icon='heroicons:clipboard-document-list' className='menu-icon' />
                      <span>Offer Tracking</span>
                    </NavLink>
                  </li>
                </ul>
              </li>

              {/* Jobs Section */}
               <li className='sidebar-menu-group-title'>Jobs</li>

              <li className="dropdown">
                <a
                  href="#"
                  className="d-flex align-items-center justify-content-between"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleJobsMenu();
                  }}
                >
                  <div className="d-flex align-items-center">
                    <Icon icon='heroicons:list-bullet' className='menu-icon' />
                    <span>Jobs</span>
                  </div>
                  <Icon
                    icon={jobsMenuOpen ? 'heroicons:chevron-up' : 'heroicons:chevron-down'}
                    className='submenu-arrow'
                  />
                </a>
                <ul className={`sidebar-submenu ${jobsMenuOpen ? 'show' : ''}`}>
                  <li>
                    <NavLink
                      to='/jobs/post-new'
                      className={(navData) => (navData.isActive ? "active-page" : "")}
                    >
                      <Icon icon='heroicons:play-circle' className='menu-icon' />
                      <span>Post New Job</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to='/jobs/list'
                      className={(navData) => (navData.isActive ? "active-page" : "")}
                    >
                      <Icon icon='heroicons:x-circle' className='menu-icon' />
                      <span>Jobs List</span>
                    </NavLink>
                  </li>
                </ul>
              </li>
              {/* Pipeline Section */}
              <li className='sidebar-menu-group-title'>Pipeline</li>
              <li className="dropdown">
                <a
                  href="#"
                  className="d-flex align-items-center justify-content-between"
                  onClick={(e) => {
                    e.preventDefault();
                    togglePipelineMenu();
                  }}
                >
                  <div className="d-flex align-items-center">
                    <Icon icon='heroicons:queue-list' className='menu-icon' />
                    <span>Pipeline Management</span>
                  </div>
                  <Icon
                    icon={pipelineMenuOpen ? 'heroicons:chevron-up' : 'heroicons:chevron-down'}
                    className='submenu-arrow'
                  />
                </a>
                <ul className={`sidebar-submenu ${pipelineMenuOpen ? 'show' : ''}`}>
                  <li>
                    <NavLink
                      to='/pipeline/view'
                      className={(navData) => (navData.isActive ? "active-page" : "")}
                    >
                      <Icon icon='heroicons:eye' className='menu-icon' />
                      <span>Pipeline View</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to='/pipeline/stages'
                      className={(navData) => (navData.isActive ? "active-page" : "")}
                    >
                      <Icon icon='heroicons:bars-3' className='menu-icon' />
                      <span>Stages</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to='/pipeline/drag-drop'
                      className={(navData) => (navData.isActive ? "active-page" : "")}
                    >
                      <Icon icon='heroicons:arrows-pointing-out' className='menu-icon' />
                      <span>Drag & Drop</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to='/pipeline/collaboration'
                      className={(navData) => (navData.isActive ? "active-page" : "")}
                    >
                      <Icon icon='heroicons:users' className='menu-icon' />
                      <span>Collaboration Tools</span>
                    </NavLink>
                  </li>
                </ul>
              </li>

              {/* Analytics Section */}
              <li className='sidebar-menu-group-title'>Analytics</li>
              <li className="dropdown">
                <a
                  href="#"
                  className="d-flex align-items-center justify-content-between"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleAnalyticsMenu();
                  }}
                >
                  <div className="d-flex align-items-center">
                    <Icon icon='heroicons:chart-bar-square' className='menu-icon' />
                    <span>Analytics Dashboard</span>
                  </div>
                  <Icon
                    icon={analyticsMenuOpen ? 'heroicons:chevron-up' : 'heroicons:chevron-down'}
                    className='submenu-arrow'
                  />
                </a>
                <ul className={`sidebar-submenu ${analyticsMenuOpen ? 'show' : ''}`}>
                  <li>
                    <NavLink
                      to='/analytics/recruiter-performance'
                      className={(navData) => (navData.isActive ? "active-page" : "")}
                    >
                      <Icon icon='heroicons:user-group' className='menu-icon' />
                      <span>Recruiter Performance</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to='/analytics/time-to-hire'
                      className={(navData) => (navData.isActive ? "active-page" : "")}
                    >
                      <Icon icon='heroicons:clock' className='menu-icon' />
                      <span>Time to Hire</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to='/analytics/candidate-sourcing'
                      className={(navData) => (navData.isActive ? "active-page" : "")}
                    >
                      <Icon icon='heroicons:magnifying-glass' className='menu-icon' />
                      <span>Candidate Sourcing</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to='/analytics/job-performance'
                      className={(navData) => (navData.isActive ? "active-page" : "")}
                    >
                      <Icon icon='heroicons:chart-bar' className='menu-icon' />
                      <span>Job Performance</span>
                    </NavLink>
                  </li>
                </ul>
              </li>

              {/* Company Settings Section */}
              <li className='sidebar-menu-group-title'>Company Settings</li>
              <li className="dropdown">
                <a
                  href="#"
                  className="d-flex align-items-center justify-content-between"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleCompanySettingsMenu();
                  }}
                >
                  <div className="d-flex align-items-center">
                    <Icon icon='heroicons:building-office' className='menu-icon' />
                    <span>Company Management</span>
                  </div>
                  <Icon
                    icon={companySettingsMenuOpen ? 'heroicons:chevron-up' : 'heroicons:chevron-down'}
                    className='submenu-arrow'
                  />
                </a>
                <ul className={`sidebar-submenu ${companySettingsMenuOpen ? 'show' : ''}`}>
                  <li>
                    <NavLink
                      to='/company-settings/info'
                      className={(navData) => (navData.isActive ? "active-page" : "")}
                    >
                      <Icon icon='heroicons:information-circle' className='menu-icon' />
                      <span>Company Info</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to='/company-settings/users'
                      className={(navData) => (navData.isActive ? "active-page" : "")}
                    >
                      <Icon icon='heroicons:user-group' className='menu-icon' />
                      <span>Company Users</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to='/company-settings/billing'
                      className={(navData) => (navData.isActive ? "active-page" : "")}
                    >
                      <Icon icon='heroicons:credit-card' className='menu-icon' />
                      <span>Company Billing</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to='/company-settings/integration'
                      className={(navData) => (navData.isActive ? "active-page" : "")}
                    >
                      <Icon icon='heroicons:puzzle-piece' className='menu-icon' />
                      <span>Company Integration</span>
                    </NavLink>
                  </li>
                </ul>
              </li>

              {/* HR Suite Section */}
              <li className='sidebar-menu-group-title'>HR Suite</li>
              <li className="dropdown">
                <a
                  href="#"
                  className="d-flex align-items-center justify-content-between"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleHrSuiteMenu();
                  }}
                >
                  <div className="d-flex align-items-center">
                    <Icon icon='heroicons:users' className='menu-icon' />
                    <span>HR Management</span>
                  </div>
                  <Icon
                    icon={hrSuiteMenuOpen ? 'heroicons:chevron-up' : 'heroicons:chevron-down'}
                    className='submenu-arrow'
                  />
                </a>
                <ul className={`sidebar-submenu ${hrSuiteMenuOpen ? 'show' : ''}`}>
                  <li>
                    <NavLink
                      to='/hr-suite/white-label'
                      className={(navData) => (navData.isActive ? "active-page" : "")}
                    >
                      <Icon icon='heroicons:paint-brush' className='menu-icon' />
                      <span>White Label</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to='/hr-suite/employee-analytics'
                      className={(navData) => (navData.isActive ? "active-page" : "")}
                    >
                      <Icon icon='heroicons:chart-bar-square' className='menu-icon' />
                      <span>Employee Analytics</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to='/hr-suite/attendance'
                      className={(navData) => (navData.isActive ? "active-page" : "")}
                    >
                      <Icon icon='heroicons:clock' className='menu-icon' />
                      <span>Attendance</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to='/hr-suite/payroll-dashboard'
                      className={(navData) => (navData.isActive ? "active-page" : "")}
                    >
                      <Icon icon='heroicons:currency-dollar' className='menu-icon' />
                      <span>Payroll Dashboard</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to='/hr-suite/esign'
                      className={(navData) => (navData.isActive ? "active-page" : "")}
                    >
                      <Icon icon='heroicons:pencil-square' className='menu-icon' />
                      <span>E-Sign</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to='/hr-suite/onboarding-documents'
                      className={(navData) => (navData.isActive ? "active-page" : "")}
                    >
                      <Icon icon='heroicons:document-text' className='menu-icon' />
                      <span>Onboarding Documents</span>
                    </NavLink>
                  </li>
                </ul>
              </li>

              {/* Super Admin Section */}
              <li className='sidebar-menu-group-title'>Super Admin</li>
              <li className="dropdown">
                <a
                  href="#"
                  className="d-flex align-items-center justify-content-between"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleTenantsManagement();
                  }}
                >
                  <div className="d-flex align-items-center">
                    <Icon icon='heroicons:list-bullet' className='menu-icon' />
                    <span>Tenants Management</span>
                  </div>
                  <Icon
                    icon={tenantsmanagemantOpen ? 'heroicons:chevron-up' : 'heroicons:chevron-down'}
                    className='submenu-arrow'
                  />
                </a>
                <ul className={`sidebar-submenu ${tenantsmanagemantOpen ? 'show' : ''}`}>
                  <li>
                    <NavLink
                      to='/tenants/management/Info'
                      className={(navData) => (navData.isActive ? "active-page" : "")}
                    >
                      <Icon icon='heroicons:play-circle' className='menu-icon' />
                      <span>Tenants Info</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to='/tenants/management/actions'
                      className={(navData) => (navData.isActive ? "active-page" : "")}
                    >
                      <Icon icon='heroicons:x-circle' className='menu-icon' />
                      <span>Actions</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to='/tenants/management/details'
                      className={(navData) => (navData.isActive ? "active-page" : "")}
                    >
                      <Icon icon='heroicons:document-text' className='menu-icon' />
                      <span>Tenants Details page</span>
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li className="dropdown">
                <a
                  href="#"
                  className="d-flex align-items-center justify-content-between"
                  onClick={(e) => {
                    e.preventDefault();
                    togglePlansCredits();
                  }}
                >
                  <div className="d-flex align-items-center">
                    <Icon icon='heroicons:list-bullet' className='menu-icon' />
                    <span>Plans & Credits</span>
                  </div>
                  <Icon
                    icon={planscreditsOpen ? 'heroicons:chevron-up' : 'heroicons:chevron-down'}
                    className='submenu-arrow'
                  />
                </a>
                <ul className={`sidebar-submenu ${planscreditsOpen ? 'show' : ''}`}>
                  <li>
                    <NavLink
                      to='/plans/credits/list'
                      className={(navData) => (navData.isActive ? "active-page" : "")}
                    >
                      <Icon icon='heroicons:play-circle' className='menu-icon' />
                      <span>Plans List</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to='/plans/credits/allocation'
                      className={(navData) => (navData.isActive ? "active-page" : "")}
                    >
                      <Icon icon='heroicons:x-circle' className='menu-icon' />
                      <span>Credits Allocation</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to='/plans/credits/usage-tracking'
                      className={(navData) => (navData.isActive ? "active-page" : "")}
                    >
                      <Icon icon='heroicons:document-text' className='menu-icon' />
                      <span>Usage Tracking</span>
                    </NavLink>
                  </li>
                </ul>
              </li>
              
              <li className="dropdown">
                <a
                  href="#"
                  className="d-flex align-items-center justify-content-between"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleSystemHealth();
                  }}
                >
                  <div className="d-flex align-items-center">
                    <Icon icon='heroicons:list-bullet' className='menu-icon' />
                    <span>System Health</span>
                  </div>
                  <Icon
                    icon={systemhealthOpen ? 'heroicons:chevron-up' : 'heroicons:chevron-down'}
                    className='submenu-arrow'
                  />
                </a>
                <ul className={`sidebar-submenu ${systemhealthOpen ? 'show' : ''}`}>
                  <li>
                    <NavLink
                      to='/system/health/errors'
                      className={(navData) => (navData.isActive ? "active-page" : "")}
                    >
                      <Icon icon='heroicons:play-circle' className='menu-icon' />
                      <span>API Errors</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to='/system/health/uptime'
                      className={(navData) => (navData.isActive ? "active-page" : "")}
                    >
                      <Icon icon='heroicons:x-circle' className='menu-icon' />
                      <span>Uptime</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to='/system/health/usage'
                      className={(navData) => (navData.isActive ? "active-page" : "")}
                    >
                      <Icon icon='heroicons:document-text' className='menu-icon' />
                      <span>Usage</span>
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li className="dropdown">
                <a
                  href="#"
                  className="d-flex align-items-center justify-content-between"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleFeatureFlags();
                  }}
                >
                  <div className="d-flex align-items-center">
                    <Icon icon='heroicons:list-bullet' className='menu-icon' />
                    <span>Feature Flags</span>
                  </div>
                  <Icon
                    icon={featureflagsOpen ? 'heroicons:chevron-up' : 'heroicons:chevron-down'}
                    className='submenu-arrow'
                  />
                </a>
                <ul className={`sidebar-submenu ${featureflagsOpen ? 'show' : ''}`}>
                  <li>
                    <NavLink
                      to='/feature/flags/description'
                      className={(navData) => (navData.isActive ? "active-page" : "")}
                    >
                      <Icon icon='heroicons:play-circle' className='menu-icon' />
                      <span>Description</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to='/feature/flags/toggle-switch'
                      className={(navData) => (navData.isActive ? "active-page" : "")}
                    >
                      <Icon icon='heroicons:x-circle' className='menu-icon' />
                      <span>Toggle Switch</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to='/feature/flags/target-tenants'
                      className={(navData) => (navData.isActive ? "active-page" : "")}
                    >
                      <Icon icon='heroicons:document-text' className='menu-icon' />
                      <span>Target Tenants</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to='/feature/flags/rollout-status'
                      className={(navData) => (navData.isActive ? "active-page" : "")}
                    >
                      <Icon icon='heroicons:document-text' className='menu-icon' />
                      <span>Rollout Status</span>
                    </NavLink>
                  </li>
                </ul>
              </li>



              <li className='sidebar-menu-group-title'>System Management</li>
              <li>
                <a href="#" className="text-muted" onClick={(e) => { e.preventDefault(); alert('User Management feature coming soon...'); }}>
                  <Icon icon='heroicons:user-group' className='menu-icon' />
                  <span>User Management</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-muted" onClick={(e) => { e.preventDefault(); alert('System Settings feature coming soon...'); }}>
                  <Icon icon='heroicons:cog-6-tooth' className='menu-icon' />
                  <span>System Settings</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-muted" onClick={(e) => { e.preventDefault(); alert('Advanced Reports feature coming soon...'); }}>
                  <Icon icon='heroicons:document-chart-bar' className='menu-icon' />
                  <span>Advanced Reports</span>
                </a>
              </li>

              
            </>
          )}

        </ul>
      </div>
    </>
  )
}

export default SidebarNames;