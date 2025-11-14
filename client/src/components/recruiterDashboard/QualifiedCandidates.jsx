import React, { useState, useEffect } from 'react';
import {
  CheckCircle,
  User,
  Mail,
  Award,
  TrendingUp,
  RefreshCw,
  Eye,
  Send,
  Calendar,
  Filter,
  Search,
  Download,
  FileText
} from 'lucide-react';
import { Icon } from '@iconify/react/dist/iconify.js';
import { BASE_URL } from '../../config/api.config';

const QualifiedCandidates = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTestType, setFilterTestType] = useState('all');
  const [filterMinScore, setFilterMinScore] = useState(0);

  // Fetch qualified candidates from backend
  const fetchQualifiedCandidates = async () => {
    setLoading(true);
    try {
      // Fetch assignments with completion status
      const response = await fetch(`${BASE_URL}/assignments/with-status`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        const assignments = await response.json();
        
        // Fetch candidate records for additional info
        const candidatesRes = await fetch(`${BASE_URL}/api/resume/candidates`);
        const candidateRecords = candidatesRes.ok ? await candidatesRes.json() : [];
        
        // Fetch assessments for test type info
        const assessmentsRes = await fetch(`${BASE_URL}/assessments`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        const assessments = assessmentsRes.ok ? await assessmentsRes.json() : [];
        
        // Filter only completed assignments with scores
        const qualifiedCandidates = assignments
          .filter(assignment => {
            const status = assignment.actual_status || assignment.status;
            return status?.toLowerCase() === 'completed' && assignment.score !== null;
          })
          .map(assignment => {
            const assessment = assessments.find(a => a.id === assignment.assessment_id);
            const candidateRecord = candidateRecords.find(c => c.id === assignment.candidate_id);
            
            return {
              id: assignment.id,
              candidateId: assignment.candidate_id,
              assessmentId: assignment.assessment_id,
              testType: assessment?.type || 'Unknown',
              testName: assessment?.name || 'Assessment',
              score: assignment.score,
              completedAt: assignment.completed_at,
              dueDate: assignment.due_date,
              // Candidate info from candidate_records
              name: candidateRecord?.candidate_name || 'Unknown',
              email: candidateRecord?.candidate_email || 'N/A',
              role: candidateRecord?.role || 'Not specified',
              skills: candidateRecord?.candidate_skills || '',
              experienceLevel: candidateRecord?.experience_level || 'N/A',
              resumeScore: candidateRecord?.score || 0
            };
          })
          // Remove duplicates by candidate email
          .reduce((acc, curr) => {
            const existing = acc.find(c => c.email === curr.email);
            if (!existing) {
              acc.push({
                ...curr,
                tests: [{ type: curr.testType, name: curr.testName, score: curr.score, completedAt: curr.completedAt }]
              });
            } else {
              existing.tests.push({ type: curr.testType, name: curr.testName, score: curr.score, completedAt: curr.completedAt });
              // Update average score
              existing.score = existing.tests.reduce((sum, t) => sum + t.score, 0) / existing.tests.length;
            }
            return acc;
          }, []);

        setCandidates(qualifiedCandidates);
      } else {
        console.error('Failed to fetch qualified candidates');
      }
    } catch (error) {
      console.error('Error fetching qualified candidates:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQualifiedCandidates();
  }, []);

  // Filter candidates
  const filteredCandidates = candidates.filter(candidate => {
    const matchesSearch = candidate.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.role?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTestType = filterTestType === 'all' || 
                           candidate.tests.some(t => t.type?.toLowerCase() === filterTestType.toLowerCase());
    
    const matchesMinScore = candidate.score >= filterMinScore;
    
    return matchesSearch && matchesTestType && matchesMinScore;
  });

  // Statistics
  const stats = {
    total: candidates.length,
    avgScore: candidates.length > 0 
      ? (candidates.reduce((sum, c) => sum + c.score, 0) / candidates.length).toFixed(1) 
      : 0,
    aptitudePassed: candidates.filter(c => c.tests.some(t => t.type === 'aptitude')).length,
    codingPassed: candidates.filter(c => c.tests.some(t => t.type === 'coding')).length,
    communicationPassed: candidates.filter(c => c.tests.some(t => t.type === 'communication')).length,
    allTestsCompleted: candidates.filter(c => c.tests.length >= 3).length
  };

  // Get badge color for score
  const getScoreBadgeColor = (score) => {
    if (score >= 80) return 'bg-success text-white';
    if (score >= 60) return 'bg-info text-white';
    if (score >= 40) return 'bg-warning text-dark';
    return 'bg-secondary text-white';
  };

  // Export to CSV
  const exportToCSV = () => {
    const headers = ['Name', 'Email', 'Role', 'Tests Completed', 'Average Score', 'Aptitude', 'Coding', 'Communication'];
    const rows = filteredCandidates.map(candidate => {
      const getTestScore = (type) => {
        const test = candidate.tests.find(t => t.type === type);
        return test ? test.score : 'N/A';
      };
      
      return [
        candidate.name,
        candidate.email,
        candidate.role,
        candidate.tests.length,
        candidate.score.toFixed(1),
        getTestScore('aptitude'),
        getTestScore('coding'),
        getTestScore('communication')
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
    a.download = `qualified_candidates_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div className="dashboard-main-body">
      {/* Page Header */}
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-24">
        <div>
          <h6 className="fw-semibold mb-0">Qualified Candidates</h6>
          <p className="text-secondary-light text-sm mb-0">Candidates who have passed assessment tests</p>
        </div>
        <ul className="d-flex align-items-center gap-2">
          <li className="fw-medium">
            <a href="#" className="d-flex align-items-center gap-1 hover-text-primary">
              <Icon icon="solar:home-smile-angle-outline" className="icon text-lg" />
              Dashboard
            </a>
          </li>
          <li>-</li>
          <li className="fw-medium">Qualified Candidates</li>
        </ul>
      </div>

      {/* Stats Cards */}
      <div className="row g-3 mb-24">
        <div className="col-md-3">
          <div className="card shadow-none border h-100 bg-success-subtle">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="text-success mb-1">Total Qualified</p>
                  <h3 className="mb-0 text-success">{stats.total}</h3>
                </div>
                <div className="bg-success p-3 rounded-circle">
                  <CheckCircle className="text-white" size={24} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-none border h-100 bg-primary-subtle">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="text-primary mb-1">Average Score</p>
                  <h3 className="mb-0 text-primary">{stats.avgScore}%</h3>
                </div>
                <div className="bg-primary p-3 rounded-circle">
                  <TrendingUp className="text-white" size={24} />
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
                  <p className="text-info mb-1">All Tests Done</p>
                  <h3 className="mb-0 text-info">{stats.allTestsCompleted}</h3>
                </div>
                <div className="bg-info p-3 rounded-circle">
                  <Award className="text-white" size={24} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-none border h-100">
            <div className="card-body">
              <p className="text-secondary-light text-sm mb-2">Tests Completed</p>
              <div className="d-flex flex-column gap-1">
                <div className="d-flex justify-content-between align-items-center">
                  <span className="text-sm">📝 Aptitude:</span>
                  <span className="fw-semibold">{stats.aptitudePassed}</span>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="text-sm">💻 Coding:</span>
                  <span className="fw-semibold">{stats.codingPassed}</span>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="text-sm">💬 Communication:</span>
                  <span className="fw-semibold">{stats.communicationPassed}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card shadow-none border mb-24">
        <div className="card-body">
          <div className="row g-3 align-items-center">
            <div className="col-md-4">
              <div className="input-group">
                <span className="input-group-text">
                  <Search size={16} />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by name, email, or role..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="col-md-3">
              <div className="input-group">
                <span className="input-group-text">
                  <Filter size={16} />
                </span>
                <select
                  className="form-select"
                  value={filterTestType}
                  onChange={(e) => setFilterTestType(e.target.value)}
                >
                  <option value="all">All Test Types</option>
                  <option value="aptitude">Aptitude</option>
                  <option value="coding">Coding</option>
                  <option value="communication">Communication</option>
                </select>
              </div>
            </div>

            <div className="col-md-3">
              <div className="input-group">
                <span className="input-group-text">Min Score:</span>
                <select
                  className="form-select"
                  value={filterMinScore}
                  onChange={(e) => setFilterMinScore(Number(e.target.value))}
                >
                  <option value="0">All Scores</option>
                  <option value="40">40%+</option>
                  <option value="60">60%+</option>
                  <option value="80">80%+</option>
                </select>
              </div>
            </div>

            <div className="col-md-2">
              <div className="d-flex gap-2">
                <button
                  onClick={fetchQualifiedCandidates}
                  disabled={loading}
                  className="btn btn-outline-primary flex-fill"
                  title="Refresh"
                >
                  <RefreshCw size={18} className={loading ? 'spinner' : ''} />
                </button>
                <button
                  onClick={exportToCSV}
                  disabled={filteredCandidates.length === 0}
                  className="btn btn-outline-success flex-fill"
                  title="Export CSV"
                >
                  <Download size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Candidates Table */}
      <div className="card shadow-none border">
        <div className="card-header bg-white border-bottom">
          <div className="d-flex justify-content-between align-items-center">
            <h6 className="mb-0">Qualified Candidates ({filteredCandidates.length})</h6>
            {filteredCandidates.length > 0 && (
              <span className="badge bg-success-subtle text-success">
                {filteredCandidates.filter(c => c.tests.length >= 3).length} completed all tests
              </span>
            )}
          </div>
        </div>

        <div className="card-body p-0">
          {loading ? (
            <div className="d-flex justify-content-center align-items-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : filteredCandidates.length === 0 ? (
            <div className="text-center py-5">
              <Award size={48} className="text-secondary-light mb-3" />
              <h6 className="text-secondary-light mb-2">No Qualified Candidates Yet</h6>
              <p className="text-secondary-light text-sm mb-0">
                {candidates.length === 0 
                  ? 'Candidates will appear here after they complete assessments'
                  : 'Try adjusting your filters'}
              </p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead>
                  <tr>
                    <th>Candidate</th>
                    <th>Role</th>
                    <th>Tests Passed</th>
                    <th>Scores</th>
                    <th>Average</th>
                    <th>Resume Score</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCandidates.map((candidate) => (
                    <tr key={candidate.id}>
                      <td>
                        <div className="d-flex align-items-center gap-3">
                          <div className="bg-success-subtle rounded-circle d-flex align-items-center justify-content-center" style={{width: '40px', height: '40px'}}>
                            <User size={20} className="text-success" />
                          </div>
                          <div>
                            <p className="fw-medium mb-0">{candidate.name}</p>
                            <p className="text-sm text-secondary-light mb-0">{candidate.email}</p>
                          </div>
                        </div>
                      </td>

                      <td>
                        <span className="badge bg-secondary-subtle text-secondary">
                          {candidate.role}
                        </span>
                      </td>

                      <td>
                        <div className="d-flex flex-wrap gap-1">
                          {candidate.tests.map((test, idx) => (
                            <span key={idx} className="badge bg-primary-subtle text-primary text-xs">
                              {test.type === 'aptitude' && '📝'}
                              {test.type === 'coding' && '💻'}
                              {test.type === 'communication' && '💬'}
                              {' '}{test.type}
                            </span>
                          ))}
                        </div>
                      </td>

                      <td>
                        <div className="d-flex flex-column gap-1">
                          {candidate.tests.map((test, idx) => (
                            <span key={idx} className={`badge ${getScoreBadgeColor(test.score)} text-xs`}>
                              {test.type}: {test.score}%
                            </span>
                          ))}
                        </div>
                      </td>

                      <td>
                        <span className={`badge ${getScoreBadgeColor(candidate.score)} fw-semibold`}>
                          {candidate.score.toFixed(1)}%
                        </span>
                      </td>

                      <td>
                        <span className="badge bg-info-subtle text-info">
                          {candidate.resumeScore}%
                        </span>
                      </td>

                      <td>
                        {candidate.tests.length >= 3 ? (
                          <span className="badge bg-success-subtle text-success">
                            <CheckCircle size={14} className="me-1" />
                            All Tests Passed
                          </span>
                        ) : (
                          <span className="badge bg-warning-subtle text-warning">
                            {candidate.tests.length}/3 Completed
                          </span>
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
                            title="Move to Pipeline"
                          >
                            <Send size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {filteredCandidates.length > 0 && (
          <div className="card-footer bg-white border-top">
            <div className="d-flex justify-content-between align-items-center">
              <p className="mb-0 text-secondary-light text-sm">
                Showing {filteredCandidates.length} of {candidates.length} qualified candidates
              </p>
              <button onClick={exportToCSV} className="btn btn-sm btn-outline-success">
                <Download size={14} className="me-1" />
                Export to CSV
              </button>
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

export default QualifiedCandidates;


