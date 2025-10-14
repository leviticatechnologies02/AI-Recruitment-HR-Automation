import React, { useState } from 'react';
import { Calendar, Users, ClipboardList, Send, X, Search, Filter } from 'lucide-react';

const AssignAssessment = () => {
  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const [selectedAssessment, setSelectedAssessment] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showSuccess, setShowSuccess] = useState(false);

  const candidates = [
    { id: 1, name: 'Nagendra Uggirala', role: 'Frontend Developer', status: 'Interview Stage', email: 'nagendra@example.com' },
    { id: 2, name: 'Priya Sharma', role: 'UI Designer', status: 'Screening', email: 'priya@example.com' },
    { id: 3, name: 'Ravi Kumar', role: 'Backend Developer', status: 'Applied', email: 'ravi@example.com' },
    { id: 4, name: 'Anjali Reddy', role: 'Full Stack Developer', status: 'Interview Stage', email: 'anjali@example.com' },
    { id: 5, name: 'Vikram Singh', role: 'Frontend Developer', status: 'Applied', email: 'vikram@example.com' },
    { id: 6, name: 'Meera Patel', role: 'UI Designer', status: 'Screening', email: 'meera@example.com' }
  ];

  const assessments = [
    { id: 1, name: 'React Developer Test', duration: '60 mins', questions: 25 },
    { id: 2, name: 'HTML & CSS Basics', duration: '45 mins', questions: 20 },
    { id: 3, name: 'Aptitude & Reasoning', duration: '30 mins', questions: 30 },
    { id: 4, name: 'Communication Round', duration: '90 mins', questions: 10 },
    { id: 5, name: 'JavaScript Fundamentals', duration: '50 mins', questions: 22 },
    { id: 6, name: 'System Design', duration: '120 mins', questions: 5 }
  ];

  const filteredCandidates = candidates.filter(candidate => {
    const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || candidate.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const toggleCandidate = (candidateId) => {
    setSelectedCandidates(prev =>
      prev.includes(candidateId)
        ? prev.filter(id => id !== candidateId)
        : [...prev, candidateId]
    );
  };

  const selectAllVisible = () => {
    const allVisibleIds = filteredCandidates.map(c => c.id);
    setSelectedCandidates(allVisibleIds);
  };

  const clearSelection = () => {
    setSelectedCandidates([]);
  };

  const handleAssign = () => {
    if (selectedCandidates.length > 0 && selectedAssessment && dueDate) {
      setShowSuccess(true);
      // Immediately clear selections after successful assignment
      setSelectedCandidates([]);
      setSelectedAssessment('');
      setDueDate('');
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Interview Stage': return 'bg-primary-subtle text-primary';
      case 'Screening': return 'bg-warning-subtle text-warning';
      case 'Applied': return 'bg-success-subtle text-success';
      default: return 'bg-secondary-subtle text-secondary';
    }
  };

  const selectedAssessmentDetails = assessments.find(a => a.id === parseInt(selectedAssessment));

  return (
    <div className="container-fluid">
      {/* Header */}
      <div className="card border shadow-none mb-4">
        <div className="card-body">
          <div className="d-flex align-items-center justify-content-between">
            <div>
              <h4 className="mb-1">Assign Assessment</h4>
              <p className="text-muted mb-0">Select candidates and assign them an assessment test</p>
            </div>
            <div className="d-flex align-items-center gap-2 px-3 py-2 bg-primary-subtle text-primary rounded">
              <ClipboardList size={18} />
              <span className="fw-medium">{selectedCandidates.length} Selected</span>
            </div>
          </div>
        </div>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="alert alert-success alert-dismissible fade show mb-4" role="alert">
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center gap-3">
              <div className="bg-success-subtle rounded-circle d-flex align-items-center justify-content-center" style={{width: '40px', height: '40px'}}>
                <Send size={18} className="text-success" />
              </div>
              <div>
                <h6 className="alert-heading mb-1">
                  Assessment "{selectedAssessmentDetails?.name}" assigned successfully to {selectedCandidates.length} candidate{selectedCandidates.length !== 1 ? 's' : ''}!
                </h6>
                <p className="mb-0 small">
                  Due Date: {new Date(dueDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })} • Email notifications sent
                </p>
              </div>
            </div>
            <button type="button" className="btn-close" onClick={() => setShowSuccess(false)}></button>
          </div>
        </div>
      )}

      <div className="row g-4">
        {/* Left Section - Candidate Selection */}
        <div className="col-lg-8">
          <div className="card border shadow-none">
            <div className="card-header bg-white border-bottom">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h5 className="mb-0 d-flex align-items-center gap-2">
                  <Users size={18} />
                  Select Candidates
                </h5>
                <div className="d-flex gap-2">
                  <button
                    onClick={selectAllVisible}
                    className="btn btn-sm btn-outline-primary"
                  >
                    Select All
                  </button>
                  <button
                    onClick={clearSelection}
                    className="btn btn-sm btn-outline-secondary"
                  >
                    Clear
                  </button>
                </div>
              </div>

              {/* Search and Filter */}
              <div className="row g-2">
                <div className="col-md-8">
                  <div className="input-group">
                    <span className="input-group-text">
                      <Search size={16} />
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search candidates..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="input-group">
                    <span className="input-group-text">
                      <Filter size={16} />
                    </span>
                    <select
                      className="form-select"
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                    >
                      <option value="all">All Status</option>
                      <option value="Interview Stage">Interview Stage</option>
                      <option value="Screening">Screening</option>
                      <option value="Applied">Applied</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Candidate List */}
            <div className="card-body p-0">
              {filteredCandidates.map((candidate) => (
                <div
                  key={candidate.id}
                  onClick={() => toggleCandidate(candidate.id)}
                  className={`p-3 border-bottom cursor-pointer ${
                    selectedCandidates.includes(candidate.id)
                      ? 'bg-primary-subtle'
                      : 'hover-bg-light'
                  }`}
                  style={{cursor: 'pointer'}}
                >
                  <div className="d-flex align-items-center gap-3">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={selectedCandidates.includes(candidate.id)}
                        onChange={() => {}}
                      />
                    </div>
                    <div className="flex-grow-1">
                      <h6 className="mb-1">{candidate.name}</h6>
                      <p className="text-muted small mb-1">{candidate.role}</p>
                      <p className="text-muted small mb-0">{candidate.email}</p>
                    </div>
                    <span className={`badge ${getStatusColor(candidate.status)}`}>
                      {candidate.status}
                    </span>
                  </div>
                </div>
              ))}

              {filteredCandidates.length === 0 && (
                <div className="text-center py-5">
                  <Users size={48} className="text-muted mb-3" />
                  <p className="text-muted">No candidates found</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Section - Assessment & Details */}
        <div className="col-lg-4">
          <div className="d-flex flex-column gap-3">
            {/* Assessment Selection */}
            <div className="card border shadow-none">
              <div className="card-body">
                <h5 className="mb-3 d-flex align-items-center gap-2">
                  <ClipboardList size={18} />
                  Assessment Details
                </h5>

                <div className="mb-3">
                  <label className="form-label">
                    Select Assessment <span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-select"
                    value={selectedAssessment}
                    onChange={(e) => setSelectedAssessment(e.target.value)}
                    required
                  >
                    <option value="">Choose an assessment...</option>
                    {assessments.map((assessment) => (
                      <option key={assessment.id} value={assessment.id}>
                        {assessment.name}
                      </option>
                    ))}
                  </select>
                </div>

                {selectedAssessmentDetails && (
                  <div className="alert alert-info mb-3">
                    <div className="d-flex justify-content-between small">
                      <span>Duration:</span>
                      <span className="fw-medium">{selectedAssessmentDetails.duration}</span>
                    </div>
                    <div className="d-flex justify-content-between small">
                      <span>Questions:</span>
                      <span className="fw-medium">{selectedAssessmentDetails.questions}</span>
                    </div>
                  </div>
                )}

                <div className="mb-3">
                  <label className="form-label">
                    Due Date <span className="text-danger">*</span>
                  </label>
                  <p className="text-muted small mb-2">Submissions will be prevented after this date</p>
                  <div className="input-group">
                    <span className="input-group-text">
                      <Calendar size={16} />
                    </span>
                    <input
                      type="date"
                      className="form-control"
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                      required
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  {dueDate && (
                    <p className="text-primary small mt-2">
                      📅 Due: {new Date(dueDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Summary Card */}
            <div className="card border-primary-subtle bg-primary-subtle">
              <div className="card-body">
                <h6 className="card-title mb-3">Assignment Summary</h6>
                <div className="small">
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted">Candidates:</span>
                    <span className="fw-medium">{selectedCandidates.length}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted">Assessment:</span>
                    <span className="fw-medium">
                      {selectedAssessmentDetails ? selectedAssessmentDetails.name : 'Not selected'}
                    </span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span className="text-muted">Due Date:</span>
                    <span className="fw-medium">
                      {dueDate ? new Date(dueDate).toLocaleDateString() : 'Not set'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Assign Button */}
            <button
              className="btn btn-primary w-100 py-3"
              onClick={handleAssign}
              disabled={selectedCandidates.length === 0 || !selectedAssessment || !dueDate}
            >
              <Send size={18} className="me-2" />
              {selectedCandidates.length > 0 ? `Assign to ${selectedCandidates.length} Candidate${selectedCandidates.length !== 1 ? 's' : ''}` : 'Assign Assessment'}
            </button>
            
            {selectedCandidates.length === 0 && (
              <p className="text-muted small text-center">Please select at least one candidate</p>
            )}
            {!selectedAssessment && selectedCandidates.length > 0 && (
              <p className="text-muted small text-center">Please choose an assessment</p>
            )}
            {!dueDate && selectedCandidates.length > 0 && selectedAssessment && (
              <p className="text-muted small text-center">Please set a due date</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignAssessment;

