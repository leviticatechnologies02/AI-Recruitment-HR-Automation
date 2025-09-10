import React from 'react'
import { Icon } from "@iconify/react/dist/iconify.js";
import { NavLink } from "react-router-dom";
import { getUserRole } from "../../../utils/auth";

const SidebarNames = () => {
  const userRole = getUserRole();
  const isSuperAdmin = userRole === 'superadmin';

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
             {/* <li className='sidebar-menu-group-title'>Application</li>
              <li>
                <NavLink
                  to='/post-job'
                  className={(navData) => (navData.isActive ? "active-page" : "")}
                >
                  <Icon icon='heroicons:plus' className='menu-icon' />
                  <span>Post a Job</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to='/hiring-funnel'
                  className={(navData) => (navData.isActive ? "active-page" : "")}
                >
                  <Icon icon='heroicons:chart-bar-square' className='menu-icon' />
                  <span>Hiring Funnel</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to='/time-to-hire'
                  className={(navData) => (navData.isActive ? "active-page" : "")}
                >
                  <Icon icon='heroicons:clock' className='menu-icon' />
                  <span>Time to Hire</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to='/selected-candidates'
                  className={(navData) => (navData.isActive ? "active-page" : "")}
                >
                  <Icon icon='heroicons:users' className='menu-icon' />
                  <span>Selected Candidates</span>
                </NavLink>
              </li>*/}
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
          {/* Application Section */}
          <li className='sidebar-menu-group-title'>Application</li>
          <li>
            <NavLink
              to='/post-job'
              className={(navData) => (navData.isActive ? "active-page" : "")}
            >
              <Icon icon='heroicons:plus' className='menu-icon' />
              <span>Post a Job</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/hiring-funnel'
              className={(navData) => (navData.isActive ? "active-page" : "")}
            >
              <Icon icon='heroicons:chart-bar-square' className='menu-icon' />
              <span>Hiring Funnel</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/time-to-hire'
              className={(navData) => (navData.isActive ? "active-page" : "")}
            >
              <Icon icon='heroicons:clock' className='menu-icon' />
              <span>Time to Hire</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/selected-candidates'
              className={(navData) => (navData.isActive ? "active-page" : "")}
            >
              <Icon icon='heroicons:clock' className='menu-icon' />
              <span>Selected Candidates</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/candidates-generator'
              className={(navData) => (navData.isActive ? "active-page" : "")}
            >
              <Icon icon='heroicons:clock' className='menu-icon' />
              <span>Candidates Generator</span>
            </NavLink>
          </li>

        </ul>
      </div>
    </>
  )
}

export default SidebarNames;