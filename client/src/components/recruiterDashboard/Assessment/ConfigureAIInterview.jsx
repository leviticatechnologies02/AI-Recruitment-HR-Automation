import React, { useState } from 'react';
import { Plus, Trash2, Save, Clock, BarChart3, CheckCircle } from 'lucide-react';

const ConfigureAIInterview = () => {
  const [interviewType, setInterviewType] = useState('video');
  const [questions, setQuestions] = useState([{ id: 1, text: '', points: 10 }]);
  const [timeLimit, setTimeLimit] = useState(30);
  const [difficulty, setDifficulty] = useState('medium');
  const [templateName, setTemplateName] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const questionBank = [
    "Tell me about yourself and your experience",
    "Why are you interested in this position?",
    "What are your greatest strengths?",
    "Describe a challenging project you worked on",
    "Where do you see yourself in 5 years?"
  ];

  const addQuestion = () => {
    setQuestions([...questions, { id: Date.now(), text: '', points: 10 }]);
  };

  const removeQuestion = (id) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  const updateQuestion = (id, field, value) => {
    setQuestions(questions.map(q => 
      q.id === id ? { ...q, [field]: value } : q
    ));
  };

  const loadFromBank = (questionText, id) => {
    updateQuestion(id, 'text', questionText);
  };

  const handleSaveTemplate = async () => {
    if (!templateName || questions.some(q => !q.text)) {
      return;
    }

    setIsSaving(true);
    
    try {
      const template = {
        name: templateName,
        type: interviewType,
        questions,
        timeLimit,
        difficulty
      };
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Saving template:', template);
      
      // Show success state
      setSaveSuccess(true);
      setIsSaving(false);
      
      // Reset success state after 3 seconds
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
      
    } catch (error) {
      console.error('Error saving template:', error);
      setIsSaving(false);
    }
  };

  return (
    <div className="container-fluid">
      {/* Header */}
      <div className="card border shadow-none mb-4 mt-3">
        <div className="card-body">
          <h5 className="mb-1">Configure AI Interview</h5>
          <p className="text-muted mb-0">Set up your interview template with questions, time limits, and difficulty settings</p>
        </div>
      </div>

      {/* Template Name */}
      <div className="card border shadow-none mb-4">
        <div className="card-body">
          <label className="form-label fw-bold fs-6">Template Name</label>
          <input
            type="text"
            className="form-control"
            value={templateName}
            onChange={(e) => setTemplateName(e.target.value)}
            placeholder="e.g., Senior Developer Interview"
          />
        </div>
      </div>

      {/* Interview Type Selection */}
      <div className="card border shadow-none mb-4">
        <div className="card-body">
          <h5 className="mb-3">Interview Type</h5>
          <div className="row g-3">
            {['video', 'text', 'mcq'].map((type) => (
              <div key={type} className="col-md-4">
                <button
                  className={`btn w-100 p-3 border-2 ${
                    interviewType === type
                      ? 'border-primary bg-primary-subtle text-primary'
                      : 'border-secondary bg-light text-dark'
                  }`}
                  onClick={() => setInterviewType(type)}
                >
                  <div className="text-center">
                    <div className="fs-2 mb-2">
                      {type === 'video' && '🎥'}
                      {type === 'text' && '✍'}
                      {type === 'mcq' && '📝'}
                    </div>
                    <p className="fw-semibold mb-1 text-capitalize">{type}</p>
                    <p className="small mb-0 text-muted">
                      {type === 'video' && 'Video responses'}
                      {type === 'text' && 'Written answers'}
                      {type === 'mcq' && 'Multiple choice'}
                    </p>
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Questions Section */}
      <div className="card border shadow-none mb-4">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="mb-0">Questions</h5>
            <button
              className="btn btn-primary"
              onClick={addQuestion}
            >
              <Plus size={18} className="me-2" />
              Add Question
            </button>
          </div>

          <div className="d-flex flex-column gap-3">
            {questions.map((question, index) => (
              <div key={question.id} className="card border">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <label className="fw-bold">
                      Question {index + 1}
                    </label>
                    {questions.length > 1 && (
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => removeQuestion(question.id)}
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>

                  <textarea
                    className="form-control mb-3"
                    value={question.text}
                    onChange={(e) => updateQuestion(question.id, 'text', e.target.value)}
                    placeholder="Enter your question here..."
                    rows="3"
                  />

                  {/* Question Bank */}
                  <div className="accordion mb-3">
                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#bank-${question.id}`}>
                          Load from question bank
                        </button>
                      </h2>
                      <div id={`bank-${question.id}`} className="accordion-collapse collapse">
                        <div className="accordion-body p-0">
                          <div className="list-group list-group-flush">
                            {questionBank.map((q, i) => (
                              <button
                                key={i}
                                className="list-group-item list-group-item-action border-0"
                                onClick={() => loadFromBank(q, question.id)}
                              >
                                {q}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Points for MCQ */}
                  {interviewType === 'mcq' && (
                    <div className="d-flex align-items-center gap-2">
                      <label className="small text-muted">Points:</label>
                      <input
                        type="number"
                        className="form-control"
                        style={{width: '80px'}}
                        value={question.points}
                        onChange={(e) => updateQuestion(question.id, 'points', parseInt(e.target.value))}
                        min="1"
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Settings Section */}
      <div className="card border shadow-none mb-4">
        <div className="card-body">
          <h5 className="mb-3">Interview Settings</h5>
          
          <div className="row g-4">
            {/* Time Limit */}
            <div className="col-md-6">
              <label className="form-label d-flex align-items-center gap-2">
                <Clock size={18} />
                Time Limit (minutes)
              </label>
              <input
                type="number"
                className="form-control"
                value={timeLimit}
                onChange={(e) => setTimeLimit(parseInt(e.target.value))}
                min="5"
                max="180"
              />
              <p className="small text-muted mt-1">
                Total time allowed for the interview
              </p>
            </div>

            {/* Difficulty */}
            <div className="col-md-6">
              <label className="form-label d-flex align-items-center gap-2">
                <BarChart3 size={18} />
                Difficulty Level
              </label>
              <select
                className="form-select"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
                <option value="expert">Expert</option>
              </select>
              <p className="small text-muted mt-1">
                Adjust AI evaluation criteria
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="card border shadow-none">
        <div className="card-body">
          {/* Success Message */}
          {saveSuccess && (
            <div className="alert alert-success d-flex align-items-center mb-3" role="alert">
              <CheckCircle size={20} className="me-2" />
              <div>
                <strong>Success!</strong> Interview template saved successfully.
              </div>
            </div>
          )}

          <button
            className={`btn py-3 ${
              saveSuccess 
                ? 'btn-success' 
                : isSaving 
                  ? 'btn-secondary' 
                  : 'btn-primary'
            }`}
            onClick={handleSaveTemplate}
            disabled={!templateName || questions.some(q => !q.text) || isSaving}
            style={{marginLeft:"370px"}}
          >
            {isSaving ? (
              <>
                <div className="spinner-border spinner-border-sm me-2" role="status">
                  <span className="visually-hidden">Saving...</span>
                </div>
                Saving...
              </>
            ) : saveSuccess ? (
              <>
                <CheckCircle size={20} className="me-2" />
                Saved Successfully!
              </>
            ) : (
              <>
                <Save size={20} className="me-2" />
                Save Interview Template
              </>
            )}
          </button>
          
          {(!templateName || questions.some(q => !q.text)) && !saveSuccess && (
            <p className="small text-danger text-center mt-2">
              Please fill in template name and all questions
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfigureAIInterview;