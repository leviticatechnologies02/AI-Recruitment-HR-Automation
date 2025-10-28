import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Icon } from '@iconify/react';

const Subscription = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get plan data from navigation state
  const planData = location.state?.plan || {
    name: 'BASIC',
    monthlyPrice: '$9.99',
    yearlyPrice: '$99.99'
  };
  const isYearly = location.state?.isYearly || false;
  
  const [email, setEmail] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [saveInfo, setSaveInfo] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [subscriptionData, setSubscriptionData] = useState(null);
  const [redirectCountdown, setRedirectCountdown] = useState(5);
  
  // Card details state
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvc, setCvc] = useState('');
  const [cardholderName, setCardholderName] = useState('');
  const [country, setCountry] = useState('India');
  const [address, setAddress] = useState('');
  const [businessPurchase, setBusinessPurchase] = useState(false);
  
  // UPI details state
  const [name, setName] = useState('');
  const [upiVPA, setUpiVPA] = useState('');
  
  // Calculate dynamic pricing
  const planPrice = isYearly ? planData.yearlyPrice : planData.monthlyPrice;

  const handleSubscribe = () => {
    // Validate email
    if (!email || !email.trim()) {
      alert('Please enter your email address.');
      return;
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }
    
    if (termsAccepted) {
      // Generate random subscription data
      const subscriptionId = `SUB-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      const transactionId = `TXN-${Math.random().toString(36).substr(2, 12).toUpperCase()}`;
      const activationDate = new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
      const nextBillingDate = new Date();
      nextBillingDate.setMonth(nextBillingDate.getMonth() + (isYearly ? 12 : 1));
      const formattedNextBilling = nextBillingDate.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
      
      const randomData = {
        subscriptionId,
        transactionId,
        plan: planData.name,
        amount: planPrice,
        activationDate,
        nextBillingDate: formattedNextBilling,
        paymentMethod: paymentMethod === 'card' ? 'Card' : 'UPI',
        email,
        billingCycle: isYearly ? 'Annual' : 'Monthly'
      };
      
      setSubscriptionData(randomData);
      setShowSuccessModal(true);
      
      // Auto redirect after 5 seconds with countdown
      const countdownInterval = setInterval(() => {
        setRedirectCountdown(prev => {
          if (prev <= 1) {
            clearInterval(countdownInterval);
            navigate('/dashboard');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      alert('Please accept the terms and conditions to proceed.');
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: '#534f51ff' }}>
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="bg-white rounded shadow-lg">
              <div className="row g-0">
                {/* Left Column - Subscription Summary */}
                <div className="col-md-5 border-end p-4">
                  {/* Back Button */}
                  <button 
                    className="btn btn-link text-decoration-none text-dark p-0 mb-3"
                    onClick={() => navigate('/pricing')}
                  >
                    <span className="me-2">←</span> Back
                  </button>

                  {/* Title */}
                  <h4 className="fw-bold mb-3">Subscribe to {planData.name} Plan</h4>

                  {/* Price */}
                  <div className="mb-4">
                    <h3 className="fw-bold mb-0">{planPrice}</h3>
                    <small className="text-muted">per {isYearly ? 'year' : 'month'}</small>
                  </div>

                  {/* Subscription Item */}
                  <div className="mb-3 pb-3 border-bottom">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <div>
                        <div className="fw-semibold">{planData.name} Plan</div>
                        <small className="text-muted">Billed {isYearly ? 'annually' : 'monthly'}</small>
                      </div>
                      <div className="text-end">
                        <div className="fw-semibold">{planPrice}</div>
                        <small className="text-muted">{planPrice} per seat</small>
                      </div>
                    </div>
                  </div>

                  {/* Subtotal */}
                  <div className="d-flex justify-content-between mb-2">
                    <span>Subtotal</span>
                    <span className="fw-semibold">{planPrice}</span>
                  </div>

                  {/* Tax Section */}
                  <div className="mb-2 pb-2 border-bottom">
                    <div className="d-flex justify-content-between align-items-center">
                      <span>
                        Tax
                        <Icon icon="heroicons:information-circle" className="ms-1" style={{ fontSize: '14px', verticalAlign: 'middle' }} />
                      </span>
                    </div>
                    <small className="text-muted">Enter address to calculate</small>
                  </div>

                  {/* Total */}
                  <div className="d-flex justify-content-between mt-3">
                    <span className="fw-bold">Total due today</span>
                    <span className="fw-bold">{planPrice}</span>
                  </div>

                  {/* Plan Features */}
                  <div className="mt-4 pt-4 border-top">
                    <h6 className="fw-semibold mb-3">Plan Features</h6>
                    {planData.features && planData.features.map((feature, index) => (
                      <div key={index} className="d-flex align-items-center mb-2">
                        {feature.included ? (
                          <Icon icon="heroicons:check-circle" className="text-success me-2" style={{ fontSize: '18px' }} />
                        ) : (
                          <Icon icon="heroicons:x-circle" className="text-danger me-2" style={{ fontSize: '18px' }} />
                        )}
                        <small className={feature.included ? 'text-dark' : 'text-muted'}>
                          {feature.text}
                        </small>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Column - Contact & Payment */}
                <div className="col-md-7 p-4">
                  {/* Contact Information */}
                  <div className="mb-4">
                    <h6 className="fw-semibold mb-2">Contact information</h6>
                    <input
                      type="email"
                      className="form-control form-control-lg"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      style={{ borderRadius: '8px' }}
                    />
                    <small className="text-muted mt-1 d-block">We'll send your receipt to this email</small>
                  </div>

                  {/* Payment Method */}
                  <div className="mb-4">
                    <h6 className="fw-semibold mb-3">Payment method</h6>
                    
                    {/* Card Option */}
                    <div className="border rounded p-3 mb-3" style={{ backgroundColor: '#f5f5f5' }}>
                      <div className="d-flex align-items-center mb-2">
                        <input
                          type="radio"
                          className="form-check-input"
                          name="paymentMethod"
                          id="card"
                          checked={paymentMethod === 'card'}
                          onChange={() => setPaymentMethod('card')}
                        />
                        <label htmlFor="card" className="ms-2 cursor-pointer d-flex align-items-center">
                          <Icon icon="heroicons:credit-card" style={{ fontSize: '20px', verticalAlign: 'middle' }} />
                          <span className="ms-2">Card</span>
                        </label>
                        {paymentMethod !== 'card' && (
                          <div className="ms-auto d-flex align-items-center gap-1">
                            <small style={{ fontSize: '11px', color: '#666' }}>Visa</small>
                            <small style={{ fontSize: '11px', color: '#666' }}>Mastercard</small>
                            <small style={{ fontSize: '11px', color: '#666' }}>Amex</small>
                            <small style={{ fontSize: '11px', color: '#666' }}>Discover</small>
                          </div>
                        )}
                      </div>
                      
                      {paymentMethod === 'card' && (
                        <div>
                          {/* Card Information */}
                          <div className="mb-3">
                            <label className="form-label small fw-semibold">Card information</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="1234 1234 1234 1234"
                              value={cardNumber}
                              onChange={(e) => setCardNumber(e.target.value)}
                            />
                            <div className="mt-2 d-flex align-items-center gap-2">
                              <span style={{ fontSize: '12px', color: '#666' }}>Visa</span>
                              <span style={{ fontSize: '12px', color: '#666' }}>Mastercard</span>
                              <span style={{ fontSize: '12px', color: '#666' }}>Amex</span>
                              <span style={{ fontSize: '12px', color: '#666' }}>Discover</span>
                            </div>
                          </div>

                          {/* Expiry and CVC */}
                          <div className="row g-2 mb-3">
                            <div className="col-6">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="MM/YY"
                                value={expiryDate}
                                onChange={(e) => setExpiryDate(e.target.value)}
                              />
                            </div>
                            <div className="col-6">
                              <div className="position-relative">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="CVC"
                                  value={cvc}
                                  onChange={(e) => setCvc(e.target.value)}
                                />
                                <Icon icon="heroicons:credit-card" 
                                  className="position-absolute end-0 top-50 translate-middle-y me-2"
                                  style={{ fontSize: '16px', color: '#999', pointerEvents: 'none' }}
                                />
                              </div>
                            </div>
                          </div>

                          {/* Cardholder Name */}
                          <div className="mb-3">
                            <label className="form-label small fw-semibold">Cardholder name</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Full name on card"
                              value={cardholderName}
                              onChange={(e) => setCardholderName(e.target.value)}
                            />
                          </div>

                          {/* Billing Address */}
                          <div className="mb-3">
                            <label className="form-label small fw-semibold">Billing address</label>
                            <select
                              className="form-select mb-2"
                              value={country}
                              onChange={(e) => setCountry(e.target.value)}
                            >
                              <option>India</option>
                              <option>United States</option>
                              <option>United Kingdom</option>
                              <option>Canada</option>
                              <option>Australia</option>
                            </select>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Address"
                              value={address}
                              onChange={(e) => setAddress(e.target.value)}
                            />
                            <button className="btn btn-link p-0 mt-2 text-decoration-none" style={{ fontSize: '12px' }}>
                              <span className="text-decoration-underline text-decoration-dotted">Enter address manually</span>
                            </button>
                          </div>

                          {/* Business Purchase Checkbox */}
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="businessPurchase"
                              checked={businessPurchase}
                              onChange={(e) => setBusinessPurchase(e.target.checked)}
                            />
                            <label className="form-check-label small" htmlFor="businessPurchase">
                              I'm purchasing as a business
                            </label>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* UPI Option */}
                    <div className="border rounded p-3" style={{ backgroundColor: '#f5f5f5' }}>
                      <div className="d-flex align-items-center mb-2">
                        <input
                          type="radio"
                          className="form-check-input"
                          name="paymentMethod"
                          id="upi"
                          checked={paymentMethod === 'upi'}
                          onChange={() => setPaymentMethod('upi')}
                        />
                        <label htmlFor="upi" className="ms-2 cursor-pointer">
                          <Icon icon="heroicons:wallet" style={{ fontSize: '20px', verticalAlign: 'middle' }} />
                          <span className="ms-2">UPI</span>
                        </label>
                      </div>
                      
                      {paymentMethod === 'upi' && (
                        <div>
                          {/* Name */}
                          <div className="mb-3">
                            <label className="form-label small fw-semibold">Name</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Name"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                            />
                          </div>

                          {/* Billing Address */}
                          <div className="mb-3">
                            <label className="form-label small fw-semibold">Billing address</label>
                            <select
                              className="form-select mb-2"
                              value={country}
                              onChange={(e) => setCountry(e.target.value)}
                            >
                              <option>India</option>
                              <option>United States</option>
                              <option>United Kingdom</option>
                              <option>Canada</option>
                              <option>Australia</option>
                            </select>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Address"
                              value={address}
                              onChange={(e) => setAddress(e.target.value)}
                            />
                            <button className="btn btn-link p-0 mt-2 text-decoration-none" style={{ fontSize: '12px' }}>
                              <span className="text-decoration-underline text-decoration-dotted">Enter address manually</span>
                            </button>
                          </div>

                          {/* Virtual Payment Address (VPA) */}
                          <div className="mb-3">
                            <label className="form-label small fw-semibold">Virtual Payment Address (VPA)</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="your.name@somebank"
                              value={upiVPA}
                              onChange={(e) => setUpiVPA(e.target.value)}
                            />
                          </div>

                          {/* Business Purchase Checkbox */}
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="businessPurchaseUPI"
                              checked={businessPurchase}
                              onChange={(e) => setBusinessPurchase(e.target.checked)}
                            />
                            <label className="form-check-label small" htmlFor="businessPurchaseUPI">
                              I'm purchasing as a business
                            </label>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Save Information Checkbox */}
                  <div className="mb-4">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="saveInfo"
                        checked={saveInfo}
                        onChange={(e) => setSaveInfo(e.target.checked)}
                      />
                      <label className="form-check-label" htmlFor="saveInfo">
                        Save my information for faster checkout
                      </label>
                    </div>
                    <small className="text-muted mt-1 d-block">
                      Pay securely at OpenAI, LLC and everywhere Link is accepted.
                    </small>
                  </div>

                  {/* Terms and Conditions */}
                  <div className="mb-4">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="terms"
                        checked={termsAccepted}
                        onChange={(e) => setTermsAccepted(e.target.checked)}
                      />
                      <label className="form-check-label" htmlFor="terms">
                        <small>
                          You'll be charged the amount and at the frequency listed above until you cancel. We may change our prices as described in our <span className="text-decoration-underline">Terms of Use</span>. You can <span className="text-decoration-underline">cancel any time</span>. By subscribing, you agree to OpenAI's <span className="text-decoration-underline">Terms of Use</span> and <span className="text-decoration-underline">Privacy Policy</span>, and you authorize us to store your payment method for renewals and other purchases.
                        </small>
                      </label>
                    </div>
                  </div>

                  {/* Subscribe Button */}
                  <button
                    className="btn w-100 py-3 text-white fw-bold mb-3"
                    onClick={handleSubscribe}
                    style={{ 
                      backgroundColor: '#10A37F',
                      borderRadius: '8px'
                    }}
                  >
                    Subscribe
                  </button>

                  {/* Footer */}
                  <div className="text-center">
                    <small className="text-muted">
                      Powered by <strong className="text-decoration-underline">stripe</strong>
                      <span className="mx-2">|</span>
                      <a href="#" className="text-muted text-decoration-underline">Terms</a>
                      <span className="mx-2">|</span>
                      <a href="#" className="text-muted text-decoration-underline">Privacy</a>
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && subscriptionData && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 9999 }}>
          <div className="bg-white rounded shadow-lg p-3" style={{ maxWidth: '500px', width: '90%' }}>
            <div className="text-center mb-2">
              <Icon icon="heroicons:check-circle" style={{ fontSize: '48px', color: '#10A37F' }} />
              <h4 className="mt-2 mb-1 fw-bold">Subscription Successful!</h4>
              <p className="text-muted small mb-0">Your subscription has been activated</p>
            </div>

            <div className="border rounded p-2 mb-2" style={{ backgroundColor: '#f8f9fa' }}>
              <h6 className="fw-semibold mb-2 small">Subscription Details</h6>
              <div className="row g-2 mb-1">
                <div className="col-6">
                  <small className="text-muted d-block" style={{ fontSize: '11px' }}>Subscription ID:</small>
                  <div className="fw-semibold small">{subscriptionData.subscriptionId}</div>
                </div>
                <div className="col-6">
                  <small className="text-muted d-block" style={{ fontSize: '11px' }}>Transaction ID:</small>
                  <div className="fw-semibold small">{subscriptionData.transactionId}</div>
                </div>
              </div>
              <hr className="my-1" />
              <div className="row g-2 mb-1">
                <div className="col-6">
                  <small className="text-muted d-block" style={{ fontSize: '11px' }}>Plan:</small>
                  <div className="fw-semibold small">{subscriptionData.plan}</div>
                </div>
                <div className="col-6">
                  <small className="text-muted d-block" style={{ fontSize: '11px' }}>Amount:</small>
                  <div className="fw-semibold text-success small">{subscriptionData.amount}</div>
                </div>
              </div>
              <hr className="my-1" />
              <div className="row g-2 mb-1">
                <div className="col-6">
                  <small className="text-muted d-block" style={{ fontSize: '11px' }}>Activated:</small>
                  <div className="fw-semibold small">{subscriptionData.activationDate}</div>
                </div>
                <div className="col-6">
                  <small className="text-muted d-block" style={{ fontSize: '11px' }}>Next Billing:</small>
                  <div className="fw-semibold small">{subscriptionData.nextBillingDate}</div>
                </div>
              </div>
              <hr className="my-1" />
              <div className="row g-2 mb-0">
                <div className="col-6">
                  <small className="text-muted d-block" style={{ fontSize: '11px' }}>Payment Method:</small>
                  <div className="fw-semibold small">{subscriptionData.paymentMethod}</div>
                </div>
                <div className="col-6">
                  <small className="text-muted d-block" style={{ fontSize: '11px' }}>Billing Cycle:</small>
                  <div className="fw-semibold small">{subscriptionData.billingCycle}</div>
                </div>
              </div>
            </div>

            <div className="alert alert-info mb-2 py-2 px-2">
              <small style={{ fontSize: '12px' }}>
                <Icon icon="heroicons:envelope" className="me-1" />
                A confirmation email has been sent to <strong>{subscriptionData.email}</strong>
              </small>
            </div>

            <button 
              className="btn btn-success w-100 fw-bold py-2"
              onClick={() => navigate('/dashboard')}
            >
              Go to Dashboard ({redirectCountdown}s)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Subscription;
