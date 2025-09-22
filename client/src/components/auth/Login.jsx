import React, { useState } from 'react';
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    
    if (isSuperAdmin) {
      // Super Admin authentication logic
      if (formData.email === 'superadmin@company.com' && formData.password === 'superadmin123') {
        // Store role in localStorage for authorization
        localStorage.setItem('userRole', 'superadmin');
        localStorage.setItem('userEmail', formData.email);
        navigate('/super-admin');
      } else {
        alert('Invalid Super Admin credentials');
        return;
      }
    } else {
      // Regular user authentication logic
      localStorage.setItem('userRole', 'user');
      localStorage.setItem('userEmail', formData.email);
      navigate('/pricing');
    }
  };
  return (
    <section className='auth bg-base d-flex flex-wrap'>
      <div className='auth-left d-lg-block d-none flex-grow-1'>
        <div className='d-flex align-items-center flex-column h-150 justify-content-center'>
          <img src='assets/images/auth/auth-img.png' alt='WowDash React Vite' />
        </div>
      </div>
      <div className='auth-right py-32 px-24 d-flex flex-column justify-content-center'>
        <div className='max-w-464-px mx-auto w-100'>
          <div>
            <Link to='/index' className='mb-40 max-w-290-px'>
              <img src='assets/images/logo.png' alt='WowDash React Vite' />
            </Link>
            <h4 className='mb-12'>Sign In to your Account</h4>
            <p className='mb-32 text-secondary-light text-lg'>
              Welcome back! please enter your detail
            </p>
          </div>
          <form onSubmit={handleSignIn}>
            <div className='icon-field mb-16'>
              <span className='icon top-50 translate-middle-y'>
                <Icon icon='mage:email' />
              </span>
              <input
                type='email'
                name='email'
                value={formData.email}
                onChange={handleInputChange}
                className='form-control h-56-px bg-neutral-50 radius-12'
                placeholder='Email'
                required
              />
            </div>
            <div className='position-relative mb-20'>
              <div className='icon-field'>
                <span className='icon top-50 translate-middle-y'>
                  <Icon icon='solar:lock-password-outline' />
                </span>
                <input
                  type='password'
                  name='password'
                  value={formData.password}
                  onChange={handleInputChange}
                  className='form-control h-56-px bg-neutral-50 radius-12'
                  id='your-password'
                  placeholder='Password'
                  required
                />
              </div>
              <span
                className='toggle-password ri-eye-line cursor-pointer position-absolute end-0 top-50 translate-middle-y me-16 text-secondary-light'
                data-toggle='#your-password'
              />
            </div>
            
            {/* Super Admin Toggle */}
            <div className='mb-20'>
              <div className='form-check form-switch d-flex align-items-center'>
                <input
                  className='form-check-input me-2'
                  type='checkbox'
                  id='superAdminToggle'
                  checked={isSuperAdmin}
                  onChange={(e) => setIsSuperAdmin(e.target.checked)}
                />
                <label className='form-check-label fw-medium text-primary-600' htmlFor='superAdminToggle'>
                  <Icon icon='heroicons:shield-check' className='me-1' />
                  Login as Super Admin
                </label>
              </div>
              {isSuperAdmin && (
                <small className='text-warning d-block mt-1'>
                  <Icon icon='heroicons:information-circle' className='me-1' />
                  Super Admin credentials required
                </small>
              )}
            </div>

            <div className=''>
              <div className='d-flex justify-content-between gap-2'>
                <div className='form-check style-check d-flex align-items-center'>
                  <input
                    className='form-check-input border border-neutral-300'
                    type='checkbox'
                    defaultValue=''
                    id='remeber'
                  />
                  <label className='form-check-label' htmlFor='remeber'>
                    Remember me{" "}
                  </label>
                </div>
                <Link to='/ForgotPassword' className='text-primary-600 fw-medium'>
                  Forgot Password?
                </Link>
              </div>
            </div>
            <button
              type='submit'
              className='btn btn-primary text-sm btn-sm px-12 py-16 w-100 radius-12 mt-32'
              onClick={handleSignIn}
            >
              {" "}
              Sign In
            </button>
            <div className='mt-32 center-border-horizontal text-center'>
              <span className='bg-base z-1 px-4'>Or sign in with</span>
            </div>
            <div className='mt-32 text-center text-sm'>
              <p className='mb-0'>
                Don’t have an account?{" "}
                <Link to='/signup' className='text-primary-600 fw-semibold'>
                  Sign Up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
