import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className='min-vh-100 d-flex flex-column bg-neutral-50'>
      {/* Navbar */}
      <header className='py-16 px-24 bg-base border-bottom'>
        <div className='d-flex align-items-center justify-content-between'>
          <div className='d-flex align-items-center gap-2'>
            <img src='assets/images/logo-icon.png.svg' alt='logo' className='w-32-px h-32-px' />
            <span className='fw-semibold'>AI Recruitment</span>
          </div>
          <nav className='d-none d-md-flex align-items-center gap-3'>
            <a href='#features' className='text-secondary-light'>Features</a>
            <a href='#how' className='text-secondary-light'>How it works</a>
            <Link to='/pricing' className='text-secondary-light'>Pricing</Link>
          </nav>
          <div className='d-flex align-items-center gap-2'>
            <Link to='/candidate/login' className='btn btn-outline-success btn-sm'>Candidate Login</Link>
            <Link to='/login' className='btn btn-outline-primary btn-sm'>Recruiter Sign In</Link>
            <Link to='/signup' className='btn btn-primary btn-sm'>Sign Up</Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className='container py-56'>
        <div className='row align-items-center justify-content-between g-4'>
          <div className='col-xxl-6'>
            <span className='badge bg-primary-50 text-primary-600 border mb-16'>AI Talent Platform</span>
            <h1 className='mb-16'>Source, screen, and hire faster with AI</h1>
            <p className='text-secondary-light mb-24'>Automate repetitive recruiting tasks and focus on great conversations. Our recruiter dashboard gives you full visibility from job posting to offer.</p>
            <div className='d-flex gap-3'>
              <Link to='/login' className='btn btn-primary'>Get Started</Link>
              <Link to='/pricing' className='btn btn-outline-primary'>View Pricing</Link>
            </div>
            <div className='d-flex align-items-center gap-3 mt-20 text-secondary-light'>
              <img src='assets/images/users/user1.png' alt='users' className='w-32-px h-32-px rounded-circle' />
              <span>Trusted by growing hiring teams</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id='features' className='container pb-56'>
        <div className='row g-3'>
          <div className='col-xxl-4 col-md-6'>
            <div className='card h-100 shadow-none border'>
              <div className='card-body p-24'>
                <div className='d-flex align-items-center gap-2 mb-12'>
                  <span className='w-44-px h-44-px bg-primary-600 rounded-circle d-flex justify-content-center align-items-center'>
                    <i className='ri-magic-line text-white'></i>
                  </span>
                  <h6 className='mb-0'>AI Screening</h6>
                </div>
                <p className='mb-0 text-secondary-light'>Parse resumes, extract skills, and auto-rank candidates by fit.</p>
              </div>
            </div>
          </div>
          <div className='col-xxl-4 col-md-6'>
            <div className='card h-100 shadow-none border'>
              <div className='card-body p-24'>
                <div className='d-flex align-items-center gap-2 mb-12'>
                  <span className='w-44-px h-44-px bg-success-main rounded-circle d-flex justify-content-center align-items-center'>
                    <i className='ri-layout-grid-line text-white'></i>
                  </span>
                  <h6 className='mb-0'>Unified Dashboard</h6>
                </div>
                <p className='mb-0 text-secondary-light'>Jobs, candidates, pipeline and analytics in one place.</p>
              </div>
            </div>
          </div>
          <div className='col-xxl-4 col-md-6'>
            <div className='card h-100 shadow-none border'>
              <div className='card-body p-24'>
                <div className='d-flex align-items-center gap-2 mb-12'>
                  <span className='w-44-px h-44-px bg-warning-main rounded-circle d-flex justify-content-center align-items-center'>
                    <i className='ri-send-plane-line text-white'></i>
                  </span>
                  <h6 className='mb-0'>One-click Job Posts</h6>
                </div>
                <p className='mb-0 text-secondary-light'>Publish to multiple job boards with a single action.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id='how' className='container pb-56'>
        <div className='card border shadow-none'>
          <div className='card-body p-24'>
            <div className='row g-4 align-items-center'>
              <div className='col-xxl-4'>
                <h5 className='mb-12'>How it works</h5>
                <p className='text-secondary-light mb-0'>Create a job, import or invite candidates, manage pipeline stages, and track performance with analytics.</p>
              </div>
              <div className='col-xxl-8'>
                <div className='row row-cols-lg-4 row-cols-2 g-3'>
                  <div className='col'>
                    <div className='border rounded p-16 text-center h-100'>
                      <span className='badge bg-primary-50 text-primary-600 border mb-8'>1</span>
                      <div className='fw-medium'>Create Job</div>
                    </div>
                  </div>
                  <div className='col'>
                    <div className='border rounded p-16 text-center h-100'>
                      <span className='badge bg-primary-50 text-primary-600 border mb-8'>2</span>
                      <div className='fw-medium'>Import Candidates</div>
                    </div>
                  </div>
                  <div className='col'>
                    <div className='border rounded p-16 text-center h-100'>
                      <span className='badge bg-primary-50 text-primary-600 border mb-8'>3</span>
                      <div className='fw-medium'>Track Pipeline</div>
                    </div>
                  </div>
                  <div className='col'>
                    <div className='border rounded p-16 text-center h-100'>
                      <span className='badge bg-primary-50 text-primary-600 border mb-8'>4</span>
                      <div className='fw-medium'>Hire & Report</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className='container pb-56'>
        <div className='card bg-primary-600 text-white border-0'>
          <div className='card-body p-24 d-flex flex-wrap align-items-center justify-content-between gap-3'>
            <div>
              <h5 className='mb-8 text-white'>Ready to accelerate hiring?</h5>
              <p className='mb-0 text-white'>Start free, then choose a plan that scales with your team.</p>
            </div>
            <div className='d-flex align-items-center gap-2'>
              <Link to='/login' className='btn btn-light'>Get Started</Link>
              <Link to='/pricing' className='btn btn-outline-light'>View Pricing</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className='py-16 px-24 border-top bg-base'>
        <div className='d-flex align-items-center justify-content-between'>
          <span className='text-secondary-light'>© 2025 AI Recruitment</span>
          <div className='d-flex align-items-center gap-3'>
            <Link to='/pricing' className='text-primary-600 fw-medium'>Pricing</Link>
            <a href='#features' className='text-secondary-light'>Features</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing; 