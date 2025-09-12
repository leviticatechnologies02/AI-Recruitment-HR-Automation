import React from 'react';

const CandidateDashboard = () => {
  return (
    <div className="container-fluid p-4">
      <div className="row">
        <div className="col-12">
          <h4 className="mb-4">Candidate Dashboard</h4>
          
          <div className="row">
            <div className="col-md-3">
              <div className="card text-center">
                <div className="card-body">
                  <h5 className="text-primary">12</h5>
                  <p className="mb-0">Applications</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card text-center">
                <div className="card-body">
                  <h5 className="text-success">3</h5>
                  <p className="mb-0">Interviews</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card text-center">
                <div className="card-body">
                  <h5 className="text-warning">2</h5>
                  <p className="mb-0">Pending</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card text-center">
                <div className="card-body">
                  <h5 className="text-info">1</h5>
                  <p className="mb-0">Offers</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="card mt-4">
            <div className="card-body">
              <h6>Recent Applications</h6>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Job Title</th>
                      <th>Company</th>
                      <th>Status</th>
                      <th>Applied Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Senior Developer</td>
                      <td>Tech Corp</td>
                      <td><span className="badge bg-success">Interview</span></td>
                      <td>2024-01-15</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateDashboard;
