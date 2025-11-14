import React, { useState } from 'react';
import { Download, Mail, Phone, MapPin, Calendar, Briefcase, DollarSign, Clock, Linkedin, Github, X } from 'lucide-react';

const CandidateProfilePage = ({ candidate, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [notes, setNotes] = useState([
    { id: 1, author: 'Nagendra Uggirala', date: '08 Oct 2025', text: 'Strong in React. Needs more backend exposure.' },
    { id: 2, author: 'Sarah Johnson', date: '05 Oct 2025', text: 'Great communication skills during initial screening call.' }
  ]);
  const [newNote, setNewNote] = useState('');
  const [currentStage, setCurrentStage] = useState(candidate.stage);
  const [actionMessage, setActionMessage] = useState(null);

  // Enhanced candidate data
  const candidateData = {
    ...candidate,
    email: `${candidate.name.toLowerCase().replace(' ', '.')}@gmail.com`,
    phone: '+91 98765 43210',
    appliedDate: '02 Oct 2025',
    avatar: candidate.name.split(' ').map(n => n[0]).join(''),
    summary: `Passionate ${candidate.role.toLowerCase()} with expertise in modern web technologies. Recently graduated with a strong foundation in ${candidate.skills[0]} and responsive web design. Eager to contribute to innovative projects and grow as a developer.`,
    education: {
      degree: 'B.Tech, Computer Science',
      year: '2023',
      college: 'JNTUH College of Engineering'
    },
    experience: '6 months',
    lastCompany: 'Veritech Software Web Services',
    expectedSalary: '₹4 LPA',
    location: 'Hyderabad / Remote',
    availability: 'Immediate',
    noticePeriod: '0 days',
    linkedin: 'linkedin.com/in/' + candidate.name.toLowerCase().replace(' ', ''),
    github: 'github.com/' + candidate.name.toLowerCase().replace(' ', ''),
    workHistory: [
      {
        company: 'Veritech Software',
        role: 'Web Developer Intern',
        duration: 'Jan–Mar 2025',
        description: `Worked on responsive websites using ${candidate.skills[0]} and Node.js. Collaborated with senior developers to implement new features and improve user experience.`
      },
      {
        company: 'ABC Technologies',
        role: 'Frontend Intern',
        duration: 'May–Jul 2024',
        description: 'Developed UI components using HTML, CSS, and JavaScript. Participated in daily stand-ups and sprint planning meetings.'
      }
    ]
  };

  const handleAddNote = () => {
    if (newNote.trim()) {
      const note = {
        id: notes.length + 1,
        author: 'Current User',
        date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        text: newNote
      };
      setNotes([note, ...notes]);
      setNewNote('');
    }
  };

  const handleDeleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const showActionMessage = (message, type = 'success') => {
    setActionMessage({ message, type });
    setTimeout(() => setActionMessage(null), 3000);
  };

  const handleShortlist = () => {
    if (currentStage === 'Applied') {
      setCurrentStage('Screening');
      showActionMessage(`✅ ${candidate.name} has been shortlisted and moved to Screening stage!`);
    } else {
      showActionMessage(`✅ ${candidate.name} has been shortlisted!`);
    }
  };

  const handleReject = () => {
    if (window.confirm(`Are you sure you want to reject ${candidate.name}?`)) {
      setCurrentStage('Rejected');
      showActionMessage(`❌ ${candidate.name} has been rejected.`, 'danger');
    }
  };

  const handleStageChange = (e) => {
    const newStage = e.target.value;
    if (newStage && newStage !== '⏭ Move to Stage') {
      setCurrentStage(newStage);
      showActionMessage(`✅ ${candidate.name} has been moved to ${newStage} stage!`);
    }
  };

  const handleSubmit = () => {
    showActionMessage(`✅ Profile updated successfully! All changes for ${candidate.name} have been saved.`);
    // You can add API call here to save the changes to the backend
  };

  const getStageColor = (stage) => {
    const colors = {
      'Applied': 'bg-primary-subtle text-primary',
      'Screening': 'bg-info-subtle text-info',
      'Interview': 'bg-warning-subtle text-warning',
      'Offer': 'bg-success-subtle text-success',
      'Hired': 'bg-success-subtle text-success',
      'Rejected': 'bg-danger-subtle text-danger'
    };
    return colors[stage] || 'bg-secondary-subtle text-secondary';
  };

  return (
    <div className="modal fade show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050}} tabIndex="-1">
      <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content" style={{maxHeight: '85vh'}}>
          <div className="modal-header border-0 pb-0">
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <div className="container-fluid">
              
              {/* Action Message */}
              {actionMessage && (
                <div className={`alert alert-${actionMessage.type} alert-dismissible fade show`} role="alert">
                  {actionMessage.message}
                  <button type="button" className="btn-close" onClick={() => setActionMessage(null)}></button>
                </div>
              )}

              {/* Profile Header */}
              <div className="card border shadow-sm mb-4">
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between align-items-start flex-wrap">
                    <div className="d-flex gap-4 mb-3 mb-md-0">
                      <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" style={{width: '80px', height: '80px', fontSize: '28px', fontWeight: 'bold'}}>
                        {candidateData.avatar}
                      </div>
                      <div>
                        <h2 className="mb-2">{candidateData.name}</h2>
                        <p className="text-muted fs-5 mb-3">{candidateData.role}</p>
                        <div className="d-flex flex-wrap gap-3 mb-2">
                          <div className="d-flex align-items-center gap-2 text-muted small">
                            <Phone size={16} />
                            <span>{candidateData.phone}</span>
                          </div>
                          <div className="d-flex align-items-center gap-2 text-muted small">
                            <Mail size={16} />
                            <span>{candidateData.email}</span>
                          </div>
                        </div>
                        <div className="d-flex gap-3">
                          <a href={`https://${candidateData.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-primary">
                            <Linkedin size={20} />
                          </a>
                          <a href={`https://${candidateData.github}`} target="_blank" rel="noopener noreferrer" className="text-dark">
                            <Github size={20} />
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="text-end">
                      <button className="btn btn-primary d-flex align-items-center gap-2 mb-3">
                        <Download size={16} />
                        Download Resume
                      </button>
                      <div className="d-flex flex-column gap-2 align-items-end">
                        <span className={`badge ${getStageColor(currentStage)}`}>
                          {currentStage}
                        </span>
                        <span className="text-muted small d-flex align-items-center gap-1">
                          <Calendar size={14} />
                          Applied: {candidateData.appliedDate}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="d-flex gap-3 mb-4 flex-wrap">
                <button 
                  className="btn btn-success d-flex align-items-center"
                  onClick={handleShortlist}
                  disabled={currentStage === 'Hired' || currentStage === 'Rejected'}
                >
                  ✅ Shortlist
                </button>
                <button 
                  className="btn btn-danger d-flex align-items-center"
                  onClick={handleReject}
                  disabled={currentStage === 'Rejected'}
                >
                  ❌ Reject
                </button>
                <select 
                  className="form-select w-auto"
                  onChange={handleStageChange}
                  value=""
                  disabled={currentStage === 'Rejected'}
                >
                  <option value="">⏭ Move to Stage</option>
                  <option value="Applied">Applied</option>
                  <option value="Screening">Screening</option>
                  <option value="Interview">Interview</option>
                  <option value="Offer">Offer</option>
                  <option value="Hired">Hired</option>
                </select>
              </div>

              {/* Tabs Navigation */}
              <div className="card border shadow-sm">
                <div className="card-header bg-white border-bottom">
                  <ul className="nav nav-tabs card-header-tabs border-0">
                    {['overview', 'skills', 'work history', 'notes'].map((tab) => (
                      <li className="nav-item" key={tab}>
                        <button
                          onClick={() => setActiveTab(tab)}
                          className={`nav-link text-capitalize ${activeTab === tab ? 'active' : ''}`}
                        >
                          {tab}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tab Content */}
                <div className="card-body p-4">
                  
                  {/* Overview Tab */}
                  {activeTab === 'overview' && (
                    <div>
                      <div className="mb-4">
                        <h5 className="mb-3">About Me</h5>
                        <p className="text-muted">{candidateData.summary}</p>
                      </div>

                      <div className="row mb-4">
                        <div className="col-md-6 mb-3 mb-md-0">
                          <h5 className="mb-3">Education</h5>
                          <div className="card bg-light border-0">
                            <div className="card-body">
                              <p className="fw-semibold mb-1">{candidateData.education.degree}</p>
                              <p className="text-muted mb-1">{candidateData.education.college}</p>
                              <p className="text-muted small mb-0">Graduated: {candidateData.education.year}</p>
                            </div>
                          </div>
                        </div>

                        <div className="col-md-6">
                          <h5 className="mb-3">Experience</h5>
                          <div className="card bg-light border-0">
                            <div className="card-body">
                              <div className="d-flex align-items-center gap-2 mb-2">
                                <Briefcase size={18} className="text-muted" />
                                <span className="fw-semibold">{candidateData.experience}</span>
                              </div>
                              <p className="text-muted small mb-0">Last Company: {candidateData.lastCompany}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="row g-3">
                        <div className="col-md-6 col-lg-3">
                          <div className="card border-0 bg-primary-subtle">
                            <div className="card-body">
                              <div className="d-flex align-items-center gap-2 text-primary mb-2">
                                <DollarSign size={16} />
                                <span className="fw-semibold small">Expected Salary</span>
                              </div>
                              <p className="fw-semibold mb-0">{candidateData.expectedSalary}</p>
                            </div>
                          </div>
                        </div>

                        <div className="col-md-6 col-lg-3">
                          <div className="card border-0 bg-success-subtle">
                            <div className="card-body">
                              <div className="d-flex align-items-center gap-2 text-success mb-2">
                                <MapPin size={16} />
                                <span className="fw-semibold small">Location</span>
                              </div>
                              <p className="fw-semibold mb-0">{candidateData.location}</p>
                            </div>
                          </div>
                        </div>

                        <div className="col-md-6 col-lg-3">
                          <div className="card border-0" style={{backgroundColor: '#f3e8ff'}}>
                            <div className="card-body">
                              <div className="d-flex align-items-center gap-2 mb-2" style={{color: '#7c3aed'}}>
                                <Clock size={16} />
                                <span className="fw-semibold small">Availability</span>
                              </div>
                              <p className="fw-semibold mb-0">{candidateData.availability}</p>
                            </div>
                          </div>
                        </div>

                        <div className="col-md-6 col-lg-3">
                          <div className="card border-0 bg-warning-subtle">
                            <div className="card-body">
                              <div className="d-flex align-items-center gap-2 text-warning mb-2">
                                <Calendar size={16} />
                                <span className="fw-semibold small">Notice Period</span>
                              </div>
                              <p className="fw-semibold mb-0">{candidateData.noticePeriod}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Skills Tab */}
                  {activeTab === 'skills' && (
                    <div>
                      <h5 className="mb-4">Technical & Soft Skills</h5>
                      <div className="d-flex flex-wrap gap-2">
                        {candidateData.skills.map((skill, index) => (
                          <span key={index} className="badge bg-primary fs-6 px-3 py-2">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Work History Tab */}
                  {activeTab === 'work history' && (
                    <div>
                      <h5 className="mb-4">Work Experience</h5>
                      <div className="d-flex flex-column gap-3">
                        {candidateData.workHistory.map((job, index) => (
                          <div key={index} className="card border">
                            <div className="card-body">
                              <div className="d-flex justify-content-between align-items-start mb-3 flex-wrap">
                                <div>
                                  <h6 className="mb-1">{job.role}</h6>
                                  <p className="text-primary fw-semibold mb-0">{job.company}</p>
                                </div>
                                <span className="badge bg-light text-dark">
                                  {job.duration}
                                </span>
                              </div>
                              <p className="text-muted small mb-0">{job.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Notes Tab */}
                  {activeTab === 'notes' && (
                    <div>
                      <h5 className="mb-4">Recruiter Notes</h5>
                      
                      {/* Add Note Section */}
                      <div className="mb-4">
                        <textarea
                          value={newNote}
                          onChange={(e) => setNewNote(e.target.value)}
                          placeholder="Add a note about this candidate..."
                          className="form-control mb-2"
                          rows="3"
                        />
                        <button
                          onClick={handleAddNote}
                          className="btn btn-primary"
                        >
                          Add Note
                        </button>
                      </div>

                      {/* Notes List */}
                      <div className="d-flex flex-column gap-3">
                        {notes.map((note) => (
                          <div key={note.id} className="card bg-light border">
                            <div className="card-body">
                              <div className="d-flex justify-content-between align-items-start mb-2">
                                <div>
                                  <span className="fw-semibold">{note.author}</span>
                                  <span className="text-muted small ms-2">{note.date}</span>
                                </div>
                                <button
                                  onClick={() => handleDeleteNote(note.id)}
                                  className="btn btn-link btn-sm text-danger p-0"
                                >
                                  Delete
                                </button>
                              </div>
                              <p className="text-muted mb-0">{note.text}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Modal Footer */}
          <div className="modal-footer border-top d-flex justify-content-between align-items-center">
            <div className="text-muted small">
              <span>Last Updated: {new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
            </div>
            <div className="d-flex gap-2">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Close
              </button>
              <button type="button" className="btn btn-primary" onClick={handleSubmit}>
                <i className="bi bi-check-circle me-2"></i>
                Update Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateProfilePage;

