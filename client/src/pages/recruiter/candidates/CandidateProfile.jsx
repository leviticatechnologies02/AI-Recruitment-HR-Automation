import React from 'react';

const CandidateProfile = () => {
  return (
    <div className="container-fluid p-4">
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="mb-0">Candidate Profile</h4>
            <div>
              <button className="btn btn-outline-primary me-2">Contact</button>
              <button className="btn btn-primary">Schedule Interview</button>
            </div>
          </div>
          
          <div className="row">
            <div className="col-lg-4">
              <div className="card">
                <div className="card-body text-center">
                  <img 
                    src="/assets/images/avatar/avatar1.png" 
                    alt="Candidate" 
                    className="rounded-circle mb-3"
                    style={{ width: '100px', height: '100px' }}
                  />
                  <h5>John Doe</h5>
                  <p className="text-muted">Senior Software Engineer</p>
                  <div className="d-flex justify-content-center gap-2">
                    <span className="badge bg-primary">React</span>
                    <span className="badge bg-primary">Node.js</span>
                    <span className="badge bg-primary">JavaScript</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-lg-8">
              <div className="card">
                <div className="card-body">
                  <h6>Experience</h6>
                  <div className="mb-3">
                    <strong>Senior Developer at TechCorp</strong>
                    <p className="text-muted mb-1">2020 - Present</p>
                    <p>Led development of multiple web applications using React and Node.js...</p>
                  </div>
                  
                  <h6>Education</h6>
                  <div className="mb-3">
                    <strong>Bachelor of Computer Science</strong>
                    <p className="text-muted">University of Technology, 2018</p>
                  </div>
                  
                  <h6>Skills Assessment</h6>
                  <div className="row">
                    <div className="col-6">
                      <div className="mb-2">
                        <small>JavaScript</small>
                        <div className="progress" style={{ height: '6px' }}>
                          <div className="progress-bar" style={{ width: '90%' }}></div>
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="mb-2">
                        <small>React</small>
                        <div className="progress" style={{ height: '6px' }}>
                          <div className="progress-bar" style={{ width: '85%' }}></div>
                        </div>
                      </div>
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

export default CandidateProfile;
