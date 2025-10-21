import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "remixicon/fonts/remixicon.css";
 
const Landing = () => {
  const [openFAQ, setOpenFAQ] = React.useState(null);
 
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

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
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
     
      {/* Features */}
      <section 
        className='py-5'
        style={{
          backgroundImage: 'url(https://sana.flatheme.net/assets/images/business-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          position: 'relative',
          borderRadius: '20px',
          marginBottom:"20px"        
        }}
      >
        {/* Overlay for better text readability */}
        <div 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            zIndex: 1,
            borderRadius:'20px'
           
          }}
        ></div>
        
        <div className='container position-relative' style={{ zIndex: 2 }}>
          <div className='row align-items-center justify-content-center'>
            <div className='col-lg-8 text-center text-white'>
              <div className='mb-4'>
                <span className='badge bg-primary-50 text-primary-600 border px-3 py-2'>AI Talent Platform</span>
              </div>
              <h1 className='display-4 fw-bold mb-4'>Source, screen, and hire faster with AI</h1>
              <p className='lead mb-5'>
                Automate repetitive recruiting tasks and focus on great conversations.
                Our recruiter dashboard gives you full visibility from job posting to offer.
              </p>
              <div className='d-flex justify-content-center gap-3 mb-5'>
                <Link to='/login' className='btn btn-primary btn-lg px-4'>Get Started</Link>
                <Link to='/pricing' className='btn btn-outline-light btn-lg px-4'>View Pricing</Link>
              </div>
              <div className='d-flex justify-content-center align-items-center gap-3 text-white-50'>
                <img src='assets/images/users/user1.png' alt='users' className='w-32-px h-32-px rounded-circle' />
                <span>Trusted by growing hiring teams</span>
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

      {/* About Us Section */}
      <section className='py-5 ' >
        <div className='container card border shadow-none p-56'>
          <div className='row g-5 align-items-center'>
            <div className='col-12 col-lg-6'>
              <div className='row'>
                <div className='col-6 text-end'>
                  <img 
                    className='rounded-3 shadow-sm' 
                    src='assets/images/asset/asset-img2.png' 
                    style={{width:"250px"}} 
                    alt="Office team working"
                  />
                  <div className='d-flex align-items-center justify-content-end mt-3'>
                    <div className='d-inline-block pe-2'>
                      <h4 className='line-height-100 fw-normal mb-0'>+</h4>
                      <p className='text-muted small mb-0'>Professionals</p>
                    </div>
                    <div className='d-inline-block'>
                      <h1 className='fw-medium display-4 letter-spacing-1 text-primary'>35</h1>
                    </div>
                  </div>
                </div>
                <div className='col-6'>
                  <div className='d-flex align-items-center mb-3'>
                    <div className='d-inline-block'>
                      <h1 className='fw-medium display-4 letter-spacing-1 text-primary'>14</h1>
                    </div>
                    <div className='d-inline-block ps-2'>
                      <h4 className='line-height-100 fw-normal mb-0'>+</h4>
                      <p className='text-muted small mb-0'>Years of Experience</p>
                    </div>
                  </div>
                  <img 
                    className='rounded-3 shadow-sm' 
                    src='assets/images/asset/asset-img1.png' 
                    style={{width:"250px"}} 
                    alt="Team collaboration"
                  />
                </div>
              </div>
            </div>
            <div className='col-12 col-lg-6'>
              <h6 className='text-muted mb-3'>// ABOUT US</h6>
              <h2 className='display-6 fw-normal mb-3'>Satisfied customer is the best business strategy of all</h2>
              <p className='text-secondary-light mb-4'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae modi dicta ea autem harum commodi quo obcaecati accusantium
              </p>
              <button 
                type="button" 
                className='btn btn-primary px-4 py-2'
                style={{
                  background: 'linear-gradient(90deg, #3B82F6 0%, #EC4899 100%)',
                  border: 'none',
                  borderRadius: '25px',
                  color: 'white',
                  fontWeight: 'bold'
                }}
              >
                LEARN MORE
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
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

      {/* Pricing Cards  */}
      <section className='container pb-56'>
        <div className='row g-4'>
          {[
            { title: 'Basic', price: '$4.99', features: ['50 GB Bandwidth','Financial Analysis','24 hour support'], tag: 'BASIC' },
            { title: 'Standard', price: '$9.99', features: ['50 GB Bandwidth','Financial Analysis','24 hour support'], tag: 'STANDARD' },
            { title: 'Premium', price: '$14.99', features: ['50 GB Bandwidth','Financial Analysis','24 hour support'], tag: 'PREMIUM' },
            { title: 'Special', price: '$99.99', features: ['50 GB Bandwidth','Financial Analysis','24 hour support'], tag: 'SPECIAL' }
          ].map((plan, i) => (
            <div key={i} className='col-12 col-md-6 col-lg-3'>
              <div className='card border shadow-sm h-100 position-relative'>
                <div className='position-absolute top-0 start-0 m-0'>
                  <span className='badge bg-pink text-white'>{plan.tag}</span>
                </div>
                <div className='card-body d-flex flex-column'>
                  <div className='mb-4'>
                    <h4 className='display-6 fw-bold mb-0'>{plan.price}<small className='text-muted'>/mon</small></h4>
                  </div>
                  <ul className='list-unstyled mb-4 flex-grow-1'>
                    {plan.features.map((f, idx) => (
                      <li key={idx} className='d-flex align-items-center gap-2 mb-2'>
                        <i className='ri-checkbox-circle-fill text-success'></i>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <div>
                    <button className='btn btn-primary w-100'>BUY NOW</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
 
 
      {/* FAQ and Video Section */}
      <section className='container pb-56'>
        <div className='row align-items-center g-4'>
          {/* Left side - FAQ Cards */}
          <div className='col-lg-6'>
            <div className='d-flex flex-column gap-3'>
              {[
                {
                  question: "Where to start?",
                  answer: "Begin by creating your first job posting and setting up your company profile. Our AI will guide you through the process step by step."
                },
                {
                  question: "Data analytics",
                  answer: "Track your hiring metrics with comprehensive analytics including time-to-hire, candidate quality scores, and pipeline performance."
                },
                {
                  question: "Understanding the market",
                  answer: "Get insights into salary benchmarks, skill demand trends, and competitive analysis to make informed hiring decisions."
                },
                {
                  question: "What can we do to help?",
                  answer: "Our AI-powered platform automates screening, scheduling, and candidate communication, freeing you to focus on building relationships."
                }
              ].map((item, index) => (
                <div key={index} className='card border-0 shadow-sm rounded-3 bg-white'>
                  <div className='card-body p-4'>
                    <div 
                      className='d-flex justify-content-between align-items-center cursor-pointer'
                      onClick={() => toggleFAQ(index)}
                      style={{ cursor: 'pointer' }}
                    >
                      <h6 className='mb-0 text-dark fw-semibold'>{item.question}</h6>
                      <i 
                        className={`ri-arrow-down-s-line fs-5 text-secondary transition-all ${
                          openFAQ === index ? 'rotate-180' : ''
                        }`}
                        style={{ 
                          transform: openFAQ === index ? 'rotate(180deg)' : 'rotate(0deg)',
                          transition: 'transform 0.3s ease'
                        }}
                      ></i>
                    </div>
                    <div 
                      className={`mt-3 overflow-hidden transition-all ${
                        openFAQ === index ? 'max-height-200 opacity-100' : 'max-height-0 opacity-0'
                      }`}
                      style={{
                        maxHeight: openFAQ === index ? '200px' : '0px',
                        opacity: openFAQ === index ? 1 : 0,
                        transition: 'max-height 0.3s ease, opacity 0.3s ease'
                      }}
                    >
                      <p className='text-secondary-light mb-0 lh-base'>{item.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Video Player */}
          <div className='col-lg-6'>
            <div className='position-relative rounded-3 overflow-hidden shadow-lg'>
              <div className='bg-light' style={{ aspectRatio: '16/9', minHeight: '300px' }}>
                
                {/* Placeholder for video thumbnail */}
                <div className='w-100 h-100 d-flex align-items-center justify-content-center bg-gradient' 
                     style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                  <div className='text-center text-white'>
                    <i className='ri-video-line fs-1 mb-3'></i>
                    <p className='mb-0'>Watch our demo video</p>
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
 