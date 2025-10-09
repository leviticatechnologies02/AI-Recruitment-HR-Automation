/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

const RecruiterDashboardLayout = ({ children, internalNav = false, activeTab, onTabChange }) => {
  let [sidebarActive, seSidebarActive] = useState(false);
  let [mobileMenu, setMobileMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleDropdownClick = (event) => {
      event.preventDefault();
      const clickedLink = event.currentTarget;
      const clickedDropdown = clickedLink.closest(".dropdown");

      if (!clickedDropdown) return;

      const isActive = clickedDropdown.classList.contains("open");

      // Close all dropdowns
      const allDropdowns = document.querySelectorAll(".sidebar-menu .dropdown");
      allDropdowns.forEach((dropdown) => {
        dropdown.classList.remove("open");
        const submenu = dropdown.querySelector(".sidebar-submenu");
        if (submenu) {
          submenu.style.maxHeight = "0px"; // Collapse submenu
        }
      });

      // Toggle the clicked dropdown
      if (!isActive) {
        clickedDropdown.classList.add("open");
        const submenu = clickedDropdown.querySelector(".sidebar-submenu");
        if (submenu) {
          submenu.style.maxHeight = `${submenu.scrollHeight}px`; // Expand submenu
        }
      }
    };

    const dropdownTriggers = document.querySelectorAll(
      ".sidebar-menu .dropdown > a, .sidebar-menu .dropdown > Link"
    );

    dropdownTriggers.forEach((trigger) => {
      trigger.addEventListener("click", handleDropdownClick);
    });

    const openActiveDropdown = () => {
      const allDropdowns = document.querySelectorAll(".sidebar-menu .dropdown");
      allDropdowns.forEach((dropdown) => {
        const submenuLinks = dropdown.querySelectorAll(".sidebar-submenu li a");
        submenuLinks.forEach((link) => {
          if (
            link.getAttribute("href") === location.pathname ||
            link.getAttribute("to") === location.pathname
          ) {
            dropdown.classList.add("open");
            const submenu = dropdown.querySelector(".sidebar-submenu");
            if (submenu) {
              submenu.style.maxHeight = `${submenu.scrollHeight}px`; // Expand submenu
            }
          }
        });
      });
    };

    // Open the submenu that contains the active route
    openActiveDropdown();

    // Cleanup event listeners on unmount
    return () => {
      dropdownTriggers.forEach((trigger) => {
        trigger.removeEventListener("click", handleDropdownClick);
      });
    };
  }, [location.pathname]);

  let sidebarControl = () => {
    seSidebarActive(!sidebarActive);
  };

  let mobileMenuControl = () => {
    setMobileMenu(!mobileMenu);
  };

  const handleLogout = async () => {
    try {
      localStorage.removeItem('userRole');
      localStorage.removeItem('userEmail');
      navigate('/login');
    } catch (error) {
      navigate('/login');
    }
  };

  const LinkItem = ({ to, tabKey, icon, label, isParent = false }) => {
    if (internalNav) {
      return (
        <a href="#" onClick={(e) => { e.preventDefault(); onTabChange && onTabChange(tabKey); }} className={activeTab === tabKey ? "active-page" : ""}>
          <Icon icon={icon} className="menu-icon" />
          <span>{label}</span>
        </a>
      );
    }
    return (
      <NavLink 
        to={to} 
        className={(navData) => {
          if (isParent) {
            // For parent items like "Jobs", check if current path starts with the parent path
            return location.pathname.startsWith(to) ? "active-page" : "";
          }
          return navData.isActive ? "active-page" : "";
        }}
      >
        <Icon icon={icon} className="menu-icon" />
        <span>{label}</span>
      </NavLink>
    );
  };

  const ShortcutLink = ({ to, tabKey, label, icon }) => {
    if (internalNav) {
      return (
        <a href="#" onClick={(e) => { e.preventDefault(); onTabChange && onTabChange(tabKey); }} className={activeTab === tabKey ? "active-page" : ""}>
          <Icon icon={icon} className="menu-icon" />
          <span>{label}</span>
        </a>
      );
    }
    return (
      <NavLink to={to} className={(navData) => (navData.isActive ? "active-page" : "")}>
        <Icon icon={icon} className="menu-icon" />
        <span>{label}</span>
      </NavLink>
    );
  };

  // Add CSS to ensure active state is visible
  const activeStyles = `
    .sidebar-menu li > a.active-page {
      background-color: #007bff !important;
      color: #fff !important;
      border-radius: 8px;
    }
    .sidebar-menu .sidebar-submenu li > a.active-page {
      background-color: #6c757d !important;
      color: #fff !important;
      border-radius: 6px;
    }
    .sidebar-menu .dropdown.open > a {
      background-color: #007bff !important;
      color: #fff !important;
      border-radius: 8px;
    }
    .sidebar-menu .dropdown > a {
      background-color: transparent !important;
      color: inherit !important;
    }
    .sidebar-menu .dropdown.has-active-submenu > a {
      background-color: #007bff !important;
      color: #fff !important;
      border-radius: 8px;
    }
    .navbar-header.sticky-top {
      background-color: #fff;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      z-index: 1020;
    }
    .sidebar-submenu li {
      list-style: none !important;
    }
    .sidebar-submenu li::before {
      display: none !important;
    }
    .sidebar-submenu {
      list-style-type: none !important;
    }
  `;

  return (
    <>
      <style>{activeStyles}</style>
    <section className={mobileMenu ? "overlay active" : "overlay "}>
      {/* sidebar */}
      <aside
        className={
          sidebarActive
            ? "sidebar active "
            : mobileMenu
            ? "sidebar sidebar-open"
            : "sidebar"
        }
      >
        <button onClick={mobileMenuControl} type='button' className='sidebar-close-btn'>
          <Icon icon='radix-icons:cross-2' />
        </button>
        <div>
          <Link to='/dashboard' className='sidebar-logo'>
            <img src='assets/images/logo.png' alt='site logo' className='light-logo' />
            <img src='assets/images/logo-light.png' alt='site logo' className='dark-logo' />
            <img src='assets/images/logo-icon.png' alt='site logo' className='logo-icon' />
          </Link>
        </div>
        <div className='sidebar-menu-area'>
          <ul className='sidebar-menu' id='sidebar-menu'>
            {/* Recruiter Dashboard */}
            <li>
              <LinkItem to='/dashboard' tabKey='dashboard' icon='heroicons:home' label='Recruiter Dashboard' />
            </li>

            <li className='sidebar-menu-group-title'>Recruitment Management</li>

            {/* Jobs Management */}
            <li>
              <LinkItem to='/jobslist' tabKey='jobs' icon='solar:clipboard-list-outline' label='Jobs' isParent={true} />
            </li>

            {/* Candidates Management */}
            <li>
              <LinkItem to='/candidates' tabKey='candidates' icon='heroicons:users' label='Candidates' />
            </li>

            {/* Pipeline Dropdown */}
            <li className='dropdown'>
              <Link to='#'>
                <Icon icon='heroicons:queue-list' className='menu-icon' />
                <span>Pipeline</span>
              </Link>
              <ul className='sidebar-submenu'>
                <li>
                  <NavLink
                    to='/pipeline/view'
                    className={(navData) =>
                      navData.isActive ? "active-page" : ""
                    }
                  >
                    <Icon icon='heroicons:arrow-right' className='icon text-sm me-2' />
                    Pipeline View
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to='/pipeline/stages'
                    className={(navData) =>
                      navData.isActive ? "active-page" : ""
                    }
                  >
                    <Icon icon='heroicons:arrow-right' className='icon text-sm me-2' />
                    Stages
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to='/pipeline/drag-drop'
                    className={(navData) =>
                      navData.isActive ? "active-page" : ""
                    }
                  >
                    <Icon icon='heroicons:arrow-right' className='icon text-sm me-2' />
                    Drag & Drop
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to='/pipeline/collaboration'
                    className={(navData) =>
                      navData.isActive ? "active-page" : ""
                    }
                  >
                    <Icon icon='heroicons:arrow-right' className='icon text-sm me-2' />
                    Collaboration Tools
                  </NavLink>
                </li>
              </ul>
            </li>

            <li className='sidebar-menu-group-title'>Analytics & Insights</li>

            {/* Analytics Dropdown */}
            <li className='dropdown'>
              <Link to='#'>
                <Icon icon='heroicons:chart-bar-square' className='menu-icon' />
                <span>Analytics</span>
              </Link>
              <ul className='sidebar-submenu'>
                <li>
                  <NavLink
                    to='/analytics/recruiter-performance'
                    className={(navData) =>
                      navData.isActive ? "active-page" : ""
                    }
                  >
                    <Icon icon='heroicons:arrow-right' className='icon text-sm me-2' />
                    Recruiter Performance
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to='/analytics/time-to-hire'
                    className={(navData) =>
                      navData.isActive ? "active-page" : ""
                    }
                  >
                    <Icon icon='heroicons:arrow-right' className='icon text-sm me-2' />
                    Time To Hire
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to='/analytics/job-performance'
                    className={(navData) =>
                      navData.isActive ? "active-page" : ""
                    }
                  >
                    <Icon icon='heroicons:arrow-right' className='icon text-sm me-2' />
                    Job Performance
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to='/analytics/job-sourcing'
                    className={(navData) =>
                      navData.isActive ? "active-page" : ""
                    }
                  >
                    <Icon icon='heroicons:arrow-right' className='icon text-sm me-2' />
                    Job Sourcing
                  </NavLink>
                </li>
              </ul>
            </li>

            <li className='sidebar-menu-group-title'>Configuration</li>

            {/* Settings */}
            <li>
              <LinkItem to='/settings' tabKey='settings' icon='icon-park-outline:setting-two' label='Settings' />
            </li>

            <li className='sidebar-menu-group-title'>Quick Actions</li>

            {/* Shortcuts */}
            <li>
              <ShortcutLink to='/jobs/new' tabKey='create-job' label='Create Job' icon='heroicons:plus' />
            </li>
          </ul>
        </div>
      </aside>

      <main className={(sidebarActive ? "dashboard-main active" : "dashboard-main") + " bg-neutral-50"}>
        <div className='navbar-header bg-base'>
          <div className='row align-items-center justify-content-between'>
            <div className='col-auto'>
              <div className='d-flex flex-wrap align-items-center gap-4'>
                <button type='button' className='sidebar-toggle' onClick={sidebarControl}>
                  {sidebarActive ? (
                    <Icon icon='iconoir:arrow-right' className='icon text-2xl non-active' />
                  ) : (
                    <Icon icon='heroicons:bars-3-solid' className='icon text-2xl non-active ' />
                  )}
                </button>
                <button onClick={mobileMenuControl} type='button' className='sidebar-mobile-toggle'>
                  <Icon icon='heroicons:bars-3-solid' className='icon' />
                </button>
                <form className='navbar-search'>
                  <input type='text' name='search' placeholder='Search jobs, candidates...' />
                  <Icon icon='ion:search-outline' className='icon' />
                </form>
              </div>
            </div>
            <div className='col-auto'>
              <div className='d-flex flex-wrap align-items-center gap-3'>
                <div className='dropdown'>
                  <button className='has-indicator w-40-px h-40-px bg-neutral-200 rounded-circle d-flex justify-content-center align-items-center' type='button' data-bs-toggle='dropdown'>
                    <Icon icon='iconoir:bell' className='text-primary-light text-xl' />
                  </button>
                  <div className='dropdown-menu to-top dropdown-menu-lg p-0'>
                    <div className='m-16 py-12 px-16 radius-8 bg-primary-50 mb-16 d-flex align-items-center justify-content-between gap-2'>
                      <div>
                        <h6 className='text-lg text-primary-light fw-semibold mb-0'>Notifications</h6>
                      </div>
                      <span className='text-primary-600 fw-semibold text-lg w-40-px h-40-px rounded-circle bg-base d-flex justify-content-center align-items-center'>
                        03
                      </span>
                    </div>
                    <div className='max-h-400-px overflow-y-auto scroll-sm pe-4'>
                      <Link to='#' className='px-24 py-12 d-flex align-items-start gap-3 mb-2 justify-content-between'>
                        <div className='text-black hover-bg-transparent hover-text-primary d-flex align-items-center gap-3'>
                          <span className='w-44-px h-44-px bg-success-subtle text-success-main rounded-circle d-flex justify-content-center align-items-center flex-shrink-0'>
                            <Icon icon='bitcoin-icons:verify-outline' className='icon text-xxl' />
                          </span>
                          <div>
                            <h6 className='text-md fw-semibold mb-4'>New candidate applied</h6>
                            <p className='mb-0 text-sm text-secondary-light text-w-200-px'>You have 5 new applications.</p>
                          </div>
                        </div>
                        <span className='text-sm text-secondary-light flex-shrink-0'>10 mins ago</span>
                      </Link>
                    </div>
                    <div className='text-center py-12 px-16'>
                      <Link to='#' className='text-primary-600 fw-semibold text-md'>See All Notifications</Link>
                    </div>
                  </div>
                </div>

                <div className='dropdown'>
                  <button className='d-flex justify-content-center align-items-center rounded-circle' type='button' data-bs-toggle='dropdown'>
                    <img src='assets/images/user.png' alt='Recruiter' className='w-40-px h-40-px object-fit-cover rounded-circle' />
                  </button>
                  <div className='dropdown-menu to-top dropdown-menu-sm'>
                    <div className='py-12 px-16 radius-8 bg-primary-50 mb-16 d-flex align-items-center justify-content-between gap-2'>
                      <div>
                        <h6 className='text-lg text-primary-light fw-semibold mb-2'>Recruiter</h6>
                        <span className='text-secondary-light fw-medium text-sm'>Talent & Hiring</span>
                      </div>
                      <button type='button' className='hover-text-danger'>
                        <Icon icon='radix-icons:cross-1' className='icon text-xl' />
                      </button>
                    </div>
                    <ul className='to-top-list'>
                      <li>
                        <Link className='dropdown-item text-black px-0 py-8 hover-bg-transparent hover-text-primary d-flex align-items-center gap-3' to='/view-profile'>
                          <Icon icon='solar:user-linear' className='icon text-xl' /> My Profile
                        </Link>
                      </li>
                      <li>
                        <Link className='dropdown-item text-black px-0 py-8 hover-bg-transparent hover-text-primary d-flex align-items-center gap-3' to='/company-settings/info'>
                          <Icon icon='icon-park-outline:setting-two' className='icon text-xl' /> Settings
                        </Link>
                      </li>
                      <li>
                        <button className='dropdown-item text-black px-0 py-8 hover-bg-transparent hover-text-danger d-flex align-items-center gap-3 border-0 bg-transparent w-100' onClick={handleLogout} style={{ textAlign: 'left', cursor: 'pointer' }}>
                          <Icon icon='lucide:power' className='icon text-xl' /> Log Out
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='dashboard-main-body bg-neutral-50'>{children}</div>

        {/* Footer section */}
        <footer className='d-footer bg-neutral-50'>
          <div className='row align-items-center justify-content-between'>
            <div className='col-auto'>
              <p className='mb-0'>© 2025 Recruiter Dashboard. All Rights Reserved.</p>
            </div>
            <div className='col-auto'>
              <p className='mb-0'>Made by <span className='text-primary-600'>wowtheme7</span></p>
            </div>
          </div>
        </footer>
      </main>
    </section>
    </>
  );
};

export default RecruiterDashboardLayout;
