import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  X, 
  ChevronRight, 
  ChevronLeft, 
  Flag, 
  Save, 
  CheckCircle,
  AlertTriangle,
  Play,
  Upload,
  Mic,
  Video,
  Code,
  FileText,
  User,
  Bell,
  Briefcase,
  Users,
  BarChart3,
  Settings,
  Eye,
  ArrowLeft
} from 'lucide-react';

const AssessmentRunner = () => {
  const [currentStep, setCurrentStep] = useState('instructions'); // instructions, test, completed
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(45 * 60); // 45 minutes in seconds
  const [answers, setAnswers] = useState({});
  const [flaggedQuestions, setFlaggedQuestions] = useState(new Set());
  const [showExitModal, setShowExitModal] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  // Sample assessment data
  const assessment = {
    name: 'JavaScript Fundamentals',
    type: 'Technical',
    duration: '45 minutes',
    totalQuestions: 15,
    instructions: [
      'You have 45 minutes to complete this assessment',
      'Each question must be answered before moving to the next',
      'You can navigate between questions using the sidebar',
      'Use the "Mark for Review" feature to flag questions you want to revisit',
      'Do not switch tabs or leave this page during the assessment',
      'Your progress is automatically saved'
    ]
  };

  const questions = [
    {
      id: 1,
      type: 'mcq',
      question: 'What is the correct way to declare a variable in JavaScript?',
      options: [
        'var myVariable = "Hello";',
        'variable myVariable = "Hello";',
        'v myVariable = "Hello";',
        'declare myVariable = "Hello";'
      ]
    },
    {
      id: 2,
      type: 'mcq-multiple',
      question: 'Which of the following are valid JavaScript data types? (Select all that apply)',
      options: [
        'String',
        'Boolean',
        'Integer',
        'Object',
        'Undefined'
      ]
    },
    {
      id: 3,
      type: 'coding',
      question: 'Write a function that returns the sum of two numbers:',
      placeholder: 'function add(a, b) {\n  // Your code here\n}'
    },
    {
      id: 4,
      type: 'text',
      question: 'Explain the difference between "==" and "===" in JavaScript:',
      placeholder: 'Enter your explanation here...'
    },
    {
      id: 5,
      type: 'video',
      question: 'Record a 2-minute video explaining your approach to debugging JavaScript code:',
      maxDuration: '2 minutes'
    }
  ];

  // Timer effect
  useEffect(() => {
    if (currentStep === 'test' && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            handleSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [currentStep, timeRemaining]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleAnswer = (questionId, answer) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const toggleFlag = (questionId) => {
    setFlaggedQuestions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(questionId)) {
        newSet.delete(questionId);
      } else {
        newSet.add(questionId);
      }
      return newSet;
    });
  };

  const getQuestionStatus = (questionId) => {
    if (answers[questionId]) return 'answered';
    if (flaggedQuestions.has(questionId)) return 'flagged';
    return 'not-answered';
  };

  const handleSubmit = () => {
    setCurrentStep('completed');
  };

  const getUnansweredCount = () => {
    return questions.filter(q => !answers[q.id]).length;
  };

  // Instructions Page
  const InstructionsPage = () => (
    <div className="container-fluid p-3 d-flex align-items-center justify-content-center">
      <div className="card shadow-sm" style={{ maxWidth: 800, width: '100%' }}>
        <div className="card-body">
          <div className="text-center mb-3">
            <div className="rounded-circle bg-primary-subtle d-inline-flex align-items-center justify-content-center mb-2" style={{ width: 64, height: 64 }}>
              <FileText size={28} className="text-primary" />
            </div>
            <h4 className="mb-1">Assessment Instructions</h4>
            <p className="text-muted mb-0">Please read the following instructions carefully before starting</p>
          </div>

        {/* Assessment Details */}
        <div className="alert alert-primary" role="alert">
          <h6 className="mb-2">{assessment.name}</h6>
          <div className="row g-3 small">
            <div className="col-12 col-md-4">
              <span className="fw-medium">Type:</span>
              <div className="text-muted">{assessment.type}</div>
            </div>
            <div className="col-12 col-md-4">
              <span className="fw-medium">Duration:</span>
              <div className="text-muted">{assessment.duration}</div>
            </div>
            <div className="col-12 col-md-4">
              <span className="fw-medium">Questions:</span>
              <div className="text-muted">{assessment.totalQuestions} questions</div>
            </div>
          </div>
        </div>

        {/* Instructions List */}
        <div className="mb-3">
          <h6 className="mb-2">Instructions:</h6>
          <ul className="list-unstyled m-0">
            {assessment.instructions.map((instruction, index) => (
              <li key={index} className="d-flex align-items-start gap-2 mb-2">
                <span className="badge bg-primary rounded-circle d-inline-flex align-items-center justify-content-center" style={{ width: 24, height: 24 }}>{index + 1}</span>
                <p className="mb-0">{instruction}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Start Button */}
        <div className="text-center">
          <button
            onClick={() => setCurrentStep('test')}
            type="button"
            className="btn btn-primary d-inline-flex align-items-center"
          >
            <Play size={18} className="me-2" />
            <span>Start Assessment</span>
          </button>
        </div>
        </div>
      </div>
    </div>
  );

  // Question Component
  const QuestionComponent = ({ question, answer, onAnswer }) => {
    switch (question.type) {
      case 'mcq':
        return (
          <div className="space-y-4">
            {question.options.map((option, index) => (
              <label key={index} className="d-flex align-items-center gap-2 p-2 border rounded cursor-pointer">
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value={option}
                  checked={answer === option}
                  onChange={(e) => onAnswer(question.id, e.target.value)}
                  className="form-check-input"
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        );

      case 'mcq-multiple':
        const selectedOptions = answer || [];
        return (
          <div className="space-y-4">
            {question.options.map((option, index) => (
              <label key={index} className="d-flex align-items-center gap-2 p-2 border rounded cursor-pointer">
                <input
                  type="checkbox"
                  value={option}
                  checked={selectedOptions.includes(option)}
                  onChange={(e) => {
                    const newSelected = e.target.checked
                      ? [...selectedOptions, option]
                      : selectedOptions.filter(opt => opt !== option);
                    onAnswer(question.id, newSelected);
                  }}
                  className="form-check-input"
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        );

      case 'coding':
        return (
          <div className="border border-gray-300 rounded-lg overflow-hidden">
            <div className="bg-gray-800 text-white p-3 flex items-center space-x-2">
              <Code className="w-4 h-4" />
              <span className="text-sm">JavaScript</span>
            </div>
            <textarea
              value={answer || ''}
              onChange={(e) => onAnswer(question.id, e.target.value)}
              placeholder={question.placeholder}
              className="w-full h-64 p-4 font-mono text-sm bg-gray-900 text-green-400 border-none resize-none focus:ring-0"
              style={{ fontFamily: 'Monaco, Consolas, monospace' }}
            />
          </div>
        );

      case 'text':
        return (
          <textarea
            value={answer || ''}
            onChange={(e) => onAnswer(question.id, e.target.value)}
            placeholder={question.placeholder}
            rows={6}
            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
        );

      case 'video':
        return (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <Video className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h4 className="text-lg font-medium text-gray-900 mb-2">Record Video Response</h4>
            <p className="text-gray-600 mb-4">Maximum duration: {question.maxDuration}</p>
            <div className="space-x-4">
              <button className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                <Mic className="w-4 h-4 mr-2" />
                Start Recording
              </button>
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                <Upload className="w-4 h-4 mr-2" />
                Upload File
              </button>
            </div>
          </div>
        );

      default:
        return <div>Unsupported question type</div>;
    }
  };

  // Test Runner
  const TestRunner = () => (
    <div className="container-fluid p-0">
      {/* Preview Mode Banner */}
      {isPreviewMode && (
        <div className="alert alert-warning d-flex align-items-center justify-content-between rounded-0 mb-0" role="alert">
          <div className="d-flex align-items-center gap-2">
            <Eye size={16} />
            <span className="fw-semibold">Preview Mode</span>
            <span>- This is how candidates will see the assessment</span>
          </div>
          <button type="button" className="btn btn-link p-0" onClick={() => setIsPreviewMode(false)}>
            <X size={16} />
          </button>
        </div>
      )}

      {/* Recruiter Sidebar (Preview Mode) */}
      {isPreviewMode && (
        <div className="position-fixed top-0 start-0 h-100" style={{ width: 256, zIndex: 10, background: '#fff', boxShadow: '0 .125rem .25rem rgba(0,0,0,.075)' }}>
          <div className="p-3 border-bottom">
            <h6 className="mb-0">TalentFlow</h6>
          </div>
          <nav className="p-2">
            <div className="d-grid gap-1">
              <a href="#" className="btn btn-light text-start d-flex align-items-center gap-2"><Briefcase size={16} /> Jobs</a>
              <a href="#" className="btn btn-light text-start d-flex align-items-center gap-2"><Users size={16} /> Candidates</a>
              <a href="#" className="btn btn-light text-start d-flex align-items-center gap-2"><BarChart3 size={16} /> Pipeline</a>
              <a href="#" className="btn btn-light text-start d-flex align-items-center gap-2"><BarChart3 size={16} /> Analytics</a>
              <a href="#" className="btn btn-primary text-start d-flex align-items-center gap-2"><FileText size={16} /> Assessments</a>
              <a href="#" className="btn btn-light text-start d-flex align-items-center gap-2"><Settings size={16} /> Settings</a>
            </div>
          </nav>
        </div>
      )}

      <div className={isPreviewMode ? 'ms-0' : ''} style={isPreviewMode ? { marginLeft: 256 } : undefined}>
        {/* Recruiter Topbar (Preview Mode) */}
        {isPreviewMode && (
          <div className="border-bottom bg-white p-3">
            <div className="d-flex align-items-center justify-content-between">
              <button type="button" className="btn btn-link d-inline-flex align-items-center p-0">
                <ArrowLeft size={16} className="me-2" /> Back to Assessments
              </button>
              <div className="d-flex align-items-center gap-3">
                <Bell size={18} className="text-muted" />
                <div className="d-inline-flex align-items-center gap-2">
                  <div className="rounded-circle bg-primary d-inline-flex align-items-center justify-content-center" style={{ width: 32, height: 32 }}>
                    <User size={14} className="text-white" />
                  </div>
                  <span className="small text-muted">John Recruiter</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Test Header */}
        <div className="border-bottom bg-white p-3">
          <div className="d-flex align-items-center justify-content-between">
            <h6 className="mb-0">{assessment.name}</h6>
            <div className="d-flex align-items-center gap-3">
              <div className="d-inline-flex align-items-center text-danger">
                <Clock size={18} className="me-2" />
                <span className="font-monospace fw-semibold">{formatTime(timeRemaining)}</span>
              </div>
              <button type="button" onClick={() => setShowExitModal(true)} className="btn btn-outline-danger btn-sm d-inline-flex align-items-center">
                <X size={16} className="me-1" /> Exit
              </button>
            </div>
          </div>
        </div>

        <div className="d-flex">
          {/* Question Navigation Sidebar */}
          <div className="bg-white" style={{ width: 256, height: '100vh', overflowY: 'auto', boxShadow: '0 .125rem .25rem rgba(0,0,0,.075)' }}>
            <div className="p-3 border-bottom">
              <h6 className="mb-0">Questions</h6>
              <small className="text-muted">{Object.keys(answers).length} of {questions.length} answered</small>
            </div>
            <div className="p-2">
              {questions.map((question, index) => {
                const status = getQuestionStatus(question.id);
                return (
                  <button
                    key={question.id}
                    onClick={() => setCurrentQuestion(index)}
                    className={`btn w-100 d-flex align-items-center justify-content-between text-start mb-2 ${
                      currentQuestion === index
                        ? 'btn-primary'
                        : status === 'answered'
                        ? 'btn-success'
                        : status === 'flagged'
                        ? 'btn-warning'
                        : 'btn-light'
                    }`}
                  >
                    <span>Question {index + 1}</span>
                    {status === 'answered' && <CheckCircle size={14} />}
                    {status === 'flagged' && <Flag size={14} />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main Question Area */}
          <div className="flex-grow p-4">
            <div style={{ maxWidth: 900 }}>
              {/* Question Counter */}
              <div className="mb-3">
                <span className="small text-muted">
                  Question {currentQuestion + 1} of {questions.length}
                </span>
              </div>

              {/* Question */}
              <div className="mb-3">
                <h6 className="mb-3">
                  {questions[currentQuestion]?.question}
                </h6>
                <QuestionComponent
                  question={questions[currentQuestion]}
                  answer={answers[questions[currentQuestion]?.id]}
                  onAnswer={handleAnswer}
                />
              </div>

              {/* Action Buttons */}
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex gap-2">
                  <button
                    onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                    disabled={currentQuestion === 0}
                    className="btn btn-outline-secondary btn-sm d-inline-flex align-items-center"
                  >
                    <ChevronLeft size={14} className="me-1" />
                    <span>Previous</span>
                  </button>
                  <button
                    onClick={() => toggleFlag(questions[currentQuestion]?.id)}
                    className={`btn btn-sm d-inline-flex align-items-center ${
                      flaggedQuestions.has(questions[currentQuestion]?.id) ? 'btn-warning' : 'btn-outline-secondary'
                    }`}
                  >
                    <Flag size={14} className="me-1" />
                    <span>Mark for Review</span>
                  </button>
                </div>

                <div className="d-flex gap-2">
                  {currentQuestion < questions.length - 1 ? (
                    <button
                      onClick={() => setCurrentQuestion(currentQuestion + 1)}
                      className="btn btn-primary d-inline-flex align-items-center"
                    >
                      <Save size={14} className="me-1" />
                      <span>Save & Next</span>
                      <ChevronRight size={14} className="ms-1" />
                    </button>
                  ) : (
                    <button
                      onClick={() => setShowSubmitModal(true)}
                      className="btn btn-success d-inline-flex align-items-center"
                    >
                      <CheckCircle size={14} className="me-1" />
                      <span>Submit Assessment</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Exit Confirmation Modal */}
      {showExitModal && (
        <>
          <div className="modal d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title d-inline-flex align-items-center"><AlertTriangle size={18} className="me-2 text-danger" /> Exit Assessment?</h5>
                  <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowExitModal(false)}></button>
                </div>
                <div className="modal-body">
                  <p className="mb-0">Are you sure you want to exit? Your progress will be saved, but you may not be able to resume.</p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-light" onClick={() => setShowExitModal(false)}>Continue Test</button>
                  <button type="button" className="btn btn-danger" onClick={() => setCurrentStep('completed')}>Exit Anyway</button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </>
      )}

      {/* Submit Confirmation Modal */}
      {showSubmitModal && (
        <>
          <div className="modal d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title d-inline-flex align-items-center"><CheckCircle size={18} className="me-2 text-primary" /> Submit Assessment?</h5>
                  <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowSubmitModal(false)}></button>
                </div>
                <div className="modal-body">
                  {getUnansweredCount() > 0 ? (
                    <p className="mb-0">You have {getUnansweredCount()} unanswered question(s). Are you sure you want to submit?</p>
                  ) : (
                    <p className="mb-0">All questions have been answered. Ready to submit your assessment?</p>
                  )}
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-light" onClick={() => setShowSubmitModal(false)}>Go Back</button>
                  <button type="button" className="btn btn-primary" onClick={handleSubmit}>Submit Anyway</button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </>
      )}
    </div>
  );

  // Completion Page
  const CompletionPage = () => (
    <div className="container-fluid p-3 d-flex align-items-center justify-content-center">
      <div className="card shadow-sm text-center" style={{ maxWidth: 800, width: '100%' }}>
        <div className="card-body">
          <div className="rounded-circle bg-success-subtle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: 80, height: 80 }}>
            <CheckCircle size={36} className="text-success" />
          </div>
          <h4 className="mb-2">Assessment Submitted Successfully!</h4>
          <p className="text-muted">Thank you for completing the {assessment.name} assessment.</p>

          <div className="alert alert-primary mt-3" role="alert">
            <h6 className="mb-1">What happens next?</h6>
            <p className="mb-0">The recruiter will review your results shortly and get back to you with the next steps in the hiring process.</p>
          </div>

          <div className="d-grid gap-2 mt-3">
            <button type="button" className="btn btn-primary">Return to Dashboard</button>
            {isPreviewMode && (
              <button
                type="button"
                onClick={() => {
                  setCurrentStep('instructions');
                  setCurrentQuestion(0);
                  setTimeRemaining(45 * 60);
                  setAnswers({});
                  setFlaggedQuestions(new Set());
                }}
                className="btn btn-outline-secondary"
              >
                Preview Again
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  // Mode Toggle (for demo purposes)
  const ModeToggle = () => (
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={() => setIsPreviewMode(!isPreviewMode)}
        className={`px-4 py-2 rounded-lg text-sm font-medium ${
          isPreviewMode 
            ? 'bg-orange-600 text-white' 
            : 'bg-gray-600 text-white'
        }`}
      >
        {isPreviewMode ? 'Recruiter Preview' : 'Candidate View'}
      </button>
    </div>
  );

  // Render based on current step
  return (
    <div>
      <ModeToggle />
      {currentStep === 'instructions' && <InstructionsPage />}
      {currentStep === 'test' && <TestRunner />}
      {currentStep === 'completed' && <CompletionPage />}
    </div>
  );
};

export default AssessmentRunner;