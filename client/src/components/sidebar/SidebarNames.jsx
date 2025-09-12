import React, { useState } from 'react'
import { Icon } from "@iconify/react/dist/iconify.js";
import { NavLink } from "react-router-dom";
import { getUserRole } from "../../utils/auth";

const SidebarNames = () => {
  const userRole = getUserRole();
  const isSuperAdmin = userRole === 'superadmin';
  const [recruiterMenuOpen, setRecruiterMenuOpen] = useState(false);
  const [jobsMenuOpen, setJobsMenuOpen] = useState(false);
  const [jobsListOpen, setJobsListOpen] = useState(false);
  const [jobCreateEditOpen, setJobCreateEditOpen] = useState(false);
  const [jobDetailsOpen, setJobDetailsOpen] = useState(false);

  const toggleRecruiterMenu = () => {
    setRecruiterMenuOpen(!recruiterMenuOpen);
  };

  const toggleJobsMenu = () => {
    setJobsMenuOpen(!jobsMenuOpen);
  };

  const toggleJobsList = () => {
    setJobsListOpen(!jobsListOpen);
  };

  const toggleJobCreateEdit = () => {
    setJobCreateEditOpen(!jobCreateEditOpen);
  };

  const toggleJobDetails = () => {
    setJobDetailsOpen(!jobDetailsOpen);
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
                    toggleJobsList();
                  }}
                >
                  <div className="d-flex align-items-center">
                    <Icon icon='heroicons:list-bullet' className='menu-icon' />
                    <span>Jobs List</span>
                  </div>
                  <Icon
                    icon={jobsListOpen ? 'heroicons:chevron-up' : 'heroicons:chevron-down'}
                    className='submenu-arrow'
                  />
                </a>
                <ul className={`sidebar-submenu ${jobsListOpen ? 'show' : ''}`}>
                  <li>
                    <NavLink
                      to='/jobs/list/active'
                      className={(navData) => (navData.isActive ? "active-page" : "")}
                    >
                      <Icon icon='heroicons:play-circle' className='menu-icon' />
                      <span>Active Jobs</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to='/jobs/list/closed'
                      className={(navData) => (navData.isActive ? "active-page" : "")}
                    >
                      <Icon icon='heroicons:x-circle' className='menu-icon' />
                      <span>Closed Jobs</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to='/jobs/list/draft'
                      className={(navData) => (navData.isActive ? "active-page" : "")}
                    >
                      <Icon icon='heroicons:document-text' className='menu-icon' />
                      <span>Draft Jobs</span>
                    </NavLink>
                  </li>
                </ul>
              </li>
                 {/* Job Create/Edit Submenu */}
                <li className="dropdown">
                  <a
                    href="#"
                    className="d-flex align-items-center justify-content-between"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleJobCreateEdit();
                    }}
                  >
                    <div className="d-flex align-items-center">
                      <Icon icon='heroicons:plus-circle' className='menu-icon' />
                      <span>Job Create/Edit</span>
                    </div>
                    <Icon
                      icon={jobCreateEditOpen ? 'heroicons:chevron-up' : 'heroicons:chevron-down'}
                      className='submenu-arrow'
                    />
                  </a>
                  <ul className={`sidebar-submenu ${jobCreateEditOpen ? 'show' : ''}`}>
                    <li>
                      <NavLink
                        to='/jobs/create/details'
                        className={(navData) => (navData.isActive ? "active-page" : "")}
                      >
                        <Icon icon='heroicons:document-text' className='menu-icon' />
                        <span>Job Details</span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to='/jobs/create/settings'
                        className={(navData) => (navData.isActive ? "active-page" : "")}
                      >
                        <Icon icon='heroicons:cog-6-tooth' className='menu-icon' />
                        <span>Application Settings</span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to='/jobs/create/visibility'
                        className={(navData) => (navData.isActive ? "active-page" : "")}
                      >
                        <Icon icon='heroicons:eye' className='menu-icon' />
                        <span>Visibility & Posting Options</span>
                      </NavLink>
                    </li>
                  </ul>
                </li>  
                {/* Job Details Submenu */}
                <li className="dropdown">
                  <a
                    href="#"
                    className="d-flex align-items-center justify-content-between"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleJobDetails();
                    }}
                  >
                    <div className="d-flex align-items-center">
                      <Icon icon='heroicons:chart-bar' className='menu-icon' />
                      <span>Job Details</span>
                    </div>
                    <Icon
                      icon={jobDetailsOpen ? 'heroicons:chevron-up' : 'heroicons:chevron-down'}
                      className='submenu-arrow'
                    />
                  </a>
                  <ul className={`sidebar-submenu ${jobDetailsOpen ? 'show' : ''}`}>
                    <li>
                      <NavLink
                        to='/jobs/details/applications'
                        className={(navData) => (navData.isActive ? "active-page" : "")}
                      >
                        <Icon icon='heroicons:users' className='menu-icon' />
                        <span>Applications Overview</span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to='/jobs/details/description'
                        className={(navData) => (navData.isActive ? "active-page" : "")}
                      >
                        <Icon icon='heroicons:document-text' className='menu-icon' />
                        <span>Job Description & Requirements</span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to='/jobs/details/performance'
                        className={(navData) => (navData.isActive ? "active-page" : "")}
                      >
                        <Icon icon='heroicons:chart-bar-square' className='menu-icon' />
                        <span>Job Performance</span>
                      </NavLink>
                    </li>
                  </ul>
                </li>

              {/* Application Section */}
              <li className='sidebar-menu-group-title'>Application</li>
              <li>
                <NavLink
                  to='/jobs/new'
                  className={(navData) => (navData.isActive ? "active-page" : "")}
                >
                  <Icon icon='heroicons:plus' className='menu-icon' />
                  <span>Post a Job</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to='/analytics'
                  className={(navData) => (navData.isActive ? "active-page" : "")}
                >
                  <Icon icon='heroicons:chart-bar-square' className='menu-icon' />
                  <span>Analytics</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to='/pipeline'
                  className={(navData) => (navData.isActive ? "active-page" : "")}
                >
                  <Icon icon='heroicons:clock' className='menu-icon' />
                  <span>Pipeline</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to='/candidates'
                  className={(navData) => (navData.isActive ? "active-page" : "")}
                >
                  <Icon icon='heroicons:users' className='menu-icon' />
                  <span>Candidates</span>
                </NavLink>
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
                    <Icon icon='heroicons:briefcase' className='menu-icon' />
                    <span>Jobs</span>
                  </div>
                  <Icon
                    icon={jobsMenuOpen ? 'heroicons:chevron-up' : 'heroicons:chevron-down'}
                    className='submenu-arrow'
                  />
                </a>
                <ul className={`sidebar-submenu ${jobsMenuOpen ? 'show' : ''}`}>
                  {/* Jobs List Submenu */}
                  <li className="dropdown">
                    <a
                      href="#"
                      className="d-flex align-items-center justify-content-between"
                      onClick={(e) => {
                        e.preventDefault();
                        toggleJobsList();
                      }}
                    >
                      <div className="d-flex align-items-center">
                        <Icon icon='heroicons:list-bullet' className='menu-icon' />
                        <span>Jobs List</span>
                      </div>
                      <Icon
                        icon={jobsListOpen ? 'heroicons:chevron-up' : 'heroicons:chevron-down'}
                        className='submenu-arrow'
                      />
                    </a>
                    <ul className={`sidebar-submenu ${jobsListOpen ? 'show' : ''}`}>
                      <li>
                        <NavLink
                          to='/jobs/list/active'
                          className={(navData) => (navData.isActive ? "active-page" : "")}
                        >
                          <Icon icon='heroicons:play-circle' className='menu-icon' />
                          <span>Active Jobs</span>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to='/jobs/list/closed'
                          className={(navData) => (navData.isActive ? "active-page" : "")}
                        >
                          <Icon icon='heroicons:x-circle' className='menu-icon' />
                          <span>Closed Jobs</span>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to='/jobs/list/draft'
                          className={(navData) => (navData.isActive ? "active-page" : "")}
                        >
                          <Icon icon='heroicons:document-text' className='menu-icon' />
                          <span>Draft Jobs</span>
                        </NavLink>
                      </li>
                    </ul>
                  </li>

                  {/* Job Create/Edit Submenu */}
                  <li className="dropdown">
                    <a
                      href="#"
                      className="d-flex align-items-center justify-content-between"
                      onClick={(e) => {
                        e.preventDefault();
                        toggleJobCreateEdit();
                      }}
                    >
                      <div className="d-flex align-items-center">
                        <Icon icon='heroicons:plus-circle' className='menu-icon' />
                        <span>Job Create/Edit</span>
                      </div>
                      <Icon
                        icon={jobCreateEditOpen ? 'heroicons:chevron-up' : 'heroicons:chevron-down'}
                        className='submenu-arrow'
                      />
                    </a>
                    <ul className={`sidebar-submenu ${jobCreateEditOpen ? 'show' : ''}`}>
                      <li>
                        <NavLink
                          to='/jobs/create/details'
                          className={(navData) => (navData.isActive ? "active-page" : "")}
                        >
                          <Icon icon='heroicons:document-text' className='menu-icon' />
                          <span>Job Details</span>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to='/jobs/create/settings'
                          className={(navData) => (navData.isActive ? "active-page" : "")}
                        >
                          <Icon icon='heroicons:cog-6-tooth' className='menu-icon' />
                          <span>Application Settings</span>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to='/jobs/create/visibility'
                          className={(navData) => (navData.isActive ? "active-page" : "")}
                        >
                          <Icon icon='heroicons:eye' className='menu-icon' />
                          <span>Visibility & Posting Options</span>
                        </NavLink>
                      </li>
                    </ul>
                  </li>

                  {/* Job Details Submenu */}
                  <li className="dropdown">
                    <a
                      href="#"
                      className="d-flex align-items-center justify-content-between"
                      onClick={(e) => {
                        e.preventDefault();
                        toggleJobDetails();
                      }}
                    >
                      <div className="d-flex align-items-center">
                        <Icon icon='heroicons:chart-bar' className='menu-icon' />
                        <span>Job Details</span>
                      </div>
                      <Icon
                        icon={jobDetailsOpen ? 'heroicons:chevron-up' : 'heroicons:chevron-down'}
                        className='submenu-arrow'
                      />
                    </a>
                    <ul className={`sidebar-submenu ${jobDetailsOpen ? 'show' : ''}`}>
                      <li>
                        <NavLink
                          to='/jobs/details/applications'
                          className={(navData) => (navData.isActive ? "active-page" : "")}
                        >
                          <Icon icon='heroicons:users' className='menu-icon' />
                          <span>Applications Overview</span>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to='/jobs/details/description'
                          className={(navData) => (navData.isActive ? "active-page" : "")}
                        >
                          <Icon icon='heroicons:document-text' className='menu-icon' />
                          <span>Job Description & Requirements</span>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to='/jobs/details/performance'
                          className={(navData) => (navData.isActive ? "active-page" : "")}
                        >
                          <Icon icon='heroicons:chart-bar-square' className='menu-icon' />
                          <span>Job Performance</span>
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>

              <li className='sidebar-menu-group-title'>Application</li>
              <li>
                <NavLink
                  to='/jobs/new'
                  className={(navData) => (navData.isActive ? "active-page" : "")}
                >
                  <Icon icon='heroicons:plus' className='menu-icon' />
                  <span>Post a Job</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to='/analytics'
                  className={(navData) => (navData.isActive ? "active-page" : "")}
                >
                  <Icon icon='heroicons:chart-bar-square' className='menu-icon' />
                  <span>Analytics</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to='/pipeline'
                  className={(navData) => (navData.isActive ? "active-page" : "")}
                >
                  <Icon icon='heroicons:clock' className='menu-icon' />
                  <span>Pipeline</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to='/candidates'
                  className={(navData) => (navData.isActive ? "active-page" : "")}
                >
                  <Icon icon='heroicons:users' className='menu-icon' />
                  <span>Candidates</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to='/ai/prescreening'
                  className={(navData) => (navData.isActive ? "active-page" : "")}
                >
                  <Icon icon='heroicons:user-plus' className='menu-icon' />
                  <span>AI Prescreening</span>
                </NavLink>
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