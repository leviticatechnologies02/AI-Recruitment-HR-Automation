import React, { useState } from 'react'
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL, API_ENDPOINTS } from '../../config/api.config';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    companyName: '',
    companyWebsite: '',
    companyId: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [agreed, setAgreed] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Validation
    if (!formData.name || !formData.email || !formData.password || !formData.companyName) {
      setError('Please fill in all required fields');
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    if (!agreed) {
      setError('Please agree to the Terms & Conditions');
      setLoading(false);
      return;
    }

    try {
      // Call backend API
      const response = await fetch(`${BASE_URL}${API_ENDPOINTS.AUTH.SIGNUP}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          username: formData.username || formData.name,
          email: formData.email,
          password: formData.password,
          role: 'recruiter', // Default role for company signup
          company_name: formData.companyName,
          company_website: formData.companyWebsite || null,
          company_id: formData.companyId || null
        })
      });

      const data = await response.json();

      if (response.ok) {
        // Signup successful
        setSuccess('Account created successfully! Redirecting to login...');
        console.log('Signup successful:', data);
        
        // Redirect to login after 2 seconds
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        // Handle error response
        setError(data.detail || 'Signup failed. Please try again.');
      }
    } catch (err) {
      console.error('Signup error:', err);
      setError('Network error. Please check if backend is running.');
    } finally {
      setLoading(false);
    }
  };
  return(
    <section className='auth bg-base d-flex'>
      <div className='auth-left d-lg-block d-none'>
        <div className='d-flex align-items-center flex-column h-100 justify-content-center'>
          <img src='assets/images/auth/auth-img.png' alt='WowDash React Vite' />
        </div>
      </div>
      <div className='auth-right py-32 px-24 d-flex flex-column justify-content-center'>
        <div className='max-w-464-px mx-auto w-100'>
          <div>
            <h4 className='mb-12'>Company Signup</h4>
            <p className='mb-32 text-secondary-light text-lg'>
              Register your company! please enter your details
            </p>
          </div>
          <form onSubmit={handleSignup}>
            {error && (
              <div className='alert alert-danger mb-16' role='alert'>
                <Icon icon='heroicons:exclamation-circle' className='me-2' />
                {error}
              </div>
            )}
            
            {success && (
              <div className='alert alert-success mb-16' role='alert'>
                <Icon icon='heroicons:check-circle' className='me-2' />
                {success}
              </div>
            )}

            <div className='icon-field mb-16'>
              <span className='icon top-50 translate-middle-y'>
                <Icon icon='f7:person' />
              </span>
              <input
                type='text'
                name='name'
                value={formData.name}
                onChange={handleInputChange}
                className='form-control bg-neutral-50 radius-12 w-100'
                placeholder='Enter your full name*'
                required
              />
            </div>
            <div className='icon-field mb-16'>
              <span className='icon top-50 translate-middle-y'>
                <Icon icon='mdi:office-building' />
              </span>
              <input
                type='text'
                name='companyName'
                value={formData.companyName}
                onChange={handleInputChange}
                className='form-control bg-neutral-50 radius-12 w-100'
                placeholder='Enter your company name*'
                required
              />
            </div>
            <div className='icon-field mb-16'>
              <span className='icon top-50 translate-middle-y'>
                <Icon icon='mage:email' />
              </span>
              <input
                type='email'
                name='email'
                value={formData.email}
                onChange={handleInputChange}
                className='form-control bg-neutral-50 radius-12 w-100'
                placeholder='Enter company email*'
                required
              />
            </div>
            <div className='icon-field mb-16'>
              <span className='icon top-50 translate-middle-y'>
                <Icon icon='heroicons:globe-alt' />
              </span>
              <input
                type='text'
                name='companyWebsite'
                value={formData.companyWebsite}
                onChange={handleInputChange}
                className='form-control bg-neutral-50 radius-12 w-100'
                placeholder='Company website (optional)'
              />
            </div>
            <div className='icon-field mb-16'>
              <span className='icon top-50 translate-middle-y'>
                <Icon icon='mdi:card-account-details' />
              </span>
              <input
                type='text'
                name='companyId'
                value={formData.companyId}
                onChange={handleInputChange}
                className='form-control bg-neutral-50 radius-12 w-100'
                placeholder='Company ID (optional)'
              />
            </div>
            <div className='mb-16'>
              <div className='position-relative '>
                <div className='icon-field'>
                  <span className='icon top-50 translate-middle-y'>
                    <Icon icon='solar:lock-password-outline' />
                  </span>
                  <input
                    type='password'
                    name='password'
                    value={formData.password}
                    onChange={handleInputChange}
                    className='form-control bg-neutral-50 radius-12 w-100'
                    id='your-password'
                    placeholder='Enter password*'
                    required
                  />
                </div>
                <span
                  className='toggle-password ri-eye-line cursor-pointer position-absolute end-0 top-50 translate-middle-y me-16 text-secondary-light'
                  data-toggle='#your-password'
                />
              </div>
            </div>
            <div className='mb-20'>
              <div className='position-relative '>
                <div className='icon-field'>
                  <span className='icon top-50 translate-middle-y'>
                    <Icon icon='solar:lock-password-outline' />
                  </span>
                  <input
                    type='password'
                    name='confirmPassword'
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className='form-control bg-neutral-50 radius-12 w-100'
                    id='confirm-password'
                    placeholder='Re-enter password*'
                    required
                  />
                </div>
                <span
                  className='toggle-password ri-eye-line cursor-pointer position-absolute end-0 top-50 translate-middle-y me-16 text-secondary-light'
                  data-toggle='#confirm-password'
                />
              </div>
            </div>
            <div className='mb-12'>
              <div className='form-check style-check d-flex align-items-start'>
                  <input
                    className='form-check-input border border-neutral-300 mt-4'
                    type='checkbox'
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    id='condition'
                  />
                  <label
                    className='form-check-label text-sm'
                    htmlFor='condition'
                  >
                    By creating an account means you agree to the
                    <Link to='#' className='text-primary-600 fw-semibold'>
                      {" "}Terms &amp; Conditions{" "}
                    </Link>
                    and our
                    <Link to='#' className='text-primary-600 fw-semibold'>
                      {" "}Privacy Policy
                    </Link>
                  </label>
                </div>
            </div>
            <button
              type='submit'
              className='btn btn-primary text-sm btn-sm px-12 py-16 w-100 radius-12 mt-16'
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className='spinner-border spinner-border-sm me-2' role='status' aria-hidden='true'></span>
                  Creating account...
                </>
              ) : (
                'Sign Up'
              )}
            </button>
            <div className='mt-32 center-border-horizontal text-center'>
              <span className='bg-base z-1 px-4'>Or sign up with</span>
            </div>
            <div className='mt-16 text-center text-sm'>
              <p className='mb-0'>
                Already have an account?{" "}
                <Link to='/login' className='text-primary-600 fw-semibold'>
                  Sign In
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  ) ; 
}

export default Signup