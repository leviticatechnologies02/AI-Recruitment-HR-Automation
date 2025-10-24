import React, { useState } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Search, Plus, X, Send, Eye, FileText, Trash2, Download, Bell, Clock, CheckCircle, XCircle, Mail } from 'lucide-react';

const OfferTracking = () => {
  const [showGeneratePanel, setShowGeneratePanel] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);

  // Mock data
  const candidates = [
    { id: 1, name: 'Nagendra Uggirala', role: 'Frontend Developer', applicationId: 'APP-001' },
    { id: 2, name: 'Ravi Kumar', role: 'Backend Developer', applicationId: 'APP-002' },
    { id: 3, name: 'Sita Rani', role: 'UI Designer', applicationId: 'APP-003' },
    { id: 4, name: 'Priya Sharma', role: 'Full Stack Developer', applicationId: 'APP-004' }
  ];

  const templates = [
    { id: 1, name: 'Frontend Developer Offer', role: 'Frontend Developer' },
    { id: 2, name: 'Backend Developer Offer', role: 'Backend Developer' },
    { id: 3, name: 'Designer Template', role: 'UI Designer' },
    { id: 4, name: 'Full Stack Offer', role: 'Full Stack Developer' }
  ];

  const [offers, setOffers] = useState([
    {
      id: 1,
      candidate: 'Nagendra Uggirala',
      role: 'Frontend Dev',
      template: 'Frontend Offer',
      status: 'Accepted',
      dateSent: '05 Oct 2025',
      dateViewed: '05 Oct 2025, 11:45 AM',
      dateResponded: '06 Oct 2025, 10:30 AM',
      salary: '₹6,00,000',
      joiningDate: '15 Oct 2025'
    },
    {
      id: 2,
      candidate: 'Ravi Kumar',
      role: 'Backend Dev',
      template: 'Backend Offer',
      status: 'Viewed',
      dateSent: '07 Oct 2025',
      dateViewed: '08 Oct 2025, 09:20 AM',
      salary: '₹7,50,000',
      joiningDate: '20 Oct 2025'
    },
    {
      id: 3,
      candidate: 'Sita Rani',
      role: 'UI Designer',
      template: 'Designer Template',
      status: 'Sent',
      dateSent: '08 Oct 2025',
      salary: '₹5,50,000',
      joiningDate: '25 Oct 2025'
    },
    {
      id: 4,
      candidate: 'Priya Sharma',
      role: 'Full Stack Dev',
      template: 'Full Stack Offer',
      status: 'Rejected',
      dateSent: '03 Oct 2025',
      dateViewed: '04 Oct 2025, 02:15 PM',
      dateResponded: '04 Oct 2025, 05:30 PM',
      salary: '₹8,00,000',
      joiningDate: '18 Oct 2025'
    }
  ]);

  const getStatusBadge = (status) => {
    const styles = {
      Sent: 'bg-primary-subtle text-primary border-primary-subtle',
      Viewed: 'bg-info-subtle text-info border-info-subtle',
      Accepted: 'bg-success-subtle text-success border-success-subtle',
      Rejected: 'bg-danger-subtle text-danger border-danger-subtle'
    };
    
    const icons = {
      Sent: <Mail size={12} />,
      Viewed: <Eye size={12} />,
      Accepted: <CheckCircle size={12} />,
      Rejected: <XCircle size={12} />
    };

    return (
      <span className={`badge border d-inline-flex align-items-center gap-1 ${styles[status]}`}>
        {icons[status]}
        {status}
      </span>
    );
  };

  const getOfferPreview = () => {
    const candidate = candidates.find(c => c.id === parseInt(selectedCandidate));
    if (!candidate || !selectedTemplate) return null;

    return `Dear ${candidate.name},

We are delighted to offer you the role of ${candidate.role} at Veritech Software.
Your joining date will be 15 Oct 2025, with a salary of ₹6,00,000 per annum.

This offer includes:
• Competitive compensation package
• Health insurance coverage
• Performance-based bonuses
• Professional development opportunities

We look forward to welcoming you onboard!

Sincerely,
HR Team – Veritech Software`;
  };

  const handleSendOffer = () => {
    const candidate = candidates.find(c => c.id === parseInt(selectedCandidate));
    const template = templates.find(t => t.id === parseInt(selectedTemplate));
    
    const newOffer = {
      id: offers.length + 1,
      candidate: candidate.name,
      role: candidate.role,
      template: template.name,
      status: 'Sent',
      dateSent: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      salary: '₹6,00,000',
      joiningDate: '15 Oct 2025'
    };

    setOffers([newOffer, ...offers]);
    setShowConfirmModal(false);
    setShowGeneratePanel(false);
    setSelectedCandidate('');
    setSelectedTemplate('');
  };

  const handleExportReport = () => {
    const csvContent = [
      ['Candidate', 'Role', 'Template Used', 'Status', 'Date Sent', 'Salary', 'Joining Date'],
      ...offers.map(offer => [
        offer.candidate,
        offer.role,
        offer.template,
        offer.status,
        offer.dateSent,
        offer.salary,
        offer.joiningDate
      ])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'offer-tracking-report.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    alert('Report exported successfully!');
  };

  const handleNotificationSettings = () => {
    alert('Notification settings feature coming soon!');
  };

  const handleResendOffer = () => {
    if (selectedOffer) {
      // Update the offer status to show it was resent
      setOffers(offers.map(offer => 
        offer.id === selectedOffer.id 
          ? { ...offer, dateSent: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) }
          : offer
      ));
      
      // Update the selected offer in the modal
      setSelectedOffer({
        ...selectedOffer,
        dateSent: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
      });
      
      alert(`Offer resent successfully to ${selectedOffer.candidate}!`);
    }
  };

  const filteredOffers = offers.filter(offer =>
    offer.candidate.toLowerCase().includes(searchQuery.toLowerCase()) ||
    offer.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    offer.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const StatusTracker = ({ status }) => {
    const steps = ['Sent', 'Viewed', 'Accepted'];
    const currentIndex = steps.indexOf(status);
    const isRejected = status === 'Rejected';

    return (
      <div className="d-flex align-items-center gap-2">
        {steps.map((step, index) => (
          <React.Fragment key={step}>
            <div className="d-flex flex-column align-items-center">
              <div className={`rounded-circle d-flex align-items-center justify-content-center border border-2 ${
                isRejected && index > 0 ? 'bg-light border-secondary text-muted' :
                index <= currentIndex ? 'bg-success border-success text-white' : 
                'bg-white border-secondary text-muted'
              }`} style={{width: '32px', height: '32px'}}>
                {index <= currentIndex && !isRejected ? <CheckCircle size={16} /> : 
                 step === 'Sent' ? <Mail size={16} /> :
                 step === 'Viewed' ? <Eye size={16} /> :
                 <CheckCircle size={16} />}
              </div>
              <span className="small mt-1 text-muted">{step}</span>
            </div>
            {index < steps.length - 1 && (
              <div className={`border-top border-2 ${
                isRejected ? 'border-secondary' :
                index < currentIndex ? 'border-success' : 'border-secondary'
              }`} style={{width: '48px'}} />
            )}
          </React.Fragment>
        ))}
        {isRejected && (
          <>
            <div className="border-top border-2 border-danger" style={{width: '48px'}} />
            <div className="d-flex flex-column align-items-center">
              <div className="rounded-circle d-flex align-items-center justify-content-center border border-2 bg-danger border-danger text-white" style={{width: '32px', height: '32px'}}>
                <XCircle size={16} />
              </div>
              <span className="small mt-1 text-muted">Rejected</span>
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="container-fluid">
      {/* Header */}
      <div className="card border shadow-none mb-4 mt-3">
        <div className="card-body">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <div>
              <h5 className="mb-1">
                <Icon icon="heroicons:document-text"/> Offer Tracking</h5>
              <p className="text-muted small mb-0">Generate, send, and track all candidate offers in one place</p>
            </div>
            <button
              className="btn btn-primary"
              onClick={() => setShowGeneratePanel(true)}
            >
              <Plus size={16} className="me-2" />
              Create New Offer
            </button>
          </div>
          
          <div className="input-group">
            <span className="input-group-text">
              <Search size={18} />
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Search by candidate name, job title, or status..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Offers Table */}
      <div className="card border shadow-none mb-4">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th className="px-4 py-3 text-start">Candidate</th>
                  <th className="px-4 py-3 text-start">Role</th>
                  <th className="px-4 py-3 text-start">Template Used</th>
                  <th className="px-4 py-3 text-center">Status</th>
                  <th className="px-4 py-3 text-center">Date Sent</th>
                  <th className="px-4 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOffers.map((offer) => (
                  <tr key={offer.id}>
                    <td className="px-4 py-3 text-start">
                      <div className="fw-medium">{offer.candidate}</div>
                    </td>
                    <td className="px-4 py-3 text-start">
                      <div className="text-muted small">{offer.role}</div>
                    </td>
                    <td className="px-4 py-3 text-start">
                      <div className="text-muted small">{offer.template}</div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      {getStatusBadge(offer.status)}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="d-flex align-items-center justify-content-center gap-1 text-muted small">
                        <Clock size={12} />
                        {offer.dateSent}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="d-flex align-items-center justify-content-center gap-2">
                        <button
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => {
                            setSelectedOffer(offer);
                            setShowDetailModal(true);
                          }}
                          title="View Details"
                        >
                          <FileText size={14} />
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => {
                            if (window.confirm('Are you sure you want to delete this offer?')) {
                              setOffers(offers.filter(o => o.id !== offer.id));
                            }
                          }}
                          title="Delete"
                        >
                          <Trash2 size={14} />
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

      {/* Quick Actions */}
      <div className="d-flex align-items-center justify-content-start gap-3">
        <button 
          className="btn btn-light border text-muted"
          onClick={handleExportReport}
          style={{
            backgroundColor: 'white',
            borderColor: '#e9ecef',
            color: '#6c757d',
            padding: '8px 16px',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '400'
          }}
        >
          <Download size={16} className="me-2" style={{color: '#6c757d'}} />
          Export Report
        </button>
        <button 
          className="btn btn-light border text-muted"
          onClick={handleNotificationSettings}
          style={{
            backgroundColor: 'white',
            borderColor: '#e9ecef',
            color: '#6c757d',
            padding: '8px 16px',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '400'
          }}
        >
          <Bell size={16} className="me-2" style={{color: '#6c757d'}} />
          Notification Settings
        </button>
      </div>

      {/* Generate Offer Panel */}
      {showGeneratePanel && (
        <div className="modal fade show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Create New Offer</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => {
                    setShowGeneratePanel(false);
                    setSelectedCandidate('');
                    setSelectedTemplate('');
                  }}
                ></button>
              </div>

              <div className="modal-body">
                {/* Candidate Selector */}
                <div className="mb-4">
                  <label className="form-label fw-semibold">Select Candidate</label>
                  <select
                    className="form-select"
                    value={selectedCandidate}
                    onChange={(e) => setSelectedCandidate(e.target.value)}
                  >
                    <option value="">Choose a candidate...</option>
                    {candidates.map(candidate => (
                      <option key={candidate.id} value={candidate.id}>
                        {candidate.name} - {candidate.role} ({candidate.applicationId})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Template Selector */}
                <div className="mb-4">
                  <label className="form-label fw-semibold">Select Template</label>
                  <select
                    className="form-select"
                    value={selectedTemplate}
                    onChange={(e) => setSelectedTemplate(e.target.value)}
                  >
                    <option value="">Choose a template...</option>
                    {templates.map(template => (
                      <option key={template.id} value={template.id}>
                        {template.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Offer Preview */}
                {selectedCandidate && selectedTemplate && (
                  <div>
                    <label className="form-label fw-semibold">Offer Preview</label>
                    <div className="bg-light border rounded p-4">
                      <pre className="mb-0" style={{whiteSpace: 'pre-wrap', fontFamily: 'inherit'}}>
                        {getOfferPreview()}
                      </pre>
                    </div>
                  </div>
                )}
              </div>

              <div className="modal-footer d-flex justify-content-end gap-2">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowGeneratePanel(false);
                    setSelectedCandidate('');
                    setSelectedTemplate('');
                  }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    if (!selectedCandidate || !selectedTemplate) {
                      alert('Please select both candidate and template');
                      return;
                    }
                    setShowConfirmModal(true);
                  }}
                  disabled={!selectedCandidate || !selectedTemplate}
                >
                  <Send size={16} className="me-2" />
                  Send Offer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="modal fade show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1060}}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Send Offer</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowConfirmModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p className="mb-0">
                  Are you sure you want to send this offer to {candidates.find(c => c.id === parseInt(selectedCandidate))?.name}?
                </p>
              </div>
              <div className="modal-footer d-flex justify-content-end gap-2">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowConfirmModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSendOffer}
                >
                  Yes, Send Offer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {showDetailModal && selectedOffer && (
        <div className="modal fade show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Offer Details</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowDetailModal(false)}
                ></button>
              </div>

              <div className="modal-body">
                {/* Candidate Info */}
                <div className="mb-4">
                  <h6 className="small fw-semibold text-muted mb-2">Candidate Information</h6>
                  <div className="bg-light rounded p-3">
                    <div className="d-flex justify-content-between mb-2">
                      <span className="small text-muted">Name:</span>
                      <span className="small fw-medium">{selectedOffer.candidate}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span className="small text-muted">Role:</span>
                      <span className="small fw-medium">{selectedOffer.role}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span className="small text-muted">Salary:</span>
                      <span className="small fw-medium">{selectedOffer.salary}</span>
                    </div>
                    <div className="d-flex justify-content-between">
                      <span className="small text-muted">Joining Date:</span>
                      <span className="small fw-medium">{selectedOffer.joiningDate}</span>
                    </div>
                  </div>
                </div>

                {/* Status Tracker */}
                <div className="mb-4">
                  <h6 className="small fw-semibold text-muted mb-2">Offer Progress</h6>
                  <div className="bg-light rounded p-4 d-flex justify-content-center">
                    <StatusTracker status={selectedOffer.status} />
                  </div>
                </div>

                {/* Offer History */}
                <div>
                  <h6 className="small fw-semibold text-muted mb-2">Offer History</h6>
                  <div className="bg-light rounded p-3">
                    <div className="d-flex align-items-start gap-3 mb-3">
                      <div className="rounded-circle bg-primary-subtle d-flex align-items-center justify-content-center flex-shrink-0" style={{width: '32px', height: '32px'}}>
                        <Mail size={16} className="text-primary" />
                      </div>
                      <div>
                        <p className="small fw-medium mb-0">Offer Sent</p>
                        <p className="small text-muted mb-0">{selectedOffer.dateSent}</p>
                      </div>
                    </div>
                    {selectedOffer.dateViewed && (
                      <div className="d-flex align-items-start gap-3 mb-3">
                        <div className="rounded-circle bg-info-subtle d-flex align-items-center justify-content-center flex-shrink-0" style={{width: '32px', height: '32px'}}>
                          <Eye size={16} className="text-info" />
                        </div>
                        <div>
                          <p className="small fw-medium mb-0">Offer Viewed</p>
                          <p className="small text-muted mb-0">{selectedOffer.dateViewed}</p>
                        </div>
                      </div>
                    )}
                    {selectedOffer.dateResponded && (
                      <div className="d-flex align-items-start gap-3">
                        <div className={`rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 ${
                          selectedOffer.status === 'Accepted' ? 'bg-success-subtle' : 'bg-danger-subtle'
                        }`} style={{width: '32px', height: '32px'}}>
                          {selectedOffer.status === 'Accepted' ? 
                            <CheckCircle size={16} className="text-success" /> :
                            <XCircle size={16} className="text-danger" />
                          }
                        </div>
                        <div>
                          <p className="small fw-medium mb-0">Offer {selectedOffer.status}</p>
                          <p className="small text-muted mb-0">{selectedOffer.dateResponded}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="modal-footer d-flex justify-content-end gap-2">
                {selectedOffer.status === 'Sent' && (
                  <button 
                    type="button" 
                    className="btn btn-primary"
                    onClick={handleResendOffer}
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
                    Resend Offer
                  </button>
                )}
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowDetailModal(false)}
                >
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