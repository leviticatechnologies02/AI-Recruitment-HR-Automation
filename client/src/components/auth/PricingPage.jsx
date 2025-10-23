import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from "@iconify/react/dist/iconify.js";
import { ChevronDown, Check, X } from 'lucide-react';
import { getUserRole } from '../../utils/auth';
 
const PricingPage = () => {
  const navigate = useNavigate();
  const [isYearly, setIsYearly] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

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
      yearlyPrice: '$0',
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
      monthlyPrice: '$14.9',
      yearlyPrice: '$149.9',
      features: [
        { text: '50 GB Bandwidth', included: true },
        { text: 'Financial Analysis', included: true },
        { text: '24 hour support', included: true },
        { text: 'Customer Management', included: true },
        { text: 'Advanced Analytics', included: false }
      ]
    }
   
  ];

   const comparisonFeatures = [
    { name: 'Projects', free: '5', pro: 'Unlimited', enterprise: 'Unlimited' },
    { name: 'Storage', free: '10GB', pro: '100GB', enterprise: 'Unlimited' },
    { name: 'Team Members', free: '1', pro: '10', enterprise: 'Unlimited' },
    { name: 'Analytics', free: 'Basic', pro: 'Advanced', enterprise: 'Custom' },
    { name: 'Support', free: 'Community', pro: 'Priority', enterprise: 'Dedicated' },
    { name: 'API Access', free: false, pro: true, enterprise: true },
    { name: 'Custom Branding', free: false, pro: true, enterprise: true },
    { name: 'SSO/SAML', free: false, pro: false, enterprise: true },
    { name: 'SLA', free: false, pro: false, enterprise: true },
    { name: 'Custom Integrations', free: false, pro: false, enterprise: true }
  ];


  const faqs = [
    {
      q: 'Can I change plans at any time?',
      a: 'Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we will prorate any differences in cost.'
    },
    {
      q: 'What payment methods do you accept?',
      a: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and wire transfers for Enterprise plans.'
    },
    {
      q: 'Is there a long-term contract?',
      a: 'No, all our plans are month-to-month with no long-term contracts required. You can cancel anytime without penalties.'
    },
    {
      q: 'Do you offer refunds?',
      a: 'Yes, we offer a 30-day money-back guarantee. If you are not satisfied within the first 30 days, we will provide a full refund.'
    },
    {
      q: 'What happens to my data if I cancel?',
      a: 'Your data remains accessible for 60 days after cancellation. You can export it at any time during this period.'
    }
  ];


  return (
    <div className='min-vh-100' style={{ 
      background: 'linear-gradient(135deg, #28197bff 0%, #eff1f4ff 100%)' 
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

        {/* Comparison Table */}
        <div className="container pb-5">
          <h2 className="h2 fw-bold text-white text-center mb-5">
            Compare Plans
          </h2>
          <div className="bg-white bg-opacity-5 rounded-3 border border-white-10" style={{ backdropFilter: 'blur(4px)' }}>
            <div className="table-responsive">
              <table className="table align-middle mb-0">
                <thead>
                  <tr className="border-bottom border-white-10">
                    <th className="text-start p-4 text-black fw-semibold">Features</th>
                    <th className="text-center p-4 text-black fw-semibold">Free</th>
                    <th className="text-center p-4 text-black fw-semibold  bg-opacity-10">Pro</th>
                    <th className="text-center p-4 text-black fw-semibold">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonFeatures.map((feature, idx) => (
                    <tr key={idx} className="border-bottom border-black-5">
                      <td className="p-4 text-black-50">{feature.name}</td>
                      <td className="p-4 text-center text-black-50">
                        {typeof feature.free === 'boolean' ? (
                          feature.free ? <Check size={20} color="#34D399" /> : <X size={20} color="#6B7280" />
                        ) : (
                          feature.free
                        )}
                      </td>
                      <td className="p-4 text-center text-black-50  bg-opacity-5">
                        {typeof feature.pro === 'boolean' ? (
                          feature.pro ? <Check size={20} color="#34D399" /> : <X size={20} color="#6B7280" />
                        ) : (
                          feature.pro
                        )}
                      </td>
                      <td className="p-4 text-center text-black-50">
                        {typeof feature.enterprise === 'boolean' ? (
                          feature.enterprise ? <Check size={20} color="#34D399" /> : <X size={20} color="#6B7280" />
                        ) : (
                          feature.enterprise
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      {/* FAQ Section */}
      <div className="container pb-5" style={{ maxWidth: '960px' }}>
        <h2 className="h2 fw-bold text-white text-center mb-5">
          Frequently Asked Questions
        </h2>
        <div className="d-flex flex-column gap-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-3 border"
              style={{ 
                backgroundColor: 'rgba(11, 9, 9, 0.08)',
                backdropFilter: 'blur(10px)',
                borderColor: 'rgba(255, 255, 255, 0.15)',
                transition: 'all 0.3s ease'
              }}
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-100 p-4 text-start d-flex justify-content-between align-items-center border-0 bg-transparent"
                style={{ borderRadius: '12px' }}
              >
                <span className="fs-5 fw-semibold text-white">{faq.q}</span>
                <ChevronDown
                  size={20}
                  color="#ffffff"
                  style={{ 
                    transform: openFaq === idx ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s ease'
                  }}
                />
              </button>
              {openFaq === idx && (
                <div className="px-4 pb-4 text-white-50" style={{ fontSize: '14px', lineHeight: '1.6' }}>
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Final CTA */}
      <div className="container pb-5 text-center" style={{ maxWidth: '960px' }}>
        <div className="bg-primary bg-opacity-20 rounded-3 border border-primary border-opacity-30 p-5" style={{ backdropFilter: 'blur(4px)' }}>
          <h2 className="h3 fw-bold text-white mb-3">
            Ready to get started?
          </h2>
          <p className="text-white-50 mb-4">
            Join thousands of teams already using CloudFlow to streamline their workflow.
          </p>
          <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
            <button className="btn btn-primary px-4 py-3 rounded-3 fw-semibold" style={{ background: 'linear-gradient(90deg, #9333ea, #ec4899)' }}>
              Start Free Trial
            </button>
            <button className="btn btn-outline-light px-4 py-3 rounded-3 fw-semibold">
              Contact Sales
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
 
export default PricingPage;