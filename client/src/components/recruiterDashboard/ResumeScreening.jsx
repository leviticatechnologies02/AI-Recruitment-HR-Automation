import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  Upload, 
  FileText, 
  CheckCircle, 
  XCircle, 
  Mail,
  User,
  Briefcase,
  TrendingUp,
  AlertCircle,
  Eye,
  RefreshCw
} from 'lucide-react';
import { Icon } from '@iconify/react/dist/iconify.js';
import { BASE_URL } from '../../config/api.config';

const ResumeScreening = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.state?.tab || 'upload');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [loadingCandidates, setLoadingCandidates] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    role: '',
    experienceLevel: 'fresher'
  });
  const [errors, setErrors] = useState({});
  const [sendingEmail, setSendingEmail] = useState(false);

  // Fetch AI-screened candidates
  const fetchCandidates = async () => {
    setLoadingCandidates(true);
    try {
      const response = await fetch(`${BASE_URL}/api/resume/candidates`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setCandidates(data);
      } else {
        console.error('Failed to fetch candidates');
      }
    } catch (error) {
      console.error('Error fetching candidates:', error);
    } finally {
      setLoadingCandidates(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'candidates') {
      fetchCandidates();
    }
  }, [activeTab]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        setErrors({ file: 'Only PDF and DOCX files are allowed' });
        return;
      }
      setSelectedFile(file);
      setErrors({});
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!selectedFile) newErrors.file = 'Please select a resume file';
    if (!formData.role.trim()) newErrors.role = 'Role is required';
    if (!formData.experienceLevel) newErrors.experienceLevel = 'Experience level is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Send assessment link via email
  const handleSendAssessmentEmail = async (candidate, testType) => {
    setSendingEmail(true);
    
    const testLinks = {
      aptitude: `${window.location.origin}/assessment/aptitude?name=${encodeURIComponent(candidate.candidate_name)}&email=${encodeURIComponent(candidate.candidate_email)}`,
      coding: `${window.location.origin}/assessment/coding?name=${encodeURIComponent(candidate.candidate_name)}&email=${encodeURIComponent(candidate.candidate_email)}`,
      communication: `${window.location.origin}/assessment/communication?name=${encodeURIComponent(candidate.candidate_name)}&email=${encodeURIComponent(candidate.candidate_email)}`
    };

    const testNames = {
      aptitude: 'Aptitude Test',
      coding: 'Coding Test',
      communication: 'Communication Test'
    };

    const emailBody = `
Dear ${candidate.candidate_name},

Congratulations! Based on your resume screening results, we would like to invite you to the next stage of our recruitment process.

Please complete the following assessment:

📝 ${testNames[testType]}
🔗 Assessment Link: ${testLinks[testType]}

Instructions:
1. Click on the link above to start your assessment
2. You will receive an OTP on your registered email for verification
3. Complete the test within the given time limit
4. Submit your responses before the deadline

${testType === 'aptitude' ? '⏱️ Time Limit: 30 minutes | 25 Multiple Choice Questions' : ''}
${testType === 'coding' ? '💻 You can write code in Python, C++, or Java' : ''}
${testType === 'communication' ? '📝 Includes Reading, Writing, and Listening sections' : ''}

If you have any questions, please don't hesitate to reach out.

Best regards,
Recruitment Team
    `.trim();

    try {
      // Using a simple email API - you can replace this with your backend email endpoint
      const response = await fetch(`${BASE_URL}/api/send-assessment-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to_email: candidate.candidate_email,
          to_name: candidate.candidate_name,
          subject: `Assessment Invitation - ${testNames[testType]}`,
          body: emailBody,
          test_type: testType,
          test_link: testLinks[testType]
        })
      });

      if (response.ok) {
        alert(`✅ ${testNames[testType]} link sent successfully to ${candidate.candidate_name}!`);
      } else {
        // Fallback: Copy to clipboard and show instructions
        navigator.clipboard.writeText(emailBody);
        alert(`⚠️ Email sending failed. The email content has been copied to your clipboard.\n\nPlease manually send it to: ${candidate.candidate_email}`);
      }
    } catch (error) {
      console.error('Error sending email:', error);
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(emailBody);
      alert(`⚠️ Email sending failed. The email content has been copied to your clipboard.\n\nPlease manually send it to: ${candidate.candidate_email}`);
    } finally {
      setSendingEmail(false);
    }
  };

  // Send all assessment links via email
  const handleSendAllAssessments = async (candidate) => {
    setSendingEmail(true);
    
    const testLinks = {
      aptitude: `${window.location.origin}/assessment/aptitude?name=${encodeURIComponent(candidate.candidate_name)}&email=${encodeURIComponent(candidate.candidate_email)}`,
      coding: `${window.location.origin}/assessment/coding?name=${encodeURIComponent(candidate.candidate_name)}&email=${encodeURIComponent(candidate.candidate_email)}`,
      communication: `${window.location.origin}/assessment/communication?name=${encodeURIComponent(candidate.candidate_name)}&email=${encodeURIComponent(candidate.candidate_email)}`
    };

    const emailBody = `
Dear ${candidate.candidate_name},

Congratulations! Based on your resume screening results (Score: ${candidate.score.toFixed(1)}%), we would like to invite you to complete our assessment tests.

Please complete ALL three assessments below:

📝 Aptitude Test
🔗 ${testLinks.aptitude}
⏱️ Duration: 30 minutes | 25 MCQs

💻 Coding Test
🔗 ${testLinks.coding}
💡 Languages: Python, C++, Java

📢 Communication Test
🔗 ${testLinks.communication}
📖 Sections: Reading, Writing, Listening

Instructions:
1. Click on each link to start the respective assessment
2. You will receive an OTP for verification
3. Complete all tests at your convenience
4. Each test must be completed in one sitting

We recommend completing the tests in the order listed above.

If you have any questions, please don't hesitate to reach out.

Best regards,
Recruitment Team
    `.trim();

    try {
      const response = await fetch(`${BASE_URL}/api/send-assessment-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to_email: candidate.candidate_email,
          to_name: candidate.candidate_name,
          subject: 'Assessment Invitation - All Tests',
          body: emailBody,
          test_type: 'all',
          test_links: testLinks
        })
      });

      if (response.ok) {
        alert(`✅ All assessment links sent successfully to ${candidate.candidate_name}!`);
      } else {
        navigator.clipboard.writeText(emailBody);
        alert(`⚠️ Email sending failed. The email content has been copied to your clipboard.\n\nPlease manually send it to: ${candidate.candidate_email}`);
      }
    } catch (error) {
      console.error('Error sending email:', error);
      navigator.clipboard.writeText(emailBody);
      alert(`⚠️ Email sending failed. The email content has been copied to your clipboard.\n\nPlease manually send it to: ${candidate.candidate_email}`);
    } finally {
      setSendingEmail(false);
    }
  };

  const handleUpload = async () => {
    if (!validateForm()) return;

    setIsUploading(true);
    setUploadResult(null);

    const formDataToSend = new FormData();
    formDataToSend.append('file', selectedFile);
    formDataToSend.append('role', formData.role);
    formDataToSend.append('experience_level', formData.experienceLevel);

    try {
      const response = await fetch(`${BASE_URL}/api/resume/process`, {
        method: 'POST',
        body: formDataToSend
      });

      if (response.ok) {
        const result = await response.json();
        setUploadResult(result);
        // Clear form
        setSelectedFile(null);
        setFormData({ role: '', experienceLevel: 'fresher' });
        // Reset file input
        document.getElementById('resume-file-input').value = '';
      } else {
        const errorData = await response.json();
        setUploadResult({
          status: 'error',
          message: errorData.detail || 'Failed to process resume'
        });
      }
    } catch (error) {
      console.error('Upload error:', error);
      setUploadResult({
        status: 'error',
        message: 'Network error. Please check if backend is running.'
      });
    } finally {
      setIsUploading(false);
    }
  };

  const StatCard = ({ title, value, icon: Icon, color }) => (
    <div className="stat-card">
      <div className="flex items-center justify-between">
        <div>
          <p className="stat-card-label">{title}</p>
          <p className="stat-card-value">{value}</p>
        </div>
        <div className={`stat-card-icon ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </div>
  );

  const renderUploadTab = () => (
    <div className="space-y-6">
      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          title="Total Screened"
          value={candidates.length}
          icon={FileText}
          color="bg-blue-500"
        />
        <StatCard
          title="Shortlisted"
          value={candidates.filter(c => c.score >= 40).length}
          icon={CheckCircle}
          color="bg-green-500"
        />
        <StatCard
          title="Avg Score"
          value={candidates.length > 0 ? 
            (candidates.reduce((acc, c) => acc + c.score, 0) / candidates.length).toFixed(1) : 
            '0'
          }
          icon={TrendingUp}
          color="bg-purple-500"
        />
      </div>

      {/* Upload Form */}
      <div className="card">
        <div className="card-header">
          <h6 className="mb-0">AI Resume Screening</h6>
          <p className="text-secondary-light text-sm mt-1">
            Upload a resume to automatically extract information, generate job description, and calculate match score
          </p>
        </div>
        <div className="card-body">
          <div className="space-y-4">
            {/* File Upload */}
            <div>
              <label className="form-label">Resume File *</label>
              <div className="file-upload-wrapper">
                <input
                  id="resume-file-input"
                  type="file"
                  accept=".pdf,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label
                  htmlFor="resume-file-input"
                  className="file-upload-label cursor-pointer"
                >
                  <Upload className="h-8 w-8 text-gray-400 mb-2" />
                  <span className="text-sm font-medium text-gray-700">
                    {selectedFile ? selectedFile.name : 'Click to upload PDF or DOCX'}
                  </span>
                  <span className="text-xs text-gray-500 mt-1">
                    Maximum file size: 10MB
                  </span>
                </label>
              </div>
              {errors.file && (
                <p className="text-danger-600 text-sm mt-1">{errors.file}</p>
              )}
            </div>

            {/* Role Input */}
            <div>
              <label className="form-label">Role / Position *</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g., Software Engineer, Data Analyst"
                value={formData.role}
                onChange={(e) => handleInputChange('role', e.target.value)}
              />
              {errors.role && (
                <p className="text-danger-600 text-sm mt-1">{errors.role}</p>
              )}
            </div>

            {/* Experience Level */}
            <div>
              <label className="form-label">Experience Level *</label>
              <select
                className="form-select"
                value={formData.experienceLevel}
                onChange={(e) => handleInputChange('experienceLevel', e.target.value)}
              >
                <option value="fresher">Fresher / Entry Level</option>
                <option value="junior">Junior (1-3 years)</option>
                <option value="mid">Mid-Level (3-5 years)</option>
                <option value="senior">Senior (5-10 years)</option>
                <option value="lead">Lead / Principal (10+ years)</option>
              </select>
              {errors.experienceLevel && (
                <p className="text-danger-600 text-sm mt-1">{errors.experienceLevel}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              onClick={handleUpload}
              disabled={isUploading}
              className="btn btn-primary w-full"
            >
              {isUploading ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Processing Resume...
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4 mr-2" />
                  Screen Resume with AI
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Upload Result */}
      {uploadResult && (
        <div className={`card ${uploadResult.status === 'error' ? 'border-danger-600' : uploadResult.status === 'shortlisted' ? 'border-success-600' : 'border-warning-600'}`}>
          <div className="card-body">
            <div className="flex items-start space-x-4">
              {uploadResult.status === 'error' ? (
                <XCircle className="h-8 w-8 text-danger-600 flex-shrink-0" />
              ) : uploadResult.status === 'shortlisted' ? (
                <CheckCircle className="h-8 w-8 text-success-600 flex-shrink-0" />
              ) : (
                <AlertCircle className="h-8 w-8 text-warning-600 flex-shrink-0" />
              )}
              <div className="flex-1">
                <h5 className="font-semibold mb-2">
                  {uploadResult.status === 'error' 
                    ? 'Processing Failed' 
                    : uploadResult.status === 'shortlisted' 
                    ? 'Candidate Shortlisted!' 
                    : 'Candidate Rejected'}
                </h5>
                
                {uploadResult.status === 'error' ? (
                  <p className="text-secondary-light">{uploadResult.message}</p>
                ) : (
                  <div className="space-y-3">
                    {/* Candidate Info */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-xs text-secondary-light">Name</p>
                        <p className="font-medium">{uploadResult.candidate?.name || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-xs text-secondary-light">Email</p>
                        <p className="font-medium">{uploadResult.candidate?.email || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-xs text-secondary-light">Role</p>
                        <p className="font-medium">{uploadResult.role}</p>
                      </div>
                      <div>
                        <p className="text-xs text-secondary-light">Experience</p>
                        <p className="font-medium capitalize">{uploadResult.experience_level}</p>
                      </div>
                    </div>

                    {/* Skills */}
                    {uploadResult.candidate?.skills && (
                      <div>
                        <p className="text-xs text-secondary-light mb-2">Skills</p>
                        <div className="flex flex-wrap gap-2">
                          {(Array.isArray(uploadResult.candidate.skills) 
                            ? uploadResult.candidate.skills 
                            : uploadResult.candidate.skills.split(',')
                          ).map((skill, idx) => (
                            <span key={idx} className="badge bg-primary-50 text-primary-600">
                              {skill.trim()}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Score */}
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Match Score</span>
                        <span className={`text-lg font-bold ${
                          uploadResult.score >= uploadResult.threshold 
                            ? 'text-success-600' 
                            : 'text-danger-600'
                        }`}>
                          {uploadResult.score.toFixed(1)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            uploadResult.score >= uploadResult.threshold 
                              ? 'bg-success-600' 
                              : 'bg-danger-600'
                          }`}
                          style={{ width: `${uploadResult.score}%` }}
                        />
                      </div>
                      <p className="text-xs text-secondary-light mt-2">
                        Threshold: {uploadResult.threshold}%
                      </p>
                    </div>

                    {/* Email Status */}
                    <div className="flex items-center space-x-2 text-sm">
                      <Mail className="h-4 w-4" />
                      <span>
                        Email Status: 
                        <span className={`ml-1 font-medium ${
                          uploadResult.email_status === 'yes' 
                            ? 'text-success-600' 
                            : uploadResult.email_status === 'skipped'
                            ? 'text-secondary-light'
                            : 'text-danger-600'
                        }`}>
                          {uploadResult.email_status === 'yes' 
                            ? 'Sent Successfully' 
                            : uploadResult.email_status === 'skipped'
                            ? 'Skipped (Not Shortlisted)'
                            : 'Failed'}
                        </span>
                      </span>
                    </div>

                    {/* JD Preview */}
                    {uploadResult.jd_preview && (
                      <div>
                        <p className="text-xs text-secondary-light mb-2">Generated Job Description (Preview)</p>
                        <div className="bg-gray-50 p-3 rounded text-sm text-secondary-light">
                          {uploadResult.jd_preview}...
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderCandidatesTab = () => (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h5 className="mb-1">AI-Screened Candidates</h5>
          <p className="text-sm text-secondary-light">
            View all candidates processed through AI resume screening
          </p>
        </div>
        <button
          onClick={fetchCandidates}
          className="btn btn-outline-primary"
          disabled={loadingCandidates}
        >
          {loadingCandidates ? (
            <RefreshCw className="h-4 w-4 animate-spin" />
          ) : (
            <>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </>
          )}
        </button>
      </div>

      {/* Candidates List */}
      {loadingCandidates ? (
        <div className="flex justify-center items-center py-12">
          <RefreshCw className="h-8 w-8 animate-spin text-primary-600" />
        </div>
      ) : candidates.length === 0 ? (
        <div className="card">
          <div className="card-body text-center py-12">
            <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h6 className="mb-2">No Candidates Yet</h6>
            <p className="text-secondary-light">
              Start screening resumes to see candidates here
            </p>
          </div>
        </div>
      ) : (
        <div className="card">
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table bordered-table mb-0">
                <thead>
                  <tr>
                    <th>Candidate</th>
                    <th>Role</th>
                    <th>Experience</th>
                    <th>Skills</th>
                    <th>Score</th>
                    <th>Email Status</th>
                    <th>Screened On</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {candidates.map((candidate) => (
                    <tr key={candidate.id}>
                      <td>
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                            <User className="h-5 w-5 text-primary-600" />
                          </div>
                          <div>
                            <p className="font-medium">{candidate.candidate_name || 'N/A'}</p>
                            <p className="text-sm text-secondary-light">{candidate.candidate_email || 'N/A'}</p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center">
                          <Briefcase className="h-4 w-4 text-secondary-light mr-2" />
                          {candidate.role}
                        </div>
                      </td>
                      <td>
                        <span className="badge bg-info-50 text-info-600 capitalize">
                          {candidate.experience_level}
                        </span>
                      </td>
                      <td>
                        <div className="flex flex-wrap gap-1">
                          {candidate.candidate_skills?.split(',').slice(0, 3).map((skill, idx) => (
                            <span key={idx} className="badge bg-gray-100 text-gray-700 text-xs">
                              {skill.trim()}
                            </span>
                          ))}
                          {candidate.candidate_skills?.split(',').length > 3 && (
                            <span className="badge bg-gray-100 text-gray-700 text-xs">
                              +{candidate.candidate_skills.split(',').length - 3}
                            </span>
                          )}
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center space-x-2">
                          <span className={`font-semibold ${
                            candidate.score >= 40 ? 'text-success-600' : 'text-danger-600'
                          }`}>
                            {candidate.score.toFixed(1)}%
                          </span>
                          {candidate.score >= 40 ? (
                            <CheckCircle className="h-4 w-4 text-success-600" />
                          ) : (
                            <XCircle className="h-4 w-4 text-danger-600" />
                          )}
                        </div>
                      </td>
                      <td>
                        <span className={`badge ${
                          candidate.email_sent === 'yes' 
                            ? 'bg-success-50 text-success-600' 
                            : candidate.email_sent === 'no'
                            ? 'bg-gray-100 text-gray-700'
                            : 'bg-danger-50 text-danger-600'
                        }`}>
                          {candidate.email_sent === 'yes' 
                            ? 'Sent' 
                            : candidate.email_sent === 'no'
                            ? 'Not Sent'
                            : 'Failed'}
                        </span>
                      </td>
                      <td className="text-sm text-secondary-light">
                        {new Date(candidate.created_at).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </td>
                      <td>
                        {candidate.score >= 40 && (
                          <div className="dropdown">
                            <button
                              className="btn btn-sm btn-primary dropdown-toggle"
                              type="button"
                              data-bs-toggle="dropdown"
                              disabled={sendingEmail}
                            >
                              {sendingEmail ? (
                                <>
                                  <RefreshCw size={12} className="spin me-1" />
                                  Sending...
                                </>
                              ) : (
                                'Send Test'
                              )}
                            </button>
                            <ul className="dropdown-menu">
                              <li className="dropdown-header">📧 Send via Email</li>
                              <li>
                                <button
                                  className="dropdown-item"
                                  onClick={() => handleSendAssessmentEmail(candidate, 'aptitude')}
                                  disabled={sendingEmail}
                                >
                                  📝 Email Aptitude Test
                                </button>
                              </li>
                              <li>
                                <button
                                  className="dropdown-item"
                                  onClick={() => handleSendAssessmentEmail(candidate, 'coding')}
                                  disabled={sendingEmail}
                                >
                                  💻 Email Coding Test
                                </button>
                              </li>
                              <li>
                                <button
                                  className="dropdown-item"
                                  onClick={() => handleSendAssessmentEmail(candidate, 'communication')}
                                  disabled={sendingEmail}
                                >
                                  💬 Email Communication Test
                                </button>
                              </li>
                              <li>
                                <button
                                  className="dropdown-item fw-bold text-primary"
                                  onClick={() => handleSendAllAssessments(candidate)}
                                  disabled={sendingEmail}
                                >
                                  📧 Email All Tests
                                </button>
                              </li>
                              <li><hr className="dropdown-divider" /></li>
                              <li className="dropdown-header">🔗 Open Links</li>
                              <li>
                                <a
                                  className="dropdown-item"
                                  href={`/assessment/aptitude?name=${encodeURIComponent(candidate.candidate_name)}&email=${encodeURIComponent(candidate.candidate_email)}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  📝 Open Aptitude Test
                                </a>
                              </li>
                              <li>
                                <a
                                  className="dropdown-item"
                                  href={`/assessment/coding?name=${encodeURIComponent(candidate.candidate_name)}&email=${encodeURIComponent(candidate.candidate_email)}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  💻 Open Coding Test
                                </a>
                              </li>
                              <li>
                                <a
                                  className="dropdown-item"
                                  href={`/assessment/communication?name=${encodeURIComponent(candidate.candidate_name)}&email=${encodeURIComponent(candidate.candidate_email)}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  💬 Open Communication Test
                                </a>
                              </li>
                              <li><hr className="dropdown-divider" /></li>
                              <li>
                                <button
                                  className="dropdown-item"
                                  onClick={() => {
                                    const testLinks = `
Aptitude Test: ${window.location.origin}/assessment/aptitude?name=${encodeURIComponent(candidate.candidate_name)}&email=${encodeURIComponent(candidate.candidate_email)}

Coding Test: ${window.location.origin}/assessment/coding?name=${encodeURIComponent(candidate.candidate_name)}&email=${encodeURIComponent(candidate.candidate_email)}

Communication Test: ${window.location.origin}/assessment/communication?name=${encodeURIComponent(candidate.candidate_name)}&email=${encodeURIComponent(candidate.candidate_email)}
                                    `.trim();
                                    navigator.clipboard.writeText(testLinks);
                                    alert('✅ Assessment links copied to clipboard!');
                                  }}
                                >
                                  📋 Copy All Links
                                </button>
                              </li>
                            </ul>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="dashboard-main-body">
      {/* Page Header */}
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-24">
        <h6 className="fw-semibold mb-0">AI Resume Screening</h6>
        <ul className="d-flex align-items-center gap-2">
          <li className="fw-medium">
            <a href="#" className="d-flex align-items-center gap-1 hover-text-primary">
              <Icon icon="solar:home-smile-angle-outline" className="icon text-lg" />
              Dashboard
            </a>
          </li>
          <li>-</li>
          <li className="fw-medium">Resume Screening</li>
        </ul>
      </div>

      {/* Tab Navigation */}
      <div className="card mb-24">
        <div className="card-body p-0">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('upload')}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === 'upload'
                  ? 'text-primary-600 border-b-2 border-primary-600'
                  : 'text-secondary-light hover:text-primary-600'
              }`}
            >
              <Upload className="h-4 w-4 inline mr-2" />
              Screen Resume
            </button>
            <button
              onClick={() => setActiveTab('candidates')}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === 'candidates'
                  ? 'text-primary-600 border-b-2 border-primary-600'
                  : 'text-secondary-light hover:text-primary-600'
              }`}
            >
              <Eye className="h-4 w-4 inline mr-2" />
              View Candidates ({candidates.length})
            </button>
          </div>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'upload' ? renderUploadTab() : renderCandidatesTab()}
    </div>
  );
};

export default ResumeScreening;

