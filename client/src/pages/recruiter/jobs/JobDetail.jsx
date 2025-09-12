import React from 'react';

const JobDetail = () => {
  return (
    <div className="container-fluid p-4">
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="mb-0">Job Details</h4>
            <div>
              <button className="btn btn-outline-primary me-2">Edit Job</button>
              <button className="btn btn-primary">View Applications</button>
            </div>
          </div>
          
          <div className="row">
            <div className="col-lg-8">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Senior Software Engineer</h5>
                  <p className="text-muted mb-3">Tech Corp • New York, NY • Full Time</p>
                  
                  <h6>Job Description</h6>
                  <p>We are looking for a senior software engineer to join our team...</p>
                  
                  <h6>Requirements</h6>
                  <ul>
                    <li>5+ years of experience in software development</li>
                    <li>Proficiency in React, Node.js</li>
                    <li>Experience with cloud platforms</li>
                  </ul>
                  
                  <h6>Benefits</h6>
                  <ul>
                    <li>Competitive salary</li>
                    <li>Health insurance</li>
                    <li>Remote work options</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="col-lg-4">
              <div className="card">
                <div className="card-body">
                  <h6>Job Statistics</h6>
                  <div className="row text-center">
                    <div className="col-6">
                      <h4 className="text-primary">24</h4>
                      <small className="text-muted">Applications</small>
                    </div>
                    <div className="col-6">
                      <h4 className="text-success">8</h4>
                      <small className="text-muted">Shortlisted</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
