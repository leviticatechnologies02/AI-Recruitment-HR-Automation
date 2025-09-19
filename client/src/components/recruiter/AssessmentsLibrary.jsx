import React, { useState } from 'react';
import {
  Search,
  Plus,
  Edit3,
  Eye,
  Trash2,
  FileText,
  Code,
  Video,
  FileQuestion,
  Clock,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';


const AssessmentsLibrary = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    skill: 'All',
    difficulty: 'All',
    role: 'All',
    lastUpdated: 'All'
  });
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'cards'
  const [currentPage, setCurrentPage] = useState(1);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedAssessment, setSelectedAssessment] = useState(null);
  const itemsPerPage = 10;

  // Mock data for assessments
  const [assessments, setAssessments] = useState([
    {
      id: 1,
      name: 'JavaScript Fundamentals',
      type: 'MCQ',
      skill: 'JavaScript',
      difficulty: 'Beginner',
      role: 'Frontend Developer',
      questionsCount: 25,
      lastUpdated: '2024-09-15',
      icon: 'FileQuestion'
    },
    {
      id: 2,
      name: 'React Development Challenge',
      type: 'Coding',
      skill: 'React',
      difficulty: 'Intermediate',
      role: 'Frontend Developer',
      questionsCount: 5,
      lastUpdated: '2024-09-12',
      icon: 'Code'
    },
    {
      id: 3,
      name: 'Cultural Fit Interview',
      type: 'Video',
      skill: 'Soft Skills',
      difficulty: 'Easy',
      role: 'All Roles',
      questionsCount: 8,
      lastUpdated: '2024-09-10',
      icon: 'Video'
    },
    {
      id: 4,
      name: 'Python Data Structures',
      type: 'Coding',
      skill: 'Python',
      difficulty: 'Advanced',
      role: 'Backend Developer',
      questionsCount: 12,
      lastUpdated: '2024-09-08',
      icon: 'Code'
    },
    {
      id: 5,
      name: 'System Design Concepts',
      type: 'MCQ',
      skill: 'System Design',
      difficulty: 'Advanced',
      role: 'Senior Developer',
      questionsCount: 20,
      lastUpdated: '2024-09-05',
      icon: 'FileQuestion'
    }
  ]);

  // Filter and search logic
  const filteredAssessments = assessments.filter(assessment => {
    const matchesSearch = assessment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assessment.skill.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assessment.role.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilters = 
      (selectedFilters.skill === 'All' || assessment.skill === selectedFilters.skill) &&
      (selectedFilters.difficulty === 'All' || assessment.difficulty === selectedFilters.difficulty) &&
      (selectedFilters.role === 'All' || assessment.role === selectedFilters.role);
    
    return matchesSearch && matchesFilters;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredAssessments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedAssessments = filteredAssessments.slice(startIndex, startIndex + itemsPerPage);

  const handleFilterChange = (filterType, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
    setCurrentPage(1);
  };

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Code': return <Code size={18} />;
      case 'Video': return <Video size={18} />;
      case 'FileQuestion': return <FileQuestion size={18} />;
      default: return <FileQuestion size={18} />;
    }
  };

  const handleDelete = (id) => {
    setAssessments(prev => prev.filter(assessment => assessment.id !== id));
    setShowDeleteModal(false);
    setSelectedAssessment(null);
  };

  const getDifficultyBadgeClass = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'badge bg-success';
      case 'Beginner': return 'badge bg-primary';
      case 'Intermediate': return 'badge bg-warning text-dark';
      case 'Advanced': return 'badge bg-danger';
      default: return 'badge bg-secondary';
    }
  };

  const getTypeBadgeClass = (type) => {
    switch (type) {
      case 'MCQ': return 'badge bg-info';
      case 'Coding': return 'badge bg-primary';
      case 'Video': return 'badge bg-success';
      default: return 'badge bg-secondary';
    }
  };

  return (
    <div className="container-fluid p-3">
      {/* Page Header */}
      <div className="d-flex align-items-center justify-content-between mb-3">
        <div>
          <h4 className="mb-1">Assessments Library</h4>
          <p className="text-muted mb-0">Create and manage assessment tests for candidates</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          type="button"
          className="btn btn-primary d-flex align-items-center"
        >
          <Plus size={16} className="me-2" />
          <span>Create Assessment</span>
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="card mb-3">
        <div className="card-body">
          <div className="row g-3 align-items-center">
            {/* Search */}
            <div className="col-12 col-md-4">
              <div className="input-group">
                <span className="input-group-text"><Search size={16} className="text-muted" /></span>
                <input
                  type="text"
                  placeholder="Search assessments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="form-control"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="col-12 col-md-6">
              <div className="row g-2">
                <div className="col-12 col-sm-4">
                  <select
                    value={selectedFilters.skill}
                    onChange={(e) => handleFilterChange('skill', e.target.value)}
                    className="form-select"
                  >
                    <option value="All">All Skills</option>
                    <option value="JavaScript">JavaScript</option>
                    <option value="React">React</option>
                    <option value="Python">Python</option>
                    <option value="System Design">System Design</option>
                    <option value="Soft Skills">Soft Skills</option>
                  </select>
                </div>
                <div className="col-12 col-sm-4">
                  <select
                    value={selectedFilters.difficulty}
                    onChange={(e) => handleFilterChange('difficulty', e.target.value)}
                    className="form-select"
                  >
                    <option value="All">All Levels</option>
                    <option value="Easy">Easy</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
                <div className="col-12 col-sm-4">
                  <select
                    value={selectedFilters.role}
                    onChange={(e) => handleFilterChange('role', e.target.value)}
                    className="form-select"
                  >
                    <option value="All">All Roles</option>
                    <option value="Frontend Developer">Frontend Developer</option>
                    <option value="Backend Developer">Backend Developer</option>
                    <option value="Senior Developer">Senior Developer</option>
                    <option value="All Roles">All Roles</option>
                  </select>
                </div>
              </div>
            </div>

            {/* View Toggle */}
            <div className="col-12 col-md-2 text-md-end">
              <div className="btn-group" role="group">
                <button
                  type="button"
                  onClick={() => setViewMode('table')}
                  className={`btn btn-outline-secondary btn-sm ${viewMode === 'table' ? 'active' : ''}`}
                >
                  Table
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('cards')}
                  className={`btn btn-outline-secondary btn-sm ${viewMode === 'cards' ? 'active' : ''}`}
                >
                  Cards
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Assessment List */}
      {filteredAssessments.length === 0 ? (
        // Empty State
        <div className="card text-center p-5">
          <div className="mx-auto mb-3" style={{ width: 64, height: 64 }}>
            <FileText size={48} className="text-muted" />
          </div>
          <h5 className="mb-2">No assessments found</h5>
          <p className="text-muted mb-4">Create your first assessment to get started with candidate evaluation.</p>
          <button
            onClick={() => setShowCreateModal(true)}
            type="button"
            className="btn btn-primary d-inline-flex align-items-center"
          >
            <Plus size={16} className="me-2" />
            <span>Create Assessment</span>
          </button>
        </div>
      ) : (
        <>
          {viewMode === 'table' ? (
            // Table View
            <div className="card">
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Assessment Name</th>
                      <th>Type</th>
                      <th>Questions</th>
                      <th>Last Updated</th>
                      <th className="text-end">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedAssessments.map((assessment) => (
                      <tr key={assessment.id}>
                        <td>
                          <div className="d-flex align-items-center">
                            <div className="me-3 text-muted">
                              {getIcon(assessment.icon)}
                            </div>
                            <div>
                              <div className="fw-semibold">{assessment.name}</div>
                              <div className="text-muted small">{assessment.skill} • {assessment.role}</div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className={`${getTypeBadgeClass(assessment.type)} rounded-pill`}>{assessment.type}</span>
                        </td>
                        <td className="fw-medium">{assessment.questionsCount}</td>
                        <td className="text-muted">{new Date(assessment.lastUpdated).toLocaleDateString()}</td>
                        <td>
                          <div className="d-flex justify-content-end gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedAssessment(assessment);
                                setShowPreviewModal(true);
                              }}
                              className="btn btn-light btn-sm"
                              title="Preview"
                            >
                              <Eye size={16} />
                            </button>
                            <button type="button" className="btn btn-light btn-sm" title="Edit">
                              <Edit3 size={16} />
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedAssessment(assessment);
                                setShowDeleteModal(true);
                              }}
                              className="btn btn-light btn-sm"
                              title="Delete"
                            >
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
          ) : (
            // Card View
            <div className="row g-3">
              {paginatedAssessments.map((assessment) => (
                <div key={assessment.id} className="col-12 col-md-6 col-lg-4">
                  <div className="card h-100">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-start mb-3">
                        <div className="d-flex align-items-center">
                          <div className="me-3 text-muted">
                            {getIcon(assessment.icon)}
                          </div>
                          <div>
                            <h6 className="mb-1">{assessment.name}</h6>
                            <div className="text-muted small">{assessment.skill}</div>
                          </div>
                        </div>
                        <div className="d-flex gap-1">
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedAssessment(assessment);
                              setShowPreviewModal(true);
                            }}
                            className="btn btn-light btn-sm"
                            title="Preview"
                          >
                            <Eye size={16} />
                          </button>
                          <button type="button" className="btn btn-light btn-sm" title="Edit">
                            <Edit3 size={16} />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedAssessment(assessment);
                              setShowDeleteModal(true);
                            }}
                            className="btn btn-light btn-sm"
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>

                      <div className="d-flex align-items-center gap-2 mb-3">
                        <span className={`${getTypeBadgeClass(assessment.type)} rounded-pill`}>{assessment.type}</span>
                        <span className={`${getDifficultyBadgeClass(assessment.difficulty)} rounded-pill`}>{assessment.difficulty}</span>
                      </div>

                      <div className="d-flex justify-content-between text-muted small">
                        <span>{assessment.questionsCount} questions</span>
                        <span className="d-inline-flex align-items-center">
                          <Clock size={14} className="me-1" />
                          {new Date(assessment.lastUpdated).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="d-flex align-items-center justify-content-between mt-3">
              <div className="text-muted small">
                Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredAssessments.length)} of {filteredAssessments.length} assessments
              </div>
              <nav>
                <ul className="pagination pagination-sm mb-0">
                  <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button
                      type="button"
                      className="page-link"
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    >
                      <ChevronLeft size={14} />
                    </button>
                  </li>
                  {[...Array(totalPages)].map((_, i) => (
                    <li key={i + 1} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                      <button type="button" className="page-link" onClick={() => setCurrentPage(i + 1)}>
                        {i + 1}
                      </button>
                    </li>
                  ))}
                  <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button
                      type="button"
                      className="page-link"
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    >
                      <ChevronRight size={14} />
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          )}
        </>
      )}

      {/* Create Assessment Modal */}
      {showCreateModal && (
        <>
          <div className="modal d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-lg" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Create New Assessment</h5>
                  <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowCreateModal(false)}></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Assessment Name</label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Type</label>
                      <select className="form-select">
                        <option>MCQ</option>
                        <option>Coding</option>
                        <option>Video</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Difficulty</label>
                      <select className="form-select">
                        <option>Easy</option>
                        <option>Beginner</option>
                        <option>Intermediate</option>
                        <option>Advanced</option>
                      </select>
                    </div>
                  </div>
                  <div className="mt-3">
                    <label className="form-label">Description</label>
                    <textarea rows={3} className="form-control"></textarea>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-light" onClick={() => setShowCreateModal(false)}>Cancel</button>
                  <button type="button" className="btn btn-primary" onClick={() => setShowCreateModal(false)}>Create Assessment</button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </>
      )}

      {/* Preview Modal */}
      {showPreviewModal && selectedAssessment && (
        <>
          <div className="modal d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-lg" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Preview Assessment</h5>
                  <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowPreviewModal(false)}></button>
                </div>
                <div className="modal-body">
                  <div className="border rounded p-3 mb-3">
                    <h6 className="mb-2">{selectedAssessment.name}</h6>
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <span className={`${getTypeBadgeClass(selectedAssessment.type)} rounded-pill`}>{selectedAssessment.type}</span>
                      <span className={`${getDifficultyBadgeClass(selectedAssessment.difficulty)} rounded-pill`}>{selectedAssessment.difficulty}</span>
                    </div>
                    <p className="text-muted mb-1">Skill: {selectedAssessment.skill}</p>
                    <p className="text-muted mb-1">Role: {selectedAssessment.role}</p>
                    <p className="text-muted mb-0">Questions: {selectedAssessment.questionsCount}</p>
                  </div>
                  <div className="text-center py-4">
                    <p className="text-muted mb-3">Assessment preview content would be displayed here</p>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-primary" onClick={() => setShowPreviewModal(false)}>Close Preview</button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedAssessment && (
        <>
          <div className="modal d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Delete Assessment</h5>
                  <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowDeleteModal(false)}></button>
                </div>
                <div className="modal-body">
                  <p className="mb-0">Are you sure you want to delete "{selectedAssessment.name}"? This action cannot be undone.</p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-light" onClick={() => setShowDeleteModal(false)}>Cancel</button>
                  <button type="button" className="btn btn-danger" onClick={() => handleDelete(selectedAssessment.id)}>Delete</button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </>
      )}
    </div>
  );
};

export default AssessmentsLibrary;