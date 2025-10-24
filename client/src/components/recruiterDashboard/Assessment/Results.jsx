import React, { useState } from 'react';
import { Search, Download, X, Clock, Calendar, TrendingUp, Users, Award, Target } from 'lucide-react';

const Results = () => {
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [filters, setFilters] = useState({
    assessment: '',
    candidate: '',
    minScore: 0,
    maxScore: 100,
    status: ''
  });

  const assessmentResults = [
    {
      id: 1,
      candidateName: 'Nagendra Uggirala',
      assessment: 'React.js Developer Test',
      score: 92,
      status: 'Passed',
      dateCompleted: '04-Oct-2025',
      timeSpent: '27 mins',
      answers: [
        { question: 'What is JSX?', candidateAnswer: 'JavaScript XML', correctAnswer: 'JavaScript XML', isCorrect: true, timeTaken: '2m 10s' },
        { question: 'useState returns?', candidateAnswer: 'Array', correctAnswer: 'Array', isCorrect: true, timeTaken: '3m 45s' },
        { question: 'Virtual DOM updates?', candidateAnswer: 'Re-render', correctAnswer: 'Reconciliation', isCorrect: false, timeTaken: '1m 18s' }
      ],
      insights: 'Nagendra showed strong fundamentals in React hooks and JSX, but needs slight improvement in component rendering optimization.'
    },
    {
      id: 2,
      candidateName: 'Ravi Kumar',
      assessment: 'Python Coding Challenge',
      score: 76,
      status: 'Average',
      dateCompleted: '02-Oct-2025',
      timeSpent: '35 mins',
      answers: [
        { question: 'List comprehension syntax?', candidateAnswer: '[x for x in range(10)]', correctAnswer: '[x for x in range(10)]', isCorrect: true, timeTaken: '1m 30s' },
        { question: 'Lambda function usage?', candidateAnswer: 'Anonymous function', correctAnswer: 'Anonymous function', isCorrect: true, timeTaken: '2m 15s' },
        { question: 'Decorator purpose?', candidateAnswer: 'Add functionality', correctAnswer: 'Modify function behavior', isCorrect: false, timeTaken: '3m 20s' }
      ],
      insights: 'Good understanding of Python basics. Recommend focusing on advanced concepts like decorators and generators.'
    },
    {
      id: 3,
      candidateName: 'Sneha Reddy',
      assessment: 'UI/UX Design Assessment',
      score: 64,
      status: 'Failed',
      dateCompleted: '29-Sep-2025',
      timeSpent: '42 mins',
      answers: [
        { question: 'What is Design System?', candidateAnswer: 'Collection of components', correctAnswer: 'Collection of reusable components and guidelines', isCorrect: true, timeTaken: '4m 10s' },
        { question: 'Purpose of wireframes?', candidateAnswer: 'Visual mockup', correctAnswer: 'Low-fidelity layout structure', isCorrect: false, timeTaken: '3m 45s' },
        { question: 'WCAG compliance?', candidateAnswer: 'Color guidelines', correctAnswer: 'Web accessibility standards', isCorrect: false, timeTaken: '5m 18s' }
      ],
      insights: 'Understands basic design principles but needs more knowledge in accessibility and design systems.'
    },
    {
      id: 4,
      candidateName: 'Arjun Patel',
      assessment: 'React.js Developer Test',
      score: 88,
      status: 'Passed',
      dateCompleted: '01-Oct-2025',
      timeSpent: '29 mins',
      answers: [
        { question: 'What is JSX?', candidateAnswer: 'JavaScript XML', correctAnswer: 'JavaScript XML', isCorrect: true, timeTaken: '1m 50s' },
        { question: 'useState returns?', candidateAnswer: 'Array', correctAnswer: 'Array', isCorrect: true, timeTaken: '2m 30s' },
        { question: 'Virtual DOM updates?', candidateAnswer: 'Reconciliation', correctAnswer: 'Reconciliation', isCorrect: true, timeTaken: '2m 05s' }
      ],
      insights: 'Solid React knowledge with good understanding of rendering mechanisms.'
    }
  ];

  const getStatusBadge = (status) => {
    const styles = {
      'Passed': 'bg-success-subtle text-success',
      'Average': 'bg-warning-subtle text-warning',
      'Failed': 'bg-danger-subtle text-danger'
    };
    const icons = {
      'Passed': '✅',
      'Average': '⚠️',
      'Failed': '❌'
    };
    return (
      <span className={`badge ${styles[status]}`}>
        {icons[status]} {status}
      </span>
    );
  };

  const filteredResults = assessmentResults.filter(result => {
    const matchesAssessment = !filters.assessment || result.assessment === filters.assessment;
    const matchesCandidate = !filters.candidate || result.candidateName.toLowerCase().includes(filters.candidate.toLowerCase());
    const matchesScore = result.score >= filters.minScore && result.score <= filters.maxScore;
    const matchesStatus = !filters.status || result.status === filters.status;
    return matchesAssessment && matchesCandidate && matchesScore && matchesStatus;
  });

  const exportToCSV = () => {
    const headers = ['Candidate', 'Assessment', 'Score', 'Status', 'Date'];
    const rows = filteredResults.map(r => [
      r.candidateName,
      r.assessment,
      `${r.score}%`,
      r.status,
      r.dateCompleted
    ]);
    
    const csvContent = [headers, ...rows]
      .map(row => row.join(','))
      .join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'assessment-results.csv';
    a.click();
  };

  const stats = {
    avgScore: Math.round(assessmentResults.reduce((sum, r) => sum + r.score, 0) / assessmentResults.length),
    totalCandidates: assessmentResults.length,
    passRate: Math.round((assessmentResults.filter(r => r.status === 'Passed').length / assessmentResults.length) * 100),
    avgTime: '29 min'
  };

  return (
    <div className="container-fluid">
      {/* Header */}
      <div className="card border shadow-none mb-4">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h4 className="mb-1 d-flex align-items-center gap-2">
                Assessment Results
              </h4>
              <p className="text-muted mb-0">Review candidate scores, performance, and detailed breakdowns.</p>
            </div>
            <button className="btn btn-success" onClick={exportToCSV}>
              <Download size={18} className="me-2" />
              Export CSV
            </button>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <div className="card border-primary-subtle bg-primary-subtle">
            <div className="card-body text-center">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <p className="text-muted small mb-1">Average Score</p>
                  <h3 className="mb-0 text-primary">{stats.avgScore}%</h3>
                </div>
                <TrendingUp size={32} className="text-primary" />
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-purple-subtle bg-purple-subtle">
            <div className="card-body text-center">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <p className="text-muted small mb-1">Total Candidates</p>
                  <h3 className="mb-0 text-purple">{stats.totalCandidates}</h3>
                </div>
                <Users size={32} className="text-purple" />
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-success-subtle bg-success-subtle">
            <div className="card-body text-center">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <p className="text-muted small mb-1">Pass Rate</p>
                  <h3 className="mb-0 text-success">{stats.passRate}%</h3>
                </div>
                <Award size={32} className="text-success" />
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-warning-subtle bg-warning-subtle">
            <div className="card-body text-center">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <p className="text-muted small mb-1">Avg Time</p>
                  <h3 className="mb-0 text-warning">{stats.avgTime}</h3>
                </div>
                <Clock size={32} className="text-warning" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card border shadow-none mb-4">
        <div className="card-body">
          <h5 className="mb-3">Filter by:</h5>
          <div className="row g-3">
            <div className="col-md-3">
              <select
                className="form-select"
                value={filters.assessment}
                onChange={(e) => setFilters({...filters, assessment: e.target.value})}
              >
                <option value="">All Assessments</option>
                <option value="React.js Developer Test">React.js Developer Test</option>
                <option value="Python Coding Challenge">Python Coding Challenge</option>
                <option value="UI/UX Design Assessment">UI/UX Design Assessment</option>
              </select>
            </div>
            <div className="col-md-3">
              <div className="input-group">
                <span className="input-group-text">
                  <Search size={16} />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search candidate..."
                  value={filters.candidate}
                  onChange={(e) => setFilters({...filters, candidate: e.target.value})}
                />
              </div>
            </div>
            <div className="col-md-2">
              <input
                type="number"
                className="form-control"
                placeholder="Min Score"
                value={filters.minScore}
                onChange={(e) => setFilters({...filters, minScore: parseInt(e.target.value) || 0})}
              />
            </div>
            <div className="col-md-2">
              <input
                type="number"
                className="form-control"
                placeholder="Max Score"
                value={filters.maxScore}
                onChange={(e) => setFilters({...filters, maxScore: parseInt(e.target.value) || 100})}
              />
            </div>
            <div className="col-md-2">
              <select
                className="form-select"
                value={filters.status}
                onChange={(e) => setFilters({...filters, status: e.target.value})}
              >
                <option value="">All Status</option>
                <option value="Passed">Passed</option>
                <option value="Average">Average</option>
                <option value="Failed">Failed</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Results Table */}
      <div className="card border shadow-none">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th className="px-4 py-3">Candidate Name</th>
                  <th className="px-4 py-3">Assessment</th>
                  <th className="px-4 py-3">Score</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Date Completed</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredResults.map((result) => (
                  <tr key={result.id}>
                    <td className="px-4 py-3">
                      <div className="fw-medium">{result.candidateName}</div>
                    </td>
                    <td className="px-4 py-3">{result.assessment}</td>
                    <td className="px-4 py-3">
                      <span className="fw-bold text-primary">{result.score}%</span>
                    </td>
                    <td className="px-4 py-3">{getStatusBadge(result.status)}</td>
                    <td className="px-4 py-3 text-muted">{result.dateCompleted}</td>
                    <td className="px-4 py-3">
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => setSelectedCandidate(result)}
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedCandidate && (
        <div className="modal fade show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)'}} tabIndex="-1">
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              {/* Modal Header */}
              <div className="modal-header bg-primary text-white py-3">
                <div>
                  <h5 className="modal-title mb-0">Assessment Details</h5>
                  <p className="mb-0 text-primary-subtle small">Performance breakdown</p>
                </div>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setSelectedCandidate(null)}
                ></button>
              </div>

              {/* Modal Content */}
              <div className="modal-body">
                {/* Candidate Info Grid */}
                <div className="row g-3 mb-4">
                  <div className="col-md-4">
                    <div className="card bg-light">
                      <div className="card-body py-2">
                        <p className="text-muted small mb-1">Candidate</p>
                        <p className="fw-semibold mb-0 small">{selectedCandidate.candidateName}</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="card bg-light">
                      <div className="card-body py-2">
                        <p className="text-muted small mb-1">Assessment</p>
                        <p className="fw-semibold mb-0 small">{selectedCandidate.assessment}</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="card bg-light">
                      <div className="card-body py-2">
                        <p className="text-muted small mb-1">Score</p>
                        <p className="fw-bold text-primary mb-0 fs-5">{selectedCandidate.score}%</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="card bg-light">
                      <div className="card-body py-2">
                        <p className="text-muted small mb-1">Status</p>
                        <div>{getStatusBadge(selectedCandidate.status)}</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="card bg-light">
                      <div className="card-body py-2">
                        <p className="text-muted small mb-1 d-flex align-items-center gap-1">
                          <Calendar size={12} /> Date Completed
                        </p>
                        <p className="fw-semibold mb-0 small">{selectedCandidate.dateCompleted}</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="card bg-light">
                      <div className="card-body py-2">
                        <p className="text-muted small mb-1 d-flex align-items-center gap-1">
                          <Clock size={12} /> Time Spent
                        </p>
                        <p className="fw-semibold mb-0 small">{selectedCandidate.timeSpent}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Answers Breakdown */}
                <div className="mb-3">
                  <h6 className="mb-2 d-flex align-items-center gap-2">
                    <Target size={16} /> Answers Breakdown
                  </h6>
                  <div className="table-responsive">
                    <table className="table table-bordered table-sm">
                      <thead className="table-light">
                        <tr>
                          <th className="small">Question</th>
                          <th className="small">Candidate Answer</th>
                          <th className="small">Correct Answer</th>
                          <th className="small">Time Taken</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedCandidate.answers.map((answer, idx) => (
                          <tr key={idx}>
                            <td className="small">{answer.question}</td>
                            <td className="small">
                              <span className={answer.isCorrect ? 'text-success fw-medium' : 'text-danger fw-medium'}>
                                {answer.candidateAnswer}
                              </span>
                            </td>
                            <td className="small">
                              {answer.isCorrect ? '✅ Correct' : answer.correctAnswer}
                            </td>
                            <td className="text-muted small">{answer.timeTaken}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Insights */}
                <div className="alert alert-info py-2">
                  <h6 className="alert-heading small mb-1">💡 Insights</h6>
                  <p className="mb-0 small">{selectedCandidate.insights}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Results;

