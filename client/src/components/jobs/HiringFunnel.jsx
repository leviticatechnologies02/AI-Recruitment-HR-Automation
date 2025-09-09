import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import Sidebars from '../layout/dashboard/Sidebars';

const HiringFunnel = () => {
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
    // Here you would process the CSV file
    // For now, we'll just log the file info
    console.log('Processing CSV file:', file.name);
    console.log('File size:', file.size, 'bytes');
    
    // You can add CSV parsing logic here using libraries like Papa Parse
    // or implement your own CSV parsing logic
  };

  const handleBrowseFiles = () => {
    document.getElementById('csvFileInput').click();
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
              <Icon icon="heroicons:chart-bar-square" className="text-white" style={{ fontSize: '24px' }} />
            </div>
            <div>
              <h6 className='fw-semibold mb-0'>Hiring Funnel Analytics Dashboard</h6>
              
              <p className="mb-0 text-muted">Upload and analyze your recruitment data</p>
            </div>
          </div>

          {/* Upload Section */}
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body p-4">
              <div className="d-flex align-items-center gap-2 mb-3 mr-1">
                <Icon icon="heroicons:folder-arrow-down" className="text-warning" style={{ fontSize: '20px' }} />
                <p className="mb-0 fw-semibold mt-1">Upload your CSV file</p>
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
                  id="csvFileInput"
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
                        className="btn btn-primary "
                        onClick={handleBrowseFiles}
                        style={{ display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"space-around" }}
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
                  <div>Please upload a CSV file to view analytics.</div>
                </div>
              )}
            </div>
          </div>

          {/* Analytics Section - Show when file is uploaded */}
          {uploadedFile && (
            <div className="row">
              {/* Funnel Overview */}
              <div className="col-xl-8 col-lg-7 mb-4">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-header bg-white border-0 pb-0">
                    <h5 className="card-title mb-0">Hiring Funnel Overview</h5>
                  </div>
                  <div className="card-body">
                    <div className="row text-center">
                      <div className="col-md-3 mb-3">
                        <div className="p-3 bg-primary bg-opacity-10 rounded-3">
                          <Icon icon="heroicons:users" className="text-primary mb-2" style={{ fontSize: '32px' }} />
                          <h4 className="mb-1 text-primary">1,234</h4>
                          <small className="text-muted">Applications</small>
                        </div>
                      </div>
                      <div className="col-md-3 mb-3">
                        <div className="p-3 bg-info bg-opacity-10 rounded-3">
                          <Icon icon="heroicons:eye" className="text-info mb-2" style={{ fontSize: '32px' }} />
                          <h4 className="mb-1 text-info">456</h4>
                          <small className="text-muted">Reviewed</small>
                        </div>
                      </div>
                      <div className="col-md-3 mb-3">
                        <div className="p-3 bg-warning bg-opacity-10 rounded-3">
                          <Icon icon="heroicons:phone" className="text-warning mb-2" style={{ fontSize: '32px' }} />
                          <h4 className="mb-1 text-warning">123</h4>
                          <small className="text-muted">Interviewed</small>
                        </div>
                      </div>
                      <div className="col-md-3 mb-3">
                        <div className="p-3 bg-success bg-opacity-10 rounded-3">
                          <Icon icon="heroicons:check-badge" className="text-success mb-2" style={{ fontSize: '32px' }} />
                          <h4 className="mb-1 text-success">45</h4>
                          <small className="text-muted">Hired</small>
                        </div>
                      </div>
                    </div>

                    {/* Conversion Rates */}
                    <div className="mt-4">
                      <h6 className="mb-3">Conversion Rates</h6>
                      <div className="row">
                        <div className="col-md-4 mb-2">
                          <div className="d-flex justify-content-between">
                            <span>Application to Review:</span>
                            <strong className="text-info">37%</strong>
                          </div>
                          <div className="progress" style={{ height: '6px' }}>
                            <div className="progress-bar bg-info" style={{ width: '37%' }}></div>
                          </div>
                        </div>
                        <div className="col-md-4 mb-2">
                          <div className="d-flex justify-content-between">
                            <span>Review to Interview:</span>
                            <strong className="text-warning">27%</strong>
                          </div>
                          <div className="progress" style={{ height: '6px' }}>
                            <div className="progress-bar bg-warning" style={{ width: '27%' }}></div>
                          </div>
                        </div>
                        <div className="col-md-4 mb-2">
                          <div className="d-flex justify-content-between">
                            <span>Interview to Hire:</span>
                            <strong className="text-success">37%</strong>
                          </div>
                          <div className="progress" style={{ height: '6px' }}>
                            <div className="progress-bar bg-success" style={{ width: '37%' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="col-xl-4 col-lg-5 mb-4">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-header bg-white border-0 pb-0">
                    <h5 className="card-title mb-0">Quick Statistics</h5>
                  </div>
                  <div className="card-body">
                    <div className="mb-3">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="text-muted">Average Time to Hire</span>
                        <strong>23 days</strong>
                      </div>
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="text-muted">Cost per Hire</span>
                        <strong>$2,340</strong>
                      </div>
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="text-muted">Overall Success Rate</span>
                        <strong className="text-success">3.6%</strong>
                      </div>
                    </div>

                    <hr />

                    <div className="mb-3">
                      <h6 className="mb-2">Top Sources</h6>
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <span className="text-muted">LinkedIn</span>
                        <strong>45%</strong>
                      </div>
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <span className="text-muted">Indeed</span>
                        <strong>32%</strong>
                      </div>
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <span className="text-muted">Company Website</span>
                        <strong>23%</strong>
                      </div>
                    </div>

                    <div className="mt-4">
                      <button className="btn btn-primary w-100">
                        <Icon icon="heroicons:arrow-down-tray" className="me-2" />
                        Export Report
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

export default HiringFunnel;
