/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
 
const CandidateDashboardLayout = ({ children }) => {
  const [sidebarActive, setSidebarActive] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
 
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
 
  const candidateData = {
    name: localStorage.getItem('candidateName') || 'Candidate',
    email: localStorage.getItem('userEmail') || 'candidate@example.com'
  };
 
  const LinkItem = ({ to, icon, label, isParent = false }) => {
    return (
      <NavLink
        to={to}
        className={(navData) => {
          if (isParent) {
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
 
  const sidebarControl = () => {
    setSidebarActive(!sidebarActive);
  };
 
  const mobileMenuControl = () => {
    setMobileMenu(!mobileMenu);
  };
 
  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('candidateName');
    navigate('/candidate/login');
  };
 
  // Enhanced CSS for sidebar with proper alignment and circle icons
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
   
    /* Enhanced dropdown icons with circle indicators */
    .sidebar-submenu li > a .circle-icon {
      width: 6px !important;
      height: 6px !important;
      border-radius: 50% !important;
      display: inline-block !important;
      margin-right: 8px !important;
    }
   
    /* Proper spacing and alignment */
    .sidebar-menu li > a {
      display: flex !important;
      align-items: center !important;
      padding: 12px 16px !important;
      text-decoration: none !important;
      color: inherit !important;
    }
    .sidebar-menu li > a .menu-icon {
      margin-right: 12px !important;
      font-size: 1.1rem !important;
    }
    .sidebar-submenu li > a {
      padding: 8px 16px 8px 40px !important;
      display: flex !important;
      align-items: center !important;
      font-size: 0.9rem !important;
    }
   
    /* Smooth transitions */
    .sidebar {
      transition: width 0.3s ease !important;
    }
    .sidebar-menu li > a {
      transition: all 0.3s ease !important;
    }
    .menu-icon {
  width: 22px !important;
  height: 22px !important;
  font-size: 1.25rem !important;
  flex-shrink: 0 !important;
  margin-right: 12px !important;
  transition: color 0.3s ease !important; /* Only color should animate */
}

  `;
 
  return (
    <>
      <style>{activeStyles}</style>
      <section className={mobileMenu ? "overlay active" : "overlay"}>
        {/* Sidebar */}
        <aside
          className={
            sidebarActive
              ? "sidebar active"
              : mobileMenu
              ? "sidebar sidebar-open"
              : "sidebar"
          }
        >
          <button
            onClick={mobileMenuControl}
            type='button'
            className='sidebar-close-btn'
          >
            <Icon icon='radix-icons:cross-2' />
          </button>
         
          {/* Logo */}
          <div>
            <Link to='/candidate/dashboard' className='sidebar-logo'>
              <img src='/assets/images/logo2.png' alt='site logo' className='light-logo' />
              <img src='assets/images/logo-light.png' alt='site logo' className='dark-logo' />
              <img src='/assets/images/logo2.png' alt='site logo' className='logo-icon' />
            </Link>
          </div>
 
          {/* Navigation */}
          <div className='sidebar-menu-area'>
            <ul className='sidebar-menu ps-2' id='sidebar-menu'>
              {/* Candidate Dashboard */}
              <li>
                <LinkItem to='/candidate/dashboard' icon='heroicons:home' label='Dashboard' />
              </li>
 
              <li className='sidebar-menu-group-title'>Job Search</li>
 
              {/* Job Search */}
              <li>
                <LinkItem to='/candidate/jobs' icon='heroicons:magnifying-glass' label='Find Jobs' />
              </li>
 
              {/* Applications */}
              <li>
                <LinkItem to='/candidate/applications' icon='heroicons:document-text' label='My Applications' />
              </li>
 
              {/* Profile */}
              <li>
                <LinkItem to='/candidate/profile' icon='heroicons:user' label='Profile' />
              </li>
 
              {/* Settings */}
              <li>
                <LinkItem to='/candidate/settings' icon='icon-park-outline:setting-two' label='Settings' />
              </li>
            </ul>
          </div>
        </aside>
 
        {/* Main Content */}
        <main className={(sidebarActive ? "dashboard-main active" : "dashboard-main") + " bg-neutral-50"}>
          {/* Header/Topbar */}
          <div className='navbar-header bg-base'>
            <div className='row align-items-center justify-content-between'>
              <div className='col-auto'>
                <div className='d-flex flex-wrap align-items-center gap-4'>
                  <button
                    type='button'
                    className='sidebar-toggle'
                    onClick={sidebarControl}
                  >
                    {sidebarActive ? (
                      <Icon
                        icon='iconoir:arrow-right'
                        className='icon text-2xl non-active'
                      />
                    ) : (
                      <Icon
                        icon='heroicons:bars-3-solid'
                        className='icon text-2xl non-active'
                      />
                    )}
                  </button>
                  <button
                    onClick={mobileMenuControl}
                    type='button'
                    className='sidebar-mobile-toggle'
                  >
                    <Icon icon='heroicons:bars-3-solid' className='icon' />
                  </button>
                 
                  {/* Search Bar */}
                  <form className='navbar-search'>
                    <input
                      type='text'
                      name='search'
                      placeholder='Search jobs...'
                    />
                    <Icon icon='ion:search-outline' className='icon' />
                  </form>
                </div>
              </div>
 
              <div className='col-auto'>
                <div className='d-flex flex-wrap align-items-center gap-3'>
                  {/* Notifications */}
                  <div className='dropdown'>
                    <button
                      className='has-indicator w-40-px h-40-px bg-neutral-200 rounded-circle d-flex justify-content-center align-items-center'
                      type='button'
                      data-bs-toggle='dropdown'
                    >
                      <Icon icon='iconoir:bell' className='text-primary-light text-xl' />
                    </button>
                    <div className='dropdown-menu to-top dropdown-menu-lg p-0'>
                      <div className='m-16 py-12 px-16 radius-8 bg-primary-50 mb-16 d-flex align-items-center justify-content-between gap-2'>
                        <div>
                          <h6 className='text-lg text-primary-light fw-semibold mb-0'>
                            Notifications
                          </h6>
                        </div>
                        <span className='text-primary-600 fw-semibold text-lg w-40-px h-40-px rounded-circle bg-base d-flex justify-content-center align-items-center'>
                          5
                        </span>
                      </div>
                      <div className='max-h-400-px overflow-y-auto scroll-sm pe-4'>
                        <div
                          className='container px-24 py-12 d-flex align-items-start gap-3 mb-2 justify-content-between'
                        >
                          <div className='text-black hover-bg-transparent hover-text-primary d-flex align-items-center gap-3'>
                            <span className='w-44-px h-44-px bg-success-subtle text-success-main rounded-circle d-flex justify-content-center align-items-center flex-shrink-0'>
                              <Icon icon='bitcoin-icons:verify-outline' className='icon text-xxl' />
                            </span>
                            <div>
                              <h6 className='text-md fw-semibold'>
                                Application Update
                              </h6>
                              <p className='mb-0 text-sm text-secondary-light text-w-200-px'>
                                Your application has been reviewed
                              </p>
                            </div>
                          </div>
                          <span className='text-sm text-secondary-light flex-shrink-0'>
                            10 mins ago
                          </span>
                        </div>
                      </div>
                      <div
                        className='px-24 py-12 d-flex align-items-start gap-3 mb-2 justify-content-between bg-neutral-50'
                      >
                        <div className='text-black hover-bg-transparent hover-text-primary d-flex align-items-center gap-3'>
                          <span className='w-44-px h-44-px bg-success-subtle text-success-main rounded-circle d-flex justify-content-center align-items-center flex-shrink-0'>
                            RR
                          </span>
                          <div>
                            <h6 className='text-md fw-semibold'>
                              Ronald Richards
                            </h6>
                            <p className='mb-0 text-sm text-secondary-light text-w-200-px'>
                              You can stitch between artboards
                            </p>
                          </div>
                        </div>
                        <span className='text-sm text-secondary-light flex-shrink-0'>
                          23 Mins ago
                        </span>
                      </div>
                      <div
                        to='#'
                        className='px-24 py-12 d-flex align-items-start gap-3 mb-2 justify-content-between'
                      >
                        <div className='text-black hover-bg-transparent hover-text-primary d-flex align-items-center gap-3'>
                          <span className='w-44-px h-44-px bg-info-subtle text-info-main rounded-circle d-flex justify-content-center align-items-center flex-shrink-0'>
                            AM
                          </span>
                          <div>
                            <h6 className='text-md fw-semibold'>
                              Arlene McCoy
                            </h6>
                            <p className='mb-0 text-sm text-secondary-light text-w-200-px'>
                              Invite you to prototyping
                            </p>
                          </div>
                        </div>
                        <span className='text-sm text-secondary-light flex-shrink-0'>
                          23 Mins ago
                        </span>
                      </div>
                      <div
                        className='px-24 py-12 d-flex align-items-start gap-3 mb-2 justify-content-between bg-neutral-50'
                      >
                        <div className='text-black hover-bg-transparent hover-text-primary d-flex align-items-center gap-3'>
                          <span className='w-44-px h-44-px bg-success-subtle text-success-main rounded-circle d-flex justify-content-center align-items-center flex-shrink-0'>
                            AB
                          </span>
                          <div>
                            <h6 className='text-md fw-semibold'>
                              Annette Black
                            </h6>
                            <p className='mb-0 text-sm text-secondary-light text-w-200-px'>
                              Invite you to prototyping
                            </p>
                          </div>
                        </div>
                        <span className='text-sm text-secondary-light flex-shrink-0'>
                          23 Mins ago
                        </span>
                      </div>
                      <div
                        className='px-24 py-12 d-flex align-items-start gap-3 mb-2 justify-content-between'
                      >
                        <div className='text-black hover-bg-transparent hover-text-primary d-flex align-items-center gap-3'>
                          <span className='w-44-px h-44-px bg-info-subtle text-info-main rounded-circle d-flex justify-content-center align-items-center flex-shrink-0'>
                            DR
                          </span>
                          <div>
                            <h6 className='text-md fw-semibold'>
                              Darlene Robertson
                            </h6>
                            <p className='mb-0 text-sm text-secondary-light text-w-200-px'>
                              Invite you to prototyping
                            </p>
                          </div>
                        </div>
                        <span className='text-sm text-secondary-light flex-shrink-0'>
                          23 Mins ago
                        </span>
                      </div>
                      <div className='text-center py-12 px-16'>
                        <Link
                          to='#'
                          className='text-primary-600 fw-semibold text-md'
                        >
                          See All Notifications
                        </Link>
                      </div>
                    </div>
                  </div>
 
                  {/* Profile Dropdown */}
                  <div className='dropdown'>
                    <button
                      className='d-flex justify-content-center align-items-center rounded-circle'
                      type='button'
                      data-bs-toggle='dropdown'
                      onClick={() => setShowProfileMenu(!showProfileMenu)}
                    >
                      <div className='d-flex align-items-center gap-2'>
                        <div className='w-40-px h-40-px bg-primary-600 rounded-circle d-flex align-items-center justify-content-center text-white fw-semibold'>
                          {candidateData.name.charAt(0).toUpperCase()}
                        </div>
                       
                       
                      </div>
                    </button>
                    <div className='dropdown-menu to-top dropdown-menu-sm'>
                      <div className='py-12 px-16 radius-8 bg-primary-50 mb-16 d-flex align-items-center justify-content-between gap-2'>
                        <div>
                          <h6 className='text-lg text-primary-light fw-semibold mb-2'>
                            {candidateData.name}
                          </h6>
                          <span className='text-secondary-light fw-medium text-sm'>
                            {candidateData.email}
                          </span>
                        </div>
                        <button
                          type='button'
                          className='hover-text-danger'
                          onClick={() => setShowProfileMenu(false)}
                        >
                          <Icon icon='radix-icons:cross-1' className='icon text-xl' />
                        </button>
                      </div>
                      <ul className='to-top-list'>
                        <li>
                          <Link
                            className='dropdown-item text-black px-0 py-8 hover-bg-transparent hover-text-primary d-flex align-items-center gap-3'
                            to='/candidate/profile'
                          >
                            <Icon icon='solar:user-linear' className='icon text-xl' />
                            Edit Profile
                          </Link>
                        </li>
                        <li>
                          <Link
                            className='dropdown-item text-black px-0 py-8 hover-bg-transparent hover-text-primary d-flex align-items-center gap-3'
                            to='/candidate/settings'
                           
                          >
                            <Icon icon='icon-park-outline:setting-two' className='icon text-xl' />
                            Settings
                          </Link>
                        </li>
                        <li>
                          <hr className='my-2' />
                        </li>
                        <li>
                          <button
                            className='dropdown-item text-black px-0 py-8 hover-bg-transparent hover-text-danger d-flex align-items-center gap-3 border-0 bg-transparent w-100'
                            onClick={handleLogout}
                            style={{ textAlign: 'left', cursor: 'pointer' }}
                          >
                            <Icon icon='lucide:power' className='icon text-xl' />
                            Logout
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
 
          {/* Dashboard Body */}
          <div className='dashboard-main-body bg-neutral-50'>{children}</div>
 
          {/* Footer */}
          <footer className='d-footer bg-neutral-50'>
            <div className='row align-items-center justify-content-between'>
              <div className='col-auto'>
                <p className='mb-0'>© 2025 Candidate Portal. All Rights Reserved.</p>
              </div>
              <div className='col-auto'>
                <p className='mb-0'>
                  Made by <span className='text-primary-600'>wowtheme7</span>
                </p>
              </div>
            </div>
          </footer>
        </main>
      </section>
    </>
  );
};
 
export default CandidateDashboardLayout;