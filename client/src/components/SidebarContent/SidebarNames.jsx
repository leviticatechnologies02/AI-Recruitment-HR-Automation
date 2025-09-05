import React from 'react'
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link, NavLink } from "react-router-dom";

 const SidebarNames = () => {
  return (
    
    <>
    <div className='sidebar-menu-area'>
          <ul className='sidebar-menu' id='sidebar-menu'>
            <li className='dropdown'>
              <Link to='#'>
                <Icon
                  icon='solar:home-smile-angle-outline'
                  className='menu-icon'
                />
                <span>Dashboard</span>
              </Link>
              <ul className='sidebar-submenu'>
                <li>
                  <NavLink
                    to='/'
                    className={(navData) =>
                      navData.isActive ? "active-page" : ""
                    }
                  >
                    <i className='ri-circle-fill circle-icon text-primary-600 w-auto' />
                    AI
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to='/index-2'
                    className={(navData) =>
                      navData.isActive ? "active-page" : ""
                    }
                  >
                    <i className='ri-circle-fill circle-icon text-warning-main w-auto' />{" "}
                    CRM
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to='/index-3'
                    className={(navData) =>
                      navData.isActive ? "active-page" : ""
                    }
                  >
                    <i className='ri-circle-fill circle-icon text-info-main w-auto' />{" "}
                    eCommerce
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to='/index-4'
                    className={(navData) =>
                      navData.isActive ? "active-page" : ""
                    }
                  >
                    <i className='ri-circle-fill circle-icon text-danger-main w-auto' />
                    Cryptocurrency
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to='/index-5'
                    className={(navData) =>
                      navData.isActive ? "active-page" : ""
                    }
                  >
                    <i className='ri-circle-fill circle-icon text-success-main w-auto' />{" "}
                    Investment
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to='/index-6'
                    className={(navData) =>
                      navData.isActive ? "active-page" : ""
                    }
                  >
                    <i className='ri-circle-fill circle-icon text-purple w-auto' />{" "}
                    LMS
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to='/index-7'
                    className={(navData) =>
                      navData.isActive ? "active-page" : ""
                    }
                  >
                    <i className='ri-circle-fill circle-icon text-info-main w-auto' />{" "}
                    NFT &amp; Gaming
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to='/index-8'
                    className={(navData) =>
                      navData.isActive ? "active-page" : ""
                    }
                  >
                    <i className='ri-circle-fill circle-icon text-info-main w-auto' />{" "}
                    Medical
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to='/index-9'
                    className={(navData) =>
                      navData.isActive ? "active-page" : ""
                    }
                  >
                    <i className='ri-circle-fill circle-icon text-info-main w-auto' />{" "}
                    Analytics
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to='/index-10'
                    className={(navData) =>
                      navData.isActive ? "active-page" : ""
                    }
                  >
                    <i className='ri-circle-fill circle-icon text-info-main w-auto' />{" "}
                    POS & Inventory
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to='/index-11'
                    className={(navData) =>
                      navData.isActive ? "active-page" : ""
                    }
                  >
                    <i className='ri-circle-fill circle-icon text-info-main w-auto' />{" "}
                    Finance & Banking
                  </NavLink>
                </li>
              </ul>
            </li>

            <li className='sidebar-menu-group-title'>Application</li>
            <li>
              <NavLink
                to='/email'
                className={(navData) => (navData.isActive ? "active-page" : "")}
              >
                <Icon icon='mage:email' className='menu-icon' />
                <span>Email</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/chat-message'
                className={(navData) => (navData.isActive ? "active-page" : "")}
              >
                <Icon icon='bi:chat-dots' className='menu-icon' />
                <span>Chat</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/calendar-main'
                className={(navData) => (navData.isActive ? "active-page" : "")}
              >
                <Icon icon='solar:calendar-outline' className='menu-icon' />
                <span>Calendar</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/kanban'
                className={(navData) => (navData.isActive ? "active-page" : "")}
              >
                <Icon
                  icon='material-symbols:map-outline'
                  className='menu-icon'
                />
                <span>Kanban</span>
              </NavLink>
            </li>
 {/* Settings Dropdown */}
            <li className='dropdown'>
              <Link to='#'>
                <Icon
                  icon='icon-park-outline:setting-two'
                  className='menu-icon'
                />
                <span>Settings</span>
              </Link>
              <ul className='sidebar-submenu'>
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
          </ul>
        </div>
    </>
  )
}


export default SidebarNames;