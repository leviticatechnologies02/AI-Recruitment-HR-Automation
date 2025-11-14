import React, { useState, useEffect } from 'react';
import {
  User,
  MessageSquare,
  Video,
  Award,
  TrendingUp,
  Eye,
  CheckCircle,
  XCircle,
  Search,
  Filter,
  Download,
  RefreshCw,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  FileText,
  Menu,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';
import { BASE_URL } from '../../config/api.config';

const ReviewAIInterview = () => {
  const [candidates, setCandidates] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMinScore, setFilterMinScore] = useState(0);
  const [showTranscript, setShowTranscript] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [recruiterNote, setRecruiterNote] = useState('');
  const [savedNotes, setSavedNotes] = useState([]);
  const [showCandidateModal, setShowCandidateModal] = useState(false);
  const [selectedCandidateForModal, setSelectedCandidateForModal] = useState(null);

  // Fetch questions
  const fetchQuestions = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/interviews/get_questions`);
      if (response.ok) {
        const data = await response.json();
        setQuestions(data);
      }
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  // Fetch all interview results (real data from backend)
  const fetchCandidates = async () => {
    setLoading(true);
    try {
      // ✅ Fetch real interview results from backend
      const response = await fetch(`${BASE_URL}/api/interviews/results`);
      if (response.ok) {
        const data = await response.json();
        console.log('📊 Interview results:', data);
        
        // Map the backend data to the format used by the UI
        const formattedAnswers = data.map(result => {
          // Match answers with questions
          const answersWithQuestions = result.answers.map(ans => {
            const question = questions.find(q => q.id === ans.question_id);
            return {
              question_id: ans.question_id,
              question_text: question?.text || `Question ${ans.question_id}`,
              question_type: question?.type || 'text',
              answer_text: ans.answer_text,
              score: ans.score || 0,
              video_path: ans.video_path,
              q: question?.text || `Question ${ans.question_id}`,
              a: ans.answer_text
            };
          });
          
          return {
            candidate_id: result.candidate_id,
            name: result.candidate_name,
            candidate_name: result.candidate_name,
            candidate_email: result.candidate_email,
            email: result.candidate_email,
            role: 'Candidate', // Default role
            phone: 'N/A',
            location: 'N/A',
            experience: 'N/A',
            education: 'N/A',
            interviewDate: new Date().toLocaleDateString(),
            status: 'Interviewed',
            questions: answersWithQuestions,
            answers: answersWithQuestions,
            total_score: result.total_score,
            aiScore: result.avg_score,
            avg_score: result.avg_score,
            keywords: ['Experienced', 'Professional', 'Skilled'], // Mock data
            sentiment: {
              tone: 'Positive',
              confidence: 'High',
              engagement: 'Good'
            },
            scores: {
              technical: Math.round(result.avg_score),
              communication: Math.round(result.avg_score * 0.95),
              problemSolving: Math.round(result.avg_score * 1.05),
              overall: Math.round(result.avg_score)
            },
            verdict: result.avg_score >= 80 
              ? 'Highly recommended for next round. Strong technical skills and excellent communication.'
              : result.avg_score >= 60
              ? 'Recommended for consideration. Good overall performance with room for improvement.'
              : 'Not recommended. Needs significant improvement in technical and communication areas.',
            skills: ['Problem Solving', 'Technical Knowledge', 'Communication'],
            previousCompanies: ['Tech Corp', 'Innovation Labs']
          };
        });

        setAnswers(formattedAnswers);
        
        // Extract unique candidates
        const uniqueCandidates = formattedAnswers.map(a => ({
          id: a.candidate_id,
          candidate_name: a.candidate_name,
          candidate_email: a.candidate_email
        }));
        setCandidates(uniqueCandidates);
      } else {
        console.error('Failed to fetch interview results');
        setAnswers([]);
        setCandidates([]);
      }
    } catch (error) {
      console.error('Error fetching interview results:', error);
      setAnswers([]);
      setCandidates([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const init = async () => {
      await fetchQuestions();
      await fetchCandidates();
    };
    init();
  }, []);

  // Get current candidate
  const candidate = selectedCandidate !== null ? answers[selectedCandidate] : null;

  // Handle candidate click for modal
  const handleCandidateClick = (c) => {
    setSelectedCandidateForModal(c);
    setShowCandidateModal(true);
  };

  const closeModal = () => {
    setShowCandidateModal(false);
    setSelectedCandidateForModal(null);
  };

  // Handle save note
  const handleSaveNote = () => {
    if (recruiterNote.trim() && candidate) {
      const newNote = {
        candidate: candidate.name,
        note: recruiterNote,
        date: new Date().toLocaleString(),
        recruiter: 'Current User'
      };
      setSavedNotes([...savedNotes, newNote]);
      setRecruiterNote('');
      alert('Note saved successfully!');
    }
  };

  // Handle action buttons
  const handleAction = (action) => {
    if (candidate) {
      alert(`${action} action performed for ${candidate.name}`);
    }
  };

  // Get score badge color
  const getScoreBadgeColor = (score) => {
    if (score >= 80) return 'bg-success text-white';
    if (score >= 60) return 'bg-info text-white';
    if (score >= 40) return 'bg-warning text-dark';
    return 'bg-danger text-white';
  };

  return (
    <div className="container-fluid">
      {/* Header */}
      <div className="card border shadow-none mb-4">
        <div className="card-body">
          <div className="d-flex align-items-center gap-3 mb-2">
            <div className="p-2 bg-primary-subtle rounded">
              <FileText size={24} className="text-primary" />
            </div>
            <h4 className="mb-0">AI Interview Review</h4>
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
                <button 
                  className="btn btn-sm btn-outline-secondary d-lg-none" 
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                >
                  <Menu size={16} />
                </button>
              </div>

              {loading ? (
                <div className="text-center py-4">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : answers.length === 0 ? (
                <div className="text-center py-4">
                  <MessageSquare size={32} className="text-muted mb-2" />
                  <p className="text-muted small mb-0">No interview results yet</p>
                </div>
              ) : (
                <div className="d-flex flex-column gap-2">
                  {answers.map((c, idx) => (
                    <div
                      key={idx}
                      className={`card p-3 border-2 cursor-pointer ${
                        selectedCandidate === idx
                          ? 'border-primary bg-primary-subtle text-primary'
                          : 'border-secondary bg-light text-dark'
                      }`}
                      style={{ cursor: 'pointer' }}
                      onClick={() => { setSelectedCandidate(idx); setCurrentQuestion(0); }}
                      onDoubleClick={() => handleCandidateClick(c)}
                    >
                      <div className="d-flex align-items-start justify-content-between mb-2">
                        <h6 className="mb-0 small">{c.name}</h6>
                        <span
                          className={`badge ${
                            c.aiScore >= 80
                              ? 'bg-success-subtle text-success'
                              : c.aiScore >= 70
                              ? 'bg-warning-subtle text-warning'
                              : 'bg-danger-subtle text-danger'
                          }`}
                        >
                          {c.aiScore}%
                        </span>
                      </div>
                      <p className="small text-muted mb-2">{c.role}</p>
                      <p className="small text-muted mb-0">Double-click for details</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Panel - Interview Details */}
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
                      <div className="w-20 h-20 bg-primary rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                        style={{ width: '80px', height: '80px' }}
                      >
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
                        setCurrentQuestion(
                          Math.min(candidate.questions.length - 1, currentQuestion + 1)
                        )
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
                          <p className="fw-semibold text-success mb-0">
                            {candidate.sentiment.tone}
                          </p>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="p-3 bg-info-subtle rounded border border-info-subtle">
                          <p className="small text-muted mb-1">Confidence</p>
                          <p className="fw-semibold text-info mb-0">
                            {candidate.sentiment.confidence}
                          </p>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="p-3 bg-warning-subtle rounded border border-warning-subtle">
                          <p className="small text-muted mb-1">Engagement</p>
                          <p className="fw-semibold text-warning mb-0">
                            {candidate.sentiment.engagement}
                          </p>
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
                              {category === 'overall'
                                ? 'Overall Fit'
                                : category === 'technical'
                                ? 'Technical Knowledge'
                                : category}
                            </span>
                            <span className="small fw-semibold">{score}%</span>
                          </div>
                          <div className="progress" style={{ height: '8px' }}>
                            <div
                              className={`progress-bar ${
                                score >= 80
                                  ? 'bg-success'
                                  : score >= 70
                                  ? 'bg-warning'
                                  : 'bg-danger'
                              }`}
                              style={{ width: `${score}%` }}
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
                  <button className="btn btn-primary" onClick={handleSaveNote}>
                    Save Notes
                  </button>

                  {/* Saved Notes */}
                  {savedNotes.length > 0 && (
                    <div className="mt-4">
                      <h6 className="small fw-semibold text-muted mb-2">Previous Notes</h6>
                      <div className="d-flex flex-column gap-2">
                        {savedNotes
                          .filter((n) => n.candidate === candidate.name)
                          .map((note, idx) => (
                            <div key={idx} className="p-3 bg-light rounded border">
                              <p className="small mb-2">{note.note}</p>
                              <p className="small text-muted mb-0">
                                {note.date} • {note.recruiter}
                              </p>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="d-flex flex-wrap gap-2">
                <button className="btn btn-success" onClick={() => handleAction('Shortlist')}>
                  <CheckCircle size={16} className="me-2" />
                  Shortlist
                </button>
                <button className="btn btn-danger" onClick={() => handleAction('Reject')}>
                  <XCircle size={16} className="me-2" />
                  Reject
                </button>
                <button className="btn btn-secondary" onClick={() => handleAction('Export Report')}>
                  <Download size={16} className="me-2" />
                  Export Report
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Candidate Details Modal */}
      {showCandidateModal && selectedCandidateForModal && (
        <div
          className="modal show d-block"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
        >
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
                          <span
                            className={`badge ${
                              selectedCandidateForModal.status === 'Interviewed'
                                ? 'bg-primary-subtle text-primary'
                                : 'bg-success-subtle text-success'
                            }`}
                          >
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
                            <li key={idx} className="small mb-1">
                              • {company}
                            </li>
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
                          <span
                            className={`badge fs-6 ${
                              selectedCandidateForModal.aiScore >= 80
                                ? 'bg-success-subtle text-success'
                                : selectedCandidateForModal.aiScore >= 70
                                ? 'bg-warning-subtle text-warning'
                                : 'bg-danger-subtle text-danger'
                            }`}
                          >
                            {selectedCandidateForModal.aiScore}%
                          </span>
                        </div>
                        <div className="progress mb-3" style={{ height: '10px' }}>
                          <div
                            className={`progress-bar ${
                              selectedCandidateForModal.aiScore >= 80
                                ? 'bg-success'
                                : selectedCandidateForModal.aiScore >= 70
                                ? 'bg-warning'
                                : 'bg-danger'
                            }`}
                            style={{ width: `${selectedCandidateForModal.aiScore}%` }}
                          />
                        </div>

                        {/* Detailed Scores */}
                        <div className="row g-3">
                          {Object.entries(selectedCandidateForModal.scores).map(
                            ([category, score]) => (
                              <div key={category} className="col-6">
                                <div className="d-flex justify-content-between align-items-center mb-1">
                                  <span className="small text-muted text-capitalize">
                                    {category === 'overall'
                                      ? 'Overall Fit'
                                      : category === 'technical'
                                      ? 'Technical Knowledge'
                                      : category}
                                  </span>
                                  <span className="small fw-semibold">{score}%</span>
                                </div>
                                <div className="progress" style={{ height: '6px' }}>
                                  <div
                                    className={`progress-bar ${
                                      score >= 80
                                        ? 'bg-success'
                                        : score >= 70
                                        ? 'bg-warning'
                                        : 'bg-danger'
                                    }`}
                                    style={{ width: `${score}%` }}
                                  />
                                </div>
                              </div>
                            )
                          )}
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
                              <p className="fw-semibold text-success mb-0">
                                {selectedCandidateForModal.sentiment.tone}
                              </p>
                            </div>
                          </div>
                          <div className="col-4">
                            <div className="p-3 bg-info-subtle rounded border border-info-subtle">
                              <p className="small text-muted mb-1">Confidence</p>
                              <p className="fw-semibold text-info mb-0">
                                {selectedCandidateForModal.sentiment.confidence}
                              </p>
                            </div>
                          </div>
                          <div className="col-4">
                            <div className="p-3 bg-warning-subtle rounded border border-warning-subtle">
                              <p className="small text-muted mb-1">Engagement</p>
                              <p className="fw-semibold text-warning mb-0">
                                {selectedCandidateForModal.sentiment.engagement}
                              </p>
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
                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    setSelectedCandidate(
                      answers.findIndex((c) => c.name === selectedCandidateForModal.name)
                    );
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
      )}
    </div>
  );
};

export default ReviewAIInterview;
