import React, { useState } from 'react';
import { Search, Filter, Download, Printer, Plus, Edit, Eye, Calendar, Trash2 } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const JobsListPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [recruiterFilter, setRecruiterFilter] = useState('All');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [selectedJobs, setSelectedJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);
  const [showJobDetailModal, setShowJobDetailModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: '',
    department: '',
    location: '',
    employmentType: '',
    experienceLevel: '',
    description: '',
    skills: []
  });

  // Debug: Log form data changes
  React.useEffect(() => {
    console.log('Edit form data updated:', editFormData);
  }, [editFormData]);

  // Sample jobs data - converted to state so we can modify it
  const [jobsData, setJobsData] = useState([
    {
      id: 1,
      title: 'Frontend Developer',
      department: 'Engineering',
      recruiter: 'AI',
      postedOn: '12-Sep-2025',
      status: 'Open',
      applicants: 22
    },
    {
      id: 2,
      title: 'Backend Developer',
      department: 'Engineering',
      recruiter: 'AI',
      postedOn: '10-Sep-2025',
      status: 'Closed',
      applicants: 35
    },
    {
      id: 3,
      title: 'UI/UX Designer',
      department: 'Design',
      recruiter: 'AI',
      postedOn: '08-Sep-2025',
      status: 'On Hold',
      applicants: 12
    },
    {
      id: 4,
      title: 'QA Engineer',
      department: 'Testing',
      recruiter: 'AI',
      postedOn: '05-Sep-2025',
      status: 'Open',
      applicants: 18
    },
    {
      id: 5,
      title: 'Sales Manager',
      department: 'Sales',
      recruiter: 'AI',
      postedOn: '03-Sep-2025',
      status: 'Open',
      applicants: 15
    },
    {
      id: 6,
      title: 'Marketing Specialist',
      department: 'Marketing',
      recruiter: 'AI',
      postedOn: '01-Sep-2025',
      status: 'Draft',
      applicants: 0
    },
    {
      id: 7,
      title: 'HR Coordinator',
      department: 'HR',
      recruiter: 'AI',
      postedOn: '28-Aug-2025',
      status: 'Open',
      applicants: 9
    },
    {
      id: 8,
      title: 'DevOps Engineer',
      department: 'Engineering',
      recruiter: 'AI',
      postedOn: '25-Aug-2025',
      status: 'Closed',
      applicants: 28
    }
  ]);

  // KPI data - calculated dynamically from jobsData
  const kpis = {
    totalJobs: jobsData.length,
    openJobs: jobsData.filter(j => j.status === 'Open').length,
    closedJobs: jobsData.filter(j => j.status === 'Closed').length,
    onHold: jobsData.filter(j => j.status === 'On Hold').length
  };

  // Analytics data for job detail modal
  const analyticsData = {
    metrics: {
      totalApplicants: 32,
      inProgress: 10,
      hired: 3,
      rejected: 12
    },
    applicationsOverTime: [
      { date: 'Sep 25', applications: 2 },
      { date: 'Sep 26', applications: 4 },
      { date: 'Sep 27', applications: 3 },
      { date: 'Sep 28', applications: 5 },
      { date: 'Sep 29', applications: 2 },
      { date: 'Sep 30', applications: 6 },
      { date: 'Oct 1', applications: 4 },
      { date: 'Oct 2', applications: 6 }
    ],
    candidatesByStage: [
      { stage: 'Applied', count: 8 },
      { stage: 'Screening', count: 7 },
      { stage: 'Interview', count: 10 },
      { stage: 'Offer', count: 4 },
      { stage: 'Hired', count: 3 }
    ],
    candidatesBySource: [
      { source: 'LinkedIn', value: 12, color: '#0A66C2' },
      { source: 'Referrals', value: 8, color: '#10B981' },
      { source: 'Naukri', value: 7, color: '#F59E0B' },
      { source: 'Direct', value: 5, color: '#8B5CF6' }
    ]
  };


  const filteredJobs = jobsData.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.department.toLowerCase().includes(searchTerm.toLowerCase());
    
    // For date filter, we'll filter based on posted date (simplified logic)
    let matchesDate = true;
    if (departmentFilter !== 'All') {
      // Simple date filtering based on the posted date
      const jobDate = new Date(job.postedOn);
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      
      switch (departmentFilter) {
        case 'Today':
          matchesDate = jobDate.toDateString() === today.toDateString();
          break;
        case 'Yesterday':
          matchesDate = jobDate.toDateString() === yesterday.toDateString();
          break;
        case 'This Week':
          const weekStart = new Date(today);
          weekStart.setDate(today.getDate() - today.getDay());
          matchesDate = jobDate >= weekStart;
          break;
        case 'Last Week':
          const lastWeekStart = new Date(today);
          lastWeekStart.setDate(today.getDate() - today.getDay() - 7);
          const lastWeekEnd = new Date(today);
          lastWeekEnd.setDate(today.getDate() - today.getDay());
          matchesDate = jobDate >= lastWeekStart && jobDate < lastWeekEnd;
          break;
        case 'This Month':
          matchesDate = jobDate.getMonth() === today.getMonth() && jobDate.getFullYear() === today.getFullYear();
          break;
        case 'Last Month':
          const lastMonth = new Date(today);
          lastMonth.setMonth(today.getMonth() - 1);
          matchesDate = jobDate.getMonth() === lastMonth.getMonth() && jobDate.getFullYear() === lastMonth.getFullYear();
          break;
        default:
          matchesDate = true;
      }
    }
    
    const matchesStatus = statusFilter === 'All' || job.status === statusFilter;
    const matchesLocation = recruiterFilter === 'All' || job.recruiter === recruiterFilter;
    
    return matchesSearch && matchesDate && matchesStatus && matchesLocation;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);
  const indexOfLastJob = currentPage * itemsPerPage;
  const indexOfFirstJob = indexOfLastJob - itemsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (value) => {
    setItemsPerPage(value);
    setCurrentPage(1);
  };

  // Reset to page 1 when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, departmentFilter, statusFilter, recruiterFilter]);

  const handleExport = () => {
    const csv = [
      ['Job Title', 'Department', 'Recruiter', 'Posted On', 'Status', 'Applicants'],
      ...filteredJobs.map(job => [
        job.title,
        job.department,
        job.recruiter,
        job.postedOn,
        job.status,
        job.applicants
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'jobs-list.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleView = (jobId) => {
    const job = jobsData.find(j => j.id === jobId);
    setSelectedJob(job);
    setShowJobDetailModal(true);
  };

  const handleEdit = (jobId) => {
    alert(`Editing job ID: ${jobId}`);
  };

  const handleViewCandidate = (candidateId) => {
    alert(`Viewing candidate profile: ${candidateId}`);
  };

  const handleMoveToNextStage = (candidateId) => {
    alert(`Moving candidate ${candidateId} to next stage`);
  };

  const handleRejectCandidate = (candidateId) => {
    alert(`Rejecting candidate ${candidateId}`);
  };

  const handleEditJob = (jobId) => {
    console.log('Edit job clicked for ID:', jobId);
    alert('Edit job clicked!'); // Simple test
    const job = jobsData.find(j => j.id === jobId);
    console.log('Found job:', job);
    if (job) {
      setEditingJob(job);
      setEditFormData({
        title: job.title,
        department: job.department,
        location: 'Hyderabad', // Default location
        employmentType: 'Full-Time', // Default employment type
        experienceLevel: 'Fresher', // Default experience level
        description: 'Build dynamic UIs using React.js, integrate with REST APIs, and ensure responsiveness. Work closely with designers and backend teams to deliver high-quality user experiences.',
        skills: ['React.js', 'JavaScript', 'HTML', 'CSS', 'Tailwind']
      });
      setShowEditModal(true);
      console.log('Edit modal should be shown');
    }
  };

  const handleCloseJob = (jobId) => {
    if (window.confirm('Are you sure you want to close this job?')) {
      alert(`Closing job: ${jobId}`);
    }
  };

  const handleSaveEdit = () => {
    if (editingJob) {
      // Update the job in the jobsData array
      setJobsData(prevJobs => 
        prevJobs.map(job => 
          job.id === editingJob.id 
            ? { ...job, title: editFormData.title, department: editFormData.department }
            : job
        )
      );
      
      // Update selectedJob if it's the same job being edited
      if (selectedJob && selectedJob.id === editingJob.id) {
        setSelectedJob({ ...selectedJob, title: editFormData.title, department: editFormData.department });
      }
      
      setShowEditModal(false);
      setEditingJob(null);
      alert('Job details updated successfully!');
    }
  };

  const handleCancelEdit = () => {
    setShowEditModal(false);
    setEditingJob(null);
    setEditFormData({
      title: '',
      department: '',
      location: '',
      employmentType: '',
      experienceLevel: '',
      description: '',
      skills: []
    });
  };

  const handleInputChange = (field, value) => {
    setEditFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };


  const handleDelete = (jobId) => {
    setJobToDelete(jobId);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (jobToDelete) {
      // Remove the job from the jobsData array
      setJobsData(prevJobs => prevJobs.filter(job => job.id !== jobToDelete));
      // Also remove from selected jobs if it was selected
      setSelectedJobs(prevSelected => prevSelected.filter(id => id !== jobToDelete));
      setShowDeleteModal(false);
      setJobToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setJobToDelete(null);
  };

  const handleSelectAll = (e) => {
    e.stopPropagation();
    if (e.target.checked) {
      setSelectedJobs(currentJobs.map(job => job.id));
    } else {
      setSelectedJobs([]);
    }
  };

  const handleSelectJob = (jobId, e) => {
    if (e) e.stopPropagation();
    if (selectedJobs.includes(jobId)) {
      setSelectedJobs(selectedJobs.filter(id => id !== jobId));
    } else {
      setSelectedJobs([...selectedJobs, jobId]);
    }
  };

  return (
    <div className="container-fluid py-4">
      {/* Page Header */}
      <div className="mb-4">
        <h4 className="mb-2">Jobs List</h4>
        <p className="text-secondary-light mb-0">View, edit, and manage all active and archived job postings.</p>
      </div>

      {/* KPI Summary */}
      <div className="card border shadow-none mb-4">
        <div className="card-body d-flex">
          <div className="text-center w-25">
            <div className="text-secondary-light small">Total Jobs Posted</div>
            <div className="h4 mb-0">{kpis.totalJobs}</div>
          </div>
          <div className="text-center w-25 border-start ps-4">
            <div className="text-secondary-light small">Open Jobs</div>
            <div className="h4 mb-0 text-success">{kpis.openJobs}</div>
          </div>
          <div className="text-center w-25 border-start ps-4">
            <div className="text-secondary-light small">Closed Jobs</div>
            <div className="h4 mb-0 text-danger">{kpis.closedJobs}</div>
          </div>
          <div className="text-center w-25 border-start ps-4">
            <div className="text-secondary-light small">On Hold</div>
            <div className="h4 mb-0 text-warning">{kpis.onHold}</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card border shadow-none mb-4">
        <div className="card-body d-flex gap-3 align-items-center">
          <div className="flex-grow-1">
            <div className="input-group">
              <span className="input-group-text bg-white border-end-0"><Search size={16} /></span>
              <input className="form-control border-start-0" placeholder="Search jobs..." value={searchTerm} onChange={e=>setSearchTerm(e.target.value)} />
            </div>
          </div>

          <select className="form-select w-auto" value={departmentFilter} onChange={e=>setDepartmentFilter(e.target.value)}>
            <option>All</option>
            <option>Today</option>
            <option>Yesterday</option>
            <option>This Week</option>
            <option>Last Week</option>
            <option>This Month</option>
            <option>Last Month</option>
          </select>

          <select className="form-select w-auto" value={statusFilter} onChange={e=>setStatusFilter(e.target.value)}>
            <option>All</option>
            <option>Open</option>
            <option>Closed</option>
            <option>Draft</option>
            <option>On Hold</option>
          </select>

          <select className="form-select w-auto" value={recruiterFilter} onChange={e=>setRecruiterFilter(e.target.value)}>
            <option>All</option>
            <option>New York</option>
            <option>Los Angeles</option>
            <option>Chicago</option>
            <option>Houston</option>
            <option>Phoenix</option>
            <option>Remote</option>
          </select>

          <div className="d-flex gap-2">
            <button className="btn btn-success" onClick={handleExport}><Download size={14} className="me-2"/>Export</button>
            <button className="btn btn-dark" onClick={handlePrint}><Printer size={14} /></button>
          </div>
        </div>
      </div>

      {/* Bulk Actions Bar */}
      {selectedJobs.length > 0 && (
        <div className="alert alert-info d-flex align-items-center justify-content-between mb-4">
          <div className="d-flex align-items-center gap-3">
            <span className="fw-medium">
              {selectedJobs.length} job{selectedJobs.length > 1 ? 's' : ''} selected
            </span>
            <div className="vr"></div>
            <button
              onClick={() => alert(`Changing status for ${selectedJobs.length} jobs`)}
              className="btn btn-warning btn-sm"
            >
              <Filter size={14} className="me-1" />
              Change Status
            </button>
            <button
              onClick={() => alert(`Exporting ${selectedJobs.length} jobs`)}
              className="btn btn-success btn-sm"
            >
              <Download size={14} className="me-1" />
              Export Selected
            </button>
          </div>
          <button
            onClick={() => setSelectedJobs([])}
            className="btn btn-link p-0 text-decoration-none"
          >
            Clear Selection
          </button>
        </div>
      )}

      {/* Jobs Table */}
      <div className="card border shadow-none mb-4">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th style={{width: 40}} className="text-center">
                  <input 
                    type="checkbox" 
                    className="form-check-input"
                    checked={selectedJobs.length === currentJobs.length && currentJobs.length > 0} 
                    onChange={handleSelectAll} 
                  />
                </th>
                <th className="text-start">JOB TITLE</th>
                <th className="text-start">DEPARTMENT</th>
                <th className="text-start">RECRUITER</th>
                <th className="text-start">POSTED ON</th>
                <th className="text-center">STATUS</th>
                <th className="text-center">APPLICANTS</th>
                <th className="text-center">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {currentJobs.map(job => (
                <tr key={job.id}>
                  <td className="text-center">
                    <input 
                      type="checkbox" 
                      className="form-check-input"
                      checked={selectedJobs.includes(job.id)} 
                      onChange={(e) => handleSelectJob(job.id, e)} 
                    />
                  </td>
                  <td className="fw-medium">{job.title}</td>
                  <td className="text-muted">{job.department}</td>
                  <td className="text-muted">{job.recruiter}</td>
                  <td className="text-muted">{job.postedOn}</td>
                  <td className="text-center">
                    <span className={`badge ${job.status === 'Open' ? 'bg-success-subtle text-success' : job.status === 'Closed' ? 'bg-danger-subtle text-danger' : job.status === 'On Hold' ? 'bg-warning-subtle text-warning' : 'bg-secondary-subtle text-secondary'}`}>
                      {job.status}
                    </span>
                  </td>
                  <td className="text-center">
                    <a href="#" className="text-primary">{job.applicants}</a>
                  </td>
                  <td className="text-center">
                    <div className="d-flex gap-2 justify-content-center">
                      <button type="button" className="btn btn-sm btn-icon btn-light" onClick={()=>handleView(job.id)} title="View">
                        <Eye size={16} />
                      </button>
                      <button type="button" className="btn btn-sm btn-icon btn-light" onClick={()=>handleEdit(job.id)} title="Edit">
                        <Edit size={16} />
                      </button>
                      <button type="button" className="btn btn-sm btn-icon btn-light text-danger" onClick={()=>handleDelete(job.id)} title="Delete">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <small className="text-secondary-light">
            Showing <strong>{indexOfFirstJob+1}</strong> to <strong>{Math.min(indexOfLastJob, filteredJobs.length)}</strong> of <strong>{filteredJobs.length}</strong> jobs
          </small>
        </div>

        <div className="d-flex align-items-center gap-3">
          <div className="btn-group" role="group">
            <button 
              className="btn btn-outline-secondary" 
              onClick={()=>handlePageChange(Math.max(1, currentPage-1))} 
              disabled={currentPage===1}
            >
              Previous
            </button>
            <button 
              className={1===currentPage ? 'btn btn-primary' : 'btn btn-outline-secondary'} 
              onClick={()=>handlePageChange(1)}
            >
              1
            </button>
            <button 
              className={2===currentPage ? 'btn btn-primary' : 'btn btn-outline-secondary'} 
              onClick={()=>handlePageChange(2)}
            >
              2
            </button>
            <button 
              className="btn btn-outline-secondary" 
              onClick={()=>handlePageChange(Math.min(totalPages, currentPage+1))} 
              disabled={currentPage===totalPages}
            >
              Next
            </button>
          </div>

          <select 
            className="form-select w-auto" 
            value={itemsPerPage} 
            onChange={e=>{ handleItemsPerPageChange(Number(e.target.value)); }}
            style={{minWidth: '60px'}}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>

      {/* Custom Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal fade show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)'}} tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button type="button" className="btn-close" onClick={cancelDelete}></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this job posting?</p>
                <p className="text-muted small">This action cannot be undone and the job will be permanently removed from the list.</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={cancelDelete}>
                  Cancel
                </button>
                <button type="button" className="btn btn-danger" onClick={confirmDelete}>
                  Delete Job
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Job Detail Modal */}
      {showJobDetailModal && selectedJob && (
        <div className="modal fade show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050}} tabIndex="-1">
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{selectedJob.title}</h5>
                <button type="button" className="btn-close" onClick={() => setShowJobDetailModal(false)}></button>
              </div>
              <div className="modal-body" style={{maxHeight: '70vh', overflowY: 'auto'}}>
                {/* Job Header */}
                <div className="text-center mb-3 pb-3 border-bottom">
                  <h5 className="mb-2">{selectedJob.title}</h5>
                  <div className="d-flex justify-content-center gap-2 mb-2">
                    <span className={`badge ${selectedJob.status === 'Open' ? 'bg-success' : selectedJob.status === 'Closed' ? 'bg-danger' : selectedJob.status === 'On Hold' ? 'bg-warning' : 'bg-secondary'}`}>
                      {selectedJob.status}
                    </span>
                    <span className="badge bg-primary">{selectedJob.department}</span>
                  </div>
                  <div className="d-flex justify-content-center gap-3 text-muted small">
                    <span><i className="bi bi-geo-alt me-1"></i>Hyderabad</span>
                    <span><i className="bi bi-calendar me-1"></i>Posted {selectedJob.postedOn}</span>
                  </div>
                  <div className="d-flex justify-content-center gap-2 mt-3">
                    <button className="btn btn-primary btn-sm" onClick={() => handleEditJob(selectedJob.id)}>
                      <i className="bi bi-pencil me-1"></i>Edit Job
                    </button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleCloseJob(selectedJob.id)}>
                      <i className="bi bi-x-circle me-1"></i>Close Job
                    </button>
                  </div>
                </div>

                {/* Tabs Navigation */}
                <div className="border-bottom">
                  <div className="d-flex">
                    {['overview', 'candidates', 'analytics'].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`btn btn-link text-decoration-none px-4 py-3 border-0 rounded-0 ${
                          activeTab === tab
                            ? 'text-primary border-bottom border-primary border-2'
                            : 'text-muted'
                        }`}
                        style={{textTransform: 'capitalize'}}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tab Content */}
                <div className="p-3">
                  {/* Overview Tab */}
                  {activeTab === 'overview' && (
                    <div className="row">
                      <div className="col-md-6">
                        <div className="card border-0 bg-light">
                          <div className="card-body">
                            <h6 className="card-title text-primary mb-3">Job Information</h6>
                            <div className="mb-2">
                              <label className="form-label text-muted small fw-semibold">Job Title</label>
                              <p className="mb-0 fw-medium">{selectedJob.title}</p>
                            </div>
                            <div className="mb-2">
                              <label className="form-label text-muted small fw-semibold">Department</label>
                              <p className="mb-0 fw-medium">{selectedJob.department}</p>
                            </div>
                            <div className="mb-2">
                              <label className="form-label text-muted small fw-semibold">Location</label>
                              <p className="mb-0 fw-medium">Hyderabad</p>
                            </div>
                            <div className="mb-2">
                              <label className="form-label text-muted small fw-semibold">Experience Level</label>
                              <p className="mb-0 fw-medium">Fresher</p>
                            </div>
                            <div className="mb-0">
                              <label className="form-label text-muted small fw-semibold">Employment Type</label>
                              <p className="mb-0 fw-medium">Full-Time</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="card border-0 bg-light">
                          <div className="card-body">
                            <h6 className="card-title text-primary mb-3">Additional Details</h6>
                            <div className="mb-2">
                              <label className="form-label text-muted small fw-semibold">Posted On</label>
                              <p className="mb-0 fw-medium">{selectedJob.postedOn}</p>
                            </div>
                            <div className="mb-2">
                              <label className="form-label text-muted small fw-semibold">Recruiter</label>
                              <p className="mb-0 fw-medium">AI</p>
                            </div>
                            <div className="mb-2">
                              <label className="form-label text-muted small fw-semibold">Total Applicants</label>
                              <p className="mb-0 fw-medium">{selectedJob.applicants}</p>
                            </div>
                            <div className="mb-0">
                              <label className="form-label text-muted small fw-semibold">Job Status</label>
                              <p className="mb-0 fw-medium">{selectedJob.status}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Description and Skills Section */}
                  {activeTab === 'overview' && (
                    <div className="mt-3">
                      <div className="card border-0 bg-light">
                        <div className="card-body">
                          <h6 className="card-title text-primary mb-3">Job Description</h6>
                          <p className="mb-3">Build dynamic UIs using React.js, integrate with REST APIs, and ensure responsiveness. Work closely with designers and backend teams to deliver high-quality user experiences.</p>
                          <div>
                            <label className="form-label text-muted small fw-semibold mb-2">Required Skills</label>
                            <div className="d-flex flex-wrap gap-2">
                              <span className="badge bg-primary">React.js</span>
                              <span className="badge bg-primary">JavaScript</span>
                              <span className="badge bg-primary">HTML</span>
                              <span className="badge bg-primary">CSS</span>
                              <span className="badge bg-primary">Tailwind</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Candidates Tab */}
                  {activeTab === 'candidates' && (
                    <div className="card border-0 bg-light">
                      <div className="card-body">
                        <h6 className="card-title text-primary mb-3">Candidates</h6>
                        
                        <div className="table-responsive">
                          <table className="table table-sm table-hover align-middle">
                            <thead className="table-light">
                              <tr>
                                <th className="text-start small">CANDIDATE NAME</th>
                                <th className="text-center small">STAGE</th>
                                <th className="text-center small">STATUS</th>
                                <th className="text-center small">APPLIED ON</th>
                                <th className="text-center small">ACTIONS</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className="text-start">
                                  <div className="d-flex align-items-center">
                                    <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-2" style={{width: '30px', height: '30px', fontSize: '12px'}}>
                                      P
                                    </div>
                                    <span className="fw-medium small">Priya Sharma</span>
                                  </div>
                                </td>
                                <td className="text-center small">Interview</td>
                                <td className="text-center"><span className="badge bg-info small">In Progress</span></td>
                                <td className="text-center text-muted small">02-Oct-2025</td>
                                <td className="text-center">
                                  <button className="btn btn-sm btn-outline-primary" title="View Profile" onClick={() => handleViewCandidate(1)} style={{padding: '2px 6px', fontSize: '12px'}}>
                                    <Eye size={12} />
                                  </button>
                                </td>
                              </tr>
                              <tr>
                                <td className="text-start">
                                  <div className="d-flex align-items-center">
                                    <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-2" style={{width: '30px', height: '30px', fontSize: '12px'}}>
                                      R
                                    </div>
                                    <span className="fw-medium small">Rohit Verma</span>
                                  </div>
                                </td>
                                <td className="text-center small">Applied</td>
                                <td className="text-center"><span className="badge bg-warning small">Pending</span></td>
                                <td className="text-center text-muted small">01-Oct-2025</td>
                                <td className="text-center">
                                  <button className="btn btn-sm btn-outline-primary" title="View Profile" onClick={() => handleViewCandidate(2)} style={{padding: '2px 6px', fontSize: '12px'}}>
                                    <Eye size={12} />
                                  </button>
                                </td>
                              </tr>
                              <tr>
                                <td className="text-start">
                                  <div className="d-flex align-items-center">
                                    <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-2" style={{width: '30px', height: '30px', fontSize: '12px'}}>
                                      S
                                    </div>
                                    <span className="fw-medium small">Sneha Reddy</span>
                                  </div>
                                </td>
                                <td className="text-center small">Hired</td>
                                <td className="text-center"><span className="badge bg-success small">Completed</span></td>
                                <td className="text-center text-muted small">27-Sep-2025</td>
                                <td className="text-center">
                                  <button className="btn btn-sm btn-outline-primary" title="View Profile" onClick={() => handleViewCandidate(3)} style={{padding: '2px 6px', fontSize: '12px'}}>
                                    <Eye size={12} />
                                  </button>
                                </td>
                              </tr>
                              <tr>
                                <td className="text-start">
                                  <div className="d-flex align-items-center">
                                    <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-2" style={{width: '30px', height: '30px', fontSize: '12px'}}>
                                      A
                                    </div>
                                    <span className="fw-medium small">Amit Patel</span>
                                  </div>
                                </td>
                                <td className="text-center small">Screening</td>
                                <td className="text-center"><span className="badge bg-info small">In Progress</span></td>
                                <td className="text-center text-muted small">30-Sep-2025</td>
                                <td className="text-center">
                                  <button className="btn btn-sm btn-outline-primary" title="View Profile" onClick={() => handleViewCandidate(4)} style={{padding: '2px 6px', fontSize: '12px'}}>
                                    <Eye size={12} />
                                  </button>
                                </td>
                              </tr>
                              <tr>
                                <td className="text-start">
                                  <div className="d-flex align-items-center">
                                    <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-2" style={{width: '30px', height: '30px', fontSize: '12px'}}>
                                      K
                                    </div>
                                    <span className="fw-medium small">Kavya Iyer</span>
                                  </div>
                                </td>
                                <td className="text-center small">Offer</td>
                                <td className="text-center"><span className="badge bg-warning small">Pending</span></td>
                                <td className="text-center text-muted small">28-Sep-2025</td>
                                <td className="text-center">
                                  <button className="btn btn-sm btn-outline-primary" title="View Profile" onClick={() => handleViewCandidate(5)} style={{padding: '2px 6px', fontSize: '12px'}}>
                                    <Eye size={12} />
                                  </button>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Analytics Tab */}
                  {activeTab === 'analytics' && (
                    <div>
                      {/* Metrics Cards */}
                      <div className="row mb-4">
                        <div className="col-md-3">
                          <div className="card border-0">
                            <div className="card-body text-center">
                              <div className="text-muted small mb-1">Total Applicants</div>
                              <div className="h3 mb-0">{analyticsData.metrics.totalApplicants}</div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="card border-0">
                            <div className="card-body text-center">
                              <div className="text-muted small mb-1">In Progress</div>
                              <div className="h3 mb-0 text-primary">{analyticsData.metrics.inProgress}</div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="card border-0">
                            <div className="card-body text-center">
                              <div className="text-muted small mb-1">Hired</div>
                              <div className="h3 mb-0 text-success">{analyticsData.metrics.hired}</div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="card border-0">
                            <div className="card-body text-center">
                              <div className="text-muted small mb-1">Rejected</div>
                              <div className="h3 mb-0 text-danger">{analyticsData.metrics.rejected}</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Charts Section */}
                      <div className="row mb-4">
                        <div className="col-md-6">
                          <div className="card border-0">
                            <div className="card-body">
                              <h6 className="card-title mb-3">Applications Over Time</h6>
                              <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={analyticsData.applicationsOverTime}>
                                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                  <XAxis dataKey="date" stroke="#6b7280" style={{ fontSize: '12px' }} />
                                  <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
                                  <Tooltip />
                                  <Line type="monotone" dataKey="applications" stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6', r: 4 }} />
                                </LineChart>
                              </ResponsiveContainer>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="card border-0">
                            <div className="card-body">
                              <h6 className="card-title mb-3">Candidates by Stage</h6>
                              <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={analyticsData.candidatesByStage}>
                                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                  <XAxis dataKey="stage" stroke="#6b7280" style={{ fontSize: '12px' }} />
                                  <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
                                  <Tooltip />
                                  <Bar dataKey="count" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                                </BarChart>
                              </ResponsiveContainer>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Candidates by Source */}
                      <div className="card border-0">
                        <div className="card-body">
                          <div className="d-flex justify-content-between align-items-center mb-3">
                            <h6 className="card-title mb-0">Candidates by Source</h6>
                            <div className="d-flex gap-2">
                              <button className="btn btn-outline-secondary btn-sm">
                                <i className="bi bi-download me-1"></i>Export PDF
                              </button>
                              <button className="btn btn-outline-secondary btn-sm">
                                <i className="bi bi-share me-1"></i>Share Report
                              </button>
                            </div>
                          </div>
                          <div className="d-flex justify-content-center">
                            <ResponsiveContainer width="100%" height={350}>
                              <PieChart>
                                <Pie
                                  data={analyticsData.candidatesBySource}
                                  cx="50%"
                                  cy="50%"
                                  labelLine={false}
                                  label={({ source, percent }) => `${source} ${(percent * 100).toFixed(0)}%`}
                                  outerRadius={120}
                                  fill="#8884d8"
                                  dataKey="value"
                                >
                                  {analyticsData.candidatesBySource.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                  ))}
                                </Pie>
                                <Tooltip />
                              </PieChart>
                            </ResponsiveContainer>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowJobDetailModal(false)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Test Modal - Remove this later */}
      {showEditModal && (
        <div style={{position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <div style={{backgroundColor: 'white', padding: '20px', borderRadius: '8px'}}>
            <h3>Test Modal - Edit Job</h3>
            <p>This is a test modal to see if modals work</p>
            <button onClick={() => setShowEditModal(false)}>Close</button>
          </div>
        </div>
      )}

      {/* Edit Job Modal */}
      {console.log('Modal state:', { showEditModal, editingJob })}
      {showEditModal && editingJob && (
        <div className="modal fade show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050}} tabIndex="-1">
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Job Details</h5>
                <button type="button" className="btn-close" onClick={handleCancelEdit}></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label className="form-label">Job Title</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        value={editFormData.title}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Department</label>
                      <select 
                        className="form-select" 
                        value={editFormData.department}
                        onChange={(e) => handleInputChange('department', e.target.value)}
                      >
                        <option value="Engineering">Engineering</option>
                        <option value="Design">Design</option>
                        <option value="Testing">Testing</option>
                        <option value="Sales">Sales</option>
                        <option value="Marketing">Marketing</option>
                        <option value="HR">HR</option>
                      </select>
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label className="form-label">Location</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        value={editFormData.location}
                        onChange={(e) => handleInputChange('location', e.target.value)}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Employment Type</label>
                      <select 
                        className="form-select" 
                        value={editFormData.employmentType}
                        onChange={(e) => handleInputChange('employmentType', e.target.value)}
                      >
                        <option value="Full-Time">Full-Time</option>
                        <option value="Part-Time">Part-Time</option>
                        <option value="Contract">Contract</option>
                        <option value="Internship">Internship</option>
                      </select>
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label className="form-label">Experience Level</label>
                      <select 
                        className="form-select" 
                        value={editFormData.experienceLevel}
                        onChange={(e) => handleInputChange('experienceLevel', e.target.value)}
                      >
                        <option value="Fresher">Fresher</option>
                        <option value="1-2 years">1-2 years</option>
                        <option value="3-5 years">3-5 years</option>
                        <option value="5+ years">5+ years</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Posted Date</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        value={editingJob.postedOn}
                        disabled
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Job Description</label>
                    <textarea 
                      className="form-control" 
                      rows="4"
                      value={editFormData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                    ></textarea>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Required Skills</label>
                    <div className="d-flex flex-wrap gap-2">
                      {editFormData.skills.map((skill, index) => (
                        <span key={index} className="badge bg-primary">
                          {skill}
                          <button 
                            type="button" 
                            className="btn-close btn-close-white ms-2" 
                            style={{fontSize: '10px'}}
                            onClick={() => {
                              const newSkills = editFormData.skills.filter((_, i) => i !== index);
                              handleInputChange('skills', newSkills);
                            }}
                          ></button>
                        </span>
                      ))}
                    </div>
                    <div className="mt-2">
                      <input 
                        type="text" 
                        className="form-control form-control-sm" 
                        placeholder="Add new skill and press Enter"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter' && e.target.value.trim()) {
                            e.preventDefault();
                            const newSkills = [...editFormData.skills, e.target.value.trim()];
                            handleInputChange('skills', newSkills);
                            e.target.value = '';
                          }
                        }}
                      />
                    </div>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCancelEdit}>
                  Cancel
                </button>
                <button type="button" className="btn btn-primary" onClick={handleSaveEdit}>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobsListPage;
