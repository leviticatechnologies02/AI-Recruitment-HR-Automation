import React, { useState } from 'react';
import { Search, Filter, Download, X, TrendingUp, AlertTriangle, CheckCircle, Users } from 'lucide-react';

const AIPreScreening = () => {
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [filters, setFilters] = useState({
    job: 'all',
    scoreThreshold: 70,
    search: ''
  });

  const candidates = [
    {
      id: 1,
      name: 'Nagendra Uggirala',
      job: 'Frontend Developer',
      score: 88,
      strengths: ['React.js', 'Clean UI Design', 'HTML/CSS', 'Component Architecture'],
      weaknesses: ['Limited backend exposure', 'API integration'],
      resumeMatch: 92,
      skillsMatch: 85,
      experienceRelevance: 80,
      cultureFit: 75,
      recommendation: 'Move candidate to Interview Stage',
      additionalInfo: 'Excellent understanding of React.js and modern frontend tools. Strong grasp of HTML, CSS, and component-based architecture. Responsive UI experience from previous Veritech Software internship.'
    },
    {
      id: 2,
      name: 'Sneha Reddy',
      job: 'UI Designer',
      score: 76,
      strengths: ['Creativity', 'Figma', 'Visual Design', 'User Research'],
      weaknesses: ['Lacks JS knowledge', 'Limited prototyping'],
      resumeMatch: 78,
      skillsMatch: 80,
      experienceRelevance: 72,
      cultureFit: 74,
      recommendation: 'Consider for design-focused roles',
      additionalInfo: 'Strong visual design skills with excellent Figma proficiency. Great eye for aesthetics and user-centered design approach.'
    },
    {
      id: 3,
      name: 'Ravi Kumar',
      job: 'Backend Developer',
      score: 69,
      strengths: ['Python', 'APIs', 'Database Design', 'System Architecture'],
      weaknesses: ['Slow response times', 'Limited cloud experience'],
      resumeMatch: 70,
      skillsMatch: 72,
      experienceRelevance: 68,
      cultureFit: 66,
      recommendation: 'Request additional technical assessment',
      additionalInfo: 'Solid backend fundamentals with good understanding of API development. Needs improvement in performance optimization.'
    }
  ];

  const jobs = ['all', 'Frontend Developer', 'UI Designer', 'Backend Developer'];

  const filteredCandidates = candidates.filter(candidate => {
    const matchesJob = filters.job === 'all' || candidate.job === filters.job;
    const matchesScore = candidate.score >= filters.scoreThreshold;
    const matchesSearch = candidate.name.toLowerCase().includes(filters.search.toLowerCase());
    return matchesJob && matchesScore && matchesSearch;
  });

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-success bg-success-subtle';
    if (score >= 70) return 'text-warning bg-warning-subtle';
    return 'text-danger bg-danger-subtle';
  };

  const getScoreBadge = (score) => {
    if (score >= 80) return 'Strong Match';
    if (score >= 70) return 'Good Match';
    return 'Moderate Match';
  };

  const exportToCSV = () => {
    const headers = ['Name', 'Job', 'AI Fit Score', 'Strengths', 'Weaknesses'];
    const rows = filteredCandidates.map(c => [
      c.name,
      c.job,
      `${c.score}%`,
      c.strengths.join('; '),
      c.weaknesses.join('; ')
    ]);
    
    const csvContent = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ai-prescreening-results.csv';
    a.click();
  };

  const handleShortlist = () => {
    if (selectedCandidate) {
      alert(`${selectedCandidate.name} has been shortlisted successfully!`);
      // Here you would typically update the candidate status in your backend
      console.log('Shortlisted candidate:', selectedCandidate);
    }
  };

  const handleMoveToInterview = () => {
    if (selectedCandidate) {
      alert(`${selectedCandidate.name} has been moved to the interview stage!`);
      // Here you would typically update the candidate status in your backend
      console.log('Moved to interview:', selectedCandidate);
    }
  };

  return (
    <div className="container-fluid">
      {/* Header */}
      <div className="card border shadow-none mb-4">
        <div className="card-body">
          <div className="d-flex align-items-center gap-3 mb-2">
            <div className="p-2 bg-primary-subtle rounded">
              <Users size={24} className="text-primary" />
            </div>
            <h4 className="mb-0">🤖 AI Prescreening Results</h4>
          </div>
          <p className="text-muted mb-0">View candidate fit scores, strengths, and areas for improvement powered by AI.</p>
        </div>
      </div>

      {/* Filter Section */}
      <div className="card border shadow-none mb-4">
        <div className="card-body">
          <div className="d-flex flex-wrap align-items-center gap-3">
            <div className="d-flex align-items-center gap-2">
              <Filter size={16} className="text-muted" />
              <span className="small fw-medium text-muted">Filter by:</span>
            </div>
            
            {/* Job Filter */}
            <select
              className="form-select"
              value={filters.job}
              onChange={(e) => setFilters({...filters, job: e.target.value})}
              style={{width: '200px'}}
            >
              {jobs.map(job => (
                <option key={job} value={job}>
                  {job === 'all' ? 'All Jobs' : job}
                </option>
              ))}
            </select>

            {/* Score Threshold */}
            <div className="d-flex align-items-center gap-2">
              <label className="small text-muted">Score ≥</label>
              <input
                type="number"
                className="form-control"
                value={filters.scoreThreshold}
                onChange={(e) => setFilters({...filters, scoreThreshold: parseInt(e.target.value)})}
                style={{width: '80px'}}
                min="0"
                max="100"
              />
              <span className="small text-muted">%</span>
            </div>

            {/* Search */}
            <div className="input-group" style={{width: '300px'}}>
              <span className="input-group-text">
                <Search size={16} />
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Search candidates..."
                value={filters.search}
                onChange={(e) => setFilters({...filters, search: e.target.value})}
              />
            </div>

            {/* Export Button */}
            <button
              className="btn btn-success"
              onClick={exportToCSV}
            >
              <Download size={16} className="me-2" />
              Export CSV
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="row g-4">
        {/* Candidate Table */}
        <div className={`${selectedCandidate ? 'col-lg-7' : 'col-12'}`}>
          <div className="card border shadow-none">
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="table-light">
                    <tr>
                      <th className="px-4 py-3">Candidate Name</th>
                      <th className="px-4 py-3">Job Applied</th>
                      <th className="px-4 py-3">AI Fit Score</th>
                      <th className="px-4 py-3">Strengths</th>
                      <th className="px-4 py-3">Weaknesses</th>
                      <th className="px-4 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCandidates.map(candidate => (
                      <tr key={candidate.id}>
                        <td className="px-4 py-3">
                          <div className="fw-medium">{candidate.name}</div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="text-muted small">{candidate.job}</div>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`badge ${getScoreColor(candidate.score)}`}>
                            {candidate.score}%
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="text-muted small">
                            {candidate.strengths.slice(0, 2).join(', ')}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="text-muted small">
                            {candidate.weaknesses.slice(0, 1).join(', ')}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <button
                            className="btn btn-primary btn-sm"
                            onClick={() => setSelectedCandidate(candidate)}
                          >
                            View Insights
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Candidate Detail Sidebar */}
        {selectedCandidate && (
          <div className="col-lg-5">
            <div className="card border shadow-none position-sticky" style={{top: '20px'}}>
              {/* Header */}
              <div className="card-header bg-white border-bottom">
                <div className="d-flex align-items-start justify-content-between mb-3">
                  <div>
                    <h5 className="mb-1">{selectedCandidate.name}</h5>
                    <p className="text-muted small mb-0">{selectedCandidate.job}</p>
                  </div>
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => setSelectedCandidate(null)}
                  >
                    <X size={16} />
                  </button>
                </div>
                <div className="d-flex align-items-center gap-3">
                  <span className={`fs-3 fw-bold ${getScoreColor(selectedCandidate.score).split(' ')[0]}`}>
                    {selectedCandidate.score}%
                  </span>
                  <span className={`badge ${getScoreColor(selectedCandidate.score)}`}>
                    {getScoreBadge(selectedCandidate.score)}
                  </span>
                </div>
              </div>

              <div className="card-body" style={{maxHeight: '70vh', overflowY: 'auto'}}>
                {/* Strengths */}
                <div className="mb-4">
                  <div className="d-flex align-items-center gap-2 mb-3">
                    <CheckCircle size={18} className="text-success" />
                    <h6 className="mb-0">💪 Strengths</h6>
                  </div>
                  <ul className="list-unstyled">
                    {selectedCandidate.strengths.map((strength, idx) => (
                      <li key={idx} className="d-flex align-items-start gap-2 small text-muted mb-2">
                        <span className="text-success mt-1">•</span>
                        <span>{strength}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="small text-muted mt-3">
                    {selectedCandidate.additionalInfo}
                  </p>
                </div>

                {/* Weaknesses */}
                <div className="mb-4">
                  <div className="d-flex align-items-center gap-2 mb-3">
                    <AlertTriangle size={18} className="text-warning" />
                    <h6 className="mb-0">⚠ Areas for Improvement</h6>
                  </div>
                  <ul className="list-unstyled">
                    {selectedCandidate.weaknesses.map((weakness, idx) => (
                      <li key={idx} className="d-flex align-items-start gap-2 small text-muted mb-2">
                        <span className="text-warning mt-1">•</span>
                        <span>{weakness}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Evaluation Metrics */}
                <div className="mb-4">
                  <div className="d-flex align-items-center gap-2 mb-3">
                    <TrendingUp size={18} className="text-primary" />
                    <h6 className="mb-0">📈 Evaluation Summary</h6>
                  </div>
                  <div>
                    {[
                      { label: 'Resume Match', value: selectedCandidate.resumeMatch },
                      { label: 'Skills Match', value: selectedCandidate.skillsMatch },
                      { label: 'Experience Relevance', value: selectedCandidate.experienceRelevance },
                      { label: 'Culture Fit (AI-based)', value: selectedCandidate.cultureFit }
                    ].map((metric, idx) => (
                      <div key={idx} className="mb-3">
                        <div className="d-flex justify-content-between small mb-1">
                          <span className="text-muted">{metric.label}</span>
                          <span className="fw-medium">{metric.value}%</span>
                        </div>
                        <div className="progress" style={{height: '8px'}}>
                          <div
                            className={`progress-bar ${
                              metric.value >= 80 ? 'bg-success' : metric.value >= 70 ? 'bg-warning' : 'bg-danger'
                            }`}
                            style={{ width: `${metric.value}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI Recommendations */}
                <div className="mb-4">
                  <h6 className="mb-2">🧠 AI Recommendations</h6>
                  <div className="alert alert-info">
                    <p className="small mb-0">{selectedCandidate.recommendation}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="d-grid gap-2">
                  <button 
                    className="btn btn-success"
                    onClick={handleShortlist}
                    style={{
                      backgroundColor: '#198754',
                      borderColor: '#198754',
                      color: 'white',
                      padding: '8px 16px',
                      borderRadius: '6px',
                      fontSize: '14px',
                      fontWeight: '500',
                      border: 'none'
                    }}
                  >
                    Shortlist
                  </button>
                  <button 
                    className="btn btn-primary"
                    onClick={handleMoveToInterview}
                    style={{
                      backgroundColor: '#0d6efd',
                      borderColor: '#0d6efd',
                      color: 'white',
                      padding: '8px 16px',
                      borderRadius: '6px',
                      fontSize: '14px',
                      fontWeight: '500',
                      border: 'none'
                    }}
                  >
                    Move to Interview
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIPreScreening;

