import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  Video,
  Type,
  Send,
  Clock,
  CheckCircle,
  AlertCircle,
  Loader,
  Camera,
  Mic,
  Square
} from 'lucide-react';
import { BASE_URL } from '../config/api.config';

const AIInterviewPortal = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // Extract URL parameters
  const candidateId = searchParams.get('candidate_id');
  const candidateName = searchParams.get('name');
  const candidateEmail = searchParams.get('email');
  const templateId = searchParams.get('template_id');
  
  // State management
  const [step, setStep] = useState('otp'); // otp, instructions, interview, completed
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [verifiedCandidateId, setVerifiedCandidateId] = useState(candidateId);
  const [otpSending, setOtpSending] = useState(false);

  // Send OTP when component mounts
  useEffect(() => {
    if (candidateEmail && candidateName && step === 'otp') {
      sendOTP();
    }
  }, [candidateEmail, candidateName]);

  // Timer countdown
  useEffect(() => {
    if (timeRemaining !== null && timeRemaining > 0 && step === 'interview') {
      const timer = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeRemaining === 0) {
      handleAutoSubmit();
    }
  }, [timeRemaining, step]);

  // Send OTP to candidate's email via backend
  const sendOTP = async () => {
    setOtpSending(true);
    try {
      const response = await fetch(`${BASE_URL}/api/interviews/send_otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: candidateEmail,
          name: candidateName
        })
      });

      const data = await response.json();
      
      if (response.ok && data.success) {
        // Store candidate_id for later use
        if (data.candidate_id) {
          setVerifiedCandidateId(data.candidate_id);
        }
        
        // For demo: show OTP if email sending failed
        if (data.otp) {
          alert(`OTP sent to your email!\n\nFor demo purposes, your OTP is: ${data.otp}\n\n(In production, check your email)`);
        } else {
          alert(`✅ OTP has been sent to ${candidateEmail}\n\nPlease check your email and enter the 6-digit code.`);
        }
      } else {
        throw new Error(data.detail || 'Failed to send OTP');
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      alert('Failed to send OTP. Please try again or contact support.');
    } finally {
      setOtpSending(false);
    }
  };

  // Verify OTP via backend
  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      setOtpError('Please enter a 6-digit OTP');
      return;
    }

    setLoading(true);
    setOtpError('');
    
    try {
      const response = await fetch(`${BASE_URL}/api/interviews/verify_otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: candidateEmail,
          otp: otp
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Store verified candidate ID
        setVerifiedCandidateId(data.candidate_id);
        setOtpError('');
        setStep('instructions');
        fetchQuestions();
      } else {
        setOtpError(data.detail || 'Invalid OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setOtpError('Failed to verify OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch interview questions
  const fetchQuestions = async () => {
    setLoading(true);
    try {
      // Build URL with optional template_id parameter
      let url = `${BASE_URL}/api/interviews/get_questions`;
      if (templateId) {
        url += `?template_id=${templateId}`;
      }
      
      console.log('🔍 Fetching questions from:', url);
      const response = await fetch(url);
      
      if (response.ok) {
        const data = await response.json();
        console.log('📝 Fetched questions:', data);
        
        if (!data || data.length === 0) {
          alert('No questions found in this template. Please contact support.');
          return;
        }
        
        setQuestions(data);
        // Initialize answers object
        const initialAnswers = {};
        data.forEach(q => {
          initialAnswers[q.id] = { text: '', video: null };
        });
        setAnswers(initialAnswers);
      } else {
        console.error('Failed to fetch questions:', response.status);
        const errorData = await response.json().catch(() => ({}));
        alert(errorData.detail || 'Failed to load interview questions. Please try again.');
      }
    } catch (error) {
      console.error('Error fetching questions:', error);
      alert('Error loading interview questions. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  // Start interview
  const handleStartInterview = () => {
    if (!questions || questions.length === 0) {
      alert('No interview questions available. Please contact support.');
      return;
    }
    setStep('interview');
    // Set timer if needed (e.g., 45 minutes = 2700 seconds)
    setTimeRemaining(2700);
  };

  // Handle text answer change
  const handleAnswerChange = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: { ...prev[questionId], text: value }
    }));
  };

  // Start video recording
  const startRecording = async (questionId) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks = [];

      recorder.ondataavailable = (e) => chunks.push(e.data);
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        setAnswers(prev => ({
          ...prev,
          [questionId]: { ...prev[questionId], video: blob }
        }));
        stream.getTracks().forEach(track => track.stop());
      };

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Unable to access camera. Please check permissions.');
    }
  };

  // Stop video recording
  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop();
      setIsRecording(false);
      setMediaRecorder(null);
    }
  };

  // Submit current answer
  const handleSubmitAnswer = async (questionId) => {
    setLoading(true);
    try {
      const currentQuestion = questions.find(q => q.id === questionId);
      const formData = new FormData();
      formData.append('candidate_id', verifiedCandidateId || candidateId);
      formData.append('question_id', questionId);
      formData.append('question_text', currentQuestion?.text || '');  // ✅ Add question text for AI scoring
      
      if (answers[questionId].text) {
        formData.append('answer_text', answers[questionId].text);
      }
      
      if (answers[questionId].video) {
        formData.append('video', answers[questionId].video, `video_${questionId}.webm`);
      }

      const response = await fetch(`${BASE_URL}/api/interviews/submit_answer`, {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const data = await response.json();
        console.log('✅ Answer submitted successfully. AI Score:', data.score);
        
        // Move to next question or complete
        if (currentQuestionIndex < questions.length - 1) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
          setStep('completed');
        }
      } else {
        throw new Error('Failed to submit answer');
      }
    } catch (error) {
      console.error('Error submitting answer:', error);
      alert('Failed to submit answer. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Auto-submit when time runs out
  const handleAutoSubmit = () => {
    alert('Time is up! Submitting your interview.');
    setStep('completed');
  };

  // Format time
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const currentQuestion = questions[currentQuestionIndex];

  // OTP Verification Screen
  if (step === 'otp') {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
        <div className="card shadow-lg" style={{ maxWidth: '500px', width: '100%' }}>
          <div className="card-body p-5">
            <div className="text-center mb-4">
              <div className="bg-primary-subtle rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '80px', height: '80px' }}>
                <Video size={40} className="text-primary" />
              </div>
              <h3 className="mb-2">AI Interview Verification</h3>
              <p className="text-secondary-light">
                Hello, <strong>{candidateName}</strong>
              </p>
            </div>

            <div className="alert alert-info mb-4">
              <AlertCircle size={20} className="me-2" />
              An OTP has been sent to <strong>{candidateEmail}</strong>
            </div>

            <div className="mb-3">
              <label className="form-label">Enter OTP *</label>
              <input
                type="text"
                className={`form-control form-control-lg text-center ${otpError ? 'is-invalid' : ''}`}
                placeholder="000000"
                maxLength="6"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                onKeyPress={(e) => e.key === 'Enter' && handleVerifyOTP()}
              />
              {otpError && <div className="invalid-feedback">{otpError}</div>}
            </div>

            <button
              onClick={handleVerifyOTP}
              disabled={otp.length !== 6 || loading}
              className="btn btn-primary btn-lg w-100 mb-3"
            >
              {loading ? (
                <>
                  <Loader className="spin me-2" size={20} />
                  Verifying...
                </>
              ) : (
                'Verify & Continue'
              )}
            </button>

            <button
              onClick={sendOTP}
              disabled={otpSending}
              className="btn btn-outline-secondary w-100"
            >
              {otpSending ? (
                <>
                  <Loader className="spin me-2" size={16} />
                  Sending...
                </>
              ) : (
                'Resend OTP'
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Instructions Screen
  if (step === 'instructions') {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
        <div className="card shadow-lg" style={{ maxWidth: '700px', width: '100%' }}>
          <div className="card-body p-5">
            <div className="text-center mb-4">
              <CheckCircle size={60} className="text-success mb-3" />
              <h3 className="mb-2">Welcome to Your AI Interview</h3>
              <p className="text-secondary-light">Please read the instructions carefully</p>
            </div>

            {loading ? (
              <div className="text-center py-4">
                <Loader className="spin text-primary mb-3" size={40} />
                <p className="text-secondary-light">Loading interview questions...</p>
              </div>
            ) : questions.length === 0 ? (
              <div className="alert alert-warning text-center">
                <AlertCircle size={24} className="mb-2" />
                <p className="mb-0">No interview questions available. Please contact support.</p>
              </div>
            ) : (
              <>
                <div className="mb-4">
                  <h5 className="mb-3">📋 Instructions:</h5>
                  <ul className="list-unstyled">
                    <li className="mb-2">
                      <CheckCircle size={16} className="text-success me-2" />
                      You have {questions.length} questions to answer
                    </li>
                <li className="mb-2">
                  <CheckCircle size={16} className="text-success me-2" />
                  You can answer via text or record a video
                </li>
                <li className="mb-2">
                  <CheckCircle size={16} className="text-success me-2" />
                  Make sure you're in a quiet environment
                </li>
                <li className="mb-2">
                  <CheckCircle size={16} className="text-success me-2" />
                  Ensure good lighting if recording video
                </li>
                <li className="mb-2">
                  <CheckCircle size={16} className="text-success me-2" />
                  Take your time and answer thoughtfully
                </li>
              </ul>
            </div>

                <div className="alert alert-warning mb-4">
                  <Clock size={20} className="me-2" />
                  Time Limit: {formatTime(timeRemaining || 0)}
                </div>

                <button
                  onClick={handleStartInterview}
                  disabled={loading || questions.length === 0}
                  className="btn btn-primary btn-lg w-100"
                >
                  {loading ? (
                    <>
                      <Loader className="spin me-2" size={20} />
                      Loading Questions...
                    </>
                  ) : (
                    'Start Interview'
                  )}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Interview Screen
  if (step === 'interview' && currentQuestion) {
    return (
      <div className="min-vh-100 bg-light py-4">
        <div className="container">
          {/* Header */}
          <div className="card shadow-sm mb-3">
            <div className="card-body py-3">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="mb-0">AI Interview - {candidateName}</h5>
                  <p className="text-sm text-secondary-light mb-0">
                    Question {currentQuestionIndex + 1} of {questions.length}
                  </p>
                </div>
                <div className="d-flex align-items-center gap-3">
                  <div className="text-end">
                    <Clock size={20} className="text-warning" />
                    <span className="ms-2 fw-semibold">{formatTime(timeRemaining)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="progress mb-4" style={{ height: '8px' }}>
            <div
              className="progress-bar bg-primary"
              style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
            />
          </div>

          {/* Question Card */}
          <div className="card shadow-lg">
            <div className="card-body p-5">
              <div className="mb-4">
                <span className="badge bg-info-subtle text-info mb-3">
                  {currentQuestion.type === 'video' ? '📹 Video Response' : '📝 Text Response'}
                </span>
                <h4 className="mb-0">{currentQuestion.text}</h4>
              </div>

              {/* Text Answer */}
              {currentQuestion.type === 'text' && (
                <div className="mb-4">
                  <label className="form-label">Your Answer:</label>
                  <textarea
                    className="form-control"
                    rows="8"
                    placeholder="Type your answer here..."
                    value={answers[currentQuestion.id]?.text || ''}
                    onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                  />
                </div>
              )}

              {/* Video Answer */}
              {currentQuestion.type === 'video' && (
                <div className="mb-4">
                  <label className="form-label">Video Response:</label>
                  <div className="text-center py-5 bg-dark rounded">
                    {!isRecording && !answers[currentQuestion.id]?.video && (
                      <div>
                        <Camera size={48} className="text-white mb-3" />
                        <p className="text-white mb-3">Click below to start recording</p>
                        <button
                          onClick={() => startRecording(currentQuestion.id)}
                          className="btn btn-danger"
                        >
                          <Video size={20} className="me-2" />
                          Start Recording
                        </button>
                      </div>
                    )}

                    {isRecording && (
                      <div>
                        <div className="mb-3">
                          <Mic size={48} className="text-danger animate-pulse" />
                        </div>
                        <p className="text-white mb-3">Recording in progress...</p>
                        <button
                          onClick={stopRecording}
                          className="btn btn-danger"
                        >
                          <Square size={20} className="me-2" />
                          Stop Recording
                        </button>
                      </div>
                    )}

                    {!isRecording && answers[currentQuestion.id]?.video && (
                      <div>
                        <CheckCircle size={48} className="text-success mb-3" />
                        <p className="text-white mb-3">Video recorded successfully!</p>
                        <button
                          onClick={() => startRecording(currentQuestion.id)}
                          className="btn btn-outline-light"
                        >
                          Re-record
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="d-flex justify-content-between">
                <button
                  onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
                  disabled={currentQuestionIndex === 0}
                  className="btn btn-outline-secondary"
                >
                  Previous
                </button>

                <button
                  onClick={() => handleSubmitAnswer(currentQuestion.id)}
                  disabled={
                    loading ||
                    (!answers[currentQuestion.id]?.text && !answers[currentQuestion.id]?.video)
                  }
                  className="btn btn-primary"
                >
                  {loading ? (
                    <>
                      <Loader className="spin me-2" size={20} />
                      Submitting...
                    </>
                  ) : currentQuestionIndex === questions.length - 1 ? (
                    <>
                      <Send size={20} className="me-2" />
                      Submit Interview
                    </>
                  ) : (
                    <>
                      Next Question
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Fallback for interview step when no questions
  if (step === 'interview' && !currentQuestion) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
        <div className="card shadow-lg" style={{ maxWidth: '600px', width: '100%' }}>
          <div className="card-body p-5 text-center">
            <AlertCircle size={60} className="text-warning mb-4" />
            <h3 className="mb-3">No Questions Available</h3>
            <p className="text-secondary-light mb-4">
              We're unable to load interview questions at this time.
            </p>
            <button
              onClick={() => {
                setStep('otp');
                setQuestions([]);
              }}
              className="btn btn-primary"
            >
              Return to Start
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Completion Screen
  if (step === 'completed') {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
        <div className="card shadow-lg" style={{ maxWidth: '600px', width: '100%' }}>
          <div className="card-body p-5 text-center">
            <CheckCircle size={80} className="text-success mb-4" />
            <h2 className="mb-3">Interview Completed!</h2>
            <p className="text-secondary-light mb-4">
              Thank you, <strong>{candidateName}</strong>, for completing the AI interview.
              Your responses have been submitted successfully.
            </p>

            <div className="alert alert-info mb-4">
              <p className="mb-2"><strong>What happens next?</strong></p>
              <ul className="list-unstyled mb-0 text-start">
                <li className="mb-2">✓ Our AI will analyze your responses</li>
                <li className="mb-2">✓ Our recruitment team will review your interview</li>
                <li className="mb-2">✓ We'll contact you within 3-5 business days</li>
              </ul>
            </div>

            <button
              onClick={() => navigate('/')}
              className="btn btn-primary"
            >
              Return to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center">
      <Loader className="spin" size={48} />
    </div>
  );
};

export default AIInterviewPortal;

