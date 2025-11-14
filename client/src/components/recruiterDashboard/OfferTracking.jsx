import React, { useState, useEffect } from 'react';
import {
  Plus,
  Edit,
  Trash2,
  Send,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  FileText,
  Mail,
  Calendar,
  DollarSign,
  TrendingUp
} from 'lucide-react';
import { BASE_URL } from '../../config/api.config';

const OfferTracking = () => {
  const [offers, setOffers] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [editingOffer, setEditingOffer] = useState(null);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [formData, setFormData] = useState({
    candidate_id: '',
    job_id: '',
    template_id: '',
    candidate_name: '',
    candidate_email: '',
    position: '',
    department: '',
    salary_offered: '',
    benefits: [],
    offer_content: '',
    expiry_date: '',
    notes: ''
  });
  const [newBenefit, setNewBenefit] = useState('');
  const [alert, setAlert] = useState(null);
  const [filters, setFilters] = useState({
    status: '',
    position: ''
  });

  // Fetch offers
  const fetchOffers = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.status) params.append('status', filters.status);
      if (filters.position) params.append('position', filters.position);
      
      const response = await fetch(`${BASE_URL}/api/offers/offer-tracking?${params.toString()}`);
      if (response.ok) {
        const data = await response.json();
        setOffers(data);
      }
    } catch (error) {
      console.error('Error fetching offers:', error);
      showAlert('Error fetching offers', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Fetch stats
  const fetchStats = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/offers/offer-tracking/stats`);
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  // Fetch templates
  const fetchTemplates = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/offers/offer-templates`);
      if (response.ok) {
        const data = await response.json();
        setTemplates(data);
      }
    } catch (error) {
      console.error('Error fetching templates:', error);
    }
  };

  // Fetch candidates
  const fetchCandidates = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/candidates/list`);
      if (response.ok) {
        const data = await response.json();
        setCandidates(data);
      }
    } catch (error) {
      console.error('Error fetching candidates:', error);
    }
  };

  useEffect(() => {
    fetchOffers();
    fetchStats();
    fetchTemplates();
    fetchCandidates();
  }, [filters]);

  // Show alert
  const showAlert = (message, type = 'success') => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 5000);
  };

  // Handle form input
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Auto-populate template content
    if (field === 'template_id' && value) {
      const template = templates.find(t => t.id === parseInt(value));
      if (template) {
        setFormData(prev => ({
          ...prev,
          position: template.position || prev.position,
          department: template.department || prev.department,
          offer_content: template.template_content,
          benefits: template.benefits || []
        }));
      }
    }

    // Auto-populate candidate info
    if (field === 'candidate_id' && value) {
      const candidate = candidates.find(c => c.id === parseInt(value));
      if (candidate) {
        setFormData(prev => ({
          ...prev,
          candidate_name: candidate.name,
          candidate_email: candidate.email
        }));
      }
    }
  };

  // Add benefit
  const addBenefit = () => {
    if (newBenefit.trim()) {
      setFormData(prev => ({
        ...prev,
        benefits: [...prev.benefits, newBenefit.trim()]
      }));
      setNewBenefit('');
    }
  };

  // Remove benefit
  const removeBenefit = (index) => {
    setFormData(prev => ({
      ...prev,
      benefits: prev.benefits.filter((_, i) => i !== index)
    }));
  };

  // Open create modal
  const openCreateModal = () => {
    setEditingOffer(null);
    setFormData({
      candidate_id: '',
      job_id: '',
      template_id: '',
      candidate_name: '',
      candidate_email: '',
      position: '',
      department: '',
      salary_offered: '',
      benefits: [],
      offer_content: '',
      expiry_date: '',
      notes: ''
    });
    setShowModal(true);
  };

  // Open edit modal
  const openEditModal = (offer) => {
    setEditingOffer(offer);
    setFormData({
      candidate_id: offer.candidate_id,
      job_id: offer.job_id || '',
      template_id: offer.template_id || '',
      candidate_name: offer.candidate_name,
      candidate_email: offer.candidate_email,
      position: offer.position,
      department: offer.department || '',
      salary_offered: offer.salary_offered || '',
      benefits: offer.benefits || [],
      offer_content: offer.offer_content,
      expiry_date: offer.expiry_date || '',
      notes: offer.notes || ''
    });
    setShowModal(true);
  };

  // View offer details
  const viewOffer = (offer) => {
    setSelectedOffer(offer);
    setShowDetailModal(true);
  };

  // Save offer
  const saveOffer = async () => {
    try {
      const url = editingOffer
        ? `${BASE_URL}/api/offers/offer-tracking/${editingOffer.id}`
        : `${BASE_URL}/api/offers/offer-tracking/`;
      
      const method = editingOffer ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        showAlert(
          editingOffer
            ? 'Offer updated successfully'
            : 'Offer created successfully',
          'success'
        );
        setShowModal(false);
        fetchOffers();
        fetchStats();
      } else {
        showAlert('Error saving offer', 'error');
      }
    } catch (error) {
      console.error('Error saving offer:', error);
      showAlert('Error saving offer', 'error');
    }
  };

  // Update offer status
  const updateStatus = async (offerId, status) => {
    try {
      const response = await fetch(`${BASE_URL}/api/offers/offer-tracking/${offerId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });

      if (response.ok) {
        showAlert('Status updated successfully', 'success');
        fetchOffers();
        fetchStats();
      } else {
        showAlert('Error updating status', 'error');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      showAlert('Error updating status', 'error');
    }
  };

  // Delete offer
  const deleteOffer = async (id) => {
    if (!window.confirm('Are you sure you want to delete this offer?')) return;

    try {
      const response = await fetch(`${BASE_URL}/api/offers/offer-tracking/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        showAlert('Offer deleted successfully', 'success');
        fetchOffers();
        fetchStats();
      } else {
        showAlert('Error deleting offer', 'error');
      }
    } catch (error) {
      console.error('Error deleting offer:', error);
      showAlert('Error deleting offer', 'error');
    }
  };

  // Get status badge
  const getStatusBadge = (status) => {
    const statusConfig = {
      Draft: { color: 'secondary', icon: FileText },
      Sent: { color: 'info', icon: Send },
      Accepted: { color: 'success', icon: CheckCircle },
      Rejected: { color: 'danger', icon: XCircle },
      Expired: { color: 'warning', icon: Clock }
    };

    const config = statusConfig[status] || statusConfig.Draft;
    const Icon = config.icon;

    return (
      <span className={`badge bg-${config.color}`}>
        <Icon size={12} className="me-1" />
        {status}
      </span>
    );
  };

  return (
    <div className="container-fluid">
      {/* Alert */}
      {alert && (
        <div className={`alert alert-${alert.type === 'success' ? 'success' : 'danger'} alert-dismissible fade show`} role="alert">
          <div className="d-flex align-items-center">
            {alert.type === 'success' ? <CheckCircle size={20} className="me-2" /> : <AlertCircle size={20} className="me-2" />}
            {alert.message}
          </div>
        </div>
      )}

      {/* Header */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h3 className="mb-2">Offer Tracking</h3>
              <p className="text-muted">Track and manage job offers</p>
            </div>
            <button className="btn btn-primary" onClick={openCreateModal}>
              <Plus size={20} className="me-2" />
              Create Offer
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="row mb-4">
          <div className="col-md-3">
            <div className="card">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <FileText size={24} className="text-primary me-3" />
                  <div>
                    <h4 className="mb-0">{stats.total}</h4>
                    <small className="text-muted">Total Offers</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <Send size={24} className="text-info me-3" />
                  <div>
                    <h4 className="mb-0">{stats.sent}</h4>
                    <small className="text-muted">Sent</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <CheckCircle size={24} className="text-success me-3" />
                  <div>
                    <h4 className="mb-0">{stats.accepted}</h4>
                    <small className="text-muted">Accepted</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <TrendingUp size={24} className="text-warning me-3" />
                  <div>
                    <h4 className="mb-0">{stats.acceptance_rate}%</h4>
                    <small className="text-muted">Acceptance Rate</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="row mb-4">
        <div className="col-md-6">
          <select
            className="form-select"
            value={filters.status}
            onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
          >
            <option value="">All Statuses</option>
            <option value="Draft">Draft</option>
            <option value="Sent">Sent</option>
            <option value="Accepted">Accepted</option>
            <option value="Rejected">Rejected</option>
            <option value="Expired">Expired</option>
          </select>
        </div>
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Filter by position..."
            value={filters.position}
            onChange={(e) => setFilters(prev => ({ ...prev, position: e.target.value }))}
          />
        </div>
      </div>

      {/* Offers Table */}
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : offers.length === 0 ? (
        <div className="card">
          <div className="card-body text-center py-5">
            <FileText size={48} className="text-muted mb-3" />
            <h5 className="text-muted">No offers found</h5>
            <p className="text-muted">Create your first offer to get started</p>
          </div>
        </div>
      ) : (
        <div className="card">
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Candidate</th>
                    <th>Position</th>
                    <th>Salary</th>
                    <th>Status</th>
                    <th>Sent Date</th>
                    <th>Expiry Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {offers.map(offer => (
                    <tr key={offer.id}>
                      <td>
                        <div>
                          <strong>{offer.candidate_name}</strong>
                          <br />
                          <small className="text-muted">{offer.candidate_email}</small>
                        </div>
                      </td>
                      <td>
                        {offer.position}
                        {offer.department && (
                          <><br /><small className="text-muted">{offer.department}</small></>
                        )}
                      </td>
                      <td>
                        {offer.salary_offered ? `$${offer.salary_offered.toLocaleString()}` : '-'}
                      </td>
                      <td>{getStatusBadge(offer.status)}</td>
                      <td>
                        {offer.sent_date ? new Date(offer.sent_date).toLocaleDateString() : '-'}
                      </td>
                      <td>
                        {offer.expiry_date ? new Date(offer.expiry_date).toLocaleDateString() : '-'}
                      </td>
                      <td>
                        <div className="btn-group btn-group-sm">
                          <button
                            className="btn btn-outline-info"
                            onClick={() => viewOffer(offer)}
                            title="View"
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            className="btn btn-outline-primary"
                            onClick={() => openEditModal(offer)}
                            title="Edit"
                          >
                            <Edit size={16} />
                          </button>
                          {offer.status === 'Draft' && (
                            <button
                              className="btn btn-outline-success"
                              onClick={() => updateStatus(offer.id, 'Sent')}
                              title="Send Offer"
                            >
                              <Send size={16} />
                            </button>
                          )}
                          <button
                            className="btn btn-outline-danger"
                            onClick={() => deleteOffer(offer.id)}
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
        </div>
      )}

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {editingOffer ? 'Edit Offer' : 'Create Offer'}
                </h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">Template (Optional)</label>
                    <select
                      className="form-select"
                      value={formData.template_id}
                      onChange={(e) => handleInputChange('template_id', e.target.value)}
                    >
                      <option value="">Select a template...</option>
                      {templates.map(template => (
                        <option key={template.id} value={template.id}>
                          {template.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Candidate *</label>
                    <select
                      className="form-select"
                      value={formData.candidate_id}
                      onChange={(e) => handleInputChange('candidate_id', e.target.value)}
                    >
                      <option value="">Select a candidate...</option>
                      {candidates.map(candidate => (
                        <option key={candidate.id} value={candidate.id}>
                          {candidate.name} ({candidate.email})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">Candidate Name *</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.candidate_name}
                      onChange={(e) => handleInputChange('candidate_name', e.target.value)}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Candidate Email *</label>
                    <input
                      type="email"
                      className="form-control"
                      value={formData.candidate_email}
                      onChange={(e) => handleInputChange('candidate_email', e.target.value)}
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">Position *</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.position}
                      onChange={(e) => handleInputChange('position', e.target.value)}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Department</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.department}
                      onChange={(e) => handleInputChange('department', e.target.value)}
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">Salary Offered</label>
                    <input
                      type="number"
                      className="form-control"
                      value={formData.salary_offered}
                      onChange={(e) => handleInputChange('salary_offered', parseFloat(e.target.value))}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Expiry Date</label>
                    <input
                      type="date"
                      className="form-control"
                      value={formData.expiry_date}
                      onChange={(e) => handleInputChange('expiry_date', e.target.value)}
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Offer Content *</label>
                  <textarea
                    className="form-control"
                    rows="8"
                    value={formData.offer_content}
                    onChange={(e) => handleInputChange('offer_content', e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Benefits</label>
                  <div className="input-group mb-2">
                    <input
                      type="text"
                      className="form-control"
                      value={newBenefit}
                      onChange={(e) => setNewBenefit(e.target.value)}
                      placeholder="e.g., Health Insurance"
                      onKeyPress={(e) => e.key === 'Enter' && addBenefit()}
                    />
                    <button className="btn btn-outline-primary" onClick={addBenefit}>
                      <Plus size={16} />
                    </button>
                  </div>
                  <div className="d-flex flex-wrap gap-2">
                    {formData.benefits.map((benefit, index) => (
                      <span key={index} className="badge bg-primary">
                        {benefit}
                        <span
                          className="ms-1"
                          style={{ cursor: 'pointer' }}
                          onClick={() => removeBenefit(index)}
                        >
                          ×
                        </span>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Notes</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    value={formData.notes}
                    onChange={(e) => handleInputChange('notes', e.target.value)}
                    placeholder="Internal notes about this offer..."
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={saveOffer}>
                  {editingOffer ? 'Update' : 'Create'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {showDetailModal && selectedOffer && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Offer Details</h5>
                <button type="button" className="btn-close" onClick={() => setShowDetailModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <h6>Candidate Information</h6>
                  <p><strong>Name:</strong> {selectedOffer.candidate_name}</p>
                  <p><strong>Email:</strong> {selectedOffer.candidate_email}</p>
                </div>
                
                <div className="mb-3">
                  <h6>Position Details</h6>
                  <p><strong>Position:</strong> {selectedOffer.position}</p>
                  {selectedOffer.department && <p><strong>Department:</strong> {selectedOffer.department}</p>}
                  {selectedOffer.salary_offered && (
                    <p><strong>Salary:</strong> ${selectedOffer.salary_offered.toLocaleString()}</p>
                  )}
                </div>

                {selectedOffer.benefits && selectedOffer.benefits.length > 0 && (
                  <div className="mb-3">
                    <h6>Benefits</h6>
                    <div className="d-flex flex-wrap gap-2">
                      {selectedOffer.benefits.map((benefit, idx) => (
                        <span key={idx} className="badge bg-secondary">{benefit}</span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mb-3">
                  <h6>Offer Letter</h6>
                  <div className="border rounded p-3" style={{ whiteSpace: 'pre-wrap' }}>
                    {selectedOffer.offer_content}
                  </div>
                </div>

                <div className="mb-3">
                  <h6>Status & Dates</h6>
                  <p><strong>Status:</strong> {getStatusBadge(selectedOffer.status)}</p>
                  {selectedOffer.sent_date && (
                    <p><strong>Sent Date:</strong> {new Date(selectedOffer.sent_date).toLocaleString()}</p>
                  )}
                  {selectedOffer.expiry_date && (
                    <p><strong>Expiry Date:</strong> {new Date(selectedOffer.expiry_date).toLocaleDateString()}</p>
                  )}
                  {selectedOffer.response_date && (
                    <p><strong>Response Date:</strong> {new Date(selectedOffer.response_date).toLocaleString()}</p>
                  )}
                </div>

                {selectedOffer.notes && (
                  <div className="mb-3">
                    <h6>Notes</h6>
                    <p>{selectedOffer.notes}</p>
                  </div>
                )}
              </div>
              <div className="modal-footer">
                {selectedOffer.status === 'Sent' && (
                  <>
                    <button
                      className="btn btn-success"
                      onClick={() => {
                        updateStatus(selectedOffer.id, 'Accepted');
                        setShowDetailModal(false);
                      }}
                    >
                      <CheckCircle size={16} className="me-2" />
                      Mark as Accepted
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        updateStatus(selectedOffer.id, 'Rejected');
                        setShowDetailModal(false);
                      }}
                    >
                      <XCircle size={16} className="me-2" />
                      Mark as Rejected
                    </button>
                  </>
                )}
                <button className="btn btn-secondary" onClick={() => setShowDetailModal(false)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OfferTracking;

