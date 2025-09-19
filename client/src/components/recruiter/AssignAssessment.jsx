import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  Search,
  Filter,
  Send,
  AlertCircle,
  CheckCircle,
  X,
  Plus,
  Users
} from 'lucide-react';

const AssignAssessmentPage = () => {
  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const [selectedAssessment, setSelectedAssessment] = useState('');
  const [selectedJob, setSelectedJob] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [dueTime, setDueTime] = useState('');
  const [instructions, setInstructions] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Sample data
  const candidates = [
    { id: 1, name: 'Sarah Johnson', email: 'sarah.j@email.com', role: 'Frontend Developer', status: 'Active' },
    { id: 2, name: 'Michael Chen', email: 'michael.c@email.com', role: 'Backend Developer', status: 'Active' },
    { id: 3, name: 'Emily Rodriguez', email: 'emily.r@email.com', role: 'Full Stack Developer', status: 'In Process' },
    { id: 4, name: 'David Kim', email: 'david.k@email.com', role: 'DevOps Engineer', status: 'Active' },
    { id: 5, name: 'Jessica Liu', email: 'jessica.l@email.com', role: 'UI/UX Designer', status: 'In Process' },
  ];

  const assessments = [
    { id: 1, name: 'JavaScript Fundamentals', type: 'Technical', difficulty: 'Intermediate', questions: 25 },
    { id: 2, name: 'React Development', type: 'Technical', difficulty: 'Advanced', questions: 30 },
    { id: 3, name: 'Problem Solving Skills', type: 'Cognitive', difficulty: 'Intermediate', questions: 20 },
    { id: 4, name: 'System Design', type: 'Technical', difficulty: 'Advanced', questions: 15 },
  ];

  const jobs = [
    { id: 1, title: 'Senior Frontend Developer' },
    { id: 2, title: 'Backend Engineer' },
    { id: 3, title: 'Full Stack Developer' },
    { id: 4, title: 'DevOps Specialist' },
  ];

  const filteredCandidates = candidates.filter(candidate =>
    candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    candidate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    candidate.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleCandidateSelection = (candidateId) => {
    setSelectedCandidates(prev =>
      prev.includes(candidateId)
        ? prev.filter(id => id !== candidateId)
        : [...prev, candidateId]
    );
  };

  const selectAllCandidates = () => {
    if (selectedCandidates.length === filteredCandidates.length) {
      setSelectedCandidates([]);
    } else {
      setSelectedCandidates(filteredCandidates.map(c => c.id));
    }
  };

  const handleAssign = () => {
    if (selectedCandidates.length === 0) {
      setErrorMessage('Please select at least one candidate.');
      setShowError(true);
      return;
    }
    if (!selectedAssessment) {
      setErrorMessage('Please select an assessment.');
      setShowError(true);
      return;
    }
    if (!dueDate) {
      setErrorMessage('Please set a due date.');
      setShowError(true);
      return;
    }

    setShowSuccess(true);
    setShowError(false);
    
    setTimeout(() => {
      setSelectedCandidates([]);
      setSelectedAssessment('');
      setSelectedJob('');
      setDueDate('');
      setDueTime('');
      setInstructions('');
      setShowSuccess(false);
    }, 3000);
  };

  const getDifficultyBadgeClass = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'badge bg-success';
      case 'Intermediate': return 'badge bg-warning text-dark';
      case 'Advanced': return 'badge bg-danger';
      default: return 'badge bg-secondary';
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Active': return 'badge bg-success';
      case 'In Process': return 'badge bg-info text-dark';
      default: return 'badge bg-secondary';
    }
  };

  return (
    <div className="container-fluid p-3">
      {/* Success Alert */}
      {showSuccess && (
        <div
          className="alert alert-success alert-dismissible fade show"
          role="alert"
          style={{ position: 'fixed', top: '1rem', right: '1rem', zIndex: 1050 }}
        >
          <span className="me-2"><CheckCircle size={18} /></span>
          Assessment assigned successfully!
          <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowSuccess(false)}></button>
        </div>
      )}

      {/* Error Alert */}
      {showError && (
        <div
          className="alert alert-danger alert-dismissible fade show"
          role="alert"
          style={{ position: 'fixed', top: '1rem', right: '1rem', zIndex: 1050 }}
        >
          <span className="me-2"><AlertCircle size={18} /></span>
          {errorMessage}
          <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowError(false)}></button>
        </div>
      )}

      {/* Page Header */}
      <div className="mb-3">
        <h4 className="mb-1">Assign Assessment</h4>
        <p className="text-muted mb-0">Send assessments to candidates for evaluation.</p>
      </div>

      <div className="row g-3">
        {/* Main Form */}
        <div className="col-12 col-lg-8">
          {/* Candidate Selector */}
          <div className="card mb-3">
            <div className="card-body">
              <h6 className="mb-3">Select Candidates</h6>

              {/* Search and Filter */}
              <div className="d-flex align-items-center gap-2 mb-3">
                <div className="input-group">
                  <span className="input-group-text"><Search size={16} className="text-muted" /></span>
                  <input
                    type="text"
                    placeholder="Search candidates..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="form-control"
                  />
                </div>
                <button type="button" className="btn btn-outline-secondary d-inline-flex align-items-center">
                  <Filter size={16} className="me-2" />
                  Filter
                </button>
              </div>

              {filteredCandidates.length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0">
                    <thead className="table-light">
                      <tr>
                        <th style={{ width: 40 }}>
                          <div className="form-check m-0">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={selectedCandidates.length === filteredCandidates.length && filteredCandidates.length > 0}
                              onChange={selectAllCandidates}
                            />
                          </div>
                        </th>
                        <th>Candidate Name</th>
                        <th>Role Applied For</th>
                        <th>Email</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredCandidates.map((candidate) => (
                        <tr key={candidate.id}>
                          <td>
                            <div className="form-check m-0">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                checked={selectedCandidates.includes(candidate.id)}
                                onChange={() => toggleCandidateSelection(candidate.id)}
                              />
                            </div>
                          </td>
                          <td className="fw-medium">{candidate.name}</td>
                          <td className="text-muted">{candidate.role}</td>
                          <td className="text-muted">{candidate.email}</td>
                          <td>
                            <span className={`${getStatusBadgeClass(candidate.status)} rounded-pill`}>{candidate.status}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-5">
                  <Users size={48} className="text-muted mb-2" />
                  <h6 className="mb-1">No candidates available</h6>
                  <p className="text-muted mb-3">No candidates available to assign assessments. Please add candidates first.</p>
                  <button type="button" className="btn btn-primary d-inline-flex align-items-center">
                    <Plus size={16} className="me-2" />
                    Add Candidates
                  </button>
                </div>
              )}

              {selectedCandidates.length > 0 && (
                <div className="alert alert-primary mt-3 mb-0" role="alert">
                  {selectedCandidates.length} candidate(s) selected
                </div>
              )}
            </div>
          </div>

          {/* Assessment Selector */}
          <div className="card mb-3">
            <div className="card-body">
              <h6 className="mb-3">Select Assessment</h6>

              <div className="row g-3">
                {assessments.map((assessment) => (
                  <div key={assessment.id} className="col-12 col-md-6">
                    <div
                      className={`card border-2 ${selectedAssessment === assessment.id ? 'border-primary bg-primary-subtle' : 'border-secondary'}`}
                      style={{ cursor: 'pointer' }}
                      onClick={() => setSelectedAssessment(assessment.id)}
                    >
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <h6 className="mb-0">{assessment.name}</h6>
                          <span className={`${getDifficultyBadgeClass(assessment.difficulty)} rounded-pill`}>{assessment.difficulty}</span>
                        </div>
                        <div className="text-muted small mb-1">{assessment.type}</div>
                        <div className="text-muted small">{assessment.questions} questions</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Side Panel */}
        <div className="col-12 col-lg-4">
          {/* Job Selector */}
          <div className="card mb-3">
            <div className="card-body">
              <h6 className="mb-3">Job Position (Optional)</h6>
              <select
                value={selectedJob}
                onChange={(e) => setSelectedJob(e.target.value)}
                className="form-select"
              >
                <option value="">Select a job position</option>
                {jobs.map((job) => (
                  <option key={job.id} value={job.id}>{job.title}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Due Date */}
          <div className="card mb-3">
            <div className="card-body">
              <h6 className="mb-3">Due Date & Time</h6>
              <div className="row g-3">
                <div className="col-12">
                  <label className="form-label">Date</label>
                  <div className="input-group">
                    <span className="input-group-text"><Calendar size={16} className="text-muted" /></span>
                    <input
                      type="date"
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-12">
                  <label className="form-label">Time</label>
                  <div className="input-group">
                    <span className="input-group-text"><Clock size={16} className="text-muted" /></span>
                    <input
                      type="time"
                      value={dueTime}
                      onChange={(e) => setDueTime(e.target.value)}
                      className="form-control"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="card mb-3">
            <div className="card-body">
              <h6 className="mb-3">Additional Instructions</h6>
              <textarea
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                placeholder="Add any specific instructions for candidates..."
                rows={4}
                className="form-control"
              />
            </div>
          </div>

          {/* Assign Button */}
          <button
            onClick={handleAssign}
            type="button"
            className="btn btn-primary w-100 d-inline-flex align-items-center justify-content-center"
          >
            <Send size={16} className="me-2" />
            <span>Assign Assessment</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignAssessmentPage;