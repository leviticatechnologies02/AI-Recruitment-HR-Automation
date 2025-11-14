import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Award,
  Users,
  Search,
  Filter,
  RefreshCw,
  Eye,
  Download,
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  Mail
} from 'lucide-react';
import { Icon } from '@iconify/react/dist/iconify.js';
import { assessmentAPI } from '../../utils/api';
import { BASE_URL } from '../../config/api.config';

const AssessmentResults = () => {
  const [assignments, setAssignments] = useState([]);
  const [assessments, setAssessments] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterAssessment, setFilterAssessment] = useState('all');

  // Fetch data
  const fetchData = async () => {
    setLoading(true);
    try {
      const [assignmentsData, assessmentsData, candidatesData] = await Promise.all([
        assessmentAPI.listAssignmentsWithStatus(),  // Use the new endpoint with actual completion status
        assessmentAPI.list(),
        fetch(`${BASE_URL}/api/resume/candidates`).then(res => res.json())
      ]);
      
      setAssignments(assignmentsData || []);
      setAssessments(assessmentsData || []);
      setCandidates(candidatesData || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Fallback to regular assignments if the new endpoint fails
      try {
        const fallbackAssignments = await assessmentAPI.listAssignments();
        setAssignments(fallbackAssignments || []);
      } catch (fallbackError) {
        console.error('Fallback also failed:', fallbackError);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Get candidate by ID
  const getCandidate = (candidateId) => {
    return candidates.find(c => c.id === candidateId) || {};
  };

  // Get assessment by ID
  const getAssessment = (assessmentId) => {
    return assessments.find(a => a.id === assessmentId) || {};
  };

  // Filter assignments
  const filteredAssignments = assignments.filter(assignment => {
    const candidate = getCandidate(assignment.candidate_id);
    const assessment = getAssessment(assignment.assessment_id);
    
    const matchesSearch = 
      candidate.candidate_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.candidate_email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assessment.name?.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Use actual_status if available, otherwise fall back to status
    const statusToCheck = assignment.actual_status || assignment.status;
    const matchesStatus = filterStatus === 'all' || statusToCheck?.toLowerCase() === filterStatus.toLowerCase();
    const matchesAssessment = filterAssessment === 'all' || assignment.assessment_id === parseInt(filterAssessment);
    
    return matchesSearch && matchesStatus && matchesAssessment;
  });

  // Calculate statistics
  const stats = {
    total: assignments.length,
    completed: assignments.filter(a => (a.actual_status || a.status)?.toLowerCase() === 'completed').length,
    inProgress: assignments.filter(a => (a.actual_status || a.status)?.toLowerCase() === 'in progress').length,
    pending: assignments.filter(a => (a.actual_status || a.status)?.toLowerCase() === 'assigned').length,
    avgCompletionRate: assignments.length > 0 
      ? Math.round((assignments.filter(a => (a.actual_status || a.status)?.toLowerCase() === 'completed').length / assignments.length) * 100)
      : 0
  };

  // Get status badge
  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return 'badge bg-success-subtle text-success';
      case 'passed':
        return 'badge bg-success-subtle text-success';
      case 'in progress':
        return 'badge bg-info-subtle text-info';
      case 'assigned':
        return 'badge bg-warning-subtle text-warning';
      case 'failed':
        return 'badge bg-danger-subtle text-danger';
      case 'expired':
        return 'badge bg-danger-subtle text-danger';
      default:
        return 'badge bg-secondary-subtle text-secondary';
    }
  };

  // Get status icon
  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed':
      case 'passed':
        return <CheckCircle size={18} className="text-success" />;
      case 'in progress':
        return <Clock size={18} className="text-info" />;
      case 'assigned':
        return <Mail size={18} className="text-warning" />;
      case 'failed':
      case 'expired':
        return <XCircle size={18} className="text-danger" />;
      default:
        return <Clock size={18} className="text-secondary" />;
    }
  };

  // Export to CSV
  const exportToCSV = () => {
    const headers = ['Candidate Name', 'Email', 'Assessment', 'Type', 'Status', 'Score', 'Due Date', 'Completed At'];
    const rows = filteredAssignments.map(assignment => {
      const candidate = getCandidate(assignment.candidate_id);
      const assessment = getAssessment(assignment.assessment_id);
      const displayStatus = assignment.actual_status || assignment.status || 'Assigned';
      return [
        candidate.candidate_name || 'N/A',
        candidate.candidate_email || 'N/A',
        assessment.name || 'N/A',
        assessment.type || 'N/A',
        displayStatus,
        assignment.score !== null && assignment.score !== undefined ? assignment.score : 'N/A',
        assignment.due_date ? new Date(assignment.due_date).toLocaleDateString() : 'No deadline',
        assignment.completed_at ? new Date(assignment.completed_at).toLocaleDateString() : 'Not completed'
      ];
    });

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `assessment_results_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div className="dashboard-main-body">
      {/* Page Header */}
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-24">
        <h6 className="fw-semibold mb-0">Assessment Results</h6>
        <ul className="d-flex align-items-center gap-2">
          <li className="fw-medium">
            <a href="#" className="d-flex align-items-center gap-1 hover-text-primary">
              <Icon icon="solar:home-smile-angle-outline" className="icon text-lg" />
              Dashboard
            </a>
          </li>
          <li>-</li>
          <li className="fw-medium">Results</li>
        </ul>
      </div>

      {/* Stats Cards */}
      <div className="row g-3 mb-24">
        <div className="col-md-3">
          <div className="card shadow-none border h-100 bg-primary-subtle">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="text-primary mb-1">Total Assignments</p>
                  <h3 className="mb-0 text-primary">{stats.total}</h3>
                </div>
                <div className="bg-primary p-3 rounded-circle">
                  <Users className="text-white" size={24} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-none border h-100 bg-success-subtle">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="text-success mb-1">Completed</p>
                  <h3 className="mb-0 text-success">{stats.completed}</h3>
                </div>
                <div className="bg-success p-3 rounded-circle">
                  <CheckCircle className="text-white" size={24} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-none border h-100 bg-info-subtle">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="text-info mb-1">In Progress</p>
                  <h3 className="mb-0 text-info">{stats.inProgress}</h3>
                </div>
                <div className="bg-info p-3 rounded-circle">
                  <Clock className="text-white" size={24} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-none border h-100 bg-warning-subtle">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="text-warning mb-1">Pending</p>
                  <h3 className="mb-0 text-warning">{stats.pending}</h3>
                </div>
                <div className="bg-warning p-3 rounded-circle">
                  <Mail className="text-white" size={24} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Overview */}
      <div className="row g-3 mb-24">
        <div className="col-md-6">
          <div className="card shadow-none border h-100">
            <div className="card-body">
              <h6 className="mb-3">Completion Rate</h6>
              <div className="d-flex align-items-center mb-2">
                <div className="flex-grow-1">
                  <div className="progress" style={{ height: '12px' }}>
                    <div
                      className="progress-bar bg-success"
                      style={{ width: `${stats.avgCompletionRate}%` }}
                    ></div>
                  </div>
                </div>
                <span className="ms-3 fw-bold text-success">{stats.avgCompletionRate}%</span>
              </div>
              <p className="text-secondary-light text-sm mb-0">
                {stats.completed} out of {stats.total} assignments completed
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card shadow-none border h-100">
            <div className="card-body">
              <h6 className="mb-3">Assessment Distribution</h6>
              <div className="d-flex flex-wrap gap-2">
                {assessments.map((assessment) => (
                  <span
                    key={assessment.id}
                    className="badge bg-secondary-subtle text-secondary"
                    style={{ fontSize: '0.875rem', padding: '0.5rem 1rem' }}
                  >
                    {assessment.name}: {assignments.filter(a => a.assessment_id === assessment.id).length}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Actions */}
      <div className="card shadow-none border mb-24">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-4">
              <div className="position-relative">
                <input
                  type="text"
                  className="form-control ps-5"
                  placeholder="Search by name, email, or assessment..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="position-absolute top-50 translate-middle-y ms-3" size={18} />
              </div>
            </div>
            <div className="col-md-3">
              <select
                className="form-select"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="assigned">Assigned</option>
                <option value="in progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="passed">Passed</option>
                <option value="failed">Failed</option>
                <option value="expired">Expired</option>
              </select>
            </div>
            <div className="col-md-3">
              <select
                className="form-select"
                value={filterAssessment}
                onChange={(e) => setFilterAssessment(e.target.value)}
              >
                <option value="all">All Assessments</option>
                {assessments.map((assessment) => (
                  <option key={assessment.id} value={assessment.id}>
                    {assessment.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-2 d-flex gap-2">
              <button
                className="btn btn-outline-primary flex-fill"
                onClick={fetchData}
                disabled={loading}
                title="Refresh"
              >
                <RefreshCw size={18} className={loading ? 'spinner' : ''} />
              </button>
              <button
                className="btn btn-outline-success flex-fill"
                onClick={exportToCSV}
                disabled={filteredAssignments.length === 0}
                title="Export to CSV"
              >
                <Download size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Results Table */}
      <div className="card shadow-none border">
        <div className="card-header bg-white border-bottom">
          <div className="d-flex justify-content-between align-items-center">
            <h6 className="mb-0">Assessment Results ({filteredAssignments.length})</h6>
          </div>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead>
                <tr>
                  <th>Candidate</th>
                  <th>Email</th>
                  <th>Assessment</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Due Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="7" className="text-center py-5">
                      <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </td>
                  </tr>
                ) : filteredAssignments.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-5">
                      <Award size={48} className="text-secondary-light mb-3" />
                      <h6 className="text-secondary-light mb-2">No results found</h6>
                      <p className="text-secondary-light text-sm mb-0">
                        {searchTerm || filterStatus !== 'all' || filterAssessment !== 'all'
                          ? 'Try adjusting your filters'
                          : 'No assessments have been assigned yet'}
                      </p>
                    </td>
                  </tr>
                ) : (
                  filteredAssignments.map((assignment) => {
                    const candidate = getCandidate(assignment.candidate_id);
                    const assessment = getAssessment(assignment.assessment_id);
                    const displayStatus = assignment.actual_status || assignment.status || 'Assigned';
                    
                    return (
                      <tr key={assignment.id}>
                        <td>
                          <div className="d-flex align-items-center">
                            {getStatusIcon(displayStatus)}
                            <span className="ms-2 fw-medium">
                              {candidate.candidate_name || 'Unknown'}
                            </span>
                          </div>
                        </td>
                        <td className="text-sm text-secondary-light">
                          {candidate.candidate_email || 'N/A'}
                        </td>
                        <td className="fw-medium">{assessment.name || 'Unknown'}</td>
                        <td>
                          <span className="badge bg-secondary-subtle text-secondary text-capitalize">
                            {assessment.type || 'N/A'}
                          </span>
                        </td>
                        <td>
                          <span className={getStatusBadge(displayStatus)}>
                            {displayStatus}
                            {assignment.score !== null && assignment.score !== undefined && (
                              <span className="ms-2 small">({assignment.score})</span>
                            )}
                          </span>
                        </td>
                        <td>
                          {assignment.due_date ? (
                            <span className="text-sm">
                              <Calendar size={14} className="me-1" />
                              {new Date(assignment.due_date).toLocaleDateString()}
                            </span>
                          ) : (
                            <span className="text-secondary-light text-sm">No deadline</span>
                          )}
                        </td>
                        <td>
                          <div className="d-flex gap-2">
                            <button
                              className="btn btn-sm btn-outline-primary"
                              title="View Details"
                            >
                              <Eye size={14} />
                            </button>
                            <button
                              className="btn btn-sm btn-outline-success"
                              title="Download Report"
                              disabled={displayStatus.toLowerCase() !== 'completed'}
                            >
                              <Download size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
        {filteredAssignments.length > 0 && (
          <div className="card-footer bg-white border-top">
            <div className="d-flex justify-content-between align-items-center">
              <p className="mb-0 text-secondary-light text-sm">
                Showing {filteredAssignments.length} of {assignments.length} results
              </p>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .spinner {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default AssessmentResults;



