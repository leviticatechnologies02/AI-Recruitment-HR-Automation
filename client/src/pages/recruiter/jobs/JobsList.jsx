import React from 'react';

const JobsList = () => {
  return (
    <div className="container-fluid p-4">
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="mb-0">Job Listings</h4>
            <button className="btn btn-primary">
              <i className="ri-add-line me-1"></i>
              Post New Job
            </button>
          </div>
          
          <div className="card">
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Job Title</th>
                      <th>Company</th>
                      <th>Location</th>
                      <th>Type</th>
                      <th>Applications</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Senior Software Engineer</td>
                      <td>Tech Corp</td>
                      <td>New York, NY</td>
                      <td>Full Time</td>
                      <td>24</td>
                      <td><span className="badge bg-success">Active</span></td>
                      <td>
                        <button className="btn btn-sm btn-outline-primary me-1">Edit</button>
                        <button className="btn btn-sm btn-outline-danger">Delete</button>
                      </td>
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

export default JobsList;
