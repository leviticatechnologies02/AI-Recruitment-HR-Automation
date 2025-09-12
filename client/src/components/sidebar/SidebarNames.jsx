import React, { useState } from 'react'
import { Icon } from "@iconify/react/dist/iconify.js";
import { NavLink } from "react-router-dom";
import { getUserRole } from "../../utils/auth";

const SidebarNames = () => {
  const userRole = getUserRole();
  const isSuperAdmin = userRole === 'superadmin';
  const [settingsOpen, setSettingsOpen] = useState(false);
  
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
              <li>
                <NavLink
                  to='/JobsList'
                  className={(navData) => (navData.isActive ? "active-page" : "")}
                  >
                  <Icon icon='heroicons:users' className='menu-icon' />
                  <span>Jobs List</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to='/candidates-generator'
                  className={(navData) => (navData.isActive ? "active-page" : "")}
                  >
                    <Icon icon='heroicons:user-plus' className='menu-icon' />
                    <span>Candidates Generator</span>
                  </NavLink>
              </li>
              <li className='dropdown'>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setSettingsOpen(!settingsOpen);
                  }}
                  role="button"
                  aria-expanded={settingsOpen}
                  aria-controls="settings-submenu"
                  className={!settingsOpen ? 'collapsed' : ''}
                >
                  <Icon
                    icon='icon-park-outline:setting-two'
                    className='menu-icon'
                  />
                  <span>Settings</span>
                </a>
              <ul className={`sidebar-submenu collapse ${settingsOpen ? 'show' : ''}`} id="settings-submenu">
                <li>
                  <NavLink
                    to='/company'
                    className={(navData) =>
                      navData.isActive ? "active-page" : ""
                    }
                  >
                    <i className='ri-circle-fill circle-icon text-primary-600 w-auto' />{" "}
                    Company
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to='/notification'
                    className={(navData) =>
                      navData.isActive ? "active-page" : ""
                    }
                  >
                    <i className='ri-circle-fill circle-icon text-warning-main w-auto' />{" "}
                    Notification
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to='/notification-alert'
                    className={(navData) =>
                      navData.isActive ? "active-page" : ""
                    }
                  >
                    <i className='ri-circle-fill circle-icon text-info-main w-auto' />{" "}
                    Notification Alert
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to='/theme'
                    className={(navData) =>
                      navData.isActive ? "active-page" : ""
                    }
                  >
                    <i className='ri-circle-fill circle-icon text-danger-main w-auto' />{" "}
                    Theme
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to='/currencies'
                    className={(navData) =>
                      navData.isActive ? "active-page" : ""
                    }
                  >
                    <i className='ri-circle-fill circle-icon text-danger-main w-auto' />{" "}
                    Currencies
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to='/language'
                    className={(navData) =>
                      navData.isActive ? "active-page" : ""
                    }
                  >
                    <i className='ri-circle-fill circle-icon text-danger-main w-auto' />{" "}
                    Languages
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to='/payment-gateway'
                    className={(navData) =>
                      navData.isActive ? "active-page" : ""
                    }
                  >
                    <i className='ri-circle-fill circle-icon text-danger-main w-auto' />{" "}
                    Payment Gateway
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
                <button
                  type="button"
                  className="text-muted"
                  style={{ all: 'unset', cursor: 'pointer', width: '100%', display: 'flex', alignItems: 'center' }}
                  onClick={() => alert('User Management feature coming soon...')}
                >
                  <Icon icon='heroicons:user-group' className='menu-icon' />
                  <span>User Management</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="text-muted"
                  style={{ all: 'unset', cursor: 'pointer', width: '100%', display: 'flex', alignItems: 'center' }}
                  onClick={() => alert('System Settings feature coming soon...')}
                >
                  <Icon icon='heroicons:cog-6-tooth' className='menu-icon' />
                  <span>System Settings</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="text-muted"
                  style={{ all: 'unset', cursor: 'pointer', width: '100%', display: 'flex', alignItems: 'center' }}
                  onClick={() => alert('Advanced Reports feature coming soon...')}
                >
                  <Icon icon='heroicons:document-chart-bar' className='menu-icon' />
                  <span>Advanced Reports</span>
                </button>
              </li>
            </>
          )}

        </ul>
      </div>
    </>
  )
}

export default SidebarNames;