import React, { useState } from 'react';
import { Play, Pause, ChevronLeft, ChevronRight, FileText, Download, CheckCircle, XCircle, Menu, X, User, Mail, Phone, MapPin } from 'lucide-react';

const ReviewAIInterview = () => {
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showTranscript, setShowTranscript] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [recruiterNote, setRecruiterNote] = useState('');
  const [savedNotes, setSavedNotes] = useState([]);
  const [showCandidateModal, setShowCandidateModal] = useState(false);
  const [selectedCandidateForModal, setSelectedCandidateForModal] = useState(null);

  const candidates = [
    {
      name: 'Nagendra Uggirala',
      role: 'Frontend Developer',
      email: 'nagendra.uggirala@email.com',
      phone: '+91 98765 43210',
      location: 'Bangalore, India',
      experience: '5 years',
      education: 'B.Tech Computer Science',
      aiScore: 89,
      keywords: ['React.js', 'API', 'CSS', 'Teamwork', 'Problem-solving'],
      sentiment: { tone: 'Positive', confidence: 'High', engagement: 'Strong' },
      scores: {
        communication: 85,
        technical: 92,
        confidence: 80,
        overall: 89
      },
      verdict: 'Strong candidate for next round.',
      skills: ['React.js', 'JavaScript', 'HTML/CSS', 'Node.js', 'Git', 'Webpack'],
      previousCompanies: ['TechCorp Inc.', 'StartupXYZ'],
      interviewDate: '2024-01-15',
      status: 'Interviewed',
      questions: [
        { q: 'Tell us about yourself.', a: 'I am a passionate frontend developer with 5 years of experience in React.js and modern web technologies. I love creating intuitive user interfaces and solving complex problems.' },
        { q: 'Explain React hooks and their benefits.', a: 'React hooks allow us to use state and lifecycle features in functional components. They promote code reusability through custom hooks and make components cleaner and easier to test.' },
        { q: 'Describe a challenging project you worked on.', a: 'I built a real-time dashboard for monitoring system performance using React, WebSockets, and D3.js. The main challenge was optimizing re-renders for live data updates.' }
      ]
    },
    {
      name: 'Sneha Reddy',
      role: 'UI Designer',
      email: 'sneha.reddy@email.com',
      phone: '+91 87654 32109',
      location: 'Hyderabad, India',
      experience: '3 years',
      education: 'B.Des Graphic Design',
      aiScore: 76,
      keywords: ['Figma', 'User Research', 'Prototyping', 'Accessibility'],
      sentiment: { tone: 'Positive', confidence: 'Medium', engagement: 'Good' },
      scores: {
        communication: 78,
        technical: 75,
        confidence: 73,
        overall: 76
      },
      verdict: 'Good candidate, requires further technical assessment.',
      skills: ['Figma', 'Adobe Creative Suite', 'Sketch', 'InVision', 'Principle', 'HTML/CSS'],
      previousCompanies: ['DesignStudio Pro', 'Creative Agency'],
      interviewDate: '2024-01-14',
      status: 'Interviewed',
      questions: [
        { q: 'Tell us about yourself.', a: 'I am a UI designer with 3 years of experience specializing in user-centered design and creating accessible interfaces.' },
        { q: 'What is your design process?', a: 'I start with user research, create wireframes, develop high-fidelity prototypes in Figma, and conduct usability testing to iterate on designs.' },
        { q: 'How do you handle design feedback?', a: 'I view feedback as an opportunity to improve. I ask clarifying questions and work collaboratively to find the best solution.' }
      ]
    },
    {
      name: 'Ravi Kumar',
      role: 'Backend Developer',
      email: 'ravi.kumar@email.com',
      phone: '+91 76543 21098',
      location: 'Pune, India',
      experience: '4 years',
      education: 'M.Tech Software Engineering',
      aiScore: 70,
      keywords: ['Node.js', 'MongoDB', 'REST API', 'Docker'],
      sentiment: { tone: 'Neutral', confidence: 'Medium', engagement: 'Moderate' },
      scores: {
        communication: 65,
        technical: 78,
        confidence: 68,
        overall: 70
      },
      verdict: 'Average performance, needs improvement in communication.',
      skills: ['Node.js', 'Python', 'MongoDB', 'PostgreSQL', 'Docker', 'AWS'],
      previousCompanies: ['Backend Solutions Ltd.', 'CloudTech'],
      interviewDate: '2024-01-13',
      status: 'Interviewed',
      questions: [
        { q: 'Tell us about yourself.', a: 'I am a backend developer with experience in Node.js and database management.' },
        { q: 'Explain RESTful API design principles.', a: 'REST APIs use HTTP methods, have stateless communication, and follow resource-based URL structures.' },
        { q: 'How do you ensure API security?', a: 'I implement authentication, use HTTPS, validate inputs, and follow security best practices.' }
      ]
    }
  ];

  const candidate = candidates[selectedCandidate];

  const handleSaveNote = () => {
    if (recruiterNote.trim()) {
      const newNote = {
        candidate: candidate.name,
        note: recruiterNote,
        date: new Date().toLocaleDateString(),
        recruiter: 'Current Recruiter'
      };
      setSavedNotes([...savedNotes, newNote]);
      setRecruiterNote('');
      alert('Note saved successfully!');
    }
  };

  const handleAction = (action) => {
    alert(`${action} action for ${candidate.name}`);
  };

  const handleCandidateClick = (candidateData) => {
    setSelectedCandidateForModal(candidateData);
    setShowCandidateModal(true);
  };

  const closeModal = () => {
    setShowCandidateModal(false);
    setSelectedCandidateForModal(null);
  };

  return (
    <div className="container-fluid">
      {/* Header */}
      <div className="card border shadow-none mb-4 mt-3">
        <div className="card-body">
          <div className="d-flex align-items-center gap-3 mb-2">
            <div className="p-2 bg-primary-subtle rounded">
              <FileText size={24} className="text-primary" />
            </div>
            <h5 className="mb-0"> AI Interview Review</h5>
          </div>
          <p className="text-muted mb-0">Review candidate interview responses with AI feedback, sentiment, and notes</p>
        </div>
      </div>

      <div className="row g-4">
        {/* Left Sidebar - Candidate List */}
        <div className="col-lg-4">
          <div className="card border shadow-none">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h5 className="mb-0">Candidates</h5>
                <button className="btn btn-sm btn-outline-secondary d-lg-none" onClick={() => setSidebarOpen(!sidebarOpen)}>
                  <Menu size={16} />
                </button>
              </div>
              <div className="d-flex flex-column gap-2">
                {candidates.map((c, idx) => (
                  <div
                    key={idx}
                    className={`card p-3 border-2 cursor-pointer ${selectedCandidate === idx
                      ? 'border-primary bg-primary-subtle text-primary'
                      : 'border-secondary bg-light text-dark'
                      }`}
                    style={{ cursor: 'pointer' }}
                    onClick={() => { setSelectedCandidate(idx); setCurrentQuestion(0); }}
                    onDoubleClick={() => handleCandidateClick(c)}
                  >
                    <div className="d-flex align-items-start justify-content-between mb-2">
                      <h6 className="mb-0 small">{c.name}</h6>
                      <span className={`badge ${c.aiScore >= 80 ? 'bg-success-subtle text-success' :
                        c.aiScore >= 70 ? 'bg-warning-subtle text-warning' :
                          'bg-danger-subtle text-danger'
                        }`}>
                        {c.aiScore}%
                      </span>
                    </div>
                    <p className="small text-muted mb-2">{c.role}</p>
                    <p className="small text-muted mb-0">Double-click for details</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-8">
          {!candidate ? (
            <div className="card border shadow-none text-center py-5">
              <div className="card-body">
                <FileText size={48} className="text-muted mb-3" />
                <h5 className="text-muted">Select a candidate to review their interview</h5>
                <p className="text-muted small mb-0">
                  Click on a candidate card from the left panel to begin reviewing.
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* Video/Answer Player */}
              <div className="card border shadow-none mb-4">
                <div className="card-body">
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <h5 className="mb-0">
                      Question {currentQuestion + 1} of {candidate.questions.length}
                    </h5>
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => setShowTranscript(!showTranscript)}
                    >
                      {showTranscript ? 'Hide' : 'Show'} Transcript
                    </button>
                  </div>

                  <div className="mb-3 p-3 bg-light rounded">
                    <p className="small fw-semibold text-muted mb-1">Question:</p>
                    <p className="mb-0">{candidate.questions[currentQuestion].q}</p>
                  </div>

                  {/* Video Player Simulation */}
                  <div
                    className="position-relative bg-dark rounded mb-3 d-flex align-items-center justify-content-center"
                    style={{ aspectRatio: '16/9' }}
                  >
                    <div className="text-center text-white">
                      <div className="w-20 h-20 bg-primary rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3">
                        {isPlaying ? (
                          <Pause size={32} className="text-white" />
                        ) : (
                          <Play size={32} className="text-white" style={{ marginLeft: '4px' }} />
                        )}
                      </div>
                      <button
                        className="btn btn-light"
                        onClick={() => setIsPlaying(!isPlaying)}
                      >
                        {isPlaying ? 'Pause' : 'Play'} Interview
                      </button>
                    </div>
                  </div>

                  {showTranscript && (
                    <div className="p-3 bg-primary-subtle rounded border border-primary-subtle">
                      <p className="small fw-semibold text-muted mb-2">Candidate Response:</p>
                      <p className="mb-0">{candidate.questions[currentQuestion].a}</p>
                    </div>
                  )}

                  <div className="d-flex align-items-center justify-content-between mt-3">
                    <button
                      className="btn btn-outline-secondary"
                      onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                      disabled={currentQuestion === 0}
                    >
                      <ChevronLeft size={16} className="me-1" />
                      Previous
                    </button>
                    <span className="small text-muted">
                      {currentQuestion + 1} / {candidate.questions.length}
                    </span>
                    <button
                      className="btn btn-outline-secondary"
                      onClick={() =>
                        setCurrentQuestion(Math.min(candidate.questions.length - 1, currentQuestion + 1))
                      }
                      disabled={currentQuestion === candidate.questions.length - 1}
                    >
                      Next
                      <ChevronRight size={16} className="ms-1" />
                    </button>
                  </div>
                </div>
              </div>



              {/* AI Feedback Panel */}
              <div className="card border shadow-none mb-4">
                <div className="card-body">
                  <h5 className="mb-3">AI Feedback</h5>

                  {/* Keyword Analysis */}
                  <div className="mb-4">
                    <h6 className="small fw-semibold text-muted mb-2">💬 Keyword Analysis</h6>
                    <div className="d-flex flex-wrap gap-2">
                      {candidate.keywords.map((keyword, idx) => (
                        <span key={idx} className="badge bg-primary-subtle text-primary">
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Sentiment Analysis */}
                  <div className="mb-4">
                    <h6 className="small fw-semibold text-muted mb-2">😊 Sentiment Analysis</h6>
                    <div className="row g-3">
                      <div className="col-md-4">
                        <div className="p-3 bg-success-subtle rounded border border-success-subtle">
                          <p className="small text-muted mb-1">Tone</p>
                          <p className="fw-semibold text-success mb-0">{candidate.sentiment.tone}</p>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="p-3 bg-info-subtle rounded border border-info-subtle">
                          <p className="small text-muted mb-1">Confidence</p>
                          <p className="fw-semibold text-info mb-0">{candidate.sentiment.confidence}</p>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="p-3 bg-warning-subtle rounded border border-warning-subtle">
                          <p className="small text-muted mb-1">Engagement</p>
                          <p className="fw-semibold text-warning mb-0">{candidate.sentiment.engagement}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* AI Evaluation Score */}
                  <div className="mb-4">
                    <h6 className="small fw-semibold text-muted mb-2">📊 AI Evaluation Score</h6>
                    <div className="d-flex flex-column gap-3">
                      {Object.entries(candidate.scores).map(([category, score]) => (
                        <div key={category}>
                          <div className="d-flex justify-content-between align-items-center mb-1">
                            <span className="small text-muted text-capitalize">
                              {category === 'overall' ? 'Overall Fit' : category === 'technical' ? 'Technical Knowledge' : category}
                            </span>
                            <span className="small fw-semibold">{score}%</span>
                          </div>
                          <div className="progress" style={{ height: '8px' }}>
                            <div
                              className={`progress-bar ${score >= 80 ? 'bg-success' :
                                score >= 70 ? 'bg-warning' :
                                  'bg-danger'
                                }`}
                              style={{ width: `${score}% `}}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* AI Verdict */}
                  <div className="p-3 bg-primary-subtle rounded border border-primary-subtle">
                    <p className="small fw-semibold text-muted mb-1">AI Verdict:</p>
                    <p className="mb-0">{candidate.verdict}</p>
                  </div>
                </div>
              </div>

              {/* Recruiter Notes */}
              <div className="card border shadow-none mb-4">
                <div className="card-body">
                  <h5 className="mb-3">🗒 Recruiter Notes</h5>
                  <textarea
                    className="form-control mb-3"
                    value={recruiterNote}
                    onChange={(e) => setRecruiterNote(e.target.value)}
                    placeholder="Add your notes about this candidate..."
                    rows="4"
                  />
                  <button
                    className="btn btn-primary"
                    onClick={handleSaveNote}
                  >
                    Save Notes
                  </button>

                  {/* Saved Notes */}
                  {savedNotes.length > 0 && (
                    <div className="mt-4">
                      <h6 className="small fw-semibold text-muted mb-2">Previous Notes</h6>
                      <div className="d-flex flex-column gap-2">
                        {savedNotes.filter(n => n.candidate === candidate.name).map((note, idx) => (
                          <div key={idx} className="p-3 bg-light rounded border">
                            <p className="small mb-2">{note.note}</p>
                            <p className="small text-muted mb-0">{note.date} • {note.recruiter}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="d-flex flex-wrap gap-2">
                <button
                  className="btn btn-success"
                  onClick={() => handleAction('Shortlist')}
                >
                  <CheckCircle size={16} className="me-2" />
                  Shortlist
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleAction('Reject')}
                >
                  <XCircle size={16} className="me-2" />
                  Reject
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => handleAction('Export Report')}
                >
                  <Download size={16} className="me-2" />
                  Export Report
                </button>
              </div>
            </>

          )}
        </div>

        {/* Candidate Details Modal */}
        {
          showCandidateModal && selectedCandidateForModal && (
            <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
              <div className="modal-dialog modal-xl">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title d-flex align-items-center gap-2">
                      <User size={24} />
                      {selectedCandidateForModal.name} - {selectedCandidateForModal.role}
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={closeModal}
                    ></button>
                  </div>
                  <div className="modal-body">
                    <div className="row g-4">
                      {/* Left Column - Personal Info */}
                      <div className="col-md-4">
                        <div className="card border shadow-none">
                          <div className="card-body">
                            <h6 className="card-title">Personal Information</h6>

                            <div className="d-flex align-items-center gap-2 mb-3">
                              <Mail size={16} className="text-muted" />
                              <span className="small">{selectedCandidateForModal.email}</span>
                            </div>

                            <div className="d-flex align-items-center gap-2 mb-3">
                              <Phone size={16} className="text-muted" />
                              <span className="small">{selectedCandidateForModal.phone}</span>
                            </div>

                            <div className="d-flex align-items-center gap-2 mb-3">
                              <MapPin size={16} className="text-muted" />
                              <span className="small">{selectedCandidateForModal.location}</span>
                            </div>

                            <hr />

                            <div className="mb-3">
                              <h6 className="small fw-semibold text-muted mb-1">Experience</h6>
                              <p className="mb-0">{selectedCandidateForModal.experience}</p>
                            </div>

                            <div className="mb-3">
                              <h6 className="small fw-semibold text-muted mb-1">Education</h6>
                              <p className="mb-0">{selectedCandidateForModal.education}</p>
                            </div>

                            <div className="mb-3">
                              <h6 className="small fw-semibold text-muted mb-1">Interview Date</h6>
                              <p className="mb-0">{selectedCandidateForModal.interviewDate}</p>
                            </div>

                            <div className="mb-3">
                              <h6 className="small fw-semibold text-muted mb-1">Status</h6>
                              <span className={`badge ${selectedCandidateForModal.status === 'Interviewed' ? 'bg-primary-subtle text-primary' :
                                'bg-success-subtle text-success'
                                }`}>
                                {selectedCandidateForModal.status}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Skills */}
                        <div className="card border shadow-none mt-3">
                          <div className="card-body">
                            <h6 className="card-title">Skills</h6>
                            <div className="d-flex flex-wrap gap-2">
                              {selectedCandidateForModal.skills?.map((skill, idx) => (
                                <span key={idx} className="badge bg-secondary-subtle text-secondary">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Previous Companies */}
                        <div className="card border shadow-none mt-3">
                          <div className="card-body">
                            <h6 className="card-title">Previous Companies</h6>
                            <ul className="list-unstyled mb-0">
                              {selectedCandidateForModal.previousCompanies?.map((company, idx) => (
                                <li key={idx} className="small mb-1">• {company}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      {/* Right Column - Interview Details */}
                      <div className="col-md-8">
                        {/* AI Score */}
                        <div className="card border shadow-none mb-3">
                          <div className="card-body">
                            <div className="d-flex align-items-center justify-content-between mb-3">
                              <h6 className="mb-0">AI Assessment Score</h6>
                              <span className={`badge fs-6 ${selectedCandidateForModal.aiScore >= 80 ? 'bg-success-subtle text-success' :
                                selectedCandidateForModal.aiScore >= 70 ? 'bg-warning-subtle text-warning' :
                                  'bg-danger-subtle text-danger'
                                }`}>
                                {selectedCandidateForModal.aiScore}%
                              </span>
                            </div>

                            <div className="progress mb-3" style={{ height: '10px' }}>
                              <div
                                className={`progress-bar ${selectedCandidateForModal.aiScore >= 80 ? 'bg-success' :
                                  selectedCandidateForModal.aiScore >= 70 ? 'bg-warning' :
                                    'bg-danger'
                                  }`}
                                style={{ width: `${selectedCandidateForModal.aiScore}%` }}
                              />
                            </div>

                            {/* Detailed Scores */}
                            <div className="row g-3">
                              {Object.entries(selectedCandidateForModal.scores).map(([category, score]) => (
                                <div key={category} className="col-6">
                                  <div className="d-flex justify-content-between align-items-center mb-1">
                                    <span className="small text-muted text-capitalize">
                                      {category === 'overall' ? 'Overall Fit' : category === 'technical' ? 'Technical Knowledge' : category}
                                    </span>
                                    <span className="small fw-semibold">{score}%</span>
                                  </div>
                                  <div className="progress" style={{ height: '6px' }}>
                                    <div
                                      className={`progress-bar ${score >= 80 ? 'bg-success' :
                                        score >= 70 ? 'bg-warning' :
                                          'bg-danger'
                                        }`}
                                      style={{ width: `${score}%` }}
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Sentiment Analysis */}
                        <div className="card border shadow-none mb-3">
                          <div className="card-body">
                            <h6 className="card-title">Sentiment Analysis</h6>
                            <div className="row g-3">
                              <div className="col-4">
                                <div className="p-3 bg-success-subtle rounded border border-success-subtle">
                                  <p className="small text-muted mb-1">Tone</p>
                                  <p className="fw-semibold text-success mb-0">{selectedCandidateForModal.sentiment.tone}</p>
                                </div>
                              </div>
                              <div className="col-4">
                                <div className="p-3 bg-info-subtle rounded border border-info-subtle">
                                  <p className="small text-muted mb-1">Confidence</p>
                                  <p className="fw-semibold text-info mb-0">{selectedCandidateForModal.sentiment.confidence}</p>
                                </div>
                              </div>
                              <div className="col-4">
                                <div className="p-3 bg-warning-subtle rounded border border-warning-subtle">
                                  <p className="small text-muted mb-1">Engagement</p>
                                  <p className="fw-semibold text-warning mb-0">{selectedCandidateForModal.sentiment.engagement}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Keywords */}
                        <div className="card border shadow-none mb-3">
                          <div className="card-body">
                            <h6 className="card-title">Key Terms Identified</h6>
                            <div className="d-flex flex-wrap gap-2">
                              {selectedCandidateForModal.keywords.map((keyword, idx) => (
                                <span key={idx} className="badge bg-primary-subtle text-primary">
                                  {keyword}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* AI Verdict */}
                        <div className="card border shadow-none">
                          <div className="card-body">
                            <h6 className="card-title">AI Verdict</h6>
                            <div className="p-3 bg-primary-subtle rounded border border-primary-subtle">
                              <p className="mb-0">{selectedCandidateForModal.verdict}</p>
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
                      onClick={closeModal}
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => {
                        setSelectedCandidate(candidates.findIndex(c => c.name === selectedCandidateForModal.name));
                        setCurrentQuestion(0);
                        closeModal();
                      }}
                    >
                      View Full Interview
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
        }
      </div >
    </div>
  );
};


export default ReviewAIInterview;