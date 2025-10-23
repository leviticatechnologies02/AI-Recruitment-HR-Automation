import React, { useState, useRef, useEffect } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import RecruiterDashboardLayout from '../recruiterDashboard/RecruiterDashboardLayout';

const OnboardingDocuments = () => {
  const [activeTab, setActiveTab] = useState('documents');
  const [documents, setDocuments] = useState([
    { id: 1, name: 'ID Proof', status: 'uploaded', file: 'passport.pdf', uploadDate: '2025-10-10' },
    { id: 2, name: 'Tax Form', status: 'pending', file: null, uploadDate: null },
    { id: 3, name: 'Educational Certificates', status: 'uploaded', file: 'degree.pdf', uploadDate: '2025-10-12' },
    { id: 4, name: 'Bank Details', status: 'pending', file: null, uploadDate: null },
    { id: 5, name: 'Previous Employment Letter', status: 'uploaded', file: 'exp_letter.pdf', uploadDate: '2025-10-11' }
  ]);

  const [tasks, setTasks] = useState([
    { id: 1, title: 'Complete Employee Profile', assignee: 'John Doe', status: 'completed', dueDate: '2025-10-15', description: 'Fill all personal information fields' },
    { id: 2, title: 'Submit Bank Details', assignee: 'John Doe', status: 'in-progress', dueDate: '2025-10-18', description: 'Provide bank account for salary transfer' },
    { id: 3, title: 'IT Asset Assignment', assignee: 'IT Admin', status: 'not-started', dueDate: '2025-10-20', description: 'Assign laptop and access credentials' },
    { id: 4, title: 'Complete Security Training', assignee: 'John Doe', status: 'not-started', dueDate: '2025-10-22', description: 'Mandatory security awareness course' }
  ]);

  const [showTaskModal, setShowTaskModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [signature, setSignature] = useState(null);
  const [hasAccepted, setHasAccepted] = useState(false);
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [previewDocument, setPreviewDocument] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);

  const [taskForm, setTaskForm] = useState({
    title: '',
    description: '',
    assignee: '',
    dueDate: ''
  });

  // Document Upload Handlers
  const handleFileUpload = (docId, file) => {
    setDocuments(docs => docs.map(doc => 
      doc.id === docId 
        ? { ...doc, status: 'uploaded', file: file.name, uploadDate: new Date().toISOString().split('T')[0] }
        : doc
    ));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e, docId) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    if (file) handleFileUpload(docId, file);
  };

  // Task Management Handlers
  const calculateProgress = () => {
    const completed = tasks.filter(t => t.status === 'completed').length;
    return Math.round((completed / tasks.length) * 100);
  };

  const filteredTasks = filterStatus === 'all' 
    ? tasks 
    : tasks.filter(t => t.status === filterStatus);

  const handleAddTask = () => {
    if (editingTask) {
      setTasks(tasks.map(t => t.id === editingTask.id ? { ...editingTask, ...taskForm } : t));
    } else {
      setTasks([...tasks, { 
        id: Date.now(), 
        ...taskForm, 
        status: 'not-started' 
      }]);
    }
    setShowTaskModal(false);
    setEditingTask(null);
    setTaskForm({ title: '', description: '', assignee: '', dueDate: '' });
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setTaskForm({
      title: task.title,
      description: task.description,
      assignee: task.assignee,
      dueDate: task.dueDate
    });
    setShowTaskModal(true);
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const toggleTaskStatus = (id) => {
    setTasks(tasks.map(t => {
      if (t.id === id) {
        const statuses = ['not-started', 'in-progress', 'completed'];
        const currentIndex = statuses.indexOf(t.status);
        const nextStatus = statuses[(currentIndex + 1) % statuses.length];
        return { ...t, status: nextStatus };
      }
      return t;
    }));
  };

  // E-Sign Handlers
  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.strokeStyle = '#1e40af';
    ctx.lineWidth = 2;
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setSignature(null);
    setUploadedImage(null);
  };

  const saveSignature = () => {
    const canvas = canvasRef.current;
    const signatureData = canvas.toDataURL();
    setSignature(signatureData);
  };

  const handleAcceptAndSign = () => {
    if (!hasAccepted) {
      alert('Please accept the terms before signing');
      return;
    }
    saveSignature();
    alert('Document signed successfully! A copy has been saved to your employee record.');
  };

  const handlePreviewDocument = (document) => {
    setPreviewDocument(document);
    setShowPreviewModal(true);
  };

  const closePreviewModal = () => {
    setShowPreviewModal(false);
    setPreviewDocument(null);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageData = event.target.result;
        setUploadedImage(imageData);
        
        // Draw the uploaded image on the canvas
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.onload = () => {
          // Clear canvas and draw the uploaded image
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          setSignature(canvas.toDataURL());
        };
        img.src = imageData;
      };
      reader.readAsDataURL(file);
    }
  };

  // Status Badge Component
  const StatusBadge = ({ status }) => {
    const styles = {
      uploaded: 'bg-success-subtle text-success border-success',
      pending: 'bg-warning-subtle text-warning border-warning',
      completed: 'bg-success-subtle text-success border-success',
      'in-progress': 'bg-info-subtle text-info border-info',
      'not-started': 'bg-secondary-subtle text-secondary border-secondary'
    };

    const icons = {
      uploaded: 'heroicons:check-circle',
      pending: 'heroicons:clock',
      completed: 'heroicons:check-circle',
      'in-progress': 'heroicons:arrow-path',
      'not-started': 'heroicons:exclamation-triangle'
    };

    return (
      <span className={`badge d-flex align-items-center border ${styles[status]}`}>
        <Icon icon={icons[status]} className="me-1" />
        {status.replace('-', ' ')}
      </span>
    );
  };

  return (
    <div className="container-fluid">
    {/* Header */}
    <div className="card border shadow-none mb-4">
      <div className="card-body">
        <h5 className=" fw-bold text-dark mb-2 d-flex align-items-center gap-2">
          <Icon icon="heroicons:document-text" className="" />
          Employee Onboarding
        </h5>
        <p className="text-muted">Manage new hire documents, tasks, and contracts</p>
      </div>
    </div>

    {/* Navigation Tabs */}
    <div className="card border shadow-none">
      <div className="card-header bg-transparent border-0 p-0">
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'documents' ? 'active' : ''}`}
              onClick={() => setActiveTab('documents')}
            >
              <Icon icon="heroicons:arrow-up-tray" className="me-2" />
              Documents Upload
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'tasks' ? 'active' : ''}`}
              onClick={() => setActiveTab('tasks')}
            >
              <Icon icon="heroicons:check-circle" className="me-2" />
              Task Management
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'esign' ? 'active' : ''}`}
              onClick={() => setActiveTab('esign')}
            >
              <Icon icon="heroicons:pencil" className="me-2" />
              E-Sign
            </button>
          </li>
        </ul>
      </div>

      <div className="card-body">
        {/* Documents Upload Page */}
        {activeTab === 'documents' && (
          <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h5 className=" fw-semibold text-dark">Required Documents</h5>
              <div className="text-muted small">
                {documents.filter(d => d.status === 'uploaded').length} of {documents.length} uploaded
              </div>
            </div>

            <div className="row g-4">
              {documents.map(doc => (
                <div key={doc.id} className="col-12">
                  <div className="card border">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-start mb-4">
                        <div className="d-flex align-items-center gap-3">
                          <div className="w-40-px h-40-px bg-primary-subtle rounded d-flex align-items-center justify-content-center">
                            <Icon icon="heroicons:document-text" className="text-primary fs-5" />
                          </div>
                          <div>
                            <h6 className=" fw-bold fs-5">{doc.name}</h6>
                            {doc.uploadDate && (
                              <p className="small text-muted mb-0">Uploaded on {doc.uploadDate}</p>
                            )}
                          </div>
                        </div>
                        <StatusBadge status={doc.status} />
                      </div>

                      {doc.status === 'pending' ? (
                        <div
                          onDragOver={handleDragOver}
                          onDrop={(e) => handleDrop(e, doc.id)}
                          className="border border-dashed border-muted rounded p-5 text-center"
                        >
                          <Icon icon="heroicons:arrow-up-tray" className="text-muted mb-3" style={{ fontSize: '2rem' }} />
                          <p className="text-muted mb-2">Drag and drop your file here, or</p>
                          <label className="btn btn-primary">
                            Browse Files
                            <input
                              type="file"
                              className="d-none"
                              onChange={(e) => handleFileUpload(doc.id, e.target.files[0])}
                            />
                          </label>
                          <p className="small text-muted mt-2">PDF, JPG, PNG up to 10MB</p>
                        </div>
                      ) : (
                        <div className="d-flex justify-content-between align-items-center bg-light rounded p-3">
                          <div className="d-flex align-items-center gap-3">
                            <div className="w-32-px h-32-px bg-success-subtle rounded d-flex align-items-center justify-content-center">
                              <Icon icon="heroicons:check-circle" className="text-success" />
                            </div>
                            <span className="small fw-medium text-dark">{doc.file}</span>
                          </div>
                          <div className="d-flex gap-2">
                            <button 
                              className="btn btn-sm btn-outline-primary"
                              onClick={() => handlePreviewDocument(doc)}
                            >
                              Preview
                            </button>
                            <label className="btn btn-sm btn-outline-secondary">
                              Replace
                              <input
                                type="file"
                                className="d-none"
                                onChange={(e) => handleFileUpload(doc.id, e.target.files[0])}
                              />
                            </label>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Task Management Page */}
        {activeTab === 'tasks' && (
          <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h5 className=" fw-semibold text-dark">Onboarding Tasks</h5>
                <p className="text-muted small">Track and manage new hire setup tasks</p>
              </div>
              <button
                onClick={() => {
                  setEditingTask(null);
                  setTaskForm({ title: '', description: '', assignee: '', dueDate: '' });
                  setShowTaskModal(true);
                }}
                className="btn btn-primary d-flex align-items-center gap-2"
              >
                <Icon icon="heroicons:plus" className="me-1" />
                Add Task
              </button>
            </div>

            {/* Progress Bar */}
            <div className="card border mb-4">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="small fw-medium text-muted">Overall Progress</span>
                  <span className="small fw-semibold text-dark">{calculateProgress()}%</span>
                </div>
                <div className="progress" style={{ height: '12px' }}>
                  <div
                    className="progress-bar bg-primary"
                    style={{ width: `${calculateProgress()}% `}}
                  ></div>
                </div>
              </div>
            </div>

            {/* Filter */}
            <div className="d-flex align-items-center gap-3 mb-4">
              <Icon icon="heroicons:funnel" className="fs-5" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="form-select"
                style={{ width: 'auto' }}
              >
                <option value="all">All Tasks</option>
                <option value="not-started">Not Started</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            {/* Tasks Table */}
            <div className="card border shadow-none">
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead className="bg-light">
                      <tr>
                        <th className="border-0 px-4 py-3 text-uppercase fw-bold">Task Name</th>
                        <th className="border-0 px-4 py-3 text-uppercase fw-bold">Assigned To</th>
                        <th className="border-0 px-4 py-3 text-uppercase fw-bold">Status</th>
                        <th className="border-0 px-4 py-3 text-uppercase fw-bold">Due Date</th>
                        <th className="border-0 px-4 py-3 text-uppercase fw-bold ">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredTasks.map(task => (
                        <tr key={task.id}>
                          <td className="px-4 py-3">
                            <div>
                              <div className="fw-medium text-dark">{task.title}</div>
                              <div className="small text-muted">{task.description}</div>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="d-flex align-items-center gap-2">
                              <Icon icon="heroicons:user" className="text-muted" />
                              <span className="small text-muted">{task.assignee}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 ">
                            <button onClick={() => toggleTaskStatus(task.id)} className="btn p-0">
                              <StatusBadge status={task.status} />
                            </button>
                          </td>
                          <td className="px-4 py-3">
                            <div className="d-flex align-items-center gap-2 small text-muted">
                              <Icon icon="heroicons:calendar" className="text-muted" />
                              {task.dueDate}
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="d-flex gap-2">
                              <button
                                onClick={() => handleEditTask(task)}
                                className="btn btn-sm btn-outline-primary"
                              >
                                <Icon icon="heroicons:pencil" />
                              </button>
                              <button
                                onClick={() => handleDeleteTask(task.id)}
                                className="btn btn-sm btn-outline-danger"
                              >
                                <Icon icon="heroicons:trash" />
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
          </div>
        )}

        {/* E-Sign Page */}
        {activeTab === 'esign' && (
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div>
                <h5 className=" fw-semibold text-dark">Employment Contract</h5>
                <p className="text-muted small">Review and electronically sign your offer letter</p>
              </div>

              {/* Document Preview */}
              <div className="card border mt-4">
                <div className="card-body">
                  <h5 className="fw-semibold mb-4">Offer Letter - Software Engineer</h5>
                  <div className="small text-dark">
                    <p className="mb-3">
                      Dear John Doe,
                    </p>
                    <p className="mb-3">
                      We are pleased to offer you the position of Software Engineer at TechCorp Inc. Your employment will commence on November 1, 2025.
                    </p>
                    <p className="mb-3">
                      <strong>Position:</strong> Software Engineer<br />
                      <strong>Department:</strong> Engineering<br />
                      <strong>Reporting To:</strong> Engineering Manager<br />
                      <strong>Salary:</strong> $95,000 per annum<br />
                      <strong>Benefits:</strong> Health insurance, 401(k), 20 days PTO
                    </p>
                    <p className="mb-0">
                      This offer is contingent upon successful completion of background verification and reference checks. Please sign below to accept this offer.
                    </p>
                  </div>
                </div>
              </div>

              {/* Acceptance Checkbox */}
              <div className="card bg-primary-subtle border-primary-subtle mt-4">
                <div className="card-body">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={hasAccepted}
                      onChange={(e) => setHasAccepted(e.target.checked)}
                    />
                    <label className="form-check-label small text-dark">
                      I have read and understood the terms of this offer letter. I accept the position and agree to the terms and conditions outlined above.
                    </label>
                  </div>
                </div>
              </div>

              {/* Signature Widget */}
              <div className="card border mt-4">
                <div className="card-body">
                  <h5 className="fw-semibold text-dark mb-4">Your Signature</h5>
                  
                  {/* Uploaded Image Preview */}
                  {uploadedImage && (
                    <div className="alert alert-info mb-3">
                      <div className="d-flex align-items-center gap-2">
                        <Icon icon="heroicons:check-circle" className="text-info" />
                        <span className="small">Image uploaded successfully! You can now draw on top of it or clear to start over.</span>
                      </div>
                    </div>
                  )}

                  <div className="border rounded overflow-hidden mb-4">
                    <canvas
                      ref={canvasRef}
                      width={700}
                      height={200}
                      onMouseDown={startDrawing}
                      onMouseMove={draw}
                      onMouseUp={stopDrawing}
                      onMouseLeave={stopDrawing}
                      className="w-100 bg-white"
                      style={{ cursor: 'crosshair' }}
                    />
                  </div>
                  
                  <div className="d-flex gap-3">
                    <button
                      onClick={clearSignature}
                      className="btn btn-outline-secondary"
                    >
                      Clear
                    </button>
                    <label className="btn btn-outline-secondary">
                      Upload Image
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="d-none" 
                        onChange={handleImageUpload}
                      />
                    </label>
                    <button
                      onClick={saveSignature}
                      className="btn btn-outline-primary"
                    >
                      Save Signature
                    </button>
                  </div>
                  
                  <div className="mt-3">
                    <p className="small text-muted mb-0">
                      <Icon icon="heroicons:information-circle" className="me-1" />
                      You can either draw your signature or upload an image of your signature.
                    </p>
                  </div>
                </div>
              </div>

              {/* Sign Button */}
              <div className="d-flex justify-content-between align-items-center bg-light rounded p-4 mt-4">
                <div className="d-flex align-items-center gap-3 small text-muted">
                  <Icon icon="heroicons:exclamation-triangle" />
                  <span>This signature will be legally binding</span>
                </div>
                <button
                  onClick={handleAcceptAndSign}
                  disabled={!hasAccepted}
                  className="btn btn-success d-flex align-items-center gap-2"
                >
                  <Icon icon="heroicons:check-circle" className="me-1" />
                  Accept & Sign
                </button>
              </div>

              {signature && (
                <div className="alert alert-success d-flex justify-content-between align-items-center mt-4">
                  <div className="d-flex align-items-center gap-3">
                    <Icon icon="heroicons:check-circle" className="text-success" />
                    <span className="small fw-medium">Document signed successfully!</span>
                  </div>
                  <button className="btn btn-sm btn-outline-success d-flex align-items-center gap-2">
                    <Icon icon="heroicons:arrow-down-tray" className="me-1" />
                    Download
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>

    {/* Task Modal */}
    {showTaskModal && (
      <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                {editingTask ? 'Edit Task' : 'Add New Task'}
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setShowTaskModal(false)}
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Title</label>
                <input
                  type="text"
                  value={taskForm.title}
                  onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })}
                  className="form-control"
                  placeholder="Enter task title"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  value={taskForm.description}
                  onChange={(e) => setTaskForm({ ...taskForm, description: e.target.value })}
                  className="form-control"
                  rows="3"
                  placeholder="Enter task description"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Assignee</label>
                <input
                  type="text"
                  value={taskForm.assignee}
                  onChange={(e) => setTaskForm({ ...taskForm, assignee: e.target.value })}
                  className="form-control"
                  placeholder="Enter assignee name"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Due Date</label>
                <input
                  type="date"
                  value={taskForm.dueDate}
                  onChange={(e) => setTaskForm({ ...taskForm, dueDate: e.target.value })}
                  className="form-control"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                onClick={() => setShowTaskModal(false)}
                className="btn btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={handleAddTask}
                className="btn btn-primary"
              >
                {editingTask ? 'Update' : 'Add'} Task
              </button>
            </div>
          </div>
        </div>
      </div>
    )}

    {/* Document Preview Modal */}
    {showPreviewModal && previewDocument && (
      <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title d-flex align-items-center gap-2">
                <Icon icon="heroicons:document-text" className="text-primary" />
                Document Preview - {previewDocument.name}
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={closePreviewModal}
              ></button>
            </div>
            <div className="modal-body">
              <div className="row g-3 mb-4">
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Document Name</label>
                  <p className="form-control-plaintext">{previewDocument.name}</p>
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold">File Name</label>
                  <p className="form-control-plaintext">{previewDocument.file}</p>
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Upload Date</label>
                  <p className="form-control-plaintext">{previewDocument.uploadDate}</p>
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Status</label>
                  <div style={{width:"100px"}}>
                    <StatusBadge status={previewDocument.status} />
                  </div>
                </div>
              </div>

              {/* Document Preview Area */}
              <div className="border rounded p-4 bg-light" style={{ minHeight: '500px' }}>
                <div className="text-center">
                  <Icon icon="heroicons:document-text" className="text-muted mb-3" style={{ fontSize: '4rem' }} />
                  <h6 className="fw-semibold text-dark mb-2">{previewDocument.name}</h6>
                  <p className="text-muted mb-3">File: {previewDocument.file}</p>
                  
                  {/* Simulated Document Content */}
                  <div className="bg-white border rounded p-4 text-start" style={{ maxWidth: '600px', margin: '0 auto' }}>
                    <div className="mb-3">
                      <h5 className="fw-semibold text-dark mb-2">Document Content Preview</h5>
                      <p className="small text-muted mb-0">
                        This is a preview of the uploaded document. In a real application, 
                        this would display the actual content of the PDF or image file.
                      </p>
                    </div>
                    
                    <div className="border-top pt-3">
                      <div className="row g-2 small">
                        <div className="col-4 fw-semibold">Document Type:</div>
                        <div className="col-8">{previewDocument.name}</div>
                        
                        <div className="col-4 fw-semibold">File Size:</div>
                        <div className="col-8">2.4 MB</div>
                        
                        <div className="col-4 fw-semibold">Upload Date:</div>
                        <div className="col-8">{previewDocument.uploadDate}</div>
                        
                        <div className="col-4 fw-semibold">Status:</div>
                        <div className="col-8" style={{width:"100px"}}>
                          <StatusBadge status={previewDocument.status} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={closePreviewModal}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary d-flex align-items-center gap-2"
              >
                <Icon icon="heroicons:arrow-down-tray" className="me-1" />
                Download
              </button>
              <button
                type="button"
                className="btn btn-outline-primary d-flex align-items-center gap-2"
              >
                <Icon icon="heroicons:share" className="me-1" />
                Share
              </button>
            </div>
          </div>
        </div>
      </div>
    )}
  </div>
  );
};

export default OnboardingDocuments;