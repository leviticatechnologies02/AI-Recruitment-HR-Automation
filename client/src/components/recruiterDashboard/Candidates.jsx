import React, { useState } from 'react';
import { Search, Filter, Download, X, ChevronLeft, ChevronRight, UserPlus, ArrowRight, Eye, Copy, Trash2, Printer } from 'lucide-react';

const CandidatesPage = () => {
  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    skills: '',
    job: '',
    stage: '',
    recruiter: ''
  });
  const [showCandidateModal, setShowCandidateModal] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  // Sample data
  const candidates = [
    { id: 1, name: 'Priya Sharma', role: 'Frontend Developer', skills: ['React', 'JS', 'CSS'], stage: 'Interview', status: 'In Progress' },
    { id: 2, name: 'Rohit Verma', role: 'Backend Engineer', skills: ['Python', 'SQL'], stage: 'Applied', status: 'Pending' },
    { id: 3, name: 'Sneha Reddy', role: 'UI Designer', skills: ['Figma', 'HTML'], stage: 'Hired', status: 'Completed' },
    { id: 4, name: 'Vikas Rao', role: 'QA Engineer', skills: ['Selenium', 'JS'], stage: 'Offer', status: 'Awaiting Decision' },
    { id: 5, name: 'Ananya Patel', role: 'Frontend Developer', skills: ['React', 'TypeScript'], stage: 'Interview', status: 'In Progress' },
    { id: 6, name: 'Karthik Kumar', role: 'Backend Engineer', skills: ['Node.js', 'MongoDB'], stage: 'Screening', status: 'In Progress' },
    { id: 7, name: 'Meera Joshi', role: 'Data Analyst', skills: ['Python', 'Tableau'], stage: 'Applied', status: 'Pending' },
    { id: 8, name: 'Arjun Singh', role: 'DevOps Engineer', skills: ['AWS', 'Docker'], stage: 'Interview', status: 'In Progress' },
  ];

  const insights = {
    total: 480,
    inInterview: 120,
    offersSent: 30,
    hired: 12
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedCandidates(candidates.map(c => c.id));
    } else {
      setSelectedCandidates([]);
    }
  };

  const handleSelectCandidate = (id) => {
    setSelectedCandidates(prev => 
      prev.includes(id) ? prev.filter(cId => cId !== id) : [...prev, id]
    );
  };

  const getStageColor = (stage) => {
    const colors = {
      'Applied': 'bg-primary-subtle text-primary',
      'Screening': 'bg-info-subtle text-info',
      'Interview': 'bg-warning-subtle text-warning',
      'Offer': 'bg-success-subtle text-success',
      'Hired': 'bg-success-subtle text-success'
    };
    return colors[stage] || 'bg-secondary-subtle text-secondary';
  };

  const getStatusColor = (status) => {
    const colors = {
      'Pending': 'text-secondary',
      'In Progress': 'text-primary',
      'Completed': 'text-success',
      'Awaiting Decision': 'text-warning'
    };
    return colors[status] || 'text-secondary';
  };

  // Filter candidates based on search and filters
  const filteredCandidates = candidates.filter(candidate => {
    const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesSkills = !filters.skills || candidate.skills.some(skill => 
      skill.toLowerCase().includes(filters.skills.toLowerCase())
    );
    
    const matchesJob = !filters.job || candidate.role.toLowerCase().includes(filters.job.toLowerCase());
    
    const matchesStage = !filters.stage || candidate.stage.toLowerCase() === filters.stage.toLowerCase();
    
    const matchesRecruiter = !filters.recruiter || filters.recruiter === 'AI'; // All candidates are managed by AI
    
    return matchesSearch && matchesSkills && matchesJob && matchesStage && matchesRecruiter;
  });

  const totalPages = Math.ceil(filteredCandidates.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCandidates = filteredCandidates.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filters]);

  const handleExport = () => {
    const csv = [
      ['Candidate Name', 'Job Role', 'Skills', 'Stage', 'Status'],
      ...filteredCandidates.map(candidate => [
        candidate.name,
        candidate.role,
        candidate.skills.join(', '),
        candidate.stage,
        candidate.status
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'candidates-list.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleViewCandidate = (candidateId) => {
    const candidate = candidates.find(c => c.id === candidateId);
    if (candidate) {
      setSelectedCandidate(candidate);
      setShowCandidateModal(true);
    }
  };

  const handleCloseCandidateModal = () => {
    setShowCandidateModal(false);
    setSelectedCandidate(null);
  };

  return (
    <div className="container-fluid py-4">
      {/* Page Header */}
      <div className="mb-4">
        <h4 className="mb-2">👥 Candidates</h4>
        <p className="text-secondary-light mb-0">View, filter, and manage all job applicants.</p>
      </div>

      {/* KPI Summary */}
      <div className="card border shadow-none mb-4">
        <div className="card-body d-flex">
          <div className="text-center w-25">
            <div className="text-secondary-light small">Total Candidates</div>
            <div className="h4 mb-0">{insights.total}</div>
          </div>
          <div className="text-center w-25 border-start ps-4">
            <div className="text-secondary-light small">In Interview</div>
            <div className="h4 mb-0 text-primary">{insights.inInterview}</div>
          </div>
          <div className="text-center w-25 border-start ps-4">
            <div className="text-secondary-light small">Offers Sent</div>
            <div className="h4 mb-0 text-success">{insights.offersSent}</div>
          </div>
          <div className="text-center w-25 border-start ps-4">
            <div className="text-secondary-light small">Hired</div>
            <div className="h4 mb-0 text-danger">{insights.hired}</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card border shadow-none mb-4">
        <div className="card-body d-flex gap-3 align-items-center">
          <div className="flex-grow-1">
            <div className="input-group" style={{maxWidth: '400px'}}>
              <span className="input-group-text bg-white border-end-0" style={{
                borderTopLeftRadius: '0.375rem', 
                borderBottomLeftRadius: '0.375rem',
                borderRight: 'none'
              }}>
                <Search size={16} className="text-muted" />
              </span>
              <input 
                className="form-control border-start-0" 
                placeholder="Search candid" 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  borderTopRightRadius: '0.375rem', 
                  borderBottomRightRadius: '0.375rem',
                  borderLeft: 'none',
                  fontSize: '14px',
                  padding: '8px 12px'
                }}
              />
            </div>
          </div>

          <select 
            className="form-select w-auto" 
            value={filters.skills}
            onChange={(e) => setFilters(prev => ({ ...prev, skills: e.target.value }))}
          >
            <option value="">All Skills</option>
            <option value="react">React.js</option>
            <option value="python">Python</option>
            <option value="sql">SQL</option>
            <option value="figma">Figma</option>
            <option value="js">JavaScript</option>
            <option value="css">CSS</option>
            <option value="html">HTML</option>
            <option value="typescript">TypeScript</option>
            <option value="node">Node.js</option>
            <option value="mongodb">MongoDB</option>
            <option value="selenium">Selenium</option>
            <option value="tableau">Tableau</option>
            <option value="aws">AWS</option>
            <option value="docker">Docker</option>
          </select>

          <select 
            className="form-select w-auto"
            value={filters.job}
            onChange={(e) => setFilters(prev => ({ ...prev, job: e.target.value }))}
          >
            <option value="">All Jobs</option>
            <option value="frontend">Frontend Developer</option>
            <option value="backend">Backend Engineer</option>
            <option value="qa">QA Engineer</option>
            <option value="designer">UI Designer</option>
            <option value="data">Data Analyst</option>
            <option value="devops">DevOps Engineer</option>
          </select>

          <select 
            className="form-select w-auto"
            value={filters.stage}
            onChange={(e) => setFilters(prev => ({ ...prev, stage: e.target.value }))}
          >
            <option value="">All Stages</option>
            <option value="applied">Applied</option>
            <option value="screening">Screening</option>
            <option value="interview">Interview</option>
            <option value="offer">Offer</option>
            <option value="hired">Hired</option>
          </select>

          <select 
            className="form-select w-auto"
            value={filters.recruiter}
            onChange={(e) => setFilters(prev => ({ ...prev, recruiter: e.target.value }))}
          >
            <option value="">All Recruiters</option>
            <option value="AI">AI</option>
          </select>

          <div className="d-flex gap-2">
            <button className="btn btn-dark" onClick={handleExport}><Download size={14} className="me-2"/>Export</button>
            <button className="btn btn-dark" onClick={handlePrint}><Printer size={14} /></button>
          </div>
        </div>
      </div>

      {/* Bulk Actions Bar */}
      {selectedCandidates.length > 0 && (
        <div className="alert alert-info d-flex align-items-center justify-content-between mb-4">
          <div className="d-flex align-items-center gap-3">
            <span className="fw-medium">
              {selectedCandidates.length} candidate{selectedCandidates.length > 1 ? 's' : ''} selected
            </span>
            <div className="vr"></div>
            <button className="btn btn-danger btn-sm">
              <Trash2 size={14} className="me-1" />
              Delete
            </button>
            <button className="btn btn-warning btn-sm">
              <Copy size={14} className="me-1" />
              Duplicate
            </button>
            <button className="btn btn-secondary btn-sm">
              <X size={14} className="me-1" />
              Close Selected
            </button>
          </div>
          <button
            onClick={() => setSelectedCandidates([])}
            className="btn btn-link p-0 text-decoration-none"
          >
            Clear Selection
          </button>
        </div>
      )}

      {/* Candidates Table */}
      <div className="card border shadow-none mb-4">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th style={{width: 40}} className="text-center">
                  <input 
                    type="checkbox" 
                    className="form-check-input"
                    checked={selectedCandidates.length === currentCandidates.length && currentCandidates.length > 0} 
                    onChange={handleSelectAll} 
                  />
                </th>
                <th className="text-start">CANDIDATE NAME</th>
                <th className="text-start">JOB ROLE</th>
                <th className="text-start">SKILLS</th>
                <th className="text-center">STAGE</th>
                <th className="text-center">STATUS</th>
                <th className="text-center">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {currentCandidates.map(candidate => (
                <tr key={candidate.id}>
                  <td className="text-center">
                    <input 
                      type="checkbox" 
                      className="form-check-input"
                      checked={selectedCandidates.includes(candidate.id)} 
                      onChange={() => handleSelectCandidate(candidate.id)} 
                    />
                  </td>
                  <td className="text-start">
                    <div className="d-flex align-items-center">
                      <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '40px', height: '40px'}}>
                        {candidate.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="fw-medium">{candidate.name}</span>
                    </div>
                  </td>
                  <td className="text-start text-muted">{candidate.role}</td>
                  <td className="text-start">
                    <div className="d-flex flex-wrap gap-1">
                      {candidate.skills.map((skill, idx) => (
                        <span key={idx} className="badge bg-light text-dark">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="text-center">
                    <span className={`badge ${getStageColor(candidate.stage)}`}>
                      {candidate.stage}
                    </span>
                  </td>
                  <td className="text-center">
                    <span className={`text-sm fw-medium ${getStatusColor(candidate.status)}`}>
                      {candidate.status}
                    </span>
                  </td>
                  <td className="text-center">
                    <button 
                      type="button" 
                      className="btn btn-sm btn-icon btn-light" 
                      title="View"
                      onClick={() => handleViewCandidate(candidate.id)}
                    >
                      <Eye size={16} />
                    </button>
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
            Showing <strong>{startIndex+1}</strong> to <strong>{Math.min(endIndex, filteredCandidates.length)}</strong> of <strong>{filteredCandidates.length}</strong> candidates
          </small>
        </div>

        <div className="d-flex align-items-center gap-3">
          <div className="btn-group" role="group">
            <button 
              className="btn btn-outline-secondary" 
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))} 
              disabled={currentPage === 1}
            >
              Previous
            </button>
            {[...Array(totalPages)].map((_, idx) => {
              const pageNum = idx + 1;
              return (
                <button 
                  key={pageNum}
                  className={pageNum === currentPage ? 'btn btn-primary' : 'btn btn-outline-secondary'} 
                  onClick={() => setCurrentPage(pageNum)}
                >
                  {pageNum}
                </button>
              );
            })}
            <button 
              className="btn btn-outline-secondary" 
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))} 
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>

       
        </div>
      </div>

      {/* Candidate Detail Modal */}
      {showCandidateModal && selectedCandidate && (
        <div className="modal fade show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050}} tabIndex="-1">
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Candidate Details</h5>
                <button type="button" className="btn-close" onClick={handleCloseCandidateModal}></button>
              </div>
              <div className="modal-body">
                {/* Header Section */}
                <div className="text-center mb-4 pb-3 border-bottom">
                  <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" style={{width: '80px', height: '80px'}}>
                    <span className="fs-3 fw-bold">{selectedCandidate.name.split(' ').map(n => n[0]).join('')}</span>
                  </div>
                  <h4 className="mb-2">{selectedCandidate.name}</h4>
                  <p className="text-muted mb-2">{selectedCandidate.role}</p>
                  <div className="d-flex justify-content-center gap-2">
                    <span className={`badge ${getStageColor(selectedCandidate.stage)}`}>
                      {selectedCandidate.stage}
                    </span>
                    <span className={`badge ${selectedCandidate.status === 'In Progress' ? 'bg-primary-subtle text-primary' : selectedCandidate.status === 'Completed' ? 'bg-success-subtle text-success' : selectedCandidate.status === 'Pending' ? 'bg-warning-subtle text-warning' : 'bg-secondary-subtle text-secondary'}`}>
                      {selectedCandidate.status}
                    </span>
                  </div>
                </div>

                {/* Details Section */}
                <div className="row">
                  <div className="col-md-6">
                    <div className="card border-0 bg-light">
                      <div className="card-body">
                        <h6 className="card-title text-primary mb-3">Personal Information</h6>
                        <div className="mb-3">
                          <label className="form-label text-muted small fw-semibold">Full Name</label>
                          <p className="mb-0 fw-medium">{selectedCandidate.name}</p>
                        </div>
                        <div className="mb-3">
                          <label className="form-label text-muted small fw-semibold">Job Role</label>
                          <p className="mb-0 fw-medium">{selectedCandidate.role}</p>
                        </div>
                        <div className="mb-3">
                          <label className="form-label text-muted small fw-semibold">Location</label>
                          <p className="mb-0 fw-medium">Hyderabad, India</p>
                        </div>
                        <div className="mb-0">
                          <label className="form-label text-muted small fw-semibold">Experience</label>
                          <p className="mb-0 fw-medium">2-3 years of experience in {selectedCandidate.role}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="card border-0 bg-light">
                      <div className="card-body">
                        <h6 className="card-title text-primary mb-3">Contact Information</h6>
                        <div className="mb-3">
                          <label className="form-label text-muted small fw-semibold">Phone Number</label>
                          <p className="mb-0 fw-medium">+91 9876543210</p>
                        </div>
                        <div className="mb-3">
                          <label className="form-label text-muted small fw-semibold">Email Address</label>
                          <p className="mb-0 fw-medium">{selectedCandidate.name.toLowerCase().replace(' ', '.')}@email.com</p>
                        </div>
                        <div className="mb-3">
                          <label className="form-label text-muted small fw-semibold">Current Stage</label>
                          <p className="mb-0 fw-medium">{selectedCandidate.stage}</p>
                        </div>
                        <div className="mb-0">
                          <label className="form-label text-muted small fw-semibold">Application Status</label>
                          <p className="mb-0 fw-medium">{selectedCandidate.status}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Skills Section */}
                <div className="mt-4">
                  <div className="card border-0 bg-light">
                    <div className="card-body">
                      <h6 className="card-title text-primary mb-3">Technical Skills</h6>
                      <div className="d-flex flex-wrap gap-2">
                        {selectedCandidate.skills.map((skill, idx) => (
                          <span key={idx} className="badge bg-primary fs-6 px-3 py-2">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCloseCandidateModal}>
                  Close
                </button>
                <button type="button" className="btn btn-primary">
                  Schedule Interview
                </button>
                <button type="button" className="btn btn-success">
                  Move to Next Stage
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CandidatesPage;
