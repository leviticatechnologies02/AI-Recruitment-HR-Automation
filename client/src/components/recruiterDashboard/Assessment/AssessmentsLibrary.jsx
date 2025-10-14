import React, { useState } from 'react';
import { Search, Plus, Edit, Eye, Trash2, Filter } from 'lucide-react';

const AssessmentsLibrary = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [skillFilter, setSkillFilter] = useState('all');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');
  const [assessmentsList, setAssessmentsList] = useState([
    {
      id: 1,
      name: 'React Developer Test',
      type: 'Technical',
      skill: 'React.js',
      questions: 20,
      difficulty: 'Medium',
      lastUpdated: '06 Oct 2025',
      icon: '⚛'
    },
    {
      id: 2,
      name: 'HTML & CSS Basics',
      type: 'Technical',
      skill: 'HTML/CSS',
      questions: 10,
      difficulty: 'Easy',
      lastUpdated: '03 Oct 2025',
      icon: '🎨'
    },
    {
      id: 3,
      name: 'ReactJS Advanced Test',
      type: 'Technical',
      skill: 'React.js',
      questions: 15,
      difficulty: 'Hard',
      lastUpdated: '05 Oct 2025',
      icon: '⚛'
    },
    {
      id: 4,
      name: 'HR Communication Round',
      type: 'HR Round',
      skill: 'Communication',
      questions: 8,
      difficulty: 'Easy',
      lastUpdated: '02 Oct 2025',
      icon: '💬'
    },
    {
      id: 5,
      name: 'Python Basics',
      type: 'Technical',
      skill: 'Python',
      questions: 15,
      difficulty: 'Easy',
      lastUpdated: '01 Oct 2025',
      icon: '🐍'
    },
    {
      id: 6,
      name: 'Aptitude & Reasoning',
      type: 'Aptitude',
      skill: 'Logical Reasoning',
      questions: 25,
      difficulty: 'Medium',
      lastUpdated: '29 Sep 2025',
      icon: '🧠'
    }
  ]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [assessmentToDelete, setAssmentToDelete] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [editingAssessment, setEditingAssessment] = useState(null);
  const [previewingAssessment, setPreviewingAssessment] = useState(null);
  const [newAssessment, setNewAssessment] = useState({
    name: '',
    type: 'Technical',
    skill: '',
    questions: '',
    difficulty: 'Easy',
    description: ''
  });

  const filteredAssessments = assessmentsList.filter(assessment => {
    const matchesSearch = assessment.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSkill = skillFilter === 'all' || assessment.skill === skillFilter;
    const matchesDifficulty = difficultyFilter === 'all' || assessment.difficulty === difficultyFilter;
    const matchesRole = roleFilter === 'all' || assessment.type === roleFilter;
    return matchesSearch && matchesSkill && matchesDifficulty && matchesRole;
  });

  const handleCreateAssessment = () => {
    setShowCreateModal(true);
  };

  const handleInputChange = (field, value) => {
    setNewAssessment(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveAssessment = () => {
    if (newAssessment.name && newAssessment.skill && newAssessment.questions) {
      const today = new Date();
      const formattedDate = today.toLocaleDateString('en-GB', { 
        day: '2-digit', 
        month: 'short', 
        year: 'numeric' 
      }).replace(/ /g, ' ');

      const iconMap = {
        'React.js': '⚛',
        'HTML/CSS': '🎨',
        'Python': '🐍',
        'JavaScript': '📜',
        'Communication': '💬',
        'Logical Reasoning': '🧠',
        'Java': '☕',
        'Node.js': '🟢',
        'SQL': '🗃️',
        'AWS': '☁️'
      };

      const newAssessmentData = {
        id: Math.max(...assessmentsList.map(a => a.id)) + 1,
        name: newAssessment.name,
        type: newAssessment.type,
        skill: newAssessment.skill,
        questions: parseInt(newAssessment.questions),
        difficulty: newAssessment.difficulty,
        lastUpdated: formattedDate,
        icon: iconMap[newAssessment.skill] || '📝',
        description: newAssessment.description
      };

      setAssessmentsList(prevList => [...prevList, newAssessmentData]);
      setNewAssessment({
        name: '',
        type: 'Technical',
        skill: '',
        questions: '',
        difficulty: 'Easy',
        description: ''
      });
      setShowCreateModal(false);
    } else {
      alert('Please fill in all required fields (Name, Skill, Questions)');
    }
  };

  const handleCancelCreate = () => {
    setNewAssessment({
      name: '',
      type: 'Technical',
      skill: '',
      questions: '',
      difficulty: 'Easy',
      description: ''
    });
    setShowCreateModal(false);
  };

  const handleEdit = (assessmentId) => {
    const assessment = assessmentsList.find(a => a.id === assessmentId);
    if (assessment) {
      setEditingAssessment({
        ...assessment,
        questions: assessment.questions.toString()
      });
      setShowEditModal(true);
    }
  };

  const handlePreview = (assessmentId) => {
    const assessment = assessmentsList.find(a => a.id === assessmentId);
    if (assessment) {
      setPreviewingAssessment(assessment);
      setShowPreviewModal(true);
    }
  };

  const handleSaveEdit = () => {
    if (editingAssessment && editingAssessment.name && editingAssessment.skill && editingAssessment.questions) {
      const today = new Date();
      const formattedDate = today.toLocaleDateString('en-GB', { 
        day: '2-digit', 
        month: 'short', 
        year: 'numeric' 
      }).replace(/ /g, ' ');

      const updatedAssessment = {
        ...editingAssessment,
        questions: parseInt(editingAssessment.questions),
        lastUpdated: formattedDate
      };

      setAssessmentsList(prevList => 
        prevList.map(assessment => 
          assessment.id === editingAssessment.id ? updatedAssessment : assessment
        )
      );
      
      setShowEditModal(false);
      setEditingAssessment(null);
    } else {
      alert('Please fill in all required fields (Name, Skill, Questions)');
    }
  };

  const handleCancelEdit = () => {
    setShowEditModal(false);
    setEditingAssessment(null);
  };

  const handleClosePreview = () => {
    setShowPreviewModal(false);
    setPreviewingAssessment(null);
  };

  const handleDelete = (assessmentId) => {
    setAssmentToDelete(assessmentId);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (assessmentToDelete) {
      setAssessmentsList(prevList => prevList.filter(assessment => assessment.id !== assessmentToDelete));
      setShowDeleteModal(false);
      setAssmentToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setAssmentToDelete(null);
  };

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Easy': return 'bg-success-subtle text-success';
      case 'Medium': return 'bg-warning-subtle text-warning';
      case 'Hard': return 'bg-danger-subtle text-danger';
      default: return 'bg-secondary-subtle text-secondary';
    }
  };

  const getTypeColor = (type) => {
    switch(type) {
      case 'Technical': return 'bg-primary-subtle text-primary';
      case 'HR Round': return 'bg-info-subtle text-info';
      case 'Aptitude': return 'bg-warning-subtle text-warning';
      default: return 'bg-secondary-subtle text-secondary';
    }
  };

  return (
    <div className="container-fluid py-4">
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="mb-1 d-flex align-items-center gap-2">
            📘 Assessments Library
          </h4>
          <p className="text-muted mb-0">Manage all your hiring assessments</p>
        </div>
        <button className="btn btn-primary" onClick={handleCreateAssessment}>
          <Plus size={18} className="me-2" />
          Create Assessment
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="card border shadow-none mb-4">
        <div className="card-body">
          <div className="row g-3">
            {/* Search Box */}
            <div className="col-md-3">
              <div className="input-group">
                <span className="input-group-text bg-white">
                  <Search size={18} />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search assessments..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Skill Filter */}
            <div className="col-md-3">
              <select
                className="form-select"
                value={skillFilter}
                onChange={(e) => setSkillFilter(e.target.value)}
              >
                <option value="all">All Skills</option>
                <option value="React.js">React.js</option>
                <option value="Python">Python</option>
                <option value="HTML/CSS">HTML/CSS</option>
                <option value="Communication">Communication</option>
                <option value="Logical Reasoning">Logical Reasoning</option>
              </select>
            </div>

            {/* Difficulty Filter */}
            <div className="col-md-3">
              <select
                className="form-select"
                value={difficultyFilter}
                onChange={(e) => setDifficultyFilter(e.target.value)}
              >
                <option value="all">All Difficulties</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>

            {/* Role Filter */}
            <div className="col-md-3">
              <select
                className="form-select"
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="Technical">Technical</option>
                <option value="HR Round">HR Round</option>
                <option value="Aptitude">Aptitude</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-3">
        <p className="text-muted mb-0">
          Showing <span className="fw-semibold text-dark">{filteredAssessments.length}</span> of <span className="fw-semibold text-dark">{assessmentsList.length}</span> assessments
        </p>
      </div>

      {/* Assessments Grid */}
      <div className="row g-4 mb-4">
        {filteredAssessments.map(assessment => (
          <div key={assessment.id} className="col-md-6 col-lg-4">
            <div className="card border shadow-sm h-100">
              <div className="card-body">
                {/* Assessment Header */}
                <div className="d-flex align-items-start justify-content-between mb-3">
                  <div className="d-flex align-items-center gap-3">
                    <span style={{ fontSize: '2rem' }}>{assessment.icon}</span>
                    <div>
                      <h6 className="mb-1">{assessment.name}</h6>
                      <span className={`badge ${getTypeColor(assessment.type)} small`}>
                        {assessment.type}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Assessment Details */}
                <div className="mb-3">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="text-muted small">Skill:</span>
                    <span className="fw-medium small">{assessment.skill}</span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="text-muted small">Questions:</span>
                    <span className="fw-medium small">{assessment.questions}</span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="text-muted small">Difficulty:</span>
                    <span className={`badge ${getDifficultyColor(assessment.difficulty)} small`}>
                      {assessment.difficulty}
                    </span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center pt-2 border-top">
                    <span className="text-muted small">Last Updated:</span>
                    <span className="text-muted small">{assessment.lastUpdated}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="d-flex gap-2">
                  <button className="btn btn-sm btn-outline-primary flex-grow-1" onClick={() => handleEdit(assessment.id)}>
                    <Edit size={14} className="me-1" />
                    Edit
                  </button>
                  <button className="btn btn-sm btn-outline-success flex-grow-1" onClick={() => handlePreview(assessment.id)}>
                    <Eye size={14} className="me-1" />
                    Preview
                  </button>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(assessment.id)}>
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No Results Message */}
      {filteredAssessments.length === 0 && (
        <div className="card border shadow-none">
          <div className="card-body text-center py-5">
            <Filter size={48} className="text-muted mb-3" />
            <h5 className="mb-2">No assessments found</h5>
            <p className="text-muted">Try adjusting your filters or search query</p>
          </div>
        </div>
      )}

      {/* Pagination */}
      {filteredAssessments.length > 0 && (
        <div className="d-flex justify-content-center align-items-center mt-4">
          <div className="btn-group" role="group">
            <button className="btn btn-outline-secondary btn-sm">
              ← Previous
            </button>
            <button className="btn btn-primary btn-sm">1</button>
            <button className="btn btn-outline-secondary btn-sm">2</button>
            <button className="btn btn-outline-secondary btn-sm">3</button>
            <button className="btn btn-outline-secondary btn-sm">
              Next →
            </button>
          </div>
        </div>
      )}

      {/* Create Assessment Modal */}
      {showCreateModal && (
        <div className="modal fade show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)'}} tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Create New Assessment</h5>
                <button type="button" className="btn-close" onClick={handleCancelCreate}></button>
              </div>
              <div className="modal-body">
                <div className="row g-3">
                  {/* Assessment Name */}
                  <div className="col-md-6">
                    <label className="form-label">Assessment Name <span className="text-danger">*</span></label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter assessment name"
                      value={newAssessment.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                    />
                  </div>

                  {/* Assessment Type */}
                  <div className="col-md-6">
                    <label className="form-label">Assessment Type</label>
                    <select
                      className="form-select"
                      value={newAssessment.type}
                      onChange={(e) => handleInputChange('type', e.target.value)}
                    >
                      <option value="Technical">Technical</option>
                      <option value="HR Round">HR Round</option>
                      <option value="Aptitude">Aptitude</option>
                      <option value="Behavioral">Behavioral</option>
                    </select>
                  </div>

                  {/* Skill */}
                  <div className="col-md-6">
                    <label className="form-label">Skill <span className="text-danger">*</span></label>
                    <select
                      className="form-select"
                      value={newAssessment.skill}
                      onChange={(e) => handleInputChange('skill', e.target.value)}
                    >
                      <option value="">Select Skill</option>
                      <option value="React.js">React.js</option>
                      <option value="JavaScript">JavaScript</option>
                      <option value="Python">Python</option>
                      <option value="Java">Java</option>
                      <option value="Node.js">Node.js</option>
                      <option value="HTML/CSS">HTML/CSS</option>
                      <option value="SQL">SQL</option>
                      <option value="AWS">AWS</option>
                      <option value="Communication">Communication</option>
                      <option value="Logical Reasoning">Logical Reasoning</option>
                    </select>
                  </div>

                  {/* Number of Questions */}
                  <div className="col-md-6">
                    <label className="form-label">Number of Questions <span className="text-danger">*</span></label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Enter number of questions"
                      min="1"
                      max="100"
                      value={newAssessment.questions}
                      onChange={(e) => handleInputChange('questions', e.target.value)}
                    />
                  </div>

                  {/* Difficulty Level */}
                  <div className="col-md-6">
                    <label className="form-label">Difficulty Level</label>
                    <select
                      className="form-select"
                      value={newAssessment.difficulty}
                      onChange={(e) => handleInputChange('difficulty', e.target.value)}
                    >
                      <option value="Easy">Easy</option>
                      <option value="Medium">Medium</option>
                      <option value="Hard">Hard</option>
                    </select>
                  </div>

                  {/* Description */}
                  <div className="col-12">
                    <label className="form-label">Description</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      placeholder="Enter assessment description (optional)"
                      value={newAssessment.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCancelCreate}>
                  Cancel
                </button>
                <button type="button" className="btn btn-primary" onClick={handleSaveAssessment}>
                  
                  Save 
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Assessment Modal */}
      {showEditModal && editingAssessment && (
        <div className="modal fade show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)'}} tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Assessment</h5>
                <button type="button" className="btn-close" onClick={handleCancelEdit}></button>
              </div>
              <div className="modal-body">
                <div className="row g-3">
                  {/* Assessment Name */}
                  <div className="col-md-6">
                    <label className="form-label">Assessment Name <span className="text-danger">*</span></label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter assessment name"
                      value={editingAssessment.name}
                      onChange={(e) => setEditingAssessment({...editingAssessment, name: e.target.value})}
                    />
                  </div>

                  {/* Assessment Type */}
                  <div className="col-md-6">
                    <label className="form-label">Assessment Type</label>
                    <select
                      className="form-select"
                      value={editingAssessment.type}
                      onChange={(e) => setEditingAssessment({...editingAssessment, type: e.target.value})}
                    >
                      <option value="Technical">Technical</option>
                      <option value="HR Round">HR Round</option>
                      <option value="Aptitude">Aptitude</option>
                      <option value="Behavioral">Behavioral</option>
                    </select>
                  </div>

                  {/* Skill */}
                  <div className="col-md-6">
                    <label className="form-label">Skill <span className="text-danger">*</span></label>
                    <select
                      className="form-select"
                      value={editingAssessment.skill}
                      onChange={(e) => setEditingAssessment({...editingAssessment, skill: e.target.value})}
                    >
                      <option value="">Select Skill</option>
                      <option value="React.js">React.js</option>
                      <option value="JavaScript">JavaScript</option>
                      <option value="Python">Python</option>
                      <option value="Java">Java</option>
                      <option value="Node.js">Node.js</option>
                      <option value="HTML/CSS">HTML/CSS</option>
                      <option value="SQL">SQL</option>
                      <option value="AWS">AWS</option>
                      <option value="Communication">Communication</option>
                      <option value="Logical Reasoning">Logical Reasoning</option>
                    </select>
                  </div>

                  {/* Number of Questions */}
                  <div className="col-md-6">
                    <label className="form-label">Number of Questions <span className="text-danger">*</span></label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Enter number of questions"
                      min="1"
                      max="100"
                      value={editingAssessment.questions}
                      onChange={(e) => setEditingAssessment({...editingAssessment, questions: e.target.value})}
                    />
                  </div>

                  {/* Difficulty Level */}
                  <div className="col-md-6">
                    <label className="form-label">Difficulty Level</label>
                    <select
                      className="form-select"
                      value={editingAssessment.difficulty}
                      onChange={(e) => setEditingAssessment({...editingAssessment, difficulty: e.target.value})}
                    >
                      <option value="Easy">Easy</option>
                      <option value="Medium">Medium</option>
                      <option value="Hard">Hard</option>
                    </select>
                  </div>

                  {/* Description */}
                  <div className="col-12">
                    <label className="form-label">Description</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      placeholder="Enter assessment description (optional)"
                      value={editingAssessment.description || ''}
                      onChange={(e) => setEditingAssessment({...editingAssessment, description: e.target.value})}
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCancelEdit}>
                  Cancel
                </button>
                <button type="button" className="btn btn-primary" onClick={handleSaveEdit}>
                  <Edit size={14} className="me-1" />
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Preview Assessment Modal */}
      {showPreviewModal && previewingAssessment && (
        <div className="modal fade show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)'}} tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Assessment Preview</h5>
                <button type="button" className="btn-close" onClick={handleClosePreview}></button>
              </div>
              <div className="modal-body">
                <div className="card">
                  <div className="card-body">
                    {/* Assessment Header */}
                    <div className="d-flex align-items-start justify-content-between mb-3">
                      <div className="d-flex align-items-center gap-3">
                        <span className="fs-1">{previewingAssessment.icon}</span>
                        <div>
                          <h4 className="mb-1">{previewingAssessment.name}</h4>
                          <span className={`badge ${getTypeColor(previewingAssessment.type)}`}>
                            {previewingAssessment.type}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Assessment Details */}
                    <div className="row g-3 mb-3">
                      <div className="col-md-6">
                        <div className="d-flex justify-content-between">
                          <span className="text-muted">Skill:</span>
                          <span className="fw-medium">{previewingAssessment.skill}</span>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="d-flex justify-content-between">
                          <span className="text-muted">Questions:</span>
                          <span className="fw-medium">{previewingAssessment.questions}</span>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="d-flex justify-content-between">
                          <span className="text-muted">Difficulty:</span>
                          <span className={`badge ${getDifficultyColor(previewingAssessment.difficulty)}`}>
                            {previewingAssessment.difficulty}
                          </span>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="d-flex justify-content-between">
                          <span className="text-muted">Last Updated:</span>
                          <span className="text-muted small">{previewingAssessment.lastUpdated}</span>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    {previewingAssessment.description && (
                      <div className="mb-3">
                        <label className="form-label text-muted">Description</label>
                        <p className="mb-0">{previewingAssessment.description}</p>
                      </div>
                    )}

                    {/* Sample Questions Preview */}
                    <div className="border-top pt-3">
                      <h6 className="mb-3">Sample Questions Preview</h6>
                      <div className="bg-light p-3 rounded">
                        <p className="mb-2"><strong>Question 1:</strong> What is the main purpose of {previewingAssessment.skill}?</p>
                        <p className="mb-2"><strong>Question 2:</strong> Explain the key concepts in {previewingAssessment.skill}.</p>
                        <p className="mb-0"><strong>Question 3:</strong> How would you implement a basic feature using {previewingAssessment.skill}?</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleClosePreview}>
                  Close
                </button>
                <button type="button" className="btn btn-primary" onClick={() => handleEdit(previewingAssessment.id)}>
                  <Edit size={14} className="me-1" />
                  Edit Assessment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal fade show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)'}} tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button type="button" className="btn-close" onClick={cancelDelete}></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this assessment?</p>
                <p className="text-muted small">This action cannot be undone and the assessment will be permanently removed from the library.</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={cancelDelete}>
                  Cancel
                </button>
                <button type="button" className="btn btn-danger" onClick={confirmDelete}>
                  <Trash2 size={14} className="me-1" />
                  Delete Assessment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssessmentsLibrary;

