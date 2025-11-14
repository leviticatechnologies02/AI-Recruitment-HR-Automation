import React, { useState, useEffect } from 'react';
import {
  Award,
  TrendingUp,
  Users,
  Search,
  Download,
  Calendar,
  Clock,
  Target
} from 'lucide-react';
import { assessmentAPI } from '../../utils/api';

const TestResultsViewer = () => {
  const [testResults, setTestResults] = useState([]);
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [filters, setFilters] = useState({
    assessment: '',
    candidate: '',
    minScore: 0,
    maxScore: 100,
    status: ''
  });

  // Fetch test results
  const fetchResults = async () => {
    setLoading(true);
    try {
      const [resultsData, statsData] = await Promise.all([
        assessmentAPI.getTestResults.aptitude(),
        assessmentAPI.getTestResults.aptitudeStats()
      ]);
      
      setTestResults(resultsData || []);
      setStatistics(statsData || {});
    } catch (error) {
      console.error('Error fetching test results:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

  // Calculate stats from data
  const stats = {
    avgScore: statistics?.average_score 
      ? Math.round((statistics.average_score / 25) * 100) 
      : 0,
    totalCandidates: statistics?.total_tests || 0,
    passRate: Math.round(statistics?.pass_rate || 0),
    avgTime: '25 min' // Mock data - could be calculated from actual data
  };

  // Filter results
  const filteredResults = testResults.filter(result => {
    const matchesCandidate = 
      result.name?.toLowerCase().includes(filters.candidate.toLowerCase()) ||
      result.email?.toLowerCase().includes(filters.candidate.toLowerCase());
    
    const matchesScore = 
      result.percentage >= filters.minScore && 
      result.percentage <= filters.maxScore;
    
    const matchesStatus = 
      !filters.status || 
      (filters.status === 'Passed' && result.status === 'Qualified') ||
      (filters.status === 'Failed' && result.status !== 'Qualified') ||
      (filters.status === 'Average' && result.percentage >= 50 && result.percentage < 70);
    
    return matchesCandidate && matchesScore && matchesStatus;
  });

  // Get status badge
  const getStatusBadge = (status) => {
    if (status === 'Passed' || status === 'Qualified') {
      return <span className="badge bg-success-subtle text-success">Passed</span>;
    } else if (status === 'Average') {
      return <span className="badge bg-warning-subtle text-warning">Average</span>;
    } else {
      return <span className="badge bg-danger-subtle text-danger">Failed</span>;
    }
  };

  // Map result to display format
  const mapResult = (result) => {
    let status = 'Failed';
    if (result.percentage >= 70) status = 'Passed';
    else if (result.percentage >= 50) status = 'Average';
    
    return {
      id: result.id,
      candidateName: result.name,
      assessment: 'Aptitude Test',
      score: result.percentage,
      status: status,
      dateCompleted: new Date().toLocaleDateString(), // Mock - use actual date if available
      timeSpent: '25 min', // Mock - use actual time if available
      answers: generateMockAnswers(result), // Mock detailed answers
      insights: generateInsights(result)
    };
  };

  // Generate mock answers for details view
  const generateMockAnswers = (result) => {
    const totalQuestions = result.total_questions || 25;
    const correctAnswers = result.score || 0;
    const answers = [];
    
    for (let i = 1; i <= Math.min(5, totalQuestions); i++) {
      const isCorrect = i <= correctAnswers;
      answers.push({
        question: `Question ${i}`,
        candidateAnswer: isCorrect ? 'Correct Answer' : 'Wrong Answer',
        correctAnswer: 'Correct Answer',
        isCorrect: isCorrect,
        timeTaken: `${Math.floor(Math.random() * 90) + 30}s`
      });
    }
    
    return answers;
  };

  // Generate insights
  const generateInsights = (result) => {
    if (result.percentage >= 80) {
      return 'Excellent performance! Candidate demonstrates strong understanding of the concepts.';
    } else if (result.percentage >= 60) {
      return 'Good performance with room for improvement. Candidate shows solid foundational knowledge.';
    } else {
      return 'Candidate may need additional training in key areas. Consider providing learning resources.';
    }
  };

  // Export to CSV
  const exportToCSV = () => {
    const headers = ['Name', 'Email', 'Assessment', 'Score', 'Status', 'Date'];
    const rows = filteredResults.map(result => [
      result.name,
      result.email,
      'Aptitude Test',
      `${result.percentage}%`,
      result.status,
      new Date().toLocaleDateString()
    ]);

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
    <div className="container-fluid">
      {/* Header */}
      <div className="card border shadow-none mb-4">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h4 className="mb-1 d-flex align-items-center gap-2">Assessment Results</h4>
              <p className="text-muted mb-0">
                Review candidate scores, performance, and detailed breakdowns.
              </p>
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
                onChange={(e) => setFilters({ ...filters, assessment: e.target.value })}
              >
                <option value="">All Assessments</option>
                <option value="Aptitude Test">Aptitude Test</option>
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
                  onChange={(e) => setFilters({ ...filters, candidate: e.target.value })}
                />
              </div>
            </div>
            <div className="col-md-2">
              <input
                type="number"
                className="form-control"
                placeholder="Min Score"
                value={filters.minScore}
                onChange={(e) =>
                  setFilters({ ...filters, minScore: parseInt(e.target.value) || 0 })
                }
              />
            </div>
            <div className="col-md-2">
              <input
                type="number"
                className="form-control"
                placeholder="Max Score"
                value={filters.maxScore}
                onChange={(e) =>
                  setFilters({ ...filters, maxScore: parseInt(e.target.value) || 100 })
                }
              />
            </div>
            <div className="col-md-2">
              <select
                className="form-select"
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
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
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : filteredResults.length === 0 ? (
            <div className="text-center py-5">
              <Users size={48} className="text-muted mb-3" />
              <p className="text-muted">No results found</p>
            </div>
          ) : (
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
                  {filteredResults.map((result) => {
                    const mappedResult = mapResult(result);
                    return (
                      <tr key={result.id}>
                        <td className="px-4 py-3">
                          <div className="fw-medium">{mappedResult.candidateName}</div>
                        </td>
                        <td className="px-4 py-3">{mappedResult.assessment}</td>
                        <td className="px-4 py-3">
                          <span className="fw-bold text-primary">{mappedResult.score}%</span>
                        </td>
                        <td className="px-4 py-3">{getStatusBadge(mappedResult.status)}</td>
                        <td className="px-4 py-3 text-muted">{mappedResult.dateCompleted}</td>
                        <td className="px-4 py-3">
                          <button
                            className="btn btn-primary btn-sm"
                            onClick={() => setSelectedCandidate(mappedResult)}
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedCandidate && (
        <div
          className="modal fade show d-block"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          tabIndex="-1"
        >
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
                        <p className="fw-semibold mb-0 small">
                          {selectedCandidate.candidateName}
                        </p>
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
                        <p className="fw-bold text-primary mb-0 fs-5">
                          {selectedCandidate.score}%
                        </p>
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
                        <p className="fw-semibold mb-0 small">
                          {selectedCandidate.dateCompleted}
                        </p>
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
                              <span
                                className={
                                  answer.isCorrect
                                    ? 'text-success fw-medium'
                                    : 'text-danger fw-medium'
                                }
                              >
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

      <style jsx>{`
        .text-purple {
          color: #6f42c1;
        }
        .border-purple-subtle {
          border-color: #e0cffc !important;
        }
        .bg-purple-subtle {
          background-color: #f7f3ff !important;
        }
      `}</style>
    </div>
  );
};

export default TestResultsViewer;
