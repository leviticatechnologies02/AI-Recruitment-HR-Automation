import React from 'react'
import { Icon } from "@iconify/react/dist/iconify.js";

import { Link, useNavigate } from "react-router-dom";

const CandidateSignup = () => {
  const navigate= useNavigate();

  const handleSignup = (e) =>{
    e.preventDefault();
    navigate('/Candidate/login');
  };
  return(
    <section className='auth bg-base d-flex'>
      <div className='auth-left d-lg-block d-none'>
        <div className='d-flex align-items-center flex-column h-100 justify-content-center'>
          <img src='/assets/images/auth/auth-image.png' alt='WowDash React Vite' />
        </div>
      </div>
      <div className='auth-right py-32 px-24 d-flex flex-column justify-content-center'>
        <div className='max-w-464-px mx-auto w-100'>
          <div>
            <h4 className='mb-12'>Candidate Signup</h4>
          </div>
          <form action='#'>
            <div className='icon-field mb-16'>
              <span className='icon top-50 translate-middle-y'>
                <Icon icon='f7:person' />
              </span>
              <input
                type='text'
                className='form-control bg-neutral-50 radius-12 w-100'
                placeholder='Choose a username'
              />
            </div>
            <div className='icon-field mb-16'>
              <span className='icon top-50 translate-middle-y'>
                <Icon icon='mage:email' />
              </span>
              <input
                type='email'
                className='form-control bg-neutral-50 radius-12 w-100'
                placeholder='Enter email id'
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
                    className='form-control bg-neutral-50 radius-12 w-100'
                    id='your-password'
                    placeholder='Enter password'
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
                    className='form-control bg-neutral-50 radius-12 w-100'
                    id='confirm-password'
                    placeholder='Re-enter password'
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
                    defaultValue=''
                    id='condition'
                  />
                  <label
                    className='form-check-label text-sm'
                    htmlFor='condition'
                  >
                    By creating an account means you agree to the
                    <Link to='/Candidate/login' className='text-primary-600 fw-semibold'>
                      Terms &amp; Conditions
                    </Link>{" "}
                    and our
                    <Link to='#' className='text-primary-600 fw-semibold'>
                      Privacy Policy
                    </Link>
                  </label>
                </div>
            </div>
            <button
              type='submit'
              className='btn btn-primary text-sm btn-sm px-12 py-16 w-100 radius-12 mt-16'
            onClick={handleSignup}
            >
            <Link to='/Candidate/login' className='text-primary-600 fw-semibold'>Signup</Link>
              
            </button>
            <div className='mt-32 center-border-horizontal text-center'>
              <span className='bg-base z-1 px-4'>Or sign up with</span>
            </div>
            <div className='mt-16 text-center text-sm'>
              <p className='mb-0'>
                Already have an account?{" "}
                <Link to='/Candidate/login' className='text-primary-600 fw-semibold'>
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

export default CandidateSignup;