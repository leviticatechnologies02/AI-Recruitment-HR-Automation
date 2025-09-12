import React from 'react';

const JobSearch = () => {
  return (
    <div className="container-fluid p-4">
      <div className="row">
        <div className="col-12">
          <h4 className="mb-4">Job Search</h4>
          
          <div className="card mb-4">
            <div className="card-body">
              <div className="row">
                <div className="col-md-4">
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Job title or keywords"
                  />
                </div>
                <div className="col-md-3">
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Location"
                  />
                </div>
                <div className="col-md-3">
                  <select className="form-select">
                    <option>Job Type</option>
                    <option>Full Time</option>
                    <option>Part Time</option>
                    <option>Contract</option>
                  </select>
                </div>
                <div className="col-md-2">
                  <button className="btn btn-primary w-100">Search</button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="row">
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <h6>Senior Software Engineer</h6>
                  <p className="text-muted">Tech Corp • New York, NY</p>
                  <p>We are looking for a senior software engineer...</p>
                  <div className="d-flex justify-content-between">
                    <span className="badge bg-primary">Full Time</span>
                    <button className="btn btn-sm btn-outline-primary">Apply</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <h6>Frontend Developer</h6>
                  <p className="text-muted">StartupXYZ • Remote</p>
                  <p>Join our team as a frontend developer...</p>
                  <div className="d-flex justify-content-between">
                    <span className="badge bg-success">Remote</span>
                    <button className="btn btn-sm btn-outline-primary">Apply</button>
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

export default JobSearch;
