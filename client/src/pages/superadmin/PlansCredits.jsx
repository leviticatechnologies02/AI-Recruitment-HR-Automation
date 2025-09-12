import React from 'react';

const PlansCredits = () => {
  return (
    <div className="container-fluid p-4">
      <div className="row">
        <div className="col-12">
          <h4 className="mb-4">Plans & Credits Management</h4>
          
          <div className="row">
            <div className="col-md-4">
              <div className="card">
                <div className="card-body text-center">
                  <h5 className="card-title">Basic Plan</h5>
                  <h3 className="text-primary">$29/month</h3>
                  <ul className="list-unstyled">
                    <li>✓ Up to 10 job postings</li>
                    <li>✓ Basic analytics</li>
                    <li>✓ Email support</li>
                  </ul>
                  <button className="btn btn-outline-primary">Manage</button>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card border-primary">
                <div className="card-body text-center">
                  <h5 className="card-title">Professional Plan</h5>
                  <h3 className="text-primary">$79/month</h3>
                  <ul className="list-unstyled">
                    <li>✓ Up to 50 job postings</li>
                    <li>✓ Advanced analytics</li>
                    <li>✓ AI prescreening</li>
                    <li>✓ Priority support</li>
                  </ul>
                  <button className="btn btn-primary">Manage</button>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card">
                <div className="card-body text-center">
                  <h5 className="card-title">Enterprise Plan</h5>
                  <h3 className="text-primary">$199/month</h3>
                  <ul className="list-unstyled">
                    <li>✓ Unlimited job postings</li>
                    <li>✓ Full analytics suite</li>
                    <li>✓ All AI features</li>
                    <li>✓ Dedicated support</li>
                  </ul>
                  <button className="btn btn-outline-primary">Manage</button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="card mt-4">
            <div className="card-body">
              <h6>Credit Usage</h6>
              <div className="row text-center">
                <div className="col-3">
                  <h4 className="text-primary">1,250</h4>
                  <small className="text-muted">Total Credits</small>
                </div>
                <div className="col-3">
                  <h4 className="text-success">850</h4>
                  <small className="text-muted">Used</small>
                </div>
                <div className="col-3">
                  <h4 className="text-warning">400</h4>
                  <small className="text-muted">Remaining</small>
                </div>
                <div className="col-3">
                  <h4 className="text-info">68%</h4>
                  <small className="text-muted">Usage</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlansCredits;
