import React, { useState } from 'react';
import { Search, Plus, Eye, MoreVertical, Users, TrendingUp, Calendar, ArrowRight } from 'lucide-react';

const PipelineView = () => {
  const [stages, setStages] = useState([
    {
      id: 'applied',
      name: 'Applied',
      color: 'bg-primary text-white',
      bgColor: 'bg-primary-subtle',
      candidates: [
        { id: 1, name: 'Nagendra Uggirala', role: 'Frontend Developer', avatar: 'NU', appliedDate: '2024-01-15' },
        { id: 2, name: 'Ravi Kumar', role: 'Backend Developer', avatar: 'RK', appliedDate: '2024-01-14' },
        { id: 3, name: 'Anita Desai', role: 'Full Stack Developer', avatar: 'AD', appliedDate: '2024-01-13' },
        { id: 4, name: 'Vikram Singh', role: 'DevOps Engineer', avatar: 'VS', appliedDate: '2024-01-12' }
      ]
    },
    {
      id: 'screening',
      name: 'Screening',
      color: 'bg-info text-white',
      bgColor: 'bg-info-subtle',
      candidates: [
        { id: 5, name: 'Priya Sharma', role: 'UI/UX Designer', avatar: 'PS', appliedDate: '2024-01-10' },
        { id: 6, name: 'Arun Patel', role: 'Frontend Developer', avatar: 'AP', appliedDate: '2024-01-09' },
        { id: 7, name: 'Meera Reddy', role: 'Product Manager', avatar: 'MR', appliedDate: '2024-01-08' }
      ]
    },
    {
      id: 'interview',
      name: 'Interview',
      color: 'bg-warning text-dark',
      bgColor: 'bg-warning-subtle',
      candidates: [
        { id: 8, name: 'Karthik Menon', role: 'Backend Developer', avatar: 'KM', appliedDate: '2024-01-05' },
        { id: 9, name: 'Sneha Iyer', role: 'Data Scientist', avatar: 'SI', appliedDate: '2024-01-04' }
      ]
    },
    {
      id: 'offer',
      name: 'Offer',
      color: 'bg-success text-white',
      bgColor: 'bg-success-subtle',
      candidates: [
        { id: 10, name: 'Rajesh Gupta', role: 'Senior Developer', avatar: 'RG', appliedDate: '2024-01-02' }
      ]
    },
    {
      id: 'hired',
      name: 'Hired',
      color: 'bg-danger text-white',
      bgColor: 'bg-danger-subtle',
      candidates: [
        { id: 11, name: 'Divya Nair', role: 'Frontend Developer', avatar: 'DN', appliedDate: '2023-12-28' }
      ]
    }
  ]);

  const [draggedCard, setDraggedCard] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [showAddStage, setShowAddStage] = useState(false);
  const [newStageName, setNewStageName] = useState('');
  const [openMenuId, setOpenMenuId] = useState(null);
  const [editingStageId, setEditingStageId] = useState(null);
  const [editStageName, setEditStageName] = useState('');
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const handleViewProfile = (candidate) => {
    setSelectedCandidate(candidate);
  };

  const handleScheduleInterview = () => {
    if (selectedCandidate) {
      alert(`Interview scheduled for ${selectedCandidate.name}!`);
    }
  };

  const handleSendEmail = () => {
    if (selectedCandidate) {
      alert(`Email sent to ${selectedCandidate.name} at ${selectedCandidate.name.toLowerCase().replace(' ', '.')}@email.com`);
    }
  };

  const handleRejectCandidate = () => {
    if (selectedCandidate && window.confirm(`Are you sure you want to reject ${selectedCandidate.name}?`)) {
      // Move candidate to rejected stage or remove from pipeline
      setStages(prevStages => {
        return prevStages.map(stage => ({
          ...stage,
          candidates: stage.candidates.filter(c => c.id !== selectedCandidate.id)
        }));
      });
      setSelectedCandidate(null);
      alert(`${selectedCandidate.name} has been rejected and removed from the pipeline.`);
    }
  };

  const handleEditStage = (stageId, currentName) => {
    setEditingStageId(stageId);
    setEditStageName(currentName);
    setOpenMenuId(null);
  };

  const handleSaveEditStage = () => {
    if (editStageName.trim()) {
      setStages(prevStages => 
        prevStages.map(stage => 
          stage.id === editingStageId 
            ? { ...stage, name: editStageName }
            : stage
        )
      );
      setEditingStageId(null);
      setEditStageName('');
    }
  };

  const handleDeleteStage = (stageId) => {
    if (window.confirm('Are you sure you want to delete this stage? All candidates will be moved to "Applied" stage.')) {
      const stageToDelete = stages.find(s => s.id === stageId);
      const candidatesToMove = stageToDelete?.candidates || [];
      
      setStages(prevStages => {
        const filtered = prevStages.filter(s => s.id !== stageId);
        if (candidatesToMove.length > 0) {
          return filtered.map(stage => 
            stage.id === 'applied'
              ? { ...stage, candidates: [...stage.candidates, ...candidatesToMove] }
              : stage
          );
        }
        return filtered;
      });
      setOpenMenuId(null);
    }
  };

  const handleDragStart = (e, candidate, stageId) => {
    setDraggedCard({ candidate, sourceStageId: stageId });
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, targetStageId) => {
    e.preventDefault();
    
    if (!draggedCard || draggedCard.sourceStageId === targetStageId) {
      setDraggedCard(null);
      return;
    }

    setStages(prevStages => {
      const newStages = prevStages.map(stage => {
        if (stage.id === draggedCard.sourceStageId) {
          return {
            ...stage,
            candidates: stage.candidates.filter(c => c.id !== draggedCard.candidate.id)
          };
        }
        if (stage.id === targetStageId) {
          return {
            ...stage,
            candidates: [...stage.candidates, draggedCard.candidate]
          };
        }
        return stage;
      });
      return newStages;
    });

    setDraggedCard(null);
  };

  const handleAddStage = () => {
    if (newStageName.trim()) {
      const colors = [
        { color: 'bg-secondary-subtle text-secondary', bgColor: 'bg-secondary-subtle' },
        { color: 'bg-dark-subtle text-dark', bgColor: 'bg-dark-subtle' },
        { color: 'bg-light text-dark', bgColor: 'bg-light' }
      ];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      
      const newStage = {
        id: `stage-${Date.now()}`,
        name: newStageName,
        ...randomColor,
        candidates: []
      };
      setStages([...stages, newStage]);
      setNewStageName('');
      setShowAddStage(false);
    }
  };

  const filteredStages = stages.map(stage => ({
    ...stage,
    candidates: stage.candidates.filter(candidate => {
      const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           candidate.role.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = filterRole === 'all' || candidate.role.toLowerCase().includes(filterRole.toLowerCase());
      return matchesSearch && matchesRole;
    })
  }));

  const totalCandidates = stages.reduce((sum, stage) => sum + stage.candidates.length, 0);

  return (
    <div className="container-fluid py-4">
      {/* Header */}
      <div className="mb-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h5 className="mb-2">Recruitment Pipeline</h5>
            <p className="text-muted mb-0">Track and manage candidates through hiring stages</p>
          </div>
          <button
            onClick={() => setShowAddStage(true)}
            className="btn btn-primary d-flex align-items-center gap-2"
          >
            <Plus size={20} />
            Add Stage
          </button>
        </div>

        {/* Stats Cards */}
        <div className="card border shadow-sm mb-4">
          <div className="row g-0">
            <div className="col-md-3 border-end">
              <div className="card-body text-center">
                <div className="d-flex align-items-center justify-content-center gap-3 mb-2">
                  <div className="p-2 bg-primary-subtle rounded">
                    <Users size={20} className="text-primary" />
                  </div>
                  <span className="fw-bold">Total Candidates</span>
                </div>
                <h4 className="mb-0">{totalCandidates}</h4>
              </div>
            </div>
          
            <div className="col-md-3 border-end">
              <div className="card-body text-center">
                <div className="d-flex align-items-center justify-content-center gap-3 mb-2">
                  <div className="p-2 bg-success-subtle rounded">
                    <TrendingUp size={20} className="text-success" />
                  </div>
                  <span className="fw-bold">Hired This Month</span>
                </div>
                <h4 className="mb-0">{stages.find(s => s.id === 'hired')?.candidates.length || 0}</h4>
              </div>
            </div>

            <div className="col-md-3 border-end">
              <div className="card-body text-center">
                <div className="d-flex align-items-center justify-content-center gap-3 mb-2">
                  <div className="p-2 bg-warning-subtle rounded">
                    <Calendar size={20} className="text-warning" />
                  </div>
                  <span className="fw-bold">Active Offers</span>
                </div>
                <h4 className="mb-0">{stages.find(s => s.id === 'offer')?.candidates.length || 0}</h4>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card-body text-center">
                <div className="d-flex align-items-center justify-content-center gap-3 mb-2">
                  <div className="p-2 bg-info-subtle rounded">
                    <ArrowRight size={20} className="text-info" />
                  </div>
                  <span className="fw-bold">Pipeline Stages</span>
                </div>
                <h4 className="mb-0">{stages.length}</h4>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="d-flex gap-3 mb-4">
          <div className="flex-grow-1">
            <div className="input-group">
              <span className="input-group-text bg-white border-end-0">
                <Search size={16} className="text-muted" />
              </span>
              <input
                type="text"
                placeholder="Search candidates by name or role..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-control border-start-0"
              />
            </div>
          </div>
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="form-select w-auto"
          >
            <option value="all">All Roles</option>
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
            <option value="designer">Designer</option>
            <option value="devops">DevOps</option>
          </select>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="d-flex gap-3 overflow-auto pb-3">
        {filteredStages.map(stage => (
          <div
            key={stage.id}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, stage.id)}
            className={`flex-shrink-0 border rounded p-3 ${stage.bgColor}`}
            style={{width: '320px'}}
          >
            {/* Stage Header */}
            <div className="d-flex justify-content-between align-items-center mb-3 p-2 rounded bg-white bg-opacity-75">
              <div className="d-flex align-items-center gap-2">
                <span className={`badge ${stage.color} fs-6 px-3 py-2 fw-bold`}>
                  {stage.name}
                </span>
                <span className="text-muted fw-semibold fs-5">
                  {stage.candidates.length}
                </span>
              </div>
              <div className="position-relative">
                <button 
                  onClick={() => setOpenMenuId(openMenuId === stage.id ? null : stage.id)}
                  className="btn btn-link btn-sm text-muted p-1"
                >
                  <MoreVertical size={20} />
                </button>
                {openMenuId === stage.id && (
                  <>
                    <div 
                      className="position-fixed top-0 start-0 w-100 h-100" 
                      style={{zIndex: 10}}
                      onClick={() => setOpenMenuId(null)}
                    />
                    <div className="position-absolute end-0 mt-2 bg-white rounded shadow border" style={{width: '200px', zIndex: 20}}>
                      <button 
                        onClick={() => handleEditStage(stage.id, stage.name)}
                        className="w-100 px-3 py-2 btn  text-start text-dark border-0 rounded-top"
                      >
                        Edit Stage
                      </button>
                      <button 
                        onClick={() => handleDeleteStage(stage.id)}
                        className="w-100 px-3 py-2 btn text-start text-danger border-0 rounded-bottom"
                      >
                        Delete Stage
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Candidate Cards */}
            <div className="d-flex flex-column gap-2" style={{minHeight: '200px'}}>
              {stage.candidates.map(candidate => (
                <div
                  key={candidate.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, candidate, stage.id)}
                  className="card border shadow-sm"
                  style={{cursor: 'move'}}
                >
                  <div className="card-body p-3">
                    <div className="d-flex align-items-start gap-3">
                      <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center flex-shrink-0" style={{width: '40px', height: '40px'}}>
                        {candidate.avatar}
                      </div>
                      <div className="flex-grow-1">
                        <h6 className="mb-1">{candidate.name}</h6>
                        <p className="text-muted small mb-1">{candidate.role}</p>
                        <p className="text-muted small mb-0">Applied: {candidate.appliedDate}</p>
                      </div>
                    </div>
                    
                    <div className="d-flex gap-2 mt-3">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewProfile(candidate);
                        }}
                        className="btn btn-outline-info btn-sm d-flex align-items-center gap-1"
                      >
                        <Eye size={14} />
                        View
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Add Stage Column */}
        <div className="flex-shrink-0" style={{width: '320px'}}>
          <button
            onClick={() => setShowAddStage(true)}
            className="w-100 h-100 border-2 border-dashed border-secondary rounded d-flex flex-column align-items-center justify-content-center gap-2 text-muted"
            style={{minHeight: '200px'}}
          >
            <Plus size={32} />
            <span className="fw-semibold">Add New Stage</span>
          </button>
        </div>
      </div>

      {/* Candidate Profile Modal */}
      {selectedCandidate && (
        <div className="modal fade show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050}} tabIndex="-1">
          <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content">
              {/* Modal Header */}
              <div className="modal-header">
                <div className="d-flex align-items-center gap-3">
                  <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" style={{width: '60px', height: '60px', fontSize: '24px', fontWeight: 'bold'}}>
                    {selectedCandidate.avatar}
                  </div>
                  <div>
                    <h5 className="modal-title mb-1">{selectedCandidate.name}</h5>
                    <p className="text-muted mb-0">{selectedCandidate.role}</p>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setSelectedCandidate(null)}
                ></button>
              </div>

              {/* Modal Content */}
              <div className="modal-body">
                {/* Contact Information */}
                <div className="mb-4">
                  <h6 className="fw-semibold mb-3">Contact Information</h6>
                  <div className="card bg-light">
                    <div className="card-body">
                      <div className="row g-2">
                        <div className="col-4 text-muted">Email:</div>
                        <div className="col-8 fw-medium">{selectedCandidate.name.toLowerCase().replace(' ', '.')}@email.com</div>
                        <div className="col-4 text-muted">Phone:</div>
                        <div className="col-8 fw-medium">+91 98765 43210</div>
                        <div className="col-4 text-muted">Location:</div>
                        <div className="col-8 fw-medium">Hyderabad, India</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Application Details */}
                <div className="mb-4">
                  <h6 className="fw-semibold mb-3">Application Details</h6>
                  <div className="card bg-light">
                    <div className="card-body">
                      <div className="row g-2">
                        <div className="col-4 text-muted">Applied Date:</div>
                        <div className="col-8 fw-medium">{selectedCandidate.appliedDate}</div>
                        <div className="col-4 text-muted">Position:</div>
                        <div className="col-8 fw-medium">{selectedCandidate.role}</div>
                        <div className="col-4 text-muted">Experience:</div>
                        <div className="col-8 fw-medium">5+ years</div>
                        <div className="col-4 text-muted">Expected Salary:</div>
                        <div className="col-8 fw-medium">₹15-20 LPA</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Skills */}
                <div className="mb-4">
                  <h6 className="fw-semibold mb-3">Skills</h6>
                  <div className="d-flex flex-wrap gap-2">
                    {['React', 'JavaScript', 'TypeScript', 'Node.js', 'CSS', 'Git', 'Agile'].map((skill) => (
                      <span key={skill} className="badge bg-primary">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Resume */}
                <div className="mb-4">
                  <h6 className="fw-semibold mb-3">Resume</h6>
                  <button className="btn btn-outline-secondary w-100 d-flex align-items-center justify-content-center gap-2">
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download Resume
                  </button>
                </div>

                {/* Notes */}
                <div className="mb-4">
                  <h6 className="fw-semibold mb-3">Interview Notes</h6>
                  <textarea
                    placeholder="Add notes about this candidate..."
                    className="form-control"
                    rows="4"
                  ></textarea>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="modal-footer">
                <button 
                  className="btn btn-success"
                  onClick={handleScheduleInterview}
                >
                  Schedule Interview
                </button>
                <button 
                  className="btn btn-primary"
                  onClick={handleSendEmail}
                >
                  Send Email
                </button>
                <button 
                  className="btn btn-outline-secondary"
                  onClick={handleRejectCandidate}
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Stage Modal */}
      {editingStageId && (
        <div className="modal fade show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050}} tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Stage</h5>
                <button type="button" className="btn-close" onClick={() => {
                  setEditingStageId(null);
                  setEditStageName('');
                }}></button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  placeholder="Enter stage name..."
                  value={editStageName}
                  onChange={(e) => setEditStageName(e.target.value)}
                  className="form-control"
                  autoFocus
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setEditingStageId(null);
                    setEditStageName('');
                  }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSaveEditStage}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Stage Modal */}
      {showAddStage && (
        <div className="modal fade show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050}} tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New Stage</h5>
                <button type="button" className="btn-close" onClick={() => {
                  setShowAddStage(false);
                  setNewStageName('');
                }}></button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  placeholder="Enter stage name..."
                  value={newStageName}
                  onChange={(e) => setNewStageName(e.target.value)}
                  className="form-control"
                  autoFocus
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowAddStage(false);
                    setNewStageName('');
                  }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleAddStage}
                >
                  Add Stage
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PipelineView;