import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Download, Printer, Plus, Edit, Eye, Calendar, Trash2, RefreshCw, AlertCircle } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { BASE_URL, API_ENDPOINTS } from '../config/api.config';

const JobsListPage = () => {
  const navigate = useNavigate();
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

  // Backend integration state
  const [jobsData, setJobsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  // Fetch jobs from backend
  const fetchJobs = async () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      setError('Please login to view jobs');
      setLoading(false);
      return;
    }

    try {
      setRefreshing(true);
      const url = `${BASE_URL}${API_ENDPOINTS.JOBS.LIST}`;
      
      console.log('📥 Fetching jobs from:', url);

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        console.log('✅ Jobs fetched:', data);
        
        // Transform backend data to match display format
        const transformedJobs = data.map(job => ({
          id: job.id,
          title: job.title,
          department: job.department,
          recruiter: job.recruiter?.name || 'System',
          postedOn: new Date(job.created_at).toLocaleDateString('en-GB', { 
            day: '2-digit', 
            month: 'short', 
            year: 'numeric' 
          }),
          status: job.status || 'Draft',
          applicants: job.applications?.length || 0,
          // Store full job data for details view
          fullData: job
        }));
        
        setJobsData(transformedJobs);
        setError(null);
      } else if (response.status === 401) {
        setError('Session expired. Please login again.');
        setTimeout(() => navigate('/login'), 2000);
      } else if (response.status === 403) {
        setError('You do not have permission to view jobs.');
      } else {
        const errorData = await response.json().catch(() => ({}));
        setError(errorData.detail || 'Failed to fetch jobs');
      }
    } catch (err) {
      console.error('❌ Error fetching jobs:', err);
      setError('Network error. Please check if backend is running.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Fetch jobs when component mounts
  useEffect(() => {
    fetchJobs();
  }, []);

  // Debug: Log form data changes
  React.useEffect(() => {
    console.log('Edit form data updated:', editFormData);
  }, [editFormData]);

  // KPI data - calculated dynamically from jobsData
  const kpis = {
    totalJobs: jobsData.length,
    openJobs: jobsData.filter(j => j.status === 'Open' || j.status === 'Active').length,
    closedJobs: jobsData.filter(j => j.status === 'Closed').length,
    onHold: jobsData.filter(j => j.status === 'On Hold').length,
    draftJobs: jobsData.filter(j => j.status === 'Draft').length
  };

  // Get analytics data for selected job from backend
  const getAnalyticsDataForJob = (job) => {
    if (!job || !job.fullData) {
      return {
        metrics: { totalApplicants: 0, inProgress: 0, hired: 0, rejected: 0 },
        applicationsOverTime: [],
        candidatesByStage: [],
        candidatesBySource: []
      };
    }
    
    const jobData = job.fullData;
    const applicants = jobData.applications || [];
    
    // Calculate metrics from real data
    const metrics = {
      totalApplicants: applicants.length,
      inProgress: applicants.filter(app => app.stage === 'Interview' || app.stage === 'Screening').length,
      hired: applicants.filter(app => app.stage === 'Hired').length,
      rejected: applicants.filter(app => app.status === 'Rejected').length
    };
    
    // Generate timeline data (simplified - in production would come from backend)
    const applicationsOverTime = [];
    const today = new Date();
    for (let i = 7; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      applicationsOverTime.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        applications: Math.floor(Math.random() * (applicants.length / 3)) // Simplified distribution
      });
    }
    
    // Count by stage
    const stageCount = {};
    applicants.forEach(app => {
      const stage = app.stage || 'Applied';
      stageCount[stage] = (stageCount[stage] || 0) + 1;
    });
    
    const candidatesByStage = Object.keys(stageCount).map(stage => ({
      stage,
      count: stageCount[stage]
    }));
    
    // Source distribution (if available in backend data)
    const candidatesBySource = [
      { source: 'Direct Apply', value: Math.ceil(applicants.length * 0.4), color: '#3b82f6' },
      { source: 'LinkedIn', value: Math.ceil(applicants.length * 0.3), color: '#0A66C2' },
      { source: 'Referrals', value: Math.ceil(applicants.length * 0.2), color: '#10B981' },
      { source: 'Other', value: Math.floor(applicants.length * 0.1), color: '#8B5CF6' }
    ];
    
    return { metrics, applicationsOverTime, candidatesByStage, candidatesBySource };
  };
  
  const analyticsData = selectedJob ? getAnalyticsDataForJob(selectedJob) : null;


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
    const job = jobsData.find(j => j.id === jobId);
    if (job && job.fullData) {
      // Navigate to CreateJob page with job data for editing
      navigate('/jobs/new', { 
        state: { 
          editMode: true, 
          jobData: job.fullData 
        } 
      });
    }
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

  const confirmDelete = async () => {
    if (!jobToDelete) return;

    const token = localStorage.getItem('token');
    if (!token) {
      setError('Please login to delete jobs');
      setShowDeleteModal(false);
      return;
    }

    try {
      const url = `${BASE_URL}${API_ENDPOINTS.JOBS.DELETE(jobToDelete)}`;
      console.log('🗑️ Deleting job:', url);

      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        console.log('✅ Job deleted successfully');
        
        // Remove the job from the jobsData array
        setJobsData(prevJobs => prevJobs.filter(job => job.id !== jobToDelete));
        // Also remove from selected jobs if it was selected
        setSelectedJobs(prevSelected => prevSelected.filter(id => id !== jobToDelete));
        setShowDeleteModal(false);
        setJobToDelete(null);
        
        // Show success feedback
        setError(null);
        alert('Job deleted successfully!');
      } else if (response.status === 401) {
        setError('Session expired. Please login again.');
        setTimeout(() => navigate('/login'), 2000);
      } else if (response.status === 403) {
        setError('You do not have permission to delete this job.');
        setShowDeleteModal(false);
      } else if (response.status === 404) {
        setError('Job not found or you are not authorized to delete it.');
        setShowDeleteModal(false);
      } else {
        const errorData = await response.json().catch(() => ({}));
        setError(errorData.detail || 'Failed to delete job');
        setShowDeleteModal(false);
      }
    } catch (err) {
      console.error('❌ Error deleting job:', err);
      setError('Network error. Please check if backend is running.');
      setShowDeleteModal(false);
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
      <div className="mb-4 d-flex justify-content-between align-items-center">
        <div>
          <h4 className="mb-2">Jobs List</h4>
          <p className="text-secondary-light mb-0">View, edit, and manage all active and archived job postings.</p>
        </div>
        <button 
          className="btn btn-outline-primary d-flex align-items-center gap-2"
          onClick={fetchJobs}
          disabled={refreshing}
        >
          <RefreshCw size={16} className={refreshing ? 'spin' : ''} />
          {refreshing ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="alert alert-danger d-flex align-items-center mb-4" role="alert">
          <AlertCircle size={20} className="me-2" />
          <div>{error}</div>
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary mb-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="text-secondary-light">Loading jobs...</p>
        </div>
      ) : jobsData.length === 0 && !error ? (
        <div className="card border shadow-none">
          <div className="card-body text-center py-5">
            <div className="mb-3">
              <Calendar size={48} className="text-secondary-light" />
            </div>
            <h5 className="mb-2">No Jobs Found</h5>
            <p className="text-secondary-light mb-3">You haven't created any jobs yet. Start by posting your first job!</p>
            <button 
              className="btn btn-primary d-inline-flex align-items-center gap-2"
              onClick={() => navigate('/jobs/new')}
            >
              <Plus size={16} />
              Create New Job
            </button>
          </div>
        </div>
      ) : (
        <></>
      )}

      {/* Jobs Content - Only show if not loading and has jobs */}
      {!loading && jobsData.length > 0 && (
        <>
      {/* KPI Summary */}
      <div className="card border shadow-none mb-4">
        <div className="card-body d-flex">
          <div className="text-center w-25">
            <div className="text-secondary-light small">Total Jobs Posted</div>
            <div className="h4 mb-0">{kpis.totalJobs}</div>
          </div>
          <div className="text-center w-25 border-start ps-4">
            <div className="text-secondary-light small">Active Jobs</div>
            <div className="h4 mb-0 text-success">{kpis.openJobs}</div>
          </div>
          <div className="text-center w-25 border-start ps-4">
            <div className="text-secondary-light small">Draft Jobs</div>
            <div className="h4 mb-0 text-warning">{kpis.draftJobs}</div>
          </div>
          <div className="text-center w-25 border-start ps-4">
            <div className="text-secondary-light small">Closed Jobs</div>
            <div className="h4 mb-0 text-danger">{kpis.closedJobs}</div>
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
            <option>Active</option>
            <option>Open</option>
            <option>Draft</option>
            <option>Closed</option>
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
                    <span className={`badge ${
                      (job.status === 'Open' || job.status === 'Active') ? 'bg-success-subtle text-success' : 
                      job.status === 'Closed' ? 'bg-danger-subtle text-danger' : 
                      job.status === 'On Hold' ? 'bg-warning-subtle text-warning' : 
                      job.status === 'Draft' ? 'bg-info-subtle text-info' :
                      'bg-secondary-subtle text-secondary'
                    }`}>
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
                  <h5 className="mb-2">{selectedJob.fullData?.title || selectedJob.title}</h5>
                  <div className="d-flex justify-content-center gap-2 mb-2">
                    <span className={`badge ${
                      (selectedJob.status === 'Open' || selectedJob.status === 'Active') ? 'bg-success' : 
                      selectedJob.status === 'Closed' ? 'bg-danger' : 
                      selectedJob.status === 'On Hold' ? 'bg-warning' : 
                      selectedJob.status === 'Draft' ? 'bg-info' :
                      'bg-secondary'
                    }`}>
                      {selectedJob.status}
                    </span>
                    <span className="badge bg-primary">{selectedJob.fullData?.department || selectedJob.department}</span>
                    {selectedJob.fullData?.employment_type && (
                      <span className="badge bg-secondary">{selectedJob.fullData.employment_type}</span>
                    )}
                  </div>
                  <div className="d-flex justify-content-center gap-3 text-muted small">
                    <span><i className="bi bi-geo-alt me-1"></i>{selectedJob.fullData?.location || 'Location not specified'}</span>
                    <span><i className="bi bi-calendar me-1"></i>Posted {selectedJob.postedOn}</span>
                    {selectedJob.fullData?.experience_level && (
                      <span><i className="bi bi-briefcase me-1"></i>{selectedJob.fullData.experience_level}</span>
                    )}
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
                              <p className="mb-0 fw-medium">{selectedJob.fullData?.title || selectedJob.title || 'N/A'}</p>
                            </div>
                            <div className="mb-2">
                              <label className="form-label text-muted small fw-semibold">Department</label>
                              <p className="mb-0 fw-medium">{selectedJob.fullData?.department || selectedJob.department || 'N/A'}</p>
                            </div>
                            <div className="mb-2">
                              <label className="form-label text-muted small fw-semibold">Location</label>
                              <p className="mb-0 fw-medium">{selectedJob.fullData?.location || 'Not specified'}</p>
                            </div>
                            <div className="mb-2">
                              <label className="form-label text-muted small fw-semibold">Experience Level</label>
                              <p className="mb-0 fw-medium">{selectedJob.fullData?.experience_level || 'Not specified'}</p>
                            </div>
                            <div className="mb-0">
                              <label className="form-label text-muted small fw-semibold">Employment Type</label>
                              <p className="mb-0 fw-medium">{selectedJob.fullData?.employment_type || 'Not specified'}</p>
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
                              <p className="mb-0 fw-medium">{selectedJob.postedOn || 'N/A'}</p>
                            </div>
                            <div className="mb-2">
                              <label className="form-label text-muted small fw-semibold">Recruiter</label>
                              <p className="mb-0 fw-medium">{selectedJob.recruiter || selectedJob.fullData?.recruiter?.name || 'System'}</p>
                            </div>
                            <div className="mb-2">
                              <label className="form-label text-muted small fw-semibold">Total Applicants</label>
                              <p className="mb-0 fw-medium">{selectedJob.applicants || selectedJob.fullData?.applications?.length || 0}</p>
                            </div>
                            <div className="mb-2">
                              <label className="form-label text-muted small fw-semibold">Salary Range</label>
                              <p className="mb-0 fw-medium">
                                {selectedJob.fullData?.salary_min && selectedJob.fullData?.salary_max 
                                  ? `₹${selectedJob.fullData.salary_min} - ₹${selectedJob.fullData.salary_max}`
                                  : 'Not specified'}
                              </p>
                            </div>
                            <div className="mb-0">
                              <label className="form-label text-muted small fw-semibold">Job Status</label>
                              <p className="mb-0 fw-medium">{selectedJob.status || selectedJob.fullData?.status || 'N/A'}</p>
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
                          <p className="mb-3" style={{whiteSpace: 'pre-wrap'}}>
                            {selectedJob.fullData?.description || selectedJob.fullData?.job_description || 'No description available'}
                          </p>
                          <div>
                            <label className="form-label text-muted small fw-semibold mb-2">Required Skills</label>
                            <div className="d-flex flex-wrap gap-2">
                              {selectedJob.fullData?.skills && selectedJob.fullData.skills.length > 0 ? (
                                selectedJob.fullData.skills.map((skill, index) => (
                                  <span key={index} className="badge bg-primary">{skill}</span>
                                ))
                              ) : selectedJob.fullData?.required_skills ? (
                                // Handle if skills are stored as comma-separated string
                                selectedJob.fullData.required_skills.split(',').map((skill, index) => (
                                  <span key={index} className="badge bg-primary">{skill.trim()}</span>
                                ))
                              ) : (
                                <span className="text-muted">No skills specified</span>
                              )}
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
                        <h6 className="card-title text-primary mb-3">
                          Candidates ({selectedJob.fullData?.applications?.length || 0})
                        </h6>
                        
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
                              {selectedJob.fullData?.applications && selectedJob.fullData.applications.length > 0 ? (
                                selectedJob.fullData.applications.map((application, index) => {
                                  const candidateName = application.candidate_name || application.name || `Candidate ${index + 1}`;
                                  const initials = candidateName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
                                  const appliedDate = application.applied_date || application.created_at 
                                    ? new Date(application.applied_date || application.created_at).toLocaleDateString('en-GB', {
                                        day: '2-digit',
                                        month: 'short',
                                        year: 'numeric'
                                      })
                                    : 'N/A';
                                  
                                  const stage = application.stage || 'Applied';
                                  const status = application.status || (
                                    stage === 'Hired' ? 'Completed' :
                                    stage === 'Interview' || stage === 'Screening' ? 'In Progress' :
                                    stage === 'Offer' ? 'Awaiting Decision' :
                                    'Pending'
                                  );
                                  
                                  const statusBadgeClass = 
                                    status === 'Completed' ? 'bg-success' :
                                    status === 'In Progress' ? 'bg-info' :
                                    status === 'Awaiting Decision' ? 'bg-warning' :
                                    status === 'Rejected' ? 'bg-danger' :
                                    'bg-secondary';

                                  return (
                                    <tr key={application.id || index}>
                                      <td className="text-start">
                                        <div className="d-flex align-items-center">
                                          <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-2" style={{width: '30px', height: '30px', fontSize: '12px'}}>
                                            {initials}
                                          </div>
                                          <span className="fw-medium small">{candidateName}</span>
                                        </div>
                                      </td>
                                      <td className="text-center small">{stage}</td>
                                      <td className="text-center">
                                        <span className={`badge ${statusBadgeClass} small`}>{status}</span>
                                      </td>
                                      <td className="text-center text-muted small">{appliedDate}</td>
                                      <td className="text-center">
                                        <button 
                                          className="btn btn-sm btn-outline-primary" 
                                          title="View Profile" 
                                          onClick={() => handleViewCandidate(application.candidate_id || application.id)} 
                                          style={{padding: '2px 6px', fontSize: '12px'}}
                                        >
                                          <Eye size={12} />
                                        </button>
                                      </td>
                                    </tr>
                                  );
                                })
                              ) : (
                                <tr>
                                  <td colSpan="5" className="text-center text-muted py-4">
                                    <div className="d-flex flex-column align-items-center">
                                      <Calendar size={32} className="mb-2 text-secondary" />
                                      <span>No candidates have applied to this job yet</span>
                                    </div>
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Analytics Tab */}
                  {activeTab === 'analytics' && analyticsData && (
                    <div>
                      {/* Show message if no applicants */}
                      {analyticsData.metrics.totalApplicants === 0 ? (
                        <div className="card border-0 bg-light">
                          <div className="card-body text-center py-5">
                            <div className="mb-3">
                              <i className="bi bi-bar-chart-line" style={{fontSize: '48px', color: '#6c757d'}}></i>
                            </div>
                            <h6 className="mb-2">No Analytics Data Available</h6>
                            <p className="text-muted mb-0">
                              Analytics will appear here once candidates start applying to this job.
                            </p>
                          </div>
                        </div>
                      ) : (
                        <>
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
                        </>
                      )}
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
      </>
      )}
    </div>
  );
};

export default JobsListPage;
