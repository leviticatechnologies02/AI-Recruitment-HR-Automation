import React, { useState } from 'react';
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [step, setStep] = useState('request');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState('');

  const handleSendOtp = (e) => {
    e.preventDefault();
    setLoading(true);
    setAlert(null);

    setTimeout(() => {
      if (email && email.includes('@')) {
        const randomOtp = Math.floor(100000 + Math.random() * 900000).toString();
        setGeneratedOtp(randomOtp);
        setAlert({
          type: 'success',
          message: `OTP sent to ${email}! (Demo OTP: ${randomOtp})`
        });
        setLoading(false);
        setTimeout(() => setStep('verify'), 1000);
      } else {
        setAlert({
          type: 'error',
          message: 'Please enter a valid email address.'
        });
        setLoading(false);
      }
    }, 1500);
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return;
    if (value && !/^\d+$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleVerifyOtp = () => {
    setLoading(true);
    setAlert(null);

    const enteredOtp = otp.join('');

    setTimeout(() => {
      if (enteredOtp === generatedOtp) {
        setAlert({
          type: 'success',
          message: 'OTP verified successfully!'
        });
        setLoading(false);
        setTimeout(() => setStep('reset'), 1000);
      } else {
        setAlert({
          type: 'error',
          message: 'Invalid OTP. Please try again.'
        });
        setLoading(false);
      }
    }, 1000);
  };

  const handleResendOtp = () => {
    const randomOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(randomOtp);
    setOtp(['', '', '', '', '', '']);
    setAlert({
      type: 'success',
      message:`New OTP sent! (Demo OTP: ${randomOtp})`
    });
    const firstInput = document.getElementById('otp-0');
    if (firstInput) firstInput.focus();
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    setLoading(true);
    setAlert(null);

    if (newPassword.length < 8) {
      setAlert({
        type: 'error',
        message: 'Password must be at least 8 characters long.'
      });
      setLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setAlert({
        type: 'error',
        message: 'Passwords do not match. Please try again.'
      });
      setLoading(false);
      return;
    }

    setTimeout(() => {
      setAlert({
        type: 'success',
        message: 'Password reset successfully! Redirecting to login...'
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <>
      <section className='auth forgot-password-page bg-base d-flex flex-wrap'>
        <div className='auth-left d-lg-block d-none'>
          <div className='d-flex align-items-center flex-column h-100 justify-content-center'>
            <img
              src='/assets/images/auth/forgot-pass-img1.png'
              alt='WowDash React Vite'
            />
          </div>
        </div>
        <div className='auth-right py-32 px-24 d-flex flex-column justify-content-center'>
          <div className='max-w-464-px mx-auto w-100'>
            {/* Alert Messages */}
            {alert && (
              <div className={`alert ${alert.type === 'success' ? 'alert-success' : 'alert-danger'} mb-4 d-flex align-items-center`}>
                <Icon 
                  icon={alert.type === 'success' ? 'mdi:check-circle' : 'mdi:alert-circle'} 
                  className='me-2'
                />
                <span className='text-sm'>{alert.message}</span>
              </div>
            )}

            {/* Step 1: Request OTP */}
            {step === 'request' && (
              <div>
                <div className='text-center mb-4'>
                  <div className='d-inline-flex align-items-center justify-content-center w-64 h-64 bg-primary-50 rounded-circle mb-3'>
                    <Icon icon='mdi:lock' className='text-primary fs-2' />
                  </div>
                  <h4 className='mb-2'>Forgot Password?</h4>
                  <p className='text-secondary-light text-sm mb-0'>
                    Enter your email to receive an OTP
                  </p>
                </div>

                <form onSubmit={handleSendOtp}>
                  <div className='icon-field mb-4'>
                    <span className='icon top-50 translate-middle-y'>
                      <Icon icon='mdi:email' />
                    </span>
                    <input
                      type='email'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className='form-control h-56-px bg-neutral-50 radius-12'
                      placeholder='Enter Email'
                      required
                    />
                  </div>
                  <button
                    type='submit'
                    disabled={loading}
                    className='btn btn-primary text-sm btn-sm px-12 py-16 w-100 radius-12'
                  >
                    {loading ? 'Sending...' : 'Send OTP'}
                  </button>
                </form>

                <div className='text-center mt-4'>
                  <Link to='/Login' className='text-primary-600 fw-bold'>
                    Back to Sign In
                  </Link>
                </div>
              </div>
            )}

            {/* Step 2: Verify OTP */}
            {step === 'verify' && (
              <div>
                <div className='text-center mb-4'>
                  <div className='d-inline-flex align-items-center justify-content-center w-64 h-64 bg-primary-50 rounded-circle mb-3'>
                    <Icon icon='mdi:email' className='text-primary fs-2' />
                  </div>
                  <h4 className='mb-2'>Verify OTP</h4>
                  <p className='text-secondary-light text-sm mb-1'>
                    Enter the 6-digit code sent to
                  </p>
                  <p className='text-dark fw-medium mb-0'>{email}</p>
                </div>

                <div className='mb-4'>
                  <label className='form-label text-center d-block text-sm fw-medium mb-3'>
                    Enter OTP
                  </label>
                  <div className='d-flex gap-2 justify-content-center'>
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        id={`otp-${index}`}
                        type='text'
                        inputMode='numeric'
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                        className='form-control text-center fs-4 fw-bold border-2'
                        style={{ width: '48px', height: '48px' }}
                      />
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleVerifyOtp}
                  disabled={loading || otp.some(d => !d)}
                  className='btn btn-primary text-sm btn-sm px-12 py-16 w-100 radius-12 mb-3'
                >
                  {loading ? 'Verifying...' : 'Verify OTP'}
                </button>

                <div className='text-center mb-2'>
                  <button
                    onClick={handleResendOtp}
                    className='btn btn-link text-primary-600 text-sm p-0'
                  >
                    Didn't receive code? Resend OTP
                  </button>
                </div>

                <div className='text-center'>
                  <button
                    onClick={() => {
                      setStep('request');
                      setOtp(['', '', '', '', '', '']);
                      setAlert(null);
                    }}
                    className='btn btn-link text-secondary text-sm p-0'
                  >
                    Change email address
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Reset Password */}
            {step === 'reset' && (
              <div>
                <div className='text-center mb-4'>
                  <div className='d-inline-flex align-items-center justify-content-center w-64 h-64 bg-primary-50 rounded-circle mb-3'>
                    <Icon icon='mdi:lock' className='text-primary fs-2' />
                  </div>
                  <h4 className='mb-2'>Reset Password</h4>
                  <p className='text-secondary-light text-sm mb-0'>
                    Enter your new password below
                  </p>
                </div>

                <form onSubmit={handleResetPassword}>
                  <div className='icon-field mb-3'>
                    <span className='icon top-50 translate-middle-y'>
                      <Icon icon='mdi:lock' />
                    </span>
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className='form-control h-56-px bg-neutral-50 radius-12 pe-5'
                      placeholder='Enter new password'
                      required
                    />
                    <button
                      type='button'
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className='btn btn-link p-0 position-absolute top-50 end-0 translate-middle-y me-3'
                    >
                      <Icon 
                        icon={showNewPassword ? 'mdi:eye-off' : 'mdi:eye'} 
                        className='text-secondary'
                      />
                    </button>
                  </div>

                  <div className='icon-field mb-4'>
                    <span className='icon top-50 translate-middle-y'>
                      <Icon icon='mdi:lock' />
                    </span>
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className='form-control h-56-px bg-neutral-50 radius-12 pe-5'
                      placeholder='Confirm new password'
                      required
                    />
                    <button
                      type='button'
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className='btn btn-link p-0 position-absolute top-50 end-0 translate-middle-y me-3'
                    >
                      <Icon 
                        icon={showConfirmPassword ? 'mdi:eye-off' : 'mdi:eye'} 
                        className='text-secondary'
                      />
                    </button>
                  </div>

                  <button
                    type='submit'
                    disabled={loading}
                    className='btn btn-primary text-sm btn-sm px-12 py-16 w-100 radius-12 mb-3'
                  >
                    {loading ? 'Resetting...' : 'Reset Password'}
                  </button>
                </form>

                <div className='text-center'>
                  <button
                    onClick={() => {
                      setStep('request');
                      setAlert(null);
                      setNewPassword('');
                      setConfirmPassword('');
                    }}
                    className='btn btn-link text-primary-600 text-sm p-0'
                  >
                    Back to Start
                  </button>
                </div>
              </div>
            )}

            {/* Footer Links */}
            <div className='mt-5 text-center text-sm'>
              <p className='mb-0'>
                Already have an account?{" "}
                <Link to='/Login' className='text-primary-600 fw-semibold'>
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
 
export default ForgotPassword;