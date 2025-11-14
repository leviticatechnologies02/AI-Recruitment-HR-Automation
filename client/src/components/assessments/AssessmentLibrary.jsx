import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search,
  Filter,
  RefreshCw,
  FileText,
  Code,
  MessageSquare,
  Brain,
  X,
  Save,
  Eye
} from 'lucide-react';
import { Icon } from '@iconify/react/dist/iconify.js';
import { assessmentAPI } from '../../utils/api';

const AssessmentLibrary = () => {
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedAssessment, setSelectedAssessment] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterDifficulty, setFilterDifficulty] = useState('all');
  
  const [formData, setFormData] = useState({
    name: '',
    type: 'aptitude',
    skill: '',
    difficulty: 'medium',
    role: '',
    question_count: 25,
    created_by: null  // Made optional - will use current user ID if available
  });

  const [errors, setErrors] = useState({});

  // Fetch assessments
  const fetchAssessments = async () => {
    setLoading(true);
    try {
      const data = await assessmentAPI.list();
      setAssessments(data || []);
    } catch (error) {
      console.error('Error fetching assessments:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssessments();
  }, []);

  // Filter assessments
  const filteredAssessments = assessments.filter(assessment => {
    const matchesSearch = assessment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (assessment.role && assessment.role.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = filterType === 'all' || assessment.type === filterType;
    const matchesDifficulty = filterDifficulty === 'all' || assessment.difficulty === filterDifficulty;
    return matchesSearch && matchesType && matchesDifficulty;
  });

  // Handle form input changes
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Assessment name is required';
    if (!formData.type) newErrors.type = 'Type is required';
    if (!formData.role.trim()) newErrors.role = 'Role is required';
    if (formData.question_count < 1) newErrors.question_count = 'Must have at least 1 question';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Create assessment
  const handleCreate = async () => {
    if (!validateForm()) return;
    
    try {
      // Get current user ID from localStorage or use null
      const userId = localStorage.getItem('userId') ? parseInt(localStorage.getItem('userId')) : null;
      const assessmentData = {
        ...formData,
        created_by: userId
      };
      
      await assessmentAPI.create(assessmentData);
      setShowModal(false);
      fetchAssessments();
      resetForm();
      alert('✅ Assessment created successfully!');
    } catch (error) {
      console.error('Error creating assessment:', error);
      alert('❌ Failed to create assessment');
    }
  };

  // Update assessment
  const handleUpdate = async () => {
    if (!validateForm()) return;
    
    try {
      await assessmentAPI.update(selectedAssessment.id, formData);
      setShowModal(false);
      setEditMode(false);
      fetchAssessments();
      resetForm();
      alert('✅ Assessment updated successfully!');
    } catch (error) {
      console.error('Error updating assessment:', error);
      alert('❌ Failed to update assessment');
    }
  };

  // Delete assessment
  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"? This action cannot be undone.`)) {
      try {
        await assessmentAPI.delete(id);
        fetchAssessments();
        alert('✅ Assessment deleted successfully!');
      } catch (error) {
        console.error('Error deleting assessment:', error);
        alert('❌ Failed to delete assessment');
      }
    }
  };

  // Edit assessment
  const handleEdit = (assessment) => {
    setSelectedAssessment(assessment);
    setFormData({
      name: assessment.name,
      type: assessment.type,
      skill: assessment.skill || '',
      difficulty: assessment.difficulty || 'medium',
      role: assessment.role || '',
      question_count: assessment.question_count || 25,
      created_by: assessment.created_by
    });
    setEditMode(true);
    setShowModal(true);
  };

  // Reset form
  const resetForm = () => {
      setFormData({
        name: '',
        type: 'aptitude',
        skill: '',
        difficulty: 'medium',
        role: '',
        question_count: 25,
        created_by: null
      });
    setErrors({});
    setSelectedAssessment(null);
    setEditMode(false);
  };

  // Get type icon
  const getTypeIcon = (type) => {
    switch (type) {
      case 'aptitude':
        return <Brain className="h-5 w-5" />;
      case 'coding':
        return <Code className="h-5 w-5" />;
      case 'communication':
        return <MessageSquare className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  // Get type color
  const getTypeColor = (type) => {
    switch (type) {
      case 'aptitude':
        return 'bg-purple-100 text-purple-700 border border-purple-300';
      case 'coding':
        return 'bg-blue-100 text-blue-700 border border-blue-300';
      case 'communication':
        return 'bg-green-100 text-green-700 border border-green-300';
      default:
        return 'bg-gray-100 text-gray-700 border border-gray-300';
    }
  };

  // Get difficulty badge
  const getDifficultyBadge = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy':
        return 'badge bg-success-subtle text-success';
      case 'medium':
        return 'badge bg-warning-subtle text-warning';
      case 'hard':
        return 'badge bg-danger-subtle text-danger';
      default:
        return 'badge bg-secondary-subtle text-secondary';
    }
  };

  return (
    <div className="dashboard-main-body">
      {/* Page Header */}
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-24">
        <h6 className="fw-semibold mb-0">Assessment Library</h6>
        <ul className="d-flex align-items-center gap-2">
          <li className="fw-medium">
            <a href="#" className="d-flex align-items-center gap-1 hover-text-primary">
              <Icon icon="solar:home-smile-angle-outline" className="icon text-lg" />
              Dashboard
            </a>
          </li>
          <li>-</li>
          <li className="fw-medium">Assessment Library</li>
        </ul>
      </div>

      {/* Stats Cards */}
      <div className="row g-3 mb-24">
        <div className="col-md-3">
          <div className="card shadow-none border h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="text-secondary-light mb-1">Total Templates</p>
                  <h4 className="mb-0">{assessments.length}</h4>
                </div>
                <div className="bg-primary-subtle p-3 rounded-circle">
                  <FileText className="text-primary" size={24} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-none border h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="text-secondary-light mb-1">Aptitude Tests</p>
                  <h4 className="mb-0">
                    {assessments.filter(a => a.type === 'aptitude').length}
                  </h4>
                </div>
                <div className="bg-purple-100 p-3 rounded-circle">
                  <Brain className="text-purple-600" size={24} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-none border h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="text-secondary-light mb-1">Coding Tests</p>
                  <h4 className="mb-0">
                    {assessments.filter(a => a.type === 'coding').length}
                  </h4>
                </div>
                <div className="bg-blue-100 p-3 rounded-circle">
                  <Code className="text-blue-600" size={24} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-none border h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="text-secondary-light mb-1">Communication Tests</p>
                  <h4 className="mb-0">
                    {assessments.filter(a => a.type === 'communication').length}
                  </h4>
                </div>
                <div className="bg-green-100 p-3 rounded-circle">
                  <MessageSquare className="text-green-600" size={24} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Actions */}
      <div className="card shadow-none border mb-24">
        <div className="card-body">
          <div className="row g-3 align-items-center">
            <div className="col-md-4">
              <div className="position-relative">
                <input
                  type="text"
                  className="form-control ps-5"
                  placeholder="Search assessments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="position-absolute top-50 translate-middle-y ms-3" size={18} />
              </div>
            </div>
            <div className="col-md-3">
              <select
                className="form-select"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="aptitude">Aptitude</option>
                <option value="coding">Coding</option>
                <option value="communication">Communication</option>
              </select>
            </div>
            <div className="col-md-3">
              <select
                className="form-select"
                value={filterDifficulty}
                onChange={(e) => setFilterDifficulty(e.target.value)}
              >
                <option value="all">All Difficulties</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
            <div className="col-md-2 d-flex gap-2">
              <button
                className="btn btn-outline-primary flex-fill"
                onClick={fetchAssessments}
                disabled={loading}
              >
                <RefreshCw size={18} className={loading ? 'spinner' : ''} />
              </button>
              <button
                className="btn btn-primary flex-fill"
                onClick={() => setShowModal(true)}
              >
                <Plus size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Assessments Grid */}
      <div className="row g-3">
        {loading ? (
          <div className="col-12 text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : filteredAssessments.length === 0 ? (
          <div className="col-12">
            <div className="card shadow-none border">
              <div className="card-body text-center py-5">
                <FileText size={48} className="text-secondary-light mb-3" />
                <h6 className="text-secondary-light">
                  {searchTerm || filterType !== 'all' || filterDifficulty !== 'all'
                    ? 'No assessments found matching your filters'
                    : 'No assessments created yet'}
                </h6>
                {!searchTerm && filterType === 'all' && filterDifficulty === 'all' && (
                  <button
                    className="btn btn-primary mt-3"
                    onClick={() => setShowModal(true)}
                  >
                    <Plus size={18} className="me-2" />
                    Create First Assessment
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          filteredAssessments.map((assessment) => (
            <div key={assessment.id} className="col-md-6 col-lg-4">
              <div className="card shadow-none border h-100 hover-shadow transition">
                <div className="card-body">
                  {/* Header */}
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div className={`p-2 rounded ${getTypeColor(assessment.type)}`}>
                      {getTypeIcon(assessment.type)}
                    </div>
                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-sm btn-outline-primary p-1"
                        onClick={() => handleEdit(assessment)}
                        title="Edit"
                      >
                        <Edit size={14} />
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger p-1"
                        onClick={() => handleDelete(assessment.id, assessment.name)}
                        title="Delete"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Title */}
                  <h6 className="fw-semibold mb-2 text-truncate" title={assessment.name}>
                    {assessment.name}
                  </h6>

                  {/* Details */}
                  <div className="mb-3">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="text-secondary-light text-sm">Type:</span>
                      <span className="badge bg-secondary-subtle text-secondary text-capitalize">
                        {assessment.type}
                      </span>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="text-secondary-light text-sm">Difficulty:</span>
                      <span className={getDifficultyBadge(assessment.difficulty)}>
                        {assessment.difficulty || 'N/A'}
                      </span>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="text-secondary-light text-sm">Questions:</span>
                      <span className="fw-medium">{assessment.question_count || 0}</span>
                    </div>
                    {assessment.role && (
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="text-secondary-light text-sm">Role:</span>
                        <span className="text-sm text-truncate" style={{ maxWidth: '150px' }} title={assessment.role}>
                          {assessment.role}
                        </span>
                      </div>
                    )}
                    {assessment.skill && (
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="text-secondary-light text-sm">Skill:</span>
                        <span className="badge bg-info-subtle text-info">{assessment.skill}</span>
                      </div>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="border-top pt-3">
                    <small className="text-secondary-light">
                      Updated: {new Date(assessment.last_updated).toLocaleDateString()}
                    </small>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {editMode ? 'Edit Assessment' : 'Create New Assessment'}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => { setShowModal(false); resetForm(); }}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row g-3">
                  {/* Assessment Name */}
                  <div className="col-12">
                    <label className="form-label">Assessment Name *</label>
                    <input
                      type="text"
                      className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                      placeholder="e.g., Python Developer Assessment"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                    />
                    {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                  </div>

                  {/* Type */}
                  <div className="col-md-6">
                    <label className="form-label">Type *</label>
                    <select
                      className={`form-select ${errors.type ? 'is-invalid' : ''}`}
                      value={formData.type}
                      onChange={(e) => handleInputChange('type', e.target.value)}
                    >
                      <option value="aptitude">Aptitude/Reasoning</option>
                      <option value="coding">Coding</option>
                      <option value="communication">Communication</option>
                    </select>
                    {errors.type && <div className="invalid-feedback">{errors.type}</div>}
                  </div>

                  {/* Difficulty */}
                  <div className="col-md-6">
                    <label className="form-label">Difficulty</label>
                    <select
                      className="form-select"
                      value={formData.difficulty}
                      onChange={(e) => handleInputChange('difficulty', e.target.value)}
                    >
                      <option value="easy">Easy</option>
                      <option value="medium">Medium</option>
                      <option value="hard">Hard</option>
                    </select>
                  </div>

                  {/* Role */}
                  <div className="col-md-6">
                    <label className="form-label">Target Role *</label>
                    <input
                      type="text"
                      className={`form-control ${errors.role ? 'is-invalid' : ''}`}
                      placeholder="e.g., Backend Developer"
                      value={formData.role}
                      onChange={(e) => handleInputChange('role', e.target.value)}
                    />
                    {errors.role && <div className="invalid-feedback">{errors.role}</div>}
                  </div>

                  {/* Skill */}
                  <div className="col-md-6">
                    <label className="form-label">Skill (Optional)</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g., Python, JavaScript"
                      value={formData.skill}
                      onChange={(e) => handleInputChange('skill', e.target.value)}
                    />
                  </div>

                  {/* Question Count */}
                  <div className="col-md-12">
                    <label className="form-label">Number of Questions</label>
                    <input
                      type="number"
                      className={`form-control ${errors.question_count ? 'is-invalid' : ''}`}
                      min="1"
                      value={formData.question_count}
                      onChange={(e) => handleInputChange('question_count', parseInt(e.target.value))}
                    />
                    {errors.question_count && <div className="invalid-feedback">{errors.question_count}</div>}
                    <small className="text-secondary-light">
                      Default: 25 for Aptitude, 5 for Coding, varies for Communication
                    </small>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => { setShowModal(false); resetForm(); }}
                >
                  <X size={18} className="me-2" />
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={editMode ? handleUpdate : handleCreate}
                >
                  <Save size={18} className="me-2" />
                  {editMode ? 'Update' : 'Create'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .hover-shadow {
          transition: box-shadow 0.3s ease;
        }
        .hover-shadow:hover {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
        }
        .transition {
          transition: all 0.3s ease;
        }
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

export default AssessmentLibrary;

