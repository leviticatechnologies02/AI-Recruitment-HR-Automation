import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from "@iconify/react/dist/iconify.js";
import { getUserRole } from '../../utils/auth';
 
const PricingPage = () => {
  const navigate = useNavigate();
  const [isYearly, setIsYearly] = useState(false);

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
      name: 'BASIC',
      color: '#E8B4F8',
      monthlyPrice: '$4.99',
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
      name: 'STANDARD',
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
      name: 'PREMIUM',
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
    },
    {
      name: 'SPECIAL',
      color: '#A855F7',
      monthlyPrice: '$99.99',
      yearlyPrice: '$999.99',
      features: [
        { text: '50 GB Bandwidth', included: true },
        { text: 'Financial Analysis', included: true },
        { text: '24 hour support', included: false },
        { text: 'Customer Management', included: false },
        { text: 'Advanced Analytics', included: false }
      ]
    }
  ];

  return (
    <div className='min-vh-100' style={{ 
      background: 'linear-gradient(135deg, #7b738cff 0%, #aab6caff 100%)' 
    }}>
      <div className='container py-5'>
        {/* Header */}
        <div className='text-center text-white mb-5'>
          <h1 className='display-4 fw-bold mb-3'>Our Pricing & Plans</h1>
          <p className='lead mb-4'>
            Lorem ipsum dolor sit amet consectetur adipiscing elit dolor posuere vel venenatis eu sit massa volutpat.
          </p>
          
          {/* Toggle Switch */}
          <div className='d-flex justify-content-center mb-5'>
            <div 
              className='position-relative d-flex align-items-center'
              style={{
                backgroundColor: 'white',
                borderRadius: '25px',
                padding: '4px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}
            >
              {/* Sliding Background */}
              <div
                className='position-absolute'
                style={{
                  backgroundColor: '#3B82F6',
                  borderRadius: '20px',
                  height: '36px',
                  width: '50%',
                  left: isYearly ? '50%' : '4px',
                  top: '4px',
                  transition: 'left 0.3s ease',
                  zIndex: 1
                }}
              />
              
              {/* Monthly Option */}
              <button
                className={`position-relative border-0 bg-transparent px-4 py-2 fw-bold text-uppercase ${
                  !isYearly ? 'text-white' : 'text-dark'
                }`}
                style={{
                  borderRadius: '20px',
                  fontSize: '14px',
                  zIndex: 2,
                  transition: 'color 0.3s ease'
                }}
                onClick={() => setIsYearly(false)}
              >
                MONTHLY
              </button>
              
              {/* Yearly Option */}
              <button
                className={`position-relative border-0 bg-transparent px-4 py-2 fw-bold text-uppercase ${
                  isYearly ? 'text-white' : 'text-dark'
                }`}
                style={{
                  borderRadius: '20px',
                  fontSize: '14px',
                  zIndex: 2,
                  transition: 'color 0.3s ease'
                }}
                onClick={() => setIsYearly(true)}
              >
                YEARLY
              </button>
            </div>
          </div>
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
                    <h2 className='display-6 fw-semibold   text-dark mb-0'>
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
                  <div className='mt-auto'>
                    <button 
                      onClick={handleGetStarted}
                      className='btn w-100 py-3 text-white fw-bold'
                      style={{ 
                        backgroundColor: '#8B5CF6',
                        borderRadius: '10px',
                        border: 'none'
                      }}
                    >
                      BUY NOW
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
 
export default PricingPage;