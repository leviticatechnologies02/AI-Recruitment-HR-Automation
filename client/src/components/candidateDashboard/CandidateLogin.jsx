import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';

const CandidateLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Store candidate info in localStorage
      localStorage.setItem('userRole', 'candidate');
      localStorage.setItem('userEmail', formData.email);

      // Navigate to candidate dashboard
      navigate('/candidate/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      setErrors({ submit: 'Login failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className='auth d-flex'>
      <div className='auth-left bg-base d-flex flex-column align-items-center justify-content-center'>
        <div className='auth-left-content'>
          <div  className='mb-40 d-flex align-items-center gap-2'>
            <img src='/assets/images/logo.png' alt='Logo' style={{ width: '50px' }} />
            <span className='text-primary-600 fw-bold text-2xl'>Candidate</span>
          </div>

          <h3 className='mb-8'>Candidate Login</h3>
          <p className='text-secondary-light mb-32'>
            Welcome back! Please login to access your candidate portal
          </p>

          <form onSubmit={handleSubmit}>
            {/* Email Input */}
            <div className='mb-20'>
              <label htmlFor='email' className='form-label fw-semibold text-primary-light text-sm mb-8'>
                Email Address <span className='text-danger-600'>*</span>
              </label>
              <div className='position-relative'>
                <input
                  type='email'
                  className={`form-control radius-8 ${errors.email ? 'is-invalid' : ''}`}
                  id='email'
                  placeholder='Enter your email'
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                />
                <Icon
                  icon='mdi:email-outline'
                  className='position-absolute top-50 translate-middle-y end-0 me-12 text-secondary-light'
                  style={{ fontSize: '20px' }}
                />
              </div>
              {errors.email && (
                <div className='text-danger-600 text-sm mt-4'>
                  <Icon icon='mdi:alert-circle' className='me-1' />
                  {errors.email}
                </div>
              )}
            </div>

            {/* Password Input */}
            <div className='mb-20'>
              <label htmlFor='password' className='form-label fw-semibold text-primary-light text-sm mb-8'>
                Password <span className='text-danger-600'>*</span>
              </label>
              <div className='position-relative'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className={`form-control radius-8 ${errors.password ? 'is-invalid' : ''}`}
                  id='password'
                  placeholder='Enter your password'
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                />
                <button
                  type='button'
                  className='position-absolute top-50 translate-middle-y end-0 me-12 bg-transparent border-0 text-secondary-light'
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <Icon
                    icon={showPassword ? 'mdi:eye-off' : 'mdi:eye'}
                    style={{ fontSize: '20px' }}
                  />
                </button>
              </div>
              {errors.password && (
                <div className='text-danger-600 text-sm mt-4'>
                  <Icon icon='mdi:alert-circle' className='me-1' />
                  {errors.password}
                </div>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className='mb-20'>
              <div className='d-flex align-items-center justify-content-between'>
                <div className='d-flex align-items-center'>
                  <input
                    type='checkbox'
                    id='rememberMe'
                    checked={formData.rememberMe}
                    onChange={(e) => handleInputChange('rememberMe', e.target.checked)}
                    style={{
                      width: "18px",
                      height: "18px",
                      cursor: "pointer",
                      appearance: "auto",
                      WebkitAppearance: "checkbox",
                      MozAppearance: "checkbox",
                      accentColor: "#2563eb",
                      marginRight: "8px", // space between checkbox and label
                    }}
                  />
                  <label
                    htmlFor='rememberMe'
                    className='text-secondary-light mb-0'
                    style={{ cursor: "pointer" }}
                  >
                    Remember me
                  </label>
                </div>
                <Link to='/candidate/forgot-password' className='text-primary-600 fw-medium'>
                  Forgot Password?
                </Link>
              </div>
            </div>



            {/* Submit Error */}
            {errors.submit && (
              <div className='alert alert-danger d-flex align-items-center mb-20'>
                <Icon icon='mdi:alert-circle' className='me-2' />
                {errors.submit}
              </div>
            )}

            {/* Submit Button */}
            <button
              type='submit'
              className='btn btn-primary w-100 radius-8 fw-semibold'
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className='spinner-border spinner-border-sm me-2' role='status' aria-hidden='true'></span>
                  Signing in...
                </>
              ) : (
                <>
                  <Icon icon='mdi:login' className='me-2' />
                  Sign In
                </>
              )}
            </button>
          </form>
          <div className='mt-32 center-border-horizontal text-center'>
            <span className='bg-base z-1 px-4'>Or sign in with</span>
          </div>
           <div className='mt-32 text-center'>
            <p className='text-secondary-light mb-0'>
              Don't have an account?
              <Link to='/candidate/signup' className='text-primary-600 fw-semibold ms-2'>
                Sign Up
              </Link>
            </p>
          </div>
          <div className='mt-32 d-flex align-items-center gap-3'>
            <button
              type='button'
              className='fw-semibold text-primary-light py-16 px-24 w-50 border radius-12 text-md d-flex align-items-center justify-content-center gap-12 line-height-1 bg-hover-primary-50'
            >
              <Icon
                icon='ic:baseline-facebook'
                className='text-primary-600 text-xl line-height-1'
              />
              Facebook
            </button>
            <button
              type='button'
              className='fw-semibold text-primary-light py-16 px-24 w-50 border radius-12 text-md d-flex align-items-center justify-content-center gap-12 line-height-1 bg-hover-primary-50'
            >
              <Icon
                icon='logos:google-icon'
                className='text-primary-600 text-xl line-height-1'
              />
              Google
            </button>
          </div>
         

        </div>
      </div>

      <div className='auth-right d-lg-flex d-none align-items-center justify-content-center bg-primary-50'>
        <div className='text-center px-40'>
          <img
            src='/assets/images/auth/auth-img.png'
            alt='Candidate Login'
            className='mb-32'
            style={{ maxWidth: '400px' }}
          />
          <h2 className='mb-16 text-primary-600'>Find Your Dream Job</h2>
          <h5 className='text-secondary-light text-lg'>
            Access your candidate portal to track applications, view job opportunities, <br />and manage your profile.
          </h5>
        </div>
      </div>
    </section>
  );
};

export default CandidateLogin;