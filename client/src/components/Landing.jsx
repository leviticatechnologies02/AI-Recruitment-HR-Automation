import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "remixicon/fonts/remixicon.css";
 
const Landing = () => {
 
  const carouselSettings = {
 
    dots: false,
    infinite: true,
    speed: 700,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,            // enables auto scroll
    autoplaySpeed: 1000,       //  time between slides (in ms)
    pauseOnHover: true,        //  stops auto scroll when hovered
    arrows: false,             //  hides left/right arrows
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1 },
      },
    ],
  };
 
  return (
    <div className='min-vh-100 d-flex flex-column '>
 
      {/* Navbar */}
      <header className='py-16 px-24 bg-base border-bottom bg-light'>
        <div className='d-flex align-items-center justify-content-between'>
          <div className='d-flex align-items-center gap-2'>
            <img src='assets/images/logo-icon.png.svg' alt='logo' className='w-32-px h-32-px' />
            <span className='fw-semibold'>AI Recruitment</span>
          </div>
          <nav className='d-none d-md-flex align-items-center gap-3'>
            <a href='#features' className='nav-link text-success'>Features</a>
            <a href='#how' className='nav-link text-success'>How it works</a>
            <Link to='/pricing' className='nav-link text-success'>Pricing</Link>
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
          <div className='col-xxl-4'>
            <div className='d-flex justify-content-center align-item-center'>
              <span className='badge bg-primary-50 text-primary-600 border mb-16 text-center'>AI Talent Platform</span>
            </div>
            <h4 className='text-center text-primary'>Source, screen, and hire<br /> faster with AI</h4>
            <p className='text-center text-secondary-light'>
              Automate repetitive recruiting tasks and focus on great conversations. <br />
              Our recruiter dashboard gives you full visibility from job posting to offer.
            </p>
            <div className='d-flex justify-content-center gap-3'>
              <Link to='/login' className='btn btn-primary'>Get Started</Link>
              <Link to='/pricing' className='btn btn-outline-primary'>View Pricing</Link>
            </div>
            <div className='d-flex justify-content-center align-items-center gap-3 mt-20 text-secondary-light'>
              <img src='assets/images/users/user1.png' alt='users' className='w-32-px h-32-px rounded-circle' />
              <span>Trusted by growing hiring teams</span>
            </div>
          </div>
        </div>
      </section>
 
      {/* Features */}
      <section id='features' className='container pb-56'>
        <div className='row g-3'>
          <div className='col-md-4'>
            <div className='card h-100 shadow-none border bg-gradient-start-4'>
              <div className='card-body p-24'>
                <div className='d-flex align-items-center gap-2 mb-12'>
                  <span className='w-44-px h-44-px  d-flex justify-content-center align-items-center'>
                    <i className='ri-magic-line fs-2'></i>
 
                  </span>
 
                  <h6 className='mb-0'>AI Screening</h6>
                </div>
                <p className='mb-0 text-secondary-light'>Parse resumes, extract skills, and auto-rank candidates by fit.</p>
              </div>
            </div>
          </div>
          <div className='col-md-4'>
            <div className='card h-100 shadow-none border bg-gradient-start-3'>
              <div className='card-body p-24'>
                <div className='d-flex align-items-center gap-2 mb-12'>
                  <span className='w-44-px h-44-px  d-flex justify-content-center align-items-center'>
                    <i className='ri-layout-grid-line fs-2'></i>
                  </span>
                  <h6 className='mb-0'>Unified Dashboard</h6>
                </div>
                <p className='mb-0 text-secondary-light'>Jobs, candidates, pipeline and analytics in one place.</p>
              </div>
            </div>
          </div>
          <div className='col-md-4'>
            <div className='card h-100 shadow-none border bg-gradient-start-2'>
              <div className='card-body p-24'>
                <div className='d-flex align-items-center gap-2 mb-12'>
                  <span className='w-44-px h-44-px  d-flex justify-content-center align-items-center'>
                    <i className='ri-send-plane-line fs-2'></i>
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
                      <span className='badge bg-primary text-white border mb-8'>1</span>
                      <div className='fw-medium'>Create Job</div>
                    </div>
                  </div>
                  <div className='col'>
                    <div className='border rounded p-16 text-center h-100'>
                      <span className='badge bg-success text-white border mb-8'>2</span>
                      <div className='fw-medium'>Import Candidates</div>
                    </div>
                  </div>
                  <div className='col'>
                    <div className='border rounded p-16 text-center h-100'>
                      <span className='badge bg-warning text-white border mb-8'>3</span>
                      <div className='fw-medium'>Track Pipeline</div>
                    </div>
                  </div>
                  <div className='col'>
                    <div className='border rounded p-16 text-center h-100'>
                      <span className='badge bg-pink text-white border mb-8'>4</span>
                      <div className='fw-medium'>Hire & Report</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
 
 
      {/* 🚀 Carousel Section */}
      <section className='container pb-56'>
        <h5 className='text-center mb-4 text-primary'>HR Automation</h5>
 
        <Slider {...carouselSettings}>
          {[
            {
              name: "TechNova HR",
              text: "AI Recruitment helped us cut screening time by 60%.",
             
            },
            {
              name: "FutureHire",
              text: "The unified dashboard keeps our team perfectly aligned.",
         
            },
            {
              name: "SmartWorks",
              text: "We posted jobs to multiple boards in seconds — fantastic tool.",
            },
            {
              name: "Innova Talent",
              text: "Super intuitive interface and great automation features.",
            },
          ].map((card, i) => (
            <div key={i} className='p-3'>
              <div className='card h-100 border shadow-sm text-center'>
                <div className='card-body p-24'>
                  <p className='text-secondary-light mb-8'>{card.text}</p>
                  <h6 className='mb-0 text-primary'>{card.name}</h6>
                  <p>{card.backgroundColor}</p>
 
                </div>
              </div>
            </div>
          ))}
        </Slider>
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
      <footer className='py-16 px-24 border-top text-white' style={{ background: "#323949" }}>
        <div className='row'>
          <div className='col-sm-5'>
            <img src='assets/images/logo-icon.png.svg' alt='logo' className='w-32-px h-32-px m-2' style={{ backgroundColor: "white" }} />
            <span className='text-white'>HR Automation</span>
            <p> Automate repetitive recruiting tasks and focus <br /> on great conversations.
              Our recruiter dashboard gives  <br />you full visibility from job posting to offer.
            </p>
            <div class="">
              <div class="d-flex">
                <input
                  type="text"
 
                  class="form-control me-2 w-50"
                  placeholder="Subscribe to newsletter"
                />
                <button class="btn btn-primary">Subscribe</button>
              </div>
            </div>
          </div>
          <div className='col-sm-2'>
            <Link to='/pricing' className='nav-link text-primary-600 fw-medium mt-2'>Pricing</Link>
            <a href='#features' className='nav-link text-secondary-light mt-2'>Features</a>
            <a href='#' className='nav-link text-secondary-light mt-2'>Maintenance</a>
          </div>
          <div className='col-sm-2'>
            <a href='#' className='nav-link text-secondary-light fw-medium mt-2'>Page builder</a>
            <a href='#' className='nav-link text-secondary-light mt-2'>Admin Dashboards</a>
            <a href='#' className='nav-link text-secondary-light mt-2'>UI</a>
          </div>
          <div className="col-sm-3">
            <p className="fw-semibold mt-2 mb-3 text-white">Download Our App</p>
 
            <div className="card bg-dark text-white mb-3 p-3 d-flex flex-row align-items-center rounded-3">
              <i className="ri-apple-fill fs-2 text-light me-3"></i>
              <div>
                <small>Download on the</small>
                <br />
                <strong>App Store</strong>
              </div>
            </div>
 
            <div className="card bg-dark text-white p-3 d-flex flex-row align-items-center rounded-3">
              <i className="ri-google-play-fill fs-2 text-light me-3"></i>
              <div>
                <small>Download on the</small>
                <br />
                <strong>Google Play</strong>
              </div>
            </div>
          </div>
          <div className='bg-dark mt-3'style={{height:"70px"}}>
            <div class="d-flex justify-content-between align-items-center mt-3">
              <p class="mb-0">© 2025 AI Recruitment</p>
 
              <div class="d-flex gap-3">
                <a href="#" class="nav-link text-white">
                  <i class="ri-facebook-fill fs-4"></i>
                </a>
                <a href="#" class="nav-link text-white">
                  <i class="ri-twitter-fill fs-4"></i>
                </a>
                <a href="#" class="nav-link text-white">
                  <i class="ri-linkedin-fill fs-4"></i>
                </a>
                <a href="#" class="nav-link text-white">
                  <i class="ri-instagram-fill fs-4"></i>
                </a>
              </div>
 
            </div>
          </div>
 
 
        </div>
 
      </footer>
    </div>
  );
};
 
export default Landing;
 