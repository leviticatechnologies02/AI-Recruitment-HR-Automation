import React, { useEffect, useState } from 'react';
import { Star } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { getUserRole } from '../utils/auth';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "remixicon/fonts/remixicon.css";
import {
 
  IconAutomation,
  IconBrandAdobeIllustrator,
  IconBrandCodesandbox,
  IconChartBarPopular,
  IconRobot,
  IconShieldCheck,
} from '@tabler/icons-react';
 
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

// Custom Hook for Scroll-triggered Animations that reset
const useIntersectionObserver = (resetOnExit = true) => {
  const ref = React.useRef(null);
  const [isVisible, setIsVisible] = React.useState(false);
  const keyRef = React.useRef(0);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else if (resetOnExit) {
          setIsVisible(false);
          keyRef.current += 1; // Force re-render by changing key
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
  }, [resetOnExit]);

  return [ref, isVisible, keyRef.current];
};

// Scroll-triggered Animated Card Component
const ScrollAnimatedCard = ({ children, delay = 0, isVisible }) => {
  const [animationKey, setAnimationKey] = React.useState(0);
  const [shouldAnimate, setShouldAnimate] = React.useState(false);

  React.useEffect(() => {
    if (isVisible) {
      // Reset and animate
      setShouldAnimate(false);
      setAnimationKey(prev => prev + 1);
      const timer = setTimeout(() => {
        setShouldAnimate(true);
      }, 50);
      return () => clearTimeout(timer);
    } else {
      setShouldAnimate(false);
    }
  }, [isVisible]);

  return (
    <div
      key={`animate-${animationKey}`}
      style={{
        animation: shouldAnimate ? `fadeInUp 0.8s ease-out ${delay}ms forwards` : 'none',
        animationFillMode: 'both',
        opacity: 0,
        transform: 'translateY(30px)'
      }}
    >
      {children}
    </div>
  );
};

// How It Works Section Component
const HowItWorksSection = () => {
  const [ref, isVisible] = useIntersectionObserver(true);

  const steps = [
    { num: 1, title: '📝 Create Job', icon: '1', color: 'bg-primary', delay: 0 },
    { num: 2, title: '👥 Import Candidates', icon: '2', color: 'bg-success', delay: 150 },
    { num: 3, title: '📊 Track Pipeline', icon: '3', color: 'bg-warning', delay: 300 },
    { num: 4, title: '🎯 Hire & Report', icon: '4', color: 'bg-pink', delay: 450 }
  ];

  return (
    <div ref={ref} className='card border shadow-none session-block'>
      <div className='card-body p-3 p-md-5'>
        <div className='row g-4 align-items-center'>
          {/* Left Section Title */}
          <div className='col-12'>
            <ScrollAnimatedCard delay={0} isVisible={isVisible}>
              <div className='text-center mb-4 mb-md-0'>
                <h3 className='display-6 display-md-5 fw-bold mb-3 text-primary'>How it works</h3>
                <p className='mt-2 mb-2 px-2 px-md-5 mx-auto' style={{ maxWidth: '800px' }}>
                  Create a job, import or invite candidates, manage pipeline stages, and track performance with analytics.
                </p>
              </div>
            </ScrollAnimatedCard>
          </div>

          {/* Right Section - Cards */}
          <div className='col-12'>
            <div className='row row-cols-2 row-cols-md-4 g-3'>
              {steps.map((step, idx) => (
                <div key={idx} className='col'>
                  <ScrollAnimatedCard delay={step.delay} isVisible={isVisible}>
                    <div className='border rounded p-3 p-md-4 text-center h-100 session-block' style={{
                      borderRadius: '12px',
                      transition: 'all 0.3s ease'
                    }}>
                      <div className={`badge ${step.color} text-white border mb-2 mb-md-3`} style={{
                        fontSize: '0.875rem',
                        padding: '0.375rem 0.5rem'
                      }}>
                        {step.num}
                      </div>
                      <div className='fw-medium small' style={{ marginTop: '0.5rem', fontSize: '0.875rem' }}>{step.title}</div>
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

// Client Features Section with Animations and Hover Effects
const ClientFeaturesSection = ({ clients }) => {
  const [ref, isVisible] = useIntersectionObserver(true);

  return (
    <div className='container card border shadow-none p-3 p-md-5' ref={ref}>
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 d-flex align-items-center justify-content-center p-3 p-md-5">
        <div className="w-100">
          <div className="d-flex flex-column flex-md-row align-items-center justify-content-between gap-4">
            {/* Top Section - Title and Description */}
            <ScrollAnimatedCard delay={0} isVisible={isVisible}>
              <div className="text-center text-md-start" style={{ maxWidth: '500px' }}>
                <div
                  style={{
                    overflow: 'hidden',
                    borderRadius: '12px',
                    transition: 'all 0.4s ease',
                    animation: `fadeInUp 0.8s ease-out 0ms forwards`,
                    opacity: 0
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <img 
                    src="/assets/images/gallery/gallery-img13.png" 
                    alt="Powerful Features"
                    style={{
                      transition: 'all 0.4s ease',
                      maxWidth: '100%',
                      height: 'auto'
                    }}
                  />
                </div>
                <h4 
                  className="text-3xl text-md-4xl fw-bold text-black mb-3 mt-3"
                  style={{
                    animation: `fadeInUp 0.8s ease-out 200ms forwards`,
                    opacity: 0,
                    transition: 'color 0.3s ease'
                  }}
                >
                  Powerful Features for Modern Hiring...
                </h4>
                <p 
                  className="text-base text-md-lg text-dark mb-3"
                  style={{
                    animation: `fadeInUp 0.8s ease-out 400ms forwards`,
                    opacity: 0,
                    transition: 'color 0.3s ease'
                  }}
                >
                  Our AI solutions have driven innovation, streamlined operations, and fueled exceptional business growth.
                </p>
                <button 
                  className="btn btn-primary"
                  style={{
                    animation: `fadeInUp 0.8s ease-out 600ms forwards`,
                    opacity: 0,
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(59, 130, 246, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  Become a client
                </button>
              </div>
            </ScrollAnimatedCard>

            {/* Client Logos Grid */}
            <div className="d-flex flex-column gap-3 w-100" style={{ maxWidth: '500px' }}>
              {clients.map((client, index) => (
                <ScrollAnimatedCard key={index} delay={index * 100 + 200} isVisible={isVisible}>
                  <div
                    className="d-flex align-items-center justify-content-start bg-white rounded p-3 shadow-sm border border-gray-200 w-100 client-card"
                    style={{
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      cursor: 'pointer',
                      animation: `fadeInUp 0.8s ease-out ${(index * 100) + 200}ms forwards`,
                      opacity: 0
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateX(10px) scale(1.02)';
                      e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.15)';
                      e.currentTarget.style.borderColor = '#3B82F6';
                      e.currentTarget.style.backgroundColor = '#f8fafc';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateX(0) scale(1)';
                      e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
                      e.currentTarget.style.borderColor = '#e5e7eb';
                      e.currentTarget.style.backgroundColor = '#ffffff';
                    }}
                  >
                    <div 
                      className="rounded-circle bg-black d-flex align-items-center justify-content-center me-3" 
                      style={{ 
                        width: '50px', 
                        height: '50px', 
                        flexShrink: 0,
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.15) rotate(5deg)';
                        e.currentTarget.style.backgroundColor = '#3B82F6';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
                        e.currentTarget.style.backgroundColor = '#000000';
                      }}
                    >
                      {client.icon}
                    </div>
                    <h3 
                      className="h6 fw-bold text-gray-900 mb-0"
                      style={{
                        transition: 'color 0.3s ease'
                      }}
                    >
                      {client.name}
                    </h3>
                  </div>
                </ScrollAnimatedCard>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Testimonial Section Component with Animations and Hover Effects
const TestimonialSection = ({ testimonials, activeTestimonial, setActiveTestimonial }) => {
  const [ref, isVisible] = useIntersectionObserver(true);

  return (
    <div className='container'>
      <div className="mx-auto px-3">
        {/* Section Header */}
        <ScrollAnimatedCard delay={0} isVisible={isVisible}>
          <div className="text-center mb-4 mb-md-5 mt-2">
            <h3 className='display-6 display-md-5 fw-bold mb-3 text-primary'>
              Loved by HR Teams Worldwide
            </h3>
            <p className="text-base text-md-xl text-success">
              See what our customers have to say
            </p>
          </div>
        </ScrollAnimatedCard>

        {/* Testimonial Cards */}
        <div ref={ref} className="position-relative" style={{ overflow: "hidden" }}>
          <div
            className="d-flex transition-transform"
            style={{
              transform: `translateX(-${activeTestimonial * 100}%)`,
              transition: 'transform 0.5s ease-in-out'
            }}
          >
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="d-flex justify-content-center px-2 px-md-4" style={{ minWidth: "100%" }}>
                <ScrollAnimatedCard delay={idx * 100} isVisible={isVisible}>
                  <div 
                    className="bg-white rounded-3 shadow p-3 p-md-4 w-100 testimonial-card" 
                    style={{ 
                      maxWidth: "720px",
                      transition: 'all 0.3s ease',
                      transform: 'translateY(0)',
                      animation: `fadeInUp 0.8s ease-out ${idx * 100}ms forwards`,
                      opacity: 0
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
                      e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
                      e.currentTarget.style.border = '2px solid #3B82F6';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0) scale(1)';
                      e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
                      e.currentTarget.style.border = 'none';
                    }}
                  >
                    {/* Rating Stars (top-left) */}
                    <div 
                      className="d-flex mb-3"
                      style={{
                        transition: 'all 0.3s ease'
                      }}
                    >
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <div key={i} style={{ transition: 'all 0.3s ease' }}>
                          <Star size={18} color="#FBBF24" fill="#FBBF24" className="me-1" />
                        </div>
                      ))}
                    </div>

                    {/* Feedback */}
                    <p 
                      className="fs-6 fs-md-5 mb-4 fw-medium"
                      style={{
                        transition: 'color 0.3s ease'
                      }}
                    >
                      "{testimonial.feedback}"
                    </p>

                    {/* Author Info */}
                    <div 
                      className="d-flex align-items-center"
                      style={{
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <div
                        className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold me-3"
                        style={{ 
                          width: "56px", 
                          height: "56px", 
                          background: "linear-gradient(135deg, #3B82F6 0%, #A855F7 100%)",
                          transition: 'all 0.3s ease',
                          animation: 'scaleIn 0.8s ease-out forwards'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'scale(1.1) rotate(5deg)';
                          e.currentTarget.style.background = "linear-gradient(135deg, #EC4899 0%, #F59E0B 100%)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
                          e.currentTarget.style.background = "linear-gradient(135deg, #3B82F6 0%, #A855F7 100%)";
                        }}
                      >
                        {testimonial.photo}
                      </div>
                      <div>
                        <div className="fw-bold text-dark">{testimonial.name}</div>
                        <div className="text-muted small">{testimonial.role} at {testimonial.company}</div>
                      </div>
                    </div>
                  </div>
                </ScrollAnimatedCard>
              </div>
            ))}
          </div>

          {/* Dots Navigation */}
          <ScrollAnimatedCard delay={400} isVisible={isVisible}>
            <div className="d-flex justify-content-center mt-4 gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTestimonial(idx)}
                  className={`rounded-pill transition-all ${idx === activeTestimonial
                      ? "bg-primary"
                      : "bg-light"
                    }`}
                  style={{ 
                    width: idx === activeTestimonial ? '32px' : '12px', 
                    height: '12px', 
                    border: 'none',
                    transition: 'all 0.3s ease',
                    animation: `fadeInUp 0.8s ease-out ${(idx * 100) + 400}ms forwards`,
                    opacity: 0
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.2)';
                    e.currentTarget.style.backgroundColor = '#3B82F6';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                />
              ))}
            </div>
          </ScrollAnimatedCard>
        </div>
      </div>
    </div>
  );
};

// What We Offer Section Component with Row-by-Row Scroll Animations
const WhatWeOfferSection = () => {
  const [ref, isVisible] = useIntersectionObserver(true);

  return (
    <section ref={ref} className='py-3 py-md-5'>
      <div className='container px-3'>
        {/* Section Header */}
        <ScrollAnimatedCard delay={0} isVisible={isVisible}>
          <div className='text-center mb-4 mb-md-5'>
            <span className='badge bg-primary-subtle text-primary mb-3 px-3 py-2'>Our Services</span>
            <h3 className='display-6 display-md-5 fw-bold mb-3'>
              <span style={{ color: '#3B82F6' }}>What</span> <span style={{ color: '#EC4899' }}>We</span> <span style={{ color: '#3B82F6' }}>Offer</span>
            </h3>
            <p className='lead text-success mx-auto px-2' style={{ maxWidth: '600px' }}>
              At CloudFlow, we prioritize innovation, agility, and customer-centricity. Our solutions are designed to provide scalable, secure, and efficient AI services tailored to your business needs.
            </p>
          </div>
        </ScrollAnimatedCard>

        {/* Service Cards Grid - Original Layout with Row-by-Row Animation */}
        <div className='row g-3 g-md-4'>
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
          <div className='col-12 col-lg-7 col-md-6'>
            <ScrollAnimatedCard delay={100} isVisible={isVisible}>
              <div className='card border-0 shadow-lg h-100 service-card service-card-purple' style={{ backgroundColor: '#f0f4ff' }}>
                <div className='card-body p-3 p-md-5'>
                  <div className='d-flex align-items-start justify-content-between mb-4'>
                    <div className='flex-grow-1'>
                      <div className='rounded-3 d-inline-block p-3 p-md-4 mb-3 mb-md-4 rounded-circle' style={{ backgroundColor: '#9f2222ff' }}>
                        {/* <i className='ri-layout-grid-fill text-white fs-4'></i> */}
                        <IconBrandAdobeIllustrator size={28} className="d-md-none" />
                        <IconBrandAdobeIllustrator size={36} color="white" className="d-none d-md-block" />
                      </div>
                      <h5 className='fw-bold mb-3 fs-6' style={{ color: "#EC4899" }}>Custom AI Agent Development</h5>
                      <p className='text-muted mb-0 small' style={{ fontSize: '14px', lineHeight: '1.6' }}>Build intelligent agents tailored to your business needs with advanced machine learning capabilities and cutting-edge AI technologies.</p>
                    </div>
                  </div>
                  <div className='d-flex flex-column flex-md-row justify-content-between align-items-start mt-4 mt-md-5 pt-3 pt-md-4 border-top gap-3'>
                    <div className='d-flex gap-4'>
                      <div>
                        <p className='text-muted small mb-1'>Success Rate</p>
                        <h6 className='fw-bold text-primary mb-0'>98%</h6>
                      </div>
                      <div>
                        <p className='text-muted small mb-1'>Delivery Time</p>
                        <h6 className='fw-bold text-primary mb-0'>4-6 weeks</h6>
                      </div>
                    </div>
                    <div className='d-flex gap-2 flex-wrap'>
                      <span className='badge bg-primary-subtle text-primary small'>Custom Architecture</span>
                      <span className='badge bg-primary-subtle text-primary small'>Scalable Solutions</span>
                      <span className='badge bg-primary-subtle text-primary small'>24/7 Support</span>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollAnimatedCard>
          </div>

          {/* Card 2 - Small with Most Popular Badge */}
          <div className='col-12 col-lg-5 col-md-6'>
            <ScrollAnimatedCard delay={200} isVisible={isVisible}>
              <div className='position-relative h-100'>
              
                <div className='card border-0 shadow-lg h-100 service-card service-card-cyan' style={{ backgroundColor: '#f0fdf4', marginTop: '15px' }}>
                  <div className='card-body p-3 p-md-4'>
                      <div className='d-flex align-items-start justify-content-between mb-3'>
                      <div className='flex-grow-1'>
                        <div className='rounded-2 d-inline-block p-2 p-md-3 mb-3 rounded-circle' style={{ backgroundColor: '#10B981' }}>
                          <IconAutomation size={28} className="d-md-none" />
                          <IconAutomation size={36} color="white" className="d-none d-md-block" />
                        </div>
                        <h5 className='fw-bold mb-3 text-primary fs-6'>Workflow Integration & Automation</h5>
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
          <div className='col-12 col-lg-5 col-md-6'>
            <ScrollAnimatedCard delay={300} isVisible={isVisible}>
              <div className='card border-0 shadow-lg h-100 service-card service-card-orange' style={{ backgroundColor: '#fffbf0' }}>
                <div className='card-body p-3 p-md-4'>
                  <div className='d-flex align-items-start justify-content-between mb-3'>
                    <div className='flex-grow-1'>
                      <div className='rounded-2 d-inline-block p-2 p-md-3 mb-3 rounded-circle' style={{ backgroundColor: '#F97316' }}>
                        <IconBrandCodesandbox size={28} className="d-md-none" />
                        <IconBrandCodesandbox size={36} color="white" className="d-none d-md-block" />
                      </div>
                      <h5 className='fw-bold text-success mb-2 fs-6'>MVP's, Prototypes, and Pilot Projects</h5>
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
          <div className='col-12 col-lg-7 col-md-6'>
            <ScrollAnimatedCard delay={400} isVisible={isVisible}>
              <div className='position-relative h-100'>
               
                <div className='card border-0 shadow-lg h-100 service-card service-card-pink' style={{ backgroundColor: '#f5f0ff' }}>
                  <div className='card-body p-3 p-md-5'>
                    <div className='d-flex align-items-start justify-content-between mb-4'>
                      <div className='flex-grow-1'>
                        <div className='rounded-3 d-inline-block p-3 p-md-4 mb-3 mb-md-4 rounded-circle' style={{ backgroundColor: '#EC4899' }}>
                          <IconRobot size={28} className="d-md-none" />
                          <IconRobot size={36} color="white" className="d-none d-md-block" />
                        </div>
                        <h5 className='fw-bold text-danger mb-3 fs-6'>Conversational AI & Virtual Assistants</h5>
                        <p className='text-muted mb-0' style={{ fontSize: '14px', lineHeight: '1.6' }}>Deploy intelligent chatbots and voice assistants to enhance customer experience and provide 24/7 support.</p>
                      </div>
                    </div>
                    <div className='d-flex flex-column flex-md-row justify-content-between align-items-start mt-4 mt-md-5 pt-3 pt-md-4 border-top gap-3'>
                      <div className='d-flex gap-4'>
                        <div>
                          <p className='text-muted small mb-1'>Response Rate</p>
                          <h6 className='fw-bold text-primary mb-0'>95%</h6>
                        </div>
                        <div>
                          <p className='text-muted small mb-1'>Languages</p>
                          <h6 className='fw-bold text-primary mb-0'>50+</h6>
                        </div>
                        <div>
                          <p className='text-muted small mb-1'>Availability</p>
                          <h6 className='fw-bold text-primary mb-0'>24/7</h6>
                        </div>
                      </div>
                      <div className='d-flex gap-2 flex-wrap'>
                        <span className='badge bg-danger-subtle text-danger small'>Multi-language</span>
                        <span className='badge bg-danger-subtle text-danger small'>Context Aware</span>
                        <span className='badge bg-danger-subtle text-danger small'>Learning Capable</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollAnimatedCard>
          </div>

          {/* Card 5 */}
          <div className='col-12 col-lg-6 col-md-6'>
            <ScrollAnimatedCard delay={500} isVisible={isVisible}>
              <div className='card border-0 shadow-lg h-100 service-card service-card-blue' style={{ backgroundColor: '#f0f9ff' }}>
                <div className='card-body p-3 p-md-4'>
                  <div className='d-flex align-items-start justify-content-between mb-3'>
                    <div className='flex-grow-1'>
                      <div className='rounded-2 d-inline-block p-2 p-md-3 mb-3 rounded-circle' style={{ backgroundColor: '#3B82F6' }}>
                        <IconChartBarPopular size={28} className="d-md-none" />
                        <IconChartBarPopular size={36} color="white" className="d-none d-md-block" />
                      </div>
                      <h5 className='fw-bold text-warning mb-2 fs-6'>Analytics Dashboards & Insights</h5>
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
          <div className='col-12 col-lg-6 col-md-6'>
            <ScrollAnimatedCard delay={600} isVisible={isVisible}>
              <div className='card border-0 shadow-lg h-100 service-card service-card-red' style={{ backgroundColor: '#fef2f2' }}>
                <div className='card-body p-3 p-md-4'>
                  <div className='d-flex align-items-start justify-content-between mb-3'>
                    <div className='flex-grow-1'>
                      <div className='rounded-2 d-inline-block p-2 p-md-3 mb-3 rounded-circle' style={{ backgroundColor: '#DC2626' }}>
                        <IconShieldCheck size={28} className="d-md-none" />
                        <IconShieldCheck size={36} color="white" className="d-none d-md-block" />
                      </div>
                      <h5 className='fw-bold text-secondary mb-2 fs-6'>Enterprise Grade Security & Compliance</h5>
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
      monthlyPrice: '₹0',
      yearlyPrice: '₹0',
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
      monthlyPrice: '₹799',
      yearlyPrice: '₹7990',
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
      monthlyPrice: '₹1,199',
      yearlyPrice: '₹1,1990',
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
          <rect x="8" y="8" width="4" height="24" fill="#0dd72bff" />
          <rect x="14" y="12" width="4" height="20" fill="#05ed4bff" />
          <rect x="20" y="6" width="4" height="26" fill="#13ef4aff" />
          <rect x="26" y="14" width="4" height="18" fill="#10ec43ff" />
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
      <header className='py-3 py-md-3 px-3 px-md-5 bg-base border-bottom bg-light sticky-top top-0'>
        <div className='container-fluid'>
          <div className='d-flex align-items-center justify-content-between flex-wrap'>
            <div className='d-flex align-items-center gap-2 mb-2 mb-md-0'>
              <img src='assets/images/logo-icon.png.svg' alt='logo' className='w-32-px h-32-px' />
              <span className='fw-semibold'>AI Recruitment</span>
            </div>
            <nav className='d-none d-md-flex align-items-center gap-3'>
              <a href='#features' className='nav-link text-success'>Features</a>
              <a href='#how' className='nav-link text-success'>How it works</a>
              <Link to='/pricing' className='nav-link text-success'>Pricing</Link>
            </nav>
            <div className='d-flex align-items-center gap-2 flex-wrap'>
              <Link to='/candidate/login' className='btn btn-outline-success btn-sm'>Candidate</Link>
              <Link to='/login' className='btn btn-outline-primary btn-sm d-none d-sm-inline-block'>Sign In</Link>
              <Link to='/signup' className='btn btn-primary btn-sm'>Sign Up</Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section with Staggered Animations */}
      <section
        className='py-5 px-3 px-md-0'
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
                <h1 className='display-5 display-md-4 fw-bold mb-4 px-3'>Source, screen, and hire faster with AI</h1>
              </AnimatedSection>

              {/* Paragraph - Appears Third (800ms) */}
              <AnimatedSection delay={800}>
                <p className='lead mb-5 px-3'>
                  Automate repetitive recruiting tasks and focus on great conversations.
                  Our recruiter dashboard gives you full visibility from job posting to offer.
                </p>
              </AnimatedSection>

              {/* Buttons - Appears Fourth (1200ms) */}
              <AnimatedSection delay={1200}>
                <div className='d-flex flex-column flex-sm-row justify-content-center gap-3 mb-5 px-3'>
                  <Link to='/login' className='btn btn-primary btn-sm btn-md-lg px-4 btn-hover-lift'> Get Started</Link>
                  <Link to='/pricing' className='btn btn-outline-light btn-sm btn-md-lg px-4 btn-hover-lift'>View Pricing</Link>
                </div>
              </AnimatedSection>

              {/* Trusted By - Appears Fifth (1600ms) */}
              <AnimatedSection delay={1600}>
                <div className='d-flex justify-content-center align-items-center gap-3 text-white-50 px-3'>
                  <img src='assets/images/users/user1.png' alt='users' className='w-32-px h-38-px' />
                  <span className='small'>✅ Trusted by 500+ hiring teams</span>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id='how' className='container px-3 px-md-0 pb-5 pb-md-5'>
        <HowItWorksSection />
      </section>


      {/* What We Offer Section */}
      <WhatWeOfferSection />


      {/*  Testimonials */}

      <section className='px-3 px-md-5'>
        <ClientFeaturesSection clients={clients} />
      </section>

      {/* Scrolled Testimonials */}

      <section className='px-3 px-md-5 py-3'>
        <TestimonialSection testimonials={testimonials} activeTestimonial={activeTestimonial} setActiveTestimonial={setActiveTestimonial} />
      </section>




      {/* About Us Section */}
      <section className='py-3 py-md-5'>
        <ScrollAnimatedCard delay={0} isVisible={true}>
          <div
            className='container card border shadow-none p-3 p-md-5 about-us-container px-3 px-md-0'
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
                            width: "250px",
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
                            <p className='text-dark fw-bold mb-0'>Professionals</p>
                          </div>
                          <div className='d-inline-block'>
                            <h3
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
                            >35</h3>
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
                            <h3
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
                            >14</h3>
                          </div>
                          <div className='d-inline-block ps-2'>
                            <h4 className='line-height-100 fw-normal mb-0'>+</h4>
                            <p className='text-dark fw-bold mb-0'>Years of Experience</p>
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
                              width: "250px",
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
                    <h3
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
                    </h3>
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
      <section className='container px-3 pb-5'>
       <h3 className='display-6 display-md-5 fw-bold mb-3 mb-md-4 text-primary text-center'>HR Automation</h3>

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
              text: "We posted jobs to multiple boards in seconds fantastic tool.",
            },
            {
              name: "Innova Talent",
              text: "Super intuitive interface and great automation features.",
            },
          ].map((card, i) => (
            <div key={i} className='px-2'>
              <div className='card border shadow-sm text-center' style={{ minHeight: '200px', height: '100%' }}>
                <div className='card-body p-3 p-md-5 d-flex flex-column justify-content-between'>
                  <p className='text-secondary-light mb-4 mb-md-3 fw-bold fs-6'>{card.text}</p>
                  <h6 className='mb-0' style={{ color: "#e7a050d0" }}>{card.name}</h6>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </section>


      {/* Pricing Cards  */}

      <section className='px-3 px-md-5'>
        <div className='container card border shadow-none p-3 p-md-5'>
          {/* Header */}
          <div className='text-center text-black mb-4 mb-md-5'>
            <h3 className='display-6 display-md-5 fw-bold mb-3 text-primary text-center'> Pricing & Plans</h3>

          </div>

          {/* Pricing Cards */}
          <div className='row g-3 g-md-4 justify-content-center'>
            {pricingPlans.map((plan, index) => (
              <div key={index} className='col-12 col-sm-6 col-lg-3'>
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

                    <div className='card-body p-3 p-md-4 pt-4 pt-md-5'>
                      {/* Price */}
                      <div className='text-center mb-3 mb-md-4'>
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
                        <Link to='/pricing' >
 
                        <button
                          className='btn btn-primary pricing-btn w-100'
                          style={{
                            background: `linear-gradient(135deg, ${plan.color} 0%, ${plan.color}dd 100%)`,
                            border: 'none',
                            borderRadius: '12px',
                            padding: '12px 16px',
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
                        </Link>
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
      <section className='container p-3 p-md-5'>
        <div className='row align-items-center g-3 g-md-4'>
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

                        <h6 className='mb-0 fw-semibold' style={{ color: '#ecaa48' }}>{item.question}</h6>
                      </div>
                      <i
                        className={`ri-arrow-down-s-line fs-5 text-secondary transition-all ${openFAQ === index ? 'rotate-180' : ''
                          }`}
                        style={{
                          transform: openFAQ === index ? 'rotate(180deg)' : 'rotate(0deg)',
                          transition: 'transform 0.3s ease'
                        }}
                      ></i>
                    </div>
                    <div
                      className={`mt-3 overflow-hidden transition-all ${openFAQ === index ? 'max-height-200 opacity-100' : 'max-height-0 opacity-0'
                        }`}
                      style={{
                        maxHeight: openFAQ === index ? '200px' : '0px',
                        opacity: openFAQ === index ? 1 : 0,
                        transition: 'max-height 0.3s ease, opacity 0.3s ease'
                      }}
                    >
                      <p className='text-secondary-light mb-0 lh-base' style={{color:"#030108ff"}}>{item.answer}</p>
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
      <section className='container pb-5 px-3'>
        <div className='card bg-primary text-white border-0'>
          <div className='card-body p-4 p-md-5 d-flex flex-column flex-md-row align-items-center justify-content-between gap-3'>
            <div className='text-center text-md-start'>
              <h5 className='mb-2 mb-md-3 text-white'>Ready to accelerate hiring?</h5>
              <p className='mb-0 text-white small'>Start free, then choose a plan that scales with your team.</p>
            </div>
            <div className='d-flex align-items-center gap-2 w-100 w-md-auto justify-content-center'>
              <Link to='/login' className='btn btn-light btn-sm'>Get Started</Link>
              <Link to='/pricing' className='btn btn-outline-light btn-sm'>View Pricing</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className='py-4 py-md-5 border-top text-white px-3' style={{ background: '#1a1a1a' }}>
        <div className='container'>
          <div className='row g-4 g-md-5 mb-4 mb-md-5'>
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