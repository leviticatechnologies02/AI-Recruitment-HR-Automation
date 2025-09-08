import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import Sidebars from '../layout/dashboard/Sidebars';

const TimeToHire = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
        setUploadedFile(file);
        processCSVFile(file);
      } else {
        alert('Please upload a CSV file only');
      }
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
        setUploadedFile(file);
        processCSVFile(file);
      } else {
        alert('Please upload a CSV file only');
      }
    }
  };

  const processCSVFile = (file) => {
    // Here you would process the CSV file for time to hire analytics
    console.log('Processing CSV file for Time to Hire analytics:', file.name);
    console.log('File size:', file.size, 'bytes');
  };

  const handleBrowseFiles = () => {
    document.getElementById('csvFileInputTimeToHire').click();
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
              <Icon icon="heroicons:clock" className="text-white" style={{ fontSize: '24px' }} />
            </div>
            <div>
              <h2 className="mb-0 fw-bold text-dark">Recruitment Analytics - Time to Hire</h2>
              <p className="mb-0 text-muted">Upload and analyze recruitment timeline data</p>
            </div>
          </div>

          {/* Upload Section */}
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body p-4">
              <div className="d-flex align-items-center gap-2 mb-3">
                <Icon icon="heroicons:folder-arrow-down" className="text-warning" style={{ fontSize: '20px' }} />
                <h5 className="mb-0 fw-semibold">Upload Recruitment Data CSV</h5>
              </div>

              {/* File Upload Area */}
              <div 
                className={`border-2 border-dashed rounded-3 p-5 text-center position-relative ${
                  dragActive ? 'border-primary bg-primary bg-opacity-10' : 'border-light'
                } ${uploadedFile ? 'bg-success bg-opacity-10 border-success' : ''}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                style={{ minHeight: '200px', cursor: 'pointer' }}
                onClick={handleBrowseFiles}
              >
                <input
                  type="file"
                  id="csvFileInputTimeToHire"
                  accept=".csv"
                  onChange={handleFileSelect}
                  className="d-none"
                />
                
                <div className="d-flex flex-column align-items-center justify-content-center h-100">
                  {uploadedFile ? (
                    <>
                      <Icon icon="heroicons:check-circle" className="text-success mb-3" style={{ fontSize: '48px' }} />
                      <h6 className="text-success mb-2">File Uploaded Successfully!</h6>
                      <p className="text-muted mb-2">{uploadedFile.name}</p>
                      <small className="text-muted">Size: {(uploadedFile.size / 1024).toFixed(2)} KB</small>
                    </>
                  ) : (
                    <>
                      <Icon icon="heroicons:cloud-arrow-up" className="text-muted mb-3" style={{ fontSize: '48px' }} />
                      <h6 className="text-dark mb-2">Drag and drop file here</h6>
                      <p className="text-muted mb-3">Limit 200MB per file • CSV</p>
                      <button 
                        type="button" 
                        className="btn btn-primary px-4"
                        onClick={handleBrowseFiles}
                      >
                        <Icon icon="heroicons:folder-open" className="me-2" />
                        Browse files
                      </button>
                    </>
                  )}
                </div>
              </div>

              {!uploadedFile && (
                <div className="alert alert-warning d-flex align-items-center mt-3" role="alert">
                  <Icon icon="heroicons:exclamation-triangle" className="me-2" />
                  <div>Please upload a CSV file to start.</div>
                </div>
              )}
            </div>
          </div>

          {/* Analytics Section - Show when file is uploaded */}
          {uploadedFile && (
            <div className="row">
              {/* Time to Hire Metrics */}
              <div className="col-xl-8 col-lg-7 mb-4">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-header bg-white border-0 pb-0">
                    <h5 className="card-title mb-0">Time to Hire Analysis</h5>
                  </div>
                  <div className="card-body">
                    <div className="row text-center mb-4">
                      <div className="col-md-3 mb-3">
                        <div className="p-3 bg-primary bg-opacity-10 rounded-3">
                          <Icon icon="heroicons:clock" className="text-primary mb-2" style={{ fontSize: '32px' }} />
                          <h4 className="mb-1 text-primary">23</h4>
                          <small className="text-muted">Avg Days</small>
                        </div>
                      </div>
                      <div className="col-md-3 mb-3">
                        <div className="p-3 bg-success bg-opacity-10 rounded-3">
                          <Icon icon="heroicons:arrow-trending-down" className="text-success mb-2" style={{ fontSize: '32px' }} />
                          <h4 className="mb-1 text-success">15</h4>
                          <small className="text-muted">Fastest Hire</small>
                        </div>
                      </div>
                      <div className="col-md-3 mb-3">
                        <div className="p-3 bg-warning bg-opacity-10 rounded-3">
                          <Icon icon="heroicons:arrow-trending-up" className="text-warning mb-2" style={{ fontSize: '32px' }} />
                          <h4 className="mb-1 text-warning">45</h4>
                          <small className="text-muted">Longest Hire</small>
                        </div>
                      </div>
                      <div className="col-md-3 mb-3">
                        <div className="p-3 bg-info bg-opacity-10 rounded-3">
                          <Icon icon="heroicons:users" className="text-info mb-2" style={{ fontSize: '32px' }} />
                          <h4 className="mb-1 text-info">156</h4>
                          <small className="text-muted">Total Hires</small>
                        </div>
                      </div>
                    </div>

                    {/* Department Breakdown */}
                    <div className="mt-4">
                      <h6 className="mb-3">Time to Hire by Department</h6>
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <div className="d-flex justify-content-between align-items-center mb-2">
                            <span>Engineering</span>
                            <strong className="text-primary">28 days</strong>
                          </div>
                          <div className="progress" style={{ height: '8px' }}>
                            <div className="progress-bar bg-primary" style={{ width: '70%' }}></div>
                          </div>
                        </div>
                        <div className="col-md-6 mb-3">
                          <div className="d-flex justify-content-between align-items-center mb-2">
                            <span>Marketing</span>
                            <strong className="text-success">18 days</strong>
                          </div>
                          <div className="progress" style={{ height: '8px' }}>
                            <div className="progress-bar bg-success" style={{ width: '45%' }}></div>
                          </div>
                        </div>
                        <div className="col-md-6 mb-3">
                          <div className="d-flex justify-content-between align-items-center mb-2">
                            <span>Sales</span>
                            <strong className="text-info">22 days</strong>
                          </div>
                          <div className="progress" style={{ height: '8px' }}>
                            <div className="progress-bar bg-info" style={{ width: '55%' }}></div>
                          </div>
                        </div>
                        <div className="col-md-6 mb-3">
                          <div className="d-flex justify-content-between align-items-center mb-2">
                            <span>HR</span>
                            <strong className="text-warning">35 days</strong>
                          </div>
                          <div className="progress" style={{ height: '8px' }}>
                            <div className="progress-bar bg-warning" style={{ width: '88%' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Insights */}
              <div className="col-xl-4 col-lg-5 mb-4">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-header bg-white border-0 pb-0">
                    <h5 className="card-title mb-0">Key Insights</h5>
                  </div>
                  <div className="card-body">
                    <div className="mb-4">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="text-muted">Industry Benchmark</span>
                        <strong>30 days</strong>
                      </div>
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="text-muted">Your Performance</span>
                        <strong className="text-success">23 days</strong>
                      </div>
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="text-muted">Improvement</span>
                        <strong className="text-success">-23%</strong>
                      </div>
                    </div>

                    <hr />

                    <div className="mb-4">
                      <h6 className="mb-3">Hiring Stages Breakdown</h6>
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="text-muted">Application Review</span>
                        <strong>3 days</strong>
                      </div>
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="text-muted">Initial Interview</span>
                        <strong>7 days</strong>
                      </div>
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="text-muted">Technical Assessment</span>
                        <strong>5 days</strong>
                      </div>
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="text-muted">Final Decision</span>
                        <strong>8 days</strong>
                      </div>
                    </div>

                    <div className="mt-4">
                      <button className="btn btn-primary w-100 mb-2">
                        <Icon icon="heroicons:arrow-down-tray" className="me-2" />
                        Export Report
                      </button>
                      <button className="btn btn-outline-secondary w-100">
                        <Icon icon="heroicons:chart-bar" className="me-2" />
                        View Trends
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          </div>
        </div>
      </div>
    </Sidebars>
  );
};

export default TimeToHire;
