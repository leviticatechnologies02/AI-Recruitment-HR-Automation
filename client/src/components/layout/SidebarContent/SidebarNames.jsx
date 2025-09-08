import React from 'react'
import { Icon } from "@iconify/react/dist/iconify.js";
import { NavLink } from "react-router-dom";

const SidebarNames = () => {
  return (
    <>
      <div className='sidebar-menu-area'>
        <ul className='sidebar-menu' id='sidebar-menu'>
          {/* Dashboard */}
          <li>
            <NavLink
              to='/dashboard'
              className={(navData) => (navData.isActive ? "active-page" : "")}
            >
              <Icon
                icon='solar:home-smile-angle-outline'
                className='menu-icon'
              />
              <span>Dashboard</span>
            </NavLink>
          </li>
          

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
        </ul>
      </div>
    </>
  )
}

export default SidebarNames;