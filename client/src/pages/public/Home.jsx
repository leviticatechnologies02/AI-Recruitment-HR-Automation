import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-page">
      <div className="container-fluid">
        <div className="row min-vh-100 align-items-center">
          <div className="col-lg-6">
            <div className="hero-content">
              <h1 className="display-4 fw-bold text-primary mb-4">
                AI-Powered Recruitment Platform
              </h1>
              <p className="lead mb-4">
                Streamline your hiring process with intelligent candidate screening, 
                automated assessments, and AI-driven insights.
              </p>
              <div className="d-flex gap-3">
                <Link to="/signup" className="btn btn-primary btn-lg">
                  Get Started
                </Link>
                <Link to="/login" className="btn btn-outline-primary btn-lg">
                  Sign In
                </Link>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="hero-image text-center">
              <img 
                src="/assets/images/home-eleven/hero-img.png" 
                alt="AI Recruitment Platform"
                className="img-fluid"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
