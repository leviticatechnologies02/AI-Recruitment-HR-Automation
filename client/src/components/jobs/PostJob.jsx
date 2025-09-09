import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import Sidebars from '../layout/dashboard/Sidebars';

const PostJob = () => {
  const [formData, setFormData] = useState({
    jobTitle: '',
    company: '',
    location: '',
    jobType: '',
    workMode: '',
    experience: '',
    salary: '',
    currency: 'USD',
    jobDescription: '',
    requirements: '',
    skills: '',
    benefits: '',
    applicationDeadline: '',
    contactEmail: '',
    contactPhone: '',
    companyWebsite: '',
    department: '',
    educationLevel: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Job posting data:', formData);
    // Handle form submission here
    alert('Job posted successfully!');
  };

  const handleReset = () => {
    setFormData({
      jobTitle: '',
      company: '',
      location: '',
      jobType: '',
      workMode: '',
      experience: '',
      salary: '',
      currency: 'USD',
      jobDescription: '',
      requirements: '',
      skills: '',
      benefits: '',
      applicationDeadline: '',
      contactEmail: '',
      contactPhone: '',
      companyWebsite: '',
      department: '',
      educationLevel: ''
    });
  };

  return (
    <Sidebars>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            {/* Header Section */}
            <div className="d-flex align-items-center gap-3 mb-4">
              <div className="d-flex align-items-center justify-content-center" 
                   style={{ 
                     width: '48px', 
                     height: '48px', 
                     background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                     borderRadius: '12px'
                   }}>
                <Icon icon="heroicons:plus" className="text-white" style={{ fontSize: '24px' }} />
              </div>
              <div>
                <h5 className="mb-0 fw-bold text-dark">Post a New Job</h5>
                <p className="mb-0 text-muted">Create and publish your job posting</p>
              </div>
            </div>

            {/* Main Form Card */}
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4">
        <form onSubmit={handleSubmit}>
          <div className="row">
            {/* Basic Job Information */}
            <span className="col-12" >
              <h6 className="text-primary mb-3" style={{ display:"flex", flexDirection:"row",alignItems:"center", justifyContent:"flex-start" }} >
                <Icon icon="heroicons:information-circle" className="" />
                Basic Information
              </h6>
            </span>

            <div className="col-md-6 mb-3">
              <label htmlFor="jobTitle" className="form-label">
                Job Title <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="jobTitle"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleInputChange}
                placeholder="e.g. Senior Software Engineer"
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <label htmlFor="company" className="form-label">
                Company Name <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                placeholder="e.g. Tech Solutions Inc."
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <label htmlFor="location" className="form-label">
                Location <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="e.g. New York, NY"
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <label htmlFor="department" className="form-label">
                Department
              </label>
              <input
                type="text"
                className="form-control"
                id="department"
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                placeholder="e.g. Engineering, Marketing"
              />
            </div>

            {/* Job Type and Work Mode */}
            <div className="col-md-4 mb-3">
              <label htmlFor="jobType" className="form-label">
                Job Type <span className="text-danger">*</span>
              </label>
              <select
                className="form-select"
                id="jobType"
                name="jobType"
                value={formData.jobType}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Job Type</option>
                <option value="full-time">Full Time</option>
                <option value="part-time">Part Time</option>
                <option value="contract">Contract</option>
                <option value="freelance">Freelance</option>
                <option value="internship">Internship</option>
              </select>
            </div>

            <div className="col-md-4 mb-3">
              <label htmlFor="workMode" className="form-label">
                Work Mode <span className="text-danger">*</span>
              </label>
              <select
                className="form-select"
                id="workMode"
                name="workMode"
                value={formData.workMode}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Work Mode</option>
                <option value="remote">Remote</option>
                <option value="on-site">On-site</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>

            <div className="col-md-4 mb-3">
              <label htmlFor="experience" className="form-label">
                Experience Level <span className="text-danger">*</span>
              </label>
              <select
                className="form-select"
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Experience</option>
                <option value="entry-level">Entry Level (0-2 years)</option>
                <option value="mid-level">Mid Level (2-5 years)</option>
                <option value="senior-level">Senior Level (5-10 years)</option>
                <option value="executive">Executive (10+ years)</option>
              </select>
            </div>

            {/* Salary Information */}
            <div className="col-12 mt-3">
              <h6 className="text-primary mb-3" style={{ display:"flex", flexDirection:"row",alignItems:"center", justifyContent:"flex-start"}} >
                <Icon icon="heroicons:currency-dollar" className="me-2" />
                Compensation
              </h6>
            </div>

            <div className="col-md-8 mb-3">
              <label htmlFor="salary" className="form-label">
                Salary Range
              </label>
              <input
                type="text"
                className="form-control"
                id="salary"
                name="salary"
                value={formData.salary}
                onChange={handleInputChange}
                placeholder="e.g. $80,000 - $120,000 per year"
              />
            </div>

            <div className="col-md-4 mb-3">
              <label htmlFor="currency" className="form-label">
                Currency
              </label>
              <select
                className="form-select"
                id="currency"
                name="currency"
                value={formData.currency}
                onChange={handleInputChange}
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="INR">INR (₹)</option>
                <option value="CAD">CAD (C$)</option>
              </select>
            </div>

            {/* Job Description */}
            <div className="col-12 mt-3">
              <h6 className="text-primary mb-3" style={{ display:"flex", flexDirection:"row",alignItems:"center", justifyContent:"flex-start"}} >
                <Icon icon="heroicons:document-text" className="me-2" />
                Job Details
              </h6>
            </div>

            <div className="col-12 mb-3">
              <label htmlFor="jobDescription" className="form-label">
                Job Description <span className="text-danger">*</span>
              </label>
              <textarea
                className="form-control"
                id="jobDescription"
                name="jobDescription"
                rows="5"
                value={formData.jobDescription}
                onChange={handleInputChange}
                placeholder="Describe the role, responsibilities, and what the candidate will be doing..."
                required
              ></textarea>
            </div>

            <div className="col-12 mb-3">
              <label htmlFor="requirements" className="form-label">
                Requirements & Qualifications <span className="text-danger">*</span>
              </label>
              <textarea
                className="form-control"
                id="requirements"
                name="requirements"
                rows="4"
                value={formData.requirements}
                onChange={handleInputChange}
                placeholder="List the required qualifications, experience, and skills..."
                required
              ></textarea>
            </div>

            <div className="col-md-6 mb-3">
              <label htmlFor="skills" className="form-label">
                Required Skills
              </label>
              <textarea
                className="form-control"
                id="skills"
                name="skills"
                rows="3"
                value={formData.skills}
                onChange={handleInputChange}
                placeholder="e.g. JavaScript, React, Node.js, SQL..."
              ></textarea>
            </div>

            <div className="col-md-6 mb-3">
              <label htmlFor="educationLevel" className="form-label">
                Education Level
              </label>
              <select
                className="form-select"
                id="educationLevel"
                name="educationLevel"
                value={formData.educationLevel}
                onChange={handleInputChange}
              >
                <option value="">Select Education Level</option>
                <option value="high-school">High School</option>
                <option value="associate">Associate Degree</option>
                <option value="bachelor">Bachelor's Degree</option>
                <option value="master">Master's Degree</option>
                <option value="phd">PhD</option>
                <option value="not-required">Not Required</option>
              </select>
            </div>

            <div className="col-12 mb-3">
              <label htmlFor="benefits" className="form-label">
                Benefits & Perks
              </label>
              <textarea
                className="form-control"
                id="benefits"
                name="benefits"
                rows="3"
                value={formData.benefits}
                onChange={handleInputChange}
                placeholder="e.g. Health insurance, 401k, flexible hours, remote work..."
              ></textarea>
            </div>

            {/* Application Details */}
            <div className="col-12 mt-3">
              <h6 className="text-primary mb-3" style={{ display:"flex", flexDirection:"row",alignItems:"center", justifyContent:"flex-start"}} >
                <Icon icon="heroicons:calendar-days" className="me-2" />
                Application Details
              </h6>
            </div>

            <div className="col-md-4 mb-3" >
              <label htmlFor="applicationDeadline" className="form-label">
                Application Deadline
              </label>
              <input
                type="date"
                className="form-control"
                id="applicationDeadline"
                name="applicationDeadline"
                value={formData.applicationDeadline}
                onChange={handleInputChange}
              />
            </div>

            <div className="col-md-4 mb-3">
              <label htmlFor="contactEmail" className="form-label">
                Contact Email <span className="text-danger">*</span>
              </label>
              <input
                type="email"
                className="form-control"
                id="contactEmail"
                name="contactEmail"
                value={formData.contactEmail}
                onChange={handleInputChange}
                placeholder="hr@company.com"
                required
              />
            </div>

            <div className="col-md-4 mb-3">
              <label htmlFor="contactPhone" className="form-label">
                Contact Phone
              </label>
              <input
                type="tel"
                className="form-control"
                id="contactPhone"
                name="contactPhone"
                value={formData.contactPhone}
                onChange={handleInputChange}
                placeholder="+1 (555) 123-4567"
              />
            </div>

            <div className="col-12 mb-4">
              <label htmlFor="companyWebsite" className="form-label">
                Company Website
              </label>
              <input
                type="url"
                className="form-control"
                id="companyWebsite"
                name="companyWebsite"
                value={formData.companyWebsite}
                onChange={handleInputChange}
                placeholder="https://www.company.com"
              />
            </div>

            {/* Submit Buttons */}
            <div className="col-12">
              <div className="d-flex justify-content-end gap-3">
                <button style={{ display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"space-around" }}
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={handleReset}
                >
                  <Icon icon="heroicons:x-mark" className="me-1" />
                  Cancel
                </button>
                <button
                  type="button"
                  style={{ display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"space-around" }}
                  className="btn btn-outline-primary"
                >
                  <Icon icon="heroicons:eye" className="me-1" />
                  Preview
                </button>
                <button
                  type="submit"
                  style={{ display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"space-around" }}
                  className="btn btn-primary"
                >
                  <Icon icon="heroicons:paper-airplane" className="me-1" />
                  Post Job
                </button>
              </div>
            </div>
          </div>
        </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Sidebars>
  );
};

export default PostJob;
