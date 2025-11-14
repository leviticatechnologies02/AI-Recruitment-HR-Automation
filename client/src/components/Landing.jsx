import React, { useEffect, useState } from 'react';
import { Star } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { getUserRole } from '../utils/auth';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "remixicon/fonts/remixicon.css";

// Global Animation Styles
const animationStyles = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideInDown {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes scaleIn {
    from {
      opacity: 0;
      transform: scale(0.2);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  .animate-fade-in-up {
    animation: fadeInUp 0.8s ease-out forwards;
  }

  .animate-slide-down {
    animation: slideInDown 0.8s ease-out forwards;
  }

  .animate-scale-in {
    animation: scaleIn 0.8s ease-out forwards;
  }

  /* Session Block Styling */
  .session-block {
    border-radius: 16px;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  }

  .session-block:hover {
    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
  }

  /* Button Hover Effects */
  .btn-hover-lift {
    transition: all 0.3s ease;
  }

  .btn-hover-lift:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  }

  /* Smooth Scroll */
  html {
    scroll-behavior: smooth;
  }

  /* FAQ Image Animations */
  @keyframes float {
    0%, 100% {
      transform: translateY(0px) rotate(0deg);
    }
    50% {
      transform: translateY(-20px) rotate(180deg);
    }
  }

  @keyframes pulse {
    0%, 100% {
      transform: translate(-50%, -50%) scale(1);
      box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.7);
    }
    50% {
      transform: translate(-50%, -50%) scale(1.05);
      box-shadow: 0 0 0 10px rgba(255, 255, 255, 0);
    }
  }

  .faq-image-container:hover .faq-image {
    filter: brightness(1.2) contrast(1.2) saturate(1.1);
  }
`;

// AnimatedSection Component
const AnimatedSection = ({ children, delay = 0 }) => {
  return (
    <div
      style={{
        animation: `fadeInUp 0.8s ease-out ${delay}ms forwards`,
        opacity: 0,
      }}
    >
      {children}
    </div>
  );
};

// Custom Hook for Scroll-triggered Animations
const useIntersectionObserver = () => {
  const ref = React.useRef(null);
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Don't unobserve - keep it observed for consistency
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return [ref, isVisible];
};

// Scroll-triggered Animated Card Component
const ScrollAnimatedCard = ({ children, delay = 0, isVisible }) => {
  return (
    <div
      style={{
        animation: isVisible ? `scaleIn 0.8s ease-out ${delay}ms forwards` : 'none',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'scale(1)' : 'scale(0.2)',
        transformOrigin: 'center center'
      }}
    >
      {children}
    </div>
  );
};

// How It Works Section Component
const HowItWorksSection = () => {
  const [ref, isVisible] = useIntersectionObserver();

  const steps = [
    { num: 1, title: '📝 Create Job', icon: '1', color: 'bg-primary', delay: 0 },
    { num: 2, title: '👥 Import Candidates', icon: '2', color: 'bg-success', delay: 150 },
    { num: 3, title: '📊 Track Pipeline', icon: '3', color: 'bg-warning', delay: 300 },
    { num: 4, title: '🎯 Hire & Report', icon: '4', color: 'bg-pink', delay: 450 }
  ];

  return (
    <div ref={ref} className='card border shadow-none session-block'>
      <div className='card-body p-24'>
        <div className='row g-4 align-items-center'>
          {/* Left Section Title */}
          <ScrollAnimatedCard delay={0} isVisible={isVisible}>
            <div className='col-xxl-4'>
              <h5 className='mb-12 fw-bold' style={{ fontSize: '1.5rem' }}>🚀 How it works</h5>
              <p className='text-secondary-light mb-0'>
                Create a job, import or invite candidates, manage pipeline stages, and track performance with analytics.
              </p>
            </div>
          </ScrollAnimatedCard>

          {/* Right Section - Cards */}
          <div className='col-xxl-8'>
            <div className='row row-cols-lg-4 row-cols-2 g-3'>
              {steps.map((step, idx) => (
                <div key={idx} className='col'>
                  <ScrollAnimatedCard delay={step.delay} isVisible={isVisible}>
                    <div className='border rounded p-16 text-center h-100 session-block' style={{ 
                      borderRadius: '12px',
                      transition: 'all 0.3s ease'
                    }}>
                      <span className={`badge ${step.color} text-white border mb-8`} style={{ 
                        fontSize: '1rem',
                        padding: '0.5rem 0.75rem'
                      }}>
                        {step.num}
                      </span>
                      <div className='fw-medium' style={{ marginTop: '0.5rem' }}>{step.title}</div>
                    </div>
                  </ScrollAnimatedCard>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Row Animation Component for individual rows
const AnimatedRow = ({ children, delay = 0 }) => {
  const [ref, isVisible] = useIntersectionObserver();

  return (
    <div ref={ref} className='row g-4'>
      {React.Children.map(children, (child, index) => (
        <ScrollAnimatedCard key={index} delay={delay + (index * 100)} isVisible={isVisible}>
          {child}
        </ScrollAnimatedCard>
      ))}
    </div>
  );
};

// What We Offer Section Component with Row-by-Row Scroll Animations
const WhatWeOfferSection = () => {
  const [ref, isVisible] = useIntersectionObserver();

  return (
    <section ref={ref} className='py-5'>
      <div className='container'>
        {/* Section Header */}
        <ScrollAnimatedCard delay={0} isVisible={isVisible}>
          <div className='text-center mb-5'>
            <span className='badge bg-primary-subtle text-primary mb-3 px-3 py-2'>Our Services</span>
            <h2 className='display-5 fw-bold mb-3'>
              <span style={{ color: '#3B82F6' }}>What</span> <span style={{ color: '#EC4899' }}>We</span> <span style={{ color: '#3B82F6' }}>Offer</span>
            </h2>
            <p className='lead text-muted mx-auto' style={{ maxWidth: '600px' }}>
              At CloudFlow, we prioritize innovation, agility, and customer-centricity. Our solutions are designed to provide scalable, secure, and efficient AI services tailored to your business needs.
            </p>
          </div>
        </ScrollAnimatedCard>

        {/* Service Cards Grid - Original Layout with Row-by-Row Animation */}
        <div className='row g-4'>
          <style>{`
            .service-card {
              position: relative;
              overflow: hidden;
              transition: all 0.3s ease;
            }
            .service-card::after {
              content: '';
              position: absolute;
              bottom: 0;
              left: -100%;
              width: 100%;
              height: 4px;
              background: currentColor;
              transition: left 0.5s ease;
            }
            .service-card:hover::after {
              left: 0;
            }
            .service-card-purple::after {
              background: #7C3AED;
            }
            .service-card-orange::after {
              background: #F97316;
            }
            .service-card-pink::after {
              background: #EC4899;
            }
            .service-card-cyan::after {
              background: #0891B2;
            }
            .service-card-blue::after {
              background: #3B82F6;
            }
            .service-card-red::after {
              background: #DC2626;
            }
            .service-card:hover {
              transform: translateY(-5px);
            }
          `}</style>

          {/* Card 1 - Large */}
          <div className='col-lg-7 col-md-6'>
            <ScrollAnimatedCard delay={100} isVisible={isVisible}>
              <div className='card border-0 shadow-lg h-100 service-card service-card-purple' style={{ backgroundColor: '#f0f4ff' }}>
                <div className='card-body p-5'>
                  <div className='d-flex align-items-start justify-content-between mb-4'>
                    <div className='flex-grow-1'>
                      <div className='rounded-3 d-inline-block p-4 mb-4' style={{ backgroundColor: '#7C3AED' }}>
                        <i className='ri-layout-grid-fill text-white fs-4'></i>
                      </div>
                      <h4 className='fw-bold text-dark mb-3'>Custom AI Agent Development</h4>
                      <p className='text-muted mb-0' style={{ fontSize: '15px', lineHeight: '1.6' }}>Build intelligent agents tailored to your business needs with advanced machine learning capabilities and cutting-edge AI technologies.</p>
                    </div>
                  </div>
                  <div className='d-flex justify-content-between align-items-center mt-5 pt-4 border-top'>
                    <div>
                      <p className='text-muted small mb-1'>Success Rate</p>
                      <h5 className='fw-bold text-primary mb-0'>98%</h5>
                    </div>
                    <div>
                      <p className='text-muted small mb-1'>Delivery Time</p>
                      <h5 className='fw-bold text-primary mb-0'>4-6 weeks</h5>
                    </div>
                    <div className='d-flex gap-2 flex-wrap'>
                      <span className='badge bg-primary-subtle text-primary'>Custom Architecture</span>
                      <span className='badge bg-primary-subtle text-primary'>Scalable Solutions</span>
                      <span className='badge bg-primary-subtle text-primary'>24/7 Support</span>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollAnimatedCard>
          </div>

          {/* Card 2 - Small with Most Popular Badge */}
          <div className='col-lg-5 col-md-6'>
            <ScrollAnimatedCard delay={200} isVisible={isVisible}>
              <div className='position-relative h-100'>
                <span className='badge bg-primary text-white px-3 py-2 mb-3' style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', zIndex: 10 }}>Most Popular</span>
                <div className='card border-0 shadow-lg h-100 service-card service-card-cyan' style={{ backgroundColor: '#f0fdf4', marginTop: '15px' }}>
                  <div className='card-body p-4'>
                    <div className='d-flex align-items-start justify-content-between mb-3'>
                      <div className='flex-grow-1'>
                        <div className='rounded-2 d-inline-block p-3 mb-3' style={{ backgroundColor: '#10B981' }}>
                          <i className='ri-git-merge-fill text-white fs-5'></i>
                        </div>
                        <h5 className='fw-bold text-dark mb-2'>Workflow Integration & Automation</h5>
                        <p className='text-muted small mb-0'>Streamline operations by integrating AI into existing workflows and automating repetitive tasks for maximum efficiency.</p>
                      </div>
                    </div>
                    <div className='mt-4 pt-3 border-top'>
                      <div className='mb-3'>
                        <div className='d-flex align-items-center justify-content-between mb-2'>
                          <p className='text-muted small mb-0'>Efficiency Gain</p>
                          <h6 className='fw-bold text-success mb-0'>75%</h6>
                        </div>
                      </div>
                      <div className='d-flex align-items-center gap-2 mb-3'>
                        <i className='ri-check-circle-fill text-success'></i>
                        <span className='text-success small fw-medium'>Automation Ready</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollAnimatedCard>
          </div>

          {/* Card 3 - Small */}
          <div className='col-lg-5 col-md-6'>
            <ScrollAnimatedCard delay={300} isVisible={isVisible}>
              <div className='card border-0 shadow-lg h-100 service-card service-card-orange' style={{ backgroundColor: '#fffbf0' }}>
                <div className='card-body p-4'>
                  <div className='d-flex align-items-start justify-content-between mb-3'>
                    <div className='flex-grow-1'>
                      <div className='rounded-2 d-inline-block p-3 mb-3' style={{ backgroundColor: '#F97316' }}>
                        <i className='ri-rocket-2-fill text-white fs-5'></i>
                      </div>
                      <h5 className='fw-bold text-dark mb-2'>MVP's, Prototypes, and Pilot Projects</h5>
                      <p className='text-muted small mb-0'>Rapid development of proof-of-concepts to validate ideas and accelerate time-to-market with agile methodologies.</p>
                    </div>
                  </div>
                  <div className='mt-4 pt-3 border-top'>
                    <div className='p-3 rounded-2 mb-3' style={{ backgroundColor: '#fef3c7' }}>
                      <p className='text-muted small mb-1'>Launch Time</p>
                      <h6 className='fw-bold' style={{ color: '#F97316' }}>2-3 weeks</h6>
                    </div>
                    <div className='d-flex gap-2 flex-wrap'>
                      <span className='badge' style={{ backgroundColor: '#fed7aa', color: '#92400e' }}>Rapid Prototyping</span>
                      <span className='badge' style={{ backgroundColor: '#fed7aa', color: '#92400e' }}>Market Validation</span>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollAnimatedCard>
          </div>

          {/* Card 4 - Large with 24/7 Available */}
          <div className='col-lg-7 col-md-6'>
            <ScrollAnimatedCard delay={400} isVisible={isVisible}>
              <div className='position-relative h-100'>
                <div className='d-flex align-items-center gap-2 mb-3' style={{ position: 'absolute', top: '0', right: '20px', zIndex: 10 }}>
                  <div style={{ width: '12px', height: '12px', backgroundColor: '#10B981', borderRadius: '50%' }}></div>
                  <span className='text-success small fw-bold'>24/7 Available</span>
                </div>
                <div className='card border-0 shadow-lg h-100 service-card service-card-pink' style={{ backgroundColor: '#f5f0ff' }}>
                  <div className='card-body p-5'>
                    <div className='d-flex align-items-start justify-content-between mb-4'>
                      <div className='flex-grow-1'>
                        <div className='rounded-3 d-inline-block p-4 mb-4' style={{ backgroundColor: '#EC4899' }}>
                          <i className='ri-chat-3-fill text-white fs-4'></i>
                        </div>
                        <h4 className='fw-bold text-dark mb-3'>Conversational AI & Virtual Assistants</h4>
                        <p className='text-muted mb-0' style={{ fontSize: '15px', lineHeight: '1.6' }}>Deploy intelligent chatbots and voice assistants to enhance customer experience and provide 24/7 support.</p>
                      </div>
                    </div>
                    <div className='d-flex justify-content-between align-items-center mt-5 pt-4 border-top'>
                      <div>
                        <p className='text-muted small mb-1'>Response Rate</p>
                        <h5 className='fw-bold text-primary mb-0'>95%</h5>
                      </div>
                      <div>
                        <p className='text-muted small mb-1'>Languages</p>
                        <h5 className='fw-bold text-primary mb-0'>50+</h5>
                      </div>
                      <div>
                        <p className='text-muted small mb-1'>Availability</p>
                        <h5 className='fw-bold text-primary mb-0'>24/7</h5>
                      </div>
                      <div className='d-flex gap-2 flex-wrap'>
                        <span className='badge bg-danger-subtle text-danger'>Multi-language</span>
                        <span className='badge bg-danger-subtle text-danger'>Context Aware</span>
                        <span className='badge bg-danger-subtle text-danger'>Learning Capable</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollAnimatedCard>
          </div>

          {/* Card 5 */}
          <div className='col-lg-6 col-md-6'>
            <ScrollAnimatedCard delay={500} isVisible={isVisible}>
              <div className='card border-0 shadow-lg h-100 service-card service-card-blue' style={{ backgroundColor: '#f0f9ff' }}>
                <div className='card-body p-4'>
                  <div className='d-flex align-items-start justify-content-between mb-3'>
                    <div className='flex-grow-1'>
                      <div className='rounded-2 d-inline-block p-3 mb-3' style={{ backgroundColor: '#3B82F6' }}>
                        <i className='ri-bar-chart-2-fill text-white fs-5'></i>
                      </div>
                      <h5 className='fw-bold text-dark mb-2'>Analytics Dashboards & Insights</h5>
                      <p className='text-muted small mb-0'>Gain actionable insights with comprehensive analytics, real-time visualization, and predictive modeling.</p>
                    </div>
                  </div>
                  <div className='d-flex justify-content-between align-items-center mt-4 pt-3 border-top'>
                    <div>
                      <p className='text-muted small mb-1'>Real-time</p>
                      <h6 className='fw-bold text-dark mb-0'>100%</h6>
                    </div>
                    <div className='d-flex gap-1'>
                      <span className='badge bg-success-subtle text-success small'>Interactive Dashboard</span>
                      <span className='badge bg-primary-subtle text-primary small'>Predictive Analysis</span>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollAnimatedCard>
          </div>

          {/* Card 6 */}
          <div className='col-lg-6 col-md-6'>
            <ScrollAnimatedCard delay={600} isVisible={isVisible}>
              <div className='card border-0 shadow-lg h-100 service-card service-card-red' style={{ backgroundColor: '#fef2f2' }}>
                <div className='card-body p-4'>
                  <div className='d-flex align-items-start justify-content-between mb-3'>
                    <div className='flex-grow-1'>
                      <div className='rounded-2 d-inline-block p-3 mb-3' style={{ backgroundColor: '#DC2626' }}>
                        <i className='ri-shield-check-fill text-white fs-5'></i>
                      </div>
                      <h5 className='fw-bold text-dark mb-2'>Enterprise Grade Security & Compliance</h5>
                      <p className='text-muted small mb-0'>Ensure data protection with industry-compliant security, SSL/TLS encryption, and audit trails.</p>
                    </div>
                  </div>
                  <div className='d-flex justify-content-between align-items-center mt-4 pt-3 border-top'>
                    <div>
                      <p className='text-muted small mb-1'>Uptime</p>
                      <h6 className='fw-bold text-dark mb-0'>99.9%</h6>
                    </div>
                    <div className='d-flex gap-1 flex-wrap'>
                      <span className='badge bg-danger-subtle text-danger small'>GDPR Ready</span>
                      <span className='badge bg-secondary-subtle text-secondary small'>ISO 27 Compliant</span>
                      <span className='badge bg-dark-subtle text-dark small'>Data Trail</span>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollAnimatedCard>
          </div>
        </div>
      </div>
    </section>
  );
};

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
  }, 2000);
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
      <style>{animationStyles}</style>
 
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
 
      {/* Hero Section with Staggered Animations */}
      <section 
        className='py-5'
        style={{
          backgroundImage: 'url(https://sana.flatheme.net/assets/images/business-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          position: 'relative',
          borderRadius: '20px',
          marginBottom: '20px'        
        }}
      >
        {/* Overlay */}
        <div 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            zIndex: 1,
            borderRadius: '20px'
          }}
        ></div>
        
        <div className='container position-relative' style={{ zIndex: 2 }}>
          <div className='row align-items-center justify-content-center'>
            <div className='col-lg-8 text-center text-white'>
              {/* Badge - Appears First (0ms) */}
              <AnimatedSection delay={0}>
              <div className='mb-4'>
                  <span className='badge bg-primary-50 text-primary-600 border px-3 py-2'>✨ AI Talent Platform</span>
              </div>
              </AnimatedSection>

              {/* Title - Appears Second (400ms) */}
              <AnimatedSection delay={400}>
              <h1 className='display-4 fw-bold mb-4'>Source, screen, and hire faster with AI</h1>
              </AnimatedSection>

              {/* Paragraph - Appears Third (800ms) */}
              <AnimatedSection delay={800}>
              <p className='lead mb-5'>
                Automate repetitive recruiting tasks and focus on great conversations.
                Our recruiter dashboard gives you full visibility from job posting to offer.
              </p>
              </AnimatedSection>

              {/* Buttons - Appears Fourth (1200ms) */}
              <AnimatedSection delay={1200}>
              <div className='d-flex justify-content-center gap-3 mb-5'>
                  <Link to='/login' className='btn btn-primary btn-lg px-4 btn-hover-lift'>🚀 Get Started</Link>
                  <Link to='/pricing' className='btn btn-outline-light btn-lg px-4 btn-hover-lift'>💰 View Pricing</Link>
              </div>
              </AnimatedSection>

              {/* Trusted By - Appears Fifth (1600ms) */}
              <AnimatedSection delay={1600}>
              <div className='d-flex justify-content-center align-items-center gap-3 text-white-50'>
                <img src='assets/images/users/user1.png' alt='users' className='w-32-px h-32-px rounded-circle' />
                  <span>✅ Trusted by 500+ hiring teams</span>
              </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
 
      {/* How it works */}
      <section id='how' className='container pb-56'>
        <HowItWorksSection />
      </section>


      {/* What We Offer Section */}
      <WhatWeOfferSection />


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

    {/* Scrolled Testimonials */}

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
                  <div className="text-white">{testimonial.role} at {testimonial.company}</div>
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
      <section className='py-5'>
        <ScrollAnimatedCard delay={0} isVisible={true}>
          <div 
            className='container card border shadow-none p-56 about-us-container'
            style={{
              animation: `fadeInUp 0.8s ease-out 0ms forwards`,
              opacity: 0,
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div className='row g-5 align-items-center'>
              <div className='col-12 col-lg-6'>
                <div className='row'>
                  <div className='col-6 text-end'>
                    <ScrollAnimatedCard delay={200} isVisible={true}>
                      <div 
                        className='about-image-container'
                        style={{
                          animation: `scaleIn 0.8s ease-out 200ms forwards`,
                          opacity: 0,
                          transition: 'all 0.4s ease'
                        }}
                        onMouseEnter={(e) => {
                          const img = e.currentTarget.querySelector('.about-image');
                          if (img) {
                            img.style.transform = 'scale(1.05) rotate(2deg)';
                            img.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.2)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          const img = e.currentTarget.querySelector('.about-image');
                          if (img) {
                            img.style.transform = 'scale(1) rotate(0deg)';
                            img.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
                          }
                        }}
                      >
                        <img 
                          className='rounded-3 shadow-sm about-image' 
                          src="assets\images\landing1.png"
                          style={{
                            width:"250px",
                            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                            transform: 'scale(1)',
                            borderRadius: '12px'
                          }} 
                          alt="Office team working"
                        />
                        <div 
                          className='d-flex align-items-center justify-content-end mt-3 about-stat'
                          style={{
                            animation: `fadeInUp 0.6s ease-out 400ms forwards`,
                            opacity: 0
                          }}
                        >
                          <div className='d-inline-block pe-2'>
                            <h4 className='line-height-100 fw-normal mb-0'>+</h4>
                            <p className='text-white small mb-0'>Professionals</p>
                          </div>
                          <div className='d-inline-block'>
                            <h1 
                              className='fw-medium display-4 letter-spacing-1 text-primary about-number'
                              style={{
                                transition: 'all 0.3s ease',
                                transform: 'scale(1)'
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'scale(1.1)';
                                e.currentTarget.style.color = '#EC4899';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'scale(1)';
                                e.currentTarget.style.color = '#3B82F6';
                              }}
                            >35</h1>
                          </div>
                        </div>
                      </div>
                    </ScrollAnimatedCard>
                  </div>
                  <div className='col-6'>
                    <ScrollAnimatedCard delay={300} isVisible={true}>
                      <div 
                        className='about-stat-container'
                        style={{
                          animation: `fadeInUp 0.6s ease-out 300ms forwards`,
                          opacity: 0
                        }}
                      >
                        <div className='d-flex align-items-center mb-3'>
                          <div className='d-inline-block'>
                            <h1 
                              className='fw-medium display-4 letter-spacing-1 text-primary about-number'
                              style={{
                                transition: 'all 0.3s ease',
                                transform: 'scale(1)'
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'scale(1.1)';
                                e.currentTarget.style.color = '#EC4899';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'scale(1)';
                                e.currentTarget.style.color = '#3B82F6';
                              }}
                            >14</h1>
                          </div>
                          <div className='d-inline-block ps-2'>
                            <h4 className='line-height-100 fw-normal mb-0'>+</h4>
                            <p className='text-white small mb-0'>Years of Experience</p>
                          </div>
                        </div>
                        <div 
                          className='about-image-container'
                          style={{
                            transition: 'all 0.4s ease'
                          }}
                          onMouseEnter={(e) => {
                            const img = e.currentTarget.querySelector('.about-image');
                            if (img) {
                              img.style.transform = 'scale(1.05) rotate(-2deg)';
                              img.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.2)';
                            }
                          }}
                          onMouseLeave={(e) => {
                            const img = e.currentTarget.querySelector('.about-image');
                            if (img) {
                              img.style.transform = 'scale(1) rotate(0deg)';
                              img.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
                            }
                          }}
                        >
                          <img 
                            className='rounded-3 shadow-sm about-image' 
                            src='assets\images\landing2.png' 
                            style={{
                              width:"250px",
                              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                              transform: 'scale(1)',
                              borderRadius: '12px'
                            }} 
                            alt="Team collaboration"
                          />
                        </div>
                      </div>
                    </ScrollAnimatedCard>
                  </div>
                </div>
              </div>
              <div className='col-12 col-lg-6'>
                <ScrollAnimatedCard delay={500} isVisible={true}>
                  <div 
                    className='about-content'
                    style={{
                      animation: `fadeInUp 0.8s ease-out 500ms forwards`,
                      opacity: 0
                    }}
                  >
                    <h2 
                      className='display-6 fw-normal mb-3 about-title'
                      style={{
                        transition: 'all 0.3s ease',
                        transform: 'translateY(0)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-5px)';
                        e.currentTarget.style.color = '#3B82F6';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.color = 'inherit';
                      }}
                    >
                      Satisfied customer is the best business strategy of all
                    </h2>
                    <p 
                      className='text-secondary-light mb-4 about-description'
                      style={{
                        transition: 'all 0.3s ease',
                        animation: `fadeInUp 0.6s ease-out 700ms forwards`,
                        opacity: 0
                      }}
                    >
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae modi dicta ea autem harum commodi quo obcaecati accusantium
                    </p>
                    <button 
                      type="button" 
                      className='btn btn-primary px-4 py-2 about-button'
                      style={{
                        background: 'linear-gradient(90deg, #3B82F6 0%, #EC4899 100%)',
                        border: 'none',
                        borderRadius: '25px',
                        color: 'white',
                        fontWeight: 'bold',
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        transform: 'translateY(0)',
                        boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)',
                        animation: `fadeInUp 0.8s ease-out 900ms forwards`,
                        opacity: 0
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)';
                        e.currentTarget.style.boxShadow = '0 8px 25px rgba(59, 130, 246, 0.4)';
                        e.currentTarget.style.background = 'linear-gradient(90deg, #EC4899 0%, #3B82F6 100%)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0) scale(1)';
                        e.currentTarget.style.boxShadow = '0 4px 15px rgba(59, 130, 246, 0.3)';
                        e.currentTarget.style.background = 'linear-gradient(90deg, #3B82F6 0%, #EC4899 100%)';
                      }}
                    >
                      LEARN MORE
                    </button>
                  </div>
                </ScrollAnimatedCard>
              </div>
            </div>
          </div>
        </ScrollAnimatedCard>
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
              <ScrollAnimatedCard delay={index * 200} isVisible={true}>
                <div 
                  className='card h-100 border-0 shadow-lg position-relative pricing-card' 
                  style={{ 
                    borderRadius: '20px',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    transform: 'translateY(0)',
                    animation: `fadeInUp 0.8s ease-out ${index * 200}ms forwards`,
                    opacity: 0
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
                  }}
                >
                  {/* Colored Tab */}
                  <div 
                    className='position-absolute top-0 start-0 px-3 py-2 text-white fw-bold pricing-tab'
                    style={{ 
                      backgroundColor: plan.color,
                      borderRadius: '20px 0 20px 0',
                      fontSize: '14px',
                      zIndex: 1,
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {plan.name}
                  </div>
                  
                  <div className='card-body p-4 pt-5'>
                    {/* Price */}
                    <div className='text-center mb-4'>
                      <h3 
                        className='display-6 fw-bold text-dark mb-0 pricing-price'
                        style={{ 
                          transition: 'all 0.3s ease',
                          transform: 'scale(1)'
                        }}
                      >
                        {isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                        <span className='fs-6 text-black'>/{isYearly ? 'year' : 'mon'}</span>
                      </h3>
                    </div>

                    {/* Features */}
                    <div className='mb-4'>
                      {plan.features.map((feature, featureIndex) => (
                        <div 
                          key={featureIndex} 
                          className='d-flex align-items-center mb-3 pricing-feature'
                          style={{
                            transition: 'all 0.3s ease',
                            transform: 'translateX(0)',
                            animation: `fadeInUp 0.6s ease-out ${(index * 200) + (featureIndex * 100)}ms forwards`,
                            opacity: 0
                          }}
                        >
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
                    <div className='text-center'>
                      <button 
                        className='btn btn-primary w-100 pricing-btn'
                        style={{
                          background: `linear-gradient(135deg, ${plan.color} 0%, ${plan.color}dd 100%)`,
                          border: 'none',
                          borderRadius: '12px',
                          padding: '12px 24px',
                          fontWeight: '600',
                          transition: 'all 0.3s ease',
                          transform: 'translateY(0)',
                          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                          animation: `fadeInUp 0.8s ease-out ${(index * 200) + 400}ms forwards`,
                          opacity: 0
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateY(-2px)';
                          e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.2)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
                        }}
                      >
                        Choose Plan
                      </button>
                    </div>
                  </div>
                </div>
              </ScrollAnimatedCard>
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
            <ScrollAnimatedCard delay={300} isVisible={true}>
              <div 
                className='position-relative rounded-3 overflow-hidden shadow-lg faq-image-container'
                style={{
                  animation: `fadeInUp 0.8s ease-out 300ms forwards`,
                  opacity: 0,
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.2)';
                  const img = e.currentTarget.querySelector('.faq-image');
                  if (img) {
                    img.style.transform = 'scale(1.1) rotate(2deg)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
                  const img = e.currentTarget.querySelector('.faq-image');
                  if (img) {
                    img.style.transform = 'scale(1) rotate(0deg)';
                  }
                }}
              >
                <div className='bg-light' style={{ aspectRatio: '16/9', minHeight: '300px' }}>
                  
                  {/* Placeholder for video thumbnail */}
                  <div className='w-100 h-100 d-flex align-items-center justify-content-center bg-gradient position-relative' 
                       style={{ 
                         background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                         overflow: 'hidden'
                       }}>
                    
                    {/* Animated background elements */}
                    <div 
                      className='position-absolute'
                      style={{
                        width: '200px',
                        height: '200px',
                        background: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '50%',
                        top: '-50px',
                        right: '-50px',
                        animation: 'float 6s ease-in-out infinite'
                      }}
                    ></div>
                    <div 
                      className='position-absolute'
                      style={{
                        width: '150px',
                        height: '150px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        borderRadius: '50%',
                        bottom: '-30px',
                        left: '-30px',
                        animation: 'float 8s ease-in-out infinite reverse'
                      }}
                    ></div>
                    
                    <img 
                      src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop" 
                      className='w-100 faq-image position-relative' 
                      alt='Video Placeholder'
                      style={{
                        transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                        transform: 'scale(1)',
                        filter: 'brightness(1.1) contrast(1.1)',
                        borderRadius: '12px'
                      }}
                    />
                  </div>
                </div>
              </div>
            </ScrollAnimatedCard>
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
      <footer className='py-5 border-top text-white' style={{ background: '#1a1a1a' }}>
        <div className='container'>
          <div className='row g-5 mb-5'>
            {/* Logo and Description */}
            <div className='col-lg-3 col-md-6'>
              <div className='mb-4'>
                <h5 className='fw-bold text-white mb-3'>
                  <span style={{ color: '#3B82F6' }}>AI</span> Recruitment
                </h5>
                <p className='text-white small lh-lg'>
                  Automate repetitive recruiting tasks and focus on great conversations. Our recruiter dashboard gives you full visibility from job posting to offer.
                </p>
              </div>
              <div className='d-flex gap-2'>
                <input
                  type='email'
                  className='form-control form-control-sm'
                  placeholder='Enter your email'
                  style={{ backgroundColor: 'rgba(255,255,255,0.1)', border: 'none', color: 'white' }}
                />
                <button className='btn btn-primary btn-sm'>Subscribe</button>
              </div>
            </div>

            {/* Discover */}
            <div className='col-lg-2 col-md-6'>
              <h6 className='fw-bold text-white mb-3'>Discover</h6>
              <ul className='list-unstyled'>
                <li className='mb-2'><a href='#' className='text-white text-decoration-none small'>Products</a></li>
                <li className='mb-2'><a href='#' className='text-white text-decoration-none small'>Trials</a></li>
                <li className='mb-2'><a href='#' className='text-white text-decoration-none small'>Services</a></li>
                <li className='mb-2'><a href='#' className='text-white text-decoration-none small'>Industries</a></li>
                <li className='mb-2'><a href='#' className='text-white text-decoration-none small'>Case studies</a></li>
                <li className='mb-2'><a href='#' className='text-white text-decoration-none small'>Financing</a></li>
              </ul>
          </div>

            {/* Connect with us */}
            <div className='col-lg-2 col-md-6'>
              <h6 className='fw-bold text-white mb-3'>Connect with us</h6>
              <ul className='list-unstyled'>
                <li className='mb-2'><a href='#' className='text-white text-decoration-none small'>Engage Consulting</a></li>
                <li className='mb-2'><a href='#' className='text-white text-decoration-none small'>Support</a></li>
                <li className='mb-2'><a href='#' className='text-white text-decoration-none small'>Find a partner</a></li>
                <li className='mb-2'><a href='#' className='text-white text-decoration-none small'>Developers</a></li>
                <li className='mb-2'><a href='#' className='text-white text-decoration-none small'>Business Partners</a></li>
              </ul>
          </div>

            {/* Learn about */}
            <div className='col-lg-2 col-md-6'>
              <h6 className='fw-bold text-white mb-3'>Learn about</h6>
              <ul className='list-unstyled'>
                <li className='mb-2'><a href='#' className='text-white text-decoration-none small'>Artificial Intelligence</a></li>
                <li className='mb-2'><a href='#' className='text-white text-decoration-none small'>Machine learning</a></li>
                <li className='mb-2'><a href='#' className='text-white text-decoration-none small'>Generative AI</a></li>
                <li className='mb-2'><a href='#' className='text-white text-decoration-none small'>Responsible AI</a></li>
                <li className='mb-2'><a href='#' className='text-white text-decoration-none small'>Cybersecurity</a></li>
                <li className='mb-2'><a href='#' className='text-white text-decoration-none small'>Business analytics</a></li>
                <li className='mb-2'><a href='#' className='text-white text-decoration-none small'>Quantum computing</a></li>
              </ul>
          </div>

            {/* About */}
            <div className='col-lg-2 col-md-6'>
              <h6 className='fw-bold text-white mb-3'>About</h6>
              <ul className='list-unstyled'>
                <li className='mb-2'><a href='#' className='text-white text-decoration-none small'>Careers</a></li>
                <li className='mb-2'><a href='#' className='text-white text-decoration-none small'>Latest news</a></li>
                <li className='mb-2'><a href='#' className='text-white text-decoration-none small'>Investor relations</a></li>
                <li className='mb-2'><a href='#' className='text-white text-decoration-none small'>Corporate responsibility</a></li>
                <li className='mb-2'><a href='#' className='text-white text-decoration-none small'>About us</a></li>
              </ul>
            </div>
 
            {/* Follow */}
            <div className='col-lg-1 col-md-6'>
              <h6 className='fw-bold text-white mb-3'>Follow</h6>
              <ul className='list-unstyled'>
                <li className='mb-2'><a href='#' className='text-white text-decoration-none small'>LinkedIn</a></li>
                <li className='mb-2'><a href='#' className='text-white text-decoration-none small'>X</a></li>
                <li className='mb-2'><a href='#' className='text-white text-decoration-none small'>Instagram</a></li>
                <li className='mb-2'><a href='#' className='text-white text-decoration-none small'>Subscription Center</a></li>
              </ul>
              </div>
            </div>

          {/* Footer Bottom */}
          <div className='border-top pt-4' style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
            <div className='row align-items-center'>
              <div className='col-md-6'>
                <p className='text-white small mb-0'>© 2025 AI Recruitment. All Rights Reserved</p>
              </div>
              <div className='col-md-6 d-flex justify-content-md-end gap-3 mt-3 mt-md-0'>
                <a href='#' className='text-white text-decoration-none small'>Contact</a>
                <a href='#' className='text-white text-decoration-none small'>Privacy</a>
                <a href='#' className='text-white text-decoration-none small'>Terms of use</a>
                <a href='#' className='text-white text-decoration-none small'>Accessibility</a>
                <a href='#' className='text-white text-decoration-none small'>Cookie Preferences</a>
            </div>
          </div>
        </div>
        </div>
      </footer>
    </div>
  );
};
 
export default Landing;