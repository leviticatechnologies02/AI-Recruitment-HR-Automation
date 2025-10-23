import React, { useEffect, useState } from 'react';
import { Star } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { getUserRole } from '../utils/auth';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "remixicon/fonts/remixicon.css";

const testimonials = [
    {
      name: "Sarah Chen",
      role: "Head of HR",
      company: "TechCorp",
      photo: "SC",
      feedback: "This platform cut our hiring time by 40% and improved candidate quality significantly. Game changer!",
      rating: 5
    },
    {
      name: "Marcus Johnson",
      role: "Talent Director",
      company: "InnovateLabs",
      photo: "MJ",
      feedback: "The AI screening is incredibly accurate. We've hired 15 people in 3 months with zero regrets.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "CEO",
      company: "StartupHub",
      photo: "ER",
      feedback: "As a startup, we needed speed and quality. AI Recruiter delivered both beyond our expectations.",
      rating: 5
    }
  ];

const Landing = () => {
  const [openFAQ, setOpenFAQ] = React.useState(null);
  const navigate = useNavigate();
  const [isYearly, setIsYearly] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);


  


  useEffect(() => {
  const interval = setInterval(() => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  }, 5000);
  return () => clearInterval(interval);
}, [testimonials.length]);


  useEffect(() => {
    // Super Admins should not see pricing page, redirect them directly to Super Admin Panel
    const userRole = getUserRole();
    if (userRole === 'superadmin') {
      navigate('/super-admin');
    }
  }, [navigate]);

 

  

  const handleGetStarted = () => {
    navigate('/dashboard');
  };

  const pricingPlans = [
    {
      name: 'FREE',
      color: '#E8B4F8',
      monthlyPrice: '$0',
      yearlyPrice: '$49.99',
      features: [
        { text: '50 GB Bandwidth', included: true },
        { text: 'Financial Analysis', included: true },
        { text: '24 hour support', included: false },
        { text: 'Customer Management', included: false },
        { text: 'Advanced Analytics', included: false }
      ]
    },
    {
      name: 'BASIC',
      color: '#FF69B4',
      monthlyPrice: '$9.99',
      yearlyPrice: '$99.99',
      features: [
        { text: '50 GB Bandwidth', included: true },
        { text: 'Financial Analysis', included: true },
        { text: '24 hour support', included: true },
        { text: 'Customer Management', included: false },
        { text: 'Advanced Analytics', included: false }
      ]
    },
    {
      name: 'STANDARD',
      color: '#8B5CF6',
      monthlyPrice: '$14.99',
      yearlyPrice: '$149.99',
      features: [
        { text: '50 GB Bandwidth', included: true },
        { text: 'Financial Analysis', included: true },
        { text: '24 hour support', included: true },
        { text: 'Customer Management', included: true },
        { text: 'Advanced Analytics', included: false }
      ]
    }
    
  ];

 
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




    const clients = [
    {
      name: 'Smart Screening',
      icon: (
        <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
          <path d="M5 10 L20 5 L35 10 L20 35 Z" fill="#EC4899" />
        </svg>
      )
    },
    {
      name: 'Automated Interviewing',
      icon: (
        <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
          <rect x="8" y="8" width="4" height="24" fill="#1F2937" />
          <rect x="14" y="12" width="4" height="20" fill="#1F2937" />
          <rect x="20" y="6" width="4" height="26" fill="#1F2937" />
          <rect x="26" y="14" width="4" height="18" fill="#1F2937" />
        </svg>
      )
    },
    {
      name: 'HR Analytics',
      icon: (
        <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
          <path d="M8 12 L14 28 L20 8 L26 28 L32 12" stroke="#3B82F6" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    },
    {
      name: 'AI Screening',
      icon: (
        <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
          <circle cx="20" cy="20" r="12" stroke="#3B82F6" strokeWidth="3" fill="none" />
          <path d="M20 12 L20 20 L26 26" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" />
        </svg>
      )
    },
    {
      name: 'Collaboration',
      icon: (
        <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
          <path d="M8 20 L15 12 L22 18 L32 8" stroke="#DC2626" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8 28 L15 22 L22 26 L32 18" stroke="#DC2626" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    },
    {
      name: 'Visualy Analytics',
      icon: (
        <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
          <path d="M10 30 L20 10 L30 30 Z" stroke="#F59E0B" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="20" cy="22" r="3" fill="#F59E0B" />
        </svg>
      )
    }
  ];
  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };
 
  return (
    <div className='min-vh-100 d-flex flex-column '>
 
      {/* Navbar */}
      <header className='py-16 px-24 bg-base border-bottom bg-light sticky-top top-0'>
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


      {/*  Testimonials */ }

      <section  className='px-5'>
      <div className='container  card border shadow-none p-56'>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-8">
      <div className="max-w-7xl w-full">
        <div className="d-flex flex-row align-items-center justify-content-between">
          {/* Top Section - Title and Description */}
          <div className="space-y-6 max-w-2xl">
            <h1 className="text-4xl lg:text-4xl font-bold text-gray-900 leading-tight">
              Powerful Features for Modern Hiring...
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Our AI solutions have driven innovation, streamlined operations, and fueled exceptional business growth.
            </p>
            <button className="btn btn-primary">
              Become a client
            </button>
          </div>

          {/* Client Logos Grid - 3 columns */}
          <div className= "d-flex flex-wrap grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {clients.map((client, index) => (
              <div
                key={index}
                className= " d-flex flex-row align-items-center justify-content-start  bg-white rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200 hover:border-indigo-300 flex items-center gap-4 cursor-pointer group"
              style={{width:"40%"}}
              >
                <div className="flex-shrink-0 transition-transform duration-300 bg-black" style={{ width: '100px', height: '100px' }}>
                  {client.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 transition-colors duration-300" style={{
                  fontFamily: client.name === 'Visualy' ? 'Georgia, serif' : 'inherit',
                  fontStyle: client.name === 'Visualy' ? 'italic' : 'normal'
                }}>
                  {client.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
        
        
        
        
      </div>
      </section>

    {/* Scrolled Testimonials */ }

  <section  className='p-2 relative '>
      <div className='container flex flex-wrap justify-center gap-6'>
        <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold  mb-4">
            Loved by HR Teams Worldwide
          </h2>
          <p className="text-xl text-blue-100">
            See what our customers have to say
          </p>
        </div>

        {/* Testimonial Cards */}
      <div className="position-relative" style={{ overflow: "hidden" }}>
      <div
        className="d-flex transition-transform"
        style={{
          transform: `translateX(-${activeTestimonial * 100}%)`,
        }}
      >
        {testimonials.map((testimonial, idx) => (
          <div key={idx} className="d-flex justify-content-center px-4" style={{ minWidth: "100%" }}>
            <div className="bg-white rounded-3 shadow p-4 p-md-5 w-100" style={{ maxWidth: "720px" }}>
              {/* Rating Stars (top-left) */}
              <div className="d-flex mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={18} color="#FBBF24" fill="#FBBF24" className="me-1" />
                ))}
              </div>

              {/* Feedback */}
              <p className="fs-5 mb-4 fst-italic lh-base">
                "{testimonial.feedback}"
              </p>

              {/* Author Info */}
              <div className="d-flex align-items-center">
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold me-3"
                  style={{ width: "56px", height: "56px", background: "linear-gradient(135deg, #3B82F6 0%, #A855F7 100%)" }}
                >
                  {testimonial.photo}
                </div>
                <div>
                  <div className="fw-bold text-dark">{testimonial.name}</div>
                  <div className="text-muted">{testimonial.role} at {testimonial.company}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dots Navigation */}
      <div className="flex justify-center mt-8 space-x-2">
        {testimonials.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveTestimonial(idx)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              idx === activeTestimonial
                ? "bg-white w-8"
                : "bg-white/50 hover:bg-white/70"
            }`}
          />
        ))}
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
                    src="assets\images\landing1.png"
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
                    src='assets\images\landing2.png' 
                    style={{width:"250px"}} 
                    alt="Team collaboration"
                  />
                </div>
              </div>
            </div>
            <div className='col-12 col-lg-6'>
              
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
      
       <section  className='px-5'>
      <div className='container  card border shadow-none p-56'>
        {/* Header */}
        <div className='text-center text-black mb-5 '>
          <h1 className='display-4 fw-bold mb-3'> Pricing & Plans</h1>
         
        </div>

        {/* Pricing Cards */}
        <div className='row g-4 justify-content-center'>
          {pricingPlans.map((plan, index) => (
            <div key={index} className='col-lg-3 col-md-6'>
              <div className='card h-100 border-0 shadow-lg position-relative' style={{ borderRadius: '20px' }}>
                {/* Colored Tab */}
                <div 
                  className='position-absolute top-0 start-0 px-3 py-2 text-white fw-bold'
                  style={{ 
                    backgroundColor: plan.color,
                    borderRadius: '20px 0 20px 0',
                    fontSize: '14px',
                    zIndex: 1
                  }}
                >
                  {plan.name}
                </div>
                
                <div className='card-body p-4 pt-5'>
                  {/* Price */}
                  <div className='text-center mb-4'>
                    <h2 className='display-6 fw-bold text-dark mb-0'>
                      {isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                      <span className='fs-6 text-muted'>/{isYearly ? 'year' : 'mon'}</span>
                    </h2>
                  </div>

                  {/* Features */}
                  <div className='mb-4'>
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className='d-flex align-items-center mb-3'>
                        <div className='me-3'>
                          {feature.included ? (
                            <i className='ri-check-line text-success fs-5'></i>
                          ) : (
                            <i className='ri-close-line text-danger fs-5'></i>
                          )}
                        </div>
                        <span className='text-dark'>{feature.text}</span>
                      </div>
                    ))}
                  </div>

                  {/* Buy Now Button */}
                 
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
 
 
      {/* FAQ and Video Section */}
      <section className='container p-56'>
        <div className='row align-items-center g-4 '>
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
                      <div className='d-flex align-items-center gap-3'>
                        
                        <h6 className='mb-0 text-dark fw-semibold'>{item.question}</h6>
                      </div>
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
                  <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop" className='w-100' alt='Video Placeholder' />
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