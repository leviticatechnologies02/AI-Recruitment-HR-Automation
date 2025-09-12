import React from 'react';

const RecruiterDashboard = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Recruiter Dashboard</h4>
            </div>
            <div className="card-body">
              <p>Welcome to the Recruiter Dashboard. This is your main control center for managing recruitment activities.</p>
              <div className="row">
                <div className="col-md-6">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">Quick Actions</h5>
                      <p className="card-text">Access your most frequently used features from here.</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">Recent Activity</h5>
                      <p className="card-text">View your recent recruitment activities and updates.</p>
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

export default RecruiterDashboard;
