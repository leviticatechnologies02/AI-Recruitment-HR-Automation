import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, Eye, Save, Send, ArrowLeft, MapPin, DollarSign, Building2, Clock, CheckCircle, AlertCircle } from 'lucide-react';

const CreateJob = () => {
  const [formData, setFormData] = useState({
    title: '',
    department: '',
    employmentType: '',
    location: '',
    isRemote: false,
    description: '',
    responsibilities: '',
    requirements: '',
    salaryMin: '',
    salaryMax: '',
    currency: 'USD',
    benefits: [],
    skills: [],
    expiryDate: '',
    referenceId: '',
    jdFile: null
  });

  const [errors, setErrors] = useState({});
  const [showPreview, setShowPreview] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isDraft, setIsDraft] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState(null);

  const departments = ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance', 'Operations', 'Customer Success', 'Design', 'Product'];
  const employmentTypes = ['Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship'];
  const currencies = ['USD', 'EUR', 'GBP', 'CAD', 'AUD'];
  const benefitOptions = ['Health Insurance', 'Dental Insurance', 'Vision Insurance', '401k Match', 'Remote Work', 'Flexible Hours', 'PTO', 'Stock Options', 'Gym Membership', 'Learning Budget'];
  const skillSuggestions = ['JavaScript', 'React', 'Node.js', 'Python', 'AWS', 'Docker', 'Project Management', 'Leadership', 'Communication', 'Analytics'];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: null }));
  };

  const handleSkillAdd = (skill) => {
    if (!formData.skills.includes(skill)) {
      setFormData(prev => ({ ...prev, skills: [...prev.skills, skill] }));
    }
  };

  const handleSkillRemove = (skill) => {
    setFormData(prev => ({ ...prev, skills: prev.skills.filter(s => s !== skill) }));
  };

  const handleBenefitToggle = (benefit) => {
    setFormData(prev => ({
      ...prev,
      benefits: prev.benefits.includes(benefit)
        ? prev.benefits.filter(b => b !== benefit)
        : [...prev.benefits, benefit]
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Job title is required';
    if (!formData.department) newErrors.department = 'Department is required';
    if (!formData.employmentType) newErrors.employmentType = 'Employment type is required';
    if (!formData.location.trim() && !formData.isRemote) newErrors.location = 'Location is required';
    if (!formData.description.trim()) newErrors.description = 'Job description is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (asDraft = false) => {
    setServerError(null);
    if (!asDraft && !validateForm()) return;

    // Prepare multipart/form-data because jdFile may be included
    const url = 'http://127.0.0.1:8000/api/jobs/api/jobs/create';

    try {
      setIsSubmitting(true);

      console.log('=== FORM SUBMISSION DATA ===');
      console.log('Submission Type:', asDraft ? 'Draft' : 'Publish');
      console.log('Form Data:', formData);
      console.log('============================');

      const payload = new FormData();
      // Simple fields
      payload.append('title', formData.title || '');
      payload.append('department', formData.department || '');
      payload.append('employment_type', formData.employmentType || '');
      payload.append('location', formData.location || '');
      payload.append('is_remote', formData.isRemote ? 'true' : 'false');
      payload.append('description', formData.description || '');
      payload.append('responsibilities', formData.responsibilities || '');
      payload.append('requirements', formData.requirements || '');
      payload.append('salary_min', formData.salaryMin || '');
      payload.append('salary_max', formData.salaryMax || '');
      payload.append('currency', formData.currency || 'USD');
      payload.append('expiry_date', formData.expiryDate || '');
      payload.append('reference_id', formData.referenceId || '');
      payload.append('is_draft', asDraft ? 'true' : 'false');

      // Arrays: send as JSON strings (most backends accept this with multipart)
      payload.append('benefits', JSON.stringify(formData.benefits || []));
      payload.append('skills', JSON.stringify(formData.skills || []));

      // File
      if (formData.jdFile) {
        payload.append('jd_file', formData.jdFile);
      }

      const res = await fetch(url, {
        method: 'POST',
        // Do NOT set Content-Type; browser will set multipart boundary
        body: payload,
      });

      const resText = await res.text();
      let resJson = null;
      try { resJson = JSON.parse(resText); } catch (e) { /* not json */ }

      if (!res.ok) {
        const message = (resJson && (resJson.detail || resJson.message)) || res.statusText || resText || 'Server error';
        throw new Error(message);
      }

      console.log('Server response:', resJson || resText);
      setIsDraft(asDraft);
      setShowSuccessModal(true);
    } catch (err) {
      console.error('Submit error:', err);
      setServerError(err.message || 'Failed to submit job');
    } finally {
      setIsSubmitting(false);
    }
  };

  const JobPreview = () => (
    <div className='card border shadow-none'>
      <div className='card-body p-24'>
        <div className='mb-12'>
          <h5 className='mb-4'>{formData.title || 'Job Title'}</h5>
          <div className='d-flex flex-wrap align-items-center gap-3 text-secondary-light text-sm'>
            <span className='d-inline-flex align-items-center'><Building2 size={16} className='me-1' /> {formData.department || 'Department'}</span>
            <span className='d-inline-flex align-items-center'><MapPin size={16} className='me-1' /> {formData.isRemote ? 'Remote' : formData.location || 'Location'}</span>
            <span className='d-inline-flex align-items-center'><Clock size={16} className='me-1' /> {formData.employmentType || 'Employment Type'}</span>
          </div>
        </div>

        {(formData.salaryMin || formData.salaryMax) && (
          <div className='alert alert-success'>
            <div className='d-inline-flex align-items-center'>
              <DollarSign size={16} className='me-2' />
              <span className='fw-medium'>
                {formData.currency} {formData.salaryMin || '0'} - {formData.salaryMax || '0'} per year
              </span>
            </div>
          </div>
        )}

        {formData.description && (
          <div className='mb-12'>
            <h6 className='mb-4'>About This Role</h6>
            <p className='text-secondary-light' style={{ whiteSpace: 'pre-line' }}>{formData.description}</p>
          </div>
        )}

        {formData.responsibilities && (
          <div className='mb-12'>
            <h6 className='mb-4'>Responsibilities</h6>
            <p className='text-secondary-light' style={{ whiteSpace: 'pre-line' }}>{formData.responsibilities}</p>
          </div>
        )}

        {formData.requirements && (
          <div className='mb-12'>
            <h6 className='mb-4'>Requirements</h6>
            <p className='text-secondary-light' style={{ whiteSpace: 'pre-line' }}>{formData.requirements}</p>
          </div>
        )}

        {formData.skills.length > 0 && (
          <div className='mb-12'>
            <h6 className='mb-4'>Required Skills</h6>
            <div className='d-flex flex-wrap gap-2'>
              {formData.skills.map((skill) => (
                <span key={skill} className='badge bg-primary-50 text-primary-600 border rounded-pill'>{skill}</span>
              ))}
            </div>
          </div>
        )}

        {formData.benefits.length > 0 && (
          <div className='mb-12'>
            <h6 className='mb-4'>Benefits</h6>
            <div className='row g-2'>
              {formData.benefits.map((benefit) => (
                <div key={benefit} className='col-12 col-md-6 d-inline-flex align-items-center text-secondary-light'>
                  <CheckCircle size={14} className='text-success me-2' /> {benefit}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className='container-fluid py-4'>
      <div className='mb-12'>
        <h4 className='mb-2'>Post a New Job</h4>
        <p className='text-secondary-light mb-0'>Fill in the details below to publish your job listing.</p>
      </div>

      <div className='row g-3'>
        <div className='col-12'>
          <form className='d-grid gap-3'>
            <div className='card border shadow-none'>
              <div className='card-body p-24'>
                <h6 className='mb-16'>Basic Information</h6>
                <div className='row g-3'>
                  <div className='col-12'>
                    <label className='form-label'>Job Title *</label>
                    <input
                      type='text'
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                      placeholder='e.g. Senior Software Engineer'
                    />
                    {errors.title && (
                      <div className='invalid-feedback d-inline-flex align-items-center'><AlertCircle size={14} className='me-1' /> {errors.title}</div>
                    )}
                  </div>

                  <div className='col-12 col-md-6'>
                    <label className='form-label'>Department *</label>
                    <select
                      value={formData.department}
                      onChange={(e) => handleInputChange('department', e.target.value)}
                      className={`form-select ${errors.department ? 'is-invalid' : ''}`}
                    >
                      <option value=''>Select Department</option>
                      {departments.map((dept) => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                    {errors.department && (
                      <div className='invalid-feedback d-inline-flex align-items-center'><AlertCircle size={14} className='me-1' /> {errors.department}</div>
                    )}
                  </div>

                  <div className='col-12 col-md-6'>
                    <label className='form-label'>Employment Type *</label>
                    <select
                      value={formData.employmentType}
                      onChange={(e) => handleInputChange('employmentType', e.target.value)}
                      className={`form-select ${errors.employmentType ? 'is-invalid' : ''}`}
                    >
                      <option value=''>Select Type</option>
                      {employmentTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                    {errors.employmentType && (
                      <div className='invalid-feedback d-inline-flex align-items-center'><AlertCircle size={14} className='me-1' /> {errors.employmentType}</div>
                    )}
                  </div>

                  <div className='col-12'>
                    <div className='d-flex align-items-center justify-content-between'>
                      <label className='form-label mb-0'>Location {!formData.isRemote && '*'}</label>
                      <div className='form-check form-switch'>
                        <input className='form-check-input' type='checkbox' id='remote' checked={formData.isRemote} onChange={(e) => handleInputChange('isRemote', e.target.checked)} />
                        <label className='form-check-label' htmlFor='remote'>Remote</label>
                      </div>
                    </div>
                    <input
                      type='text'
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      className={`form-control ${errors.location ? 'is-invalid' : ''}`}
                      placeholder='e.g. San Francisco, CA'
                      disabled={formData.isRemote}
                    />
                    {errors.location && (
                      <div className='invalid-feedback d-inline-flex align-items-center'><AlertCircle size={14} className='me-1' /> {errors.location}</div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className='card border shadow-none'>
              <div className='card-body p-24'>
                <h6 className='mb-16'>Job Details</h6>
                <div className='d-grid gap-3'>
                  <div>
                    <label className='form-label'>Job Description *</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      rows={6}
                      className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                      placeholder='Describe the role, what the candidate will be doing, and what makes this opportunity exciting...'
                    />
                    {errors.description && (
                      <div className='invalid-feedback d-inline-flex align-items-center'><AlertCircle size={14} className='me-1' /> {errors.description}</div>
                    )}
                  </div>

                  <div>
                    <label className='form-label'>Key Responsibilities</label>
                    <textarea
                      value={formData.responsibilities}
                      onChange={(e) => handleInputChange('responsibilities', e.target.value)}
                      rows={4}
                      className='form-control'
                      placeholder='List the main responsibilities and duties for this role...'
                    />
                  </div>

                  <div>
                    <label className='form-label'>Requirements & Qualifications</label>
                    <textarea
                      value={formData.requirements}
                      onChange={(e) => handleInputChange('requirements', e.target.value)}
                      rows={4}
                      className='form-control'
                      placeholder='List the required skills, experience, and qualifications...'
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className='card border shadow-none'>
              <div className='card-body p-24'>
                <h6 className='mb-16'>Compensation & Benefits</h6>
                <div className='d-grid gap-3'>
                  <div className='row g-3'>
                    <div className='col-12 col-md-4'>
                      <label className='form-label'>Currency</label>
                      <select
                        value={formData.currency}
                        onChange={(e) => handleInputChange('currency', e.target.value)}
                        className='form-select'
                      >
                        {currencies.map((currency) => (
                          <option key={currency} value={currency}>{currency}</option>
                        ))}
                      </select>
                    </div>
                    <div className='col-12 col-md-4'>
                      <label className='form-label'>Min Salary</label>
                      <input
                        type='number'
                        value={formData.salaryMin}
                        onChange={(e) => handleInputChange('salaryMin', e.target.value)}
                        className='form-control'
                        placeholder='50000'
                      />
                    </div>
                    <div className='col-12 col-md-4'>
                      <label className='form-label'>Max Salary</label>
                      <input
                        type='number'
                        value={formData.salaryMax}
                        onChange={(e) => handleInputChange('salaryMax', e.target.value)}
                        className='form-control'
                        placeholder='80000'
                      />
                    </div>
                  </div>

                  <div>
                    <label className='form-label'>Benefits</label>
                    <div className='row g-2'>
                      {benefitOptions.map((benefit) => (
                        <div key={benefit} className='col-12 col-md-4'>
                          <div className='form-check'>
                            <input className='form-check-input' type='checkbox' checked={formData.benefits.includes(benefit)} onChange={() => handleBenefitToggle(benefit)} id={`benefit-${benefit}`} />
                            <label className='form-check-label' htmlFor={`benefit-${benefit}`}>{benefit}</label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='card border shadow-none'>
              <div className='card-body p-24'>
                <h6 className='mb-16'>Skills & Keywords</h6>
                <div>
                  <label className='form-label'>Required Skills</label>
                  <div className='mb-2 d-flex flex-wrap gap-2'>
                    {skillSuggestions.map((skill) => (
                      <button key={skill} type='button' onClick={() => handleSkillAdd(skill)} className='btn btn-light btn-sm rounded-pill' disabled={formData.skills.includes(skill)}>
                        + {skill}
                      </button>
                    ))}
                  </div>
                  <div className='d-flex flex-wrap gap-2'>
                    {formData.skills.map((skill) => (
                      <span key={skill} className='badge rounded-pill bg-primary-50 text-primary-600 border d-inline-flex align-items-center'>
                        {skill}
                        <button type='button' onClick={() => handleSkillRemove(skill)} className='btn btn-link btn-sm p-0 ms-2'>
                          <X size={12} />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className='card border shadow-none'>
              <div className='card-body p-24'>
                <h6 className='mb-16'>Additional Information</h6>
                <div className='row g-3'>
                  <div className='col-12 col-md-6'>
                    <label className='form-label'>Job Expiry Date</label>
                    <input
                      type='date'
                      value={formData.expiryDate}
                      onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                      className='form-control'
                    />
                  </div>
                  <div className='col-12 col-md-6'>
                    <label className='form-label'>Internal Reference ID</label>
                    <input
                      type='text'
                      value={formData.referenceId}
                      onChange={(e) => handleInputChange('referenceId', e.target.value)}
                      className='form-control'
                      placeholder='e.g. ENG-2025-001'
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className='card border shadow-none'>
              <div className='card-body p-24'>
                <h6 className='mb-16'>Attachments</h6>
                <div>
                  <label className='form-label'>Upload JD Document (PDF/DOC/DOCX)</label>
                  <input
                    type='file'
                    className='form-control'
                    accept='.pdf,.doc,.docx'
                    onChange={(e) => handleInputChange('jdFile', e.target.files && e.target.files[0] ? e.target.files[0] : null)}
                  />
                  {formData.jdFile && (
                    <small className='text-secondary-light d-block mt-1'>Selected: {formData.jdFile.name}</small>
                  )}
                </div>
              </div>
            </div>

            <div className='d-flex flex-column flex-sm-row gap-2 justify-content-between pt-2'>
              <Link to='/jobslist' className='btn btn-link d-inline-flex align-items-center p-0'>
                <ArrowLeft size={14} className='me-2' /> Back to Jobs
              </Link>
              <div className='d-flex gap-2'>
                <button
                  type='button'
                  onClick={() => handleSubmit(true)}
                  className='btn btn-outline-secondary d-inline-flex align-items-center'
                  disabled={isSubmitting}
                >
                  <Save size={14} className='me-2' /> {isSubmitting ? 'Saving...' : 'Save as Draft'}
                </button>
                <button type='button' onClick={() => setShowPreview(true)} className='btn btn-outline-primary d-inline-flex align-items-center' disabled={isSubmitting}>
                  <Eye size={14} className='me-2' /> Preview
                </button>
                <button
                  type='button'
                  onClick={() => handleSubmit(false)}
                  className='btn btn-primary d-inline-flex align-items-center'
                  disabled={isSubmitting}
                >
                  <Send size={14} className='me-2' /> {isSubmitting ? 'Publishing...' : 'Publish Job'}
                </button>
              </div>
              {serverError && (
                <div className='mt-3'>
                  <div className='alert alert-danger d-inline-flex align-items-center' role='alert'>{serverError}</div>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>

      {showPreview && (
        <>
          <div className='modal d-block' tabIndex='-1' role='dialog'>
            <div className='modal-dialog modal-xl' role='document'>
              <div className='modal-content'>
                <div className='modal-header'>
                  <h6 className='modal-title mb-0'>Job Preview</h6>
                  <button type='button' className='btn-close' aria-label='Close' onClick={() => setShowPreview(false)}></button>
                </div>
                <div className='modal-body'>
                  <JobPreview />
                </div>
              </div>
            </div>
          </div>
          <div className='modal-backdrop fade show'></div>
        </>
      )}

      {showSuccessModal && (
        <>
          <div className='modal d-block' tabIndex='-1' role='dialog'>
            <div className='modal-dialog' role='document'>
              <div className='modal-content'>
                <div className='modal-body text-center p-24'>
                  <div className='rounded-circle bg-success-subtle d-inline-flex align-items-center justify-content-center mb-16 w-64-px h-64-px'>
                    <CheckCircle size={28} className='text-success' />
                  </div>
                  <h6 className='mb-4'>{isDraft ? 'Draft Saved!' : 'Job Posted Successfully!'}</h6>
                  <p className='text-secondary-light mb-16'>
                    {isDraft
                      ? 'Your job draft has been saved. You can continue editing it later.'
                      : 'Your job listing is now live and candidates can apply.'}
                  </p>
                  <div className='d-flex justify-content-center gap-2'>
                    <button type='button' className='btn btn-link' onClick={() => setShowSuccessModal(false)}>
                      {isDraft ? 'Continue Editing' : 'Post Another Job'}
                    </button>
                    <button type='button' className='btn btn-primary' onClick={() => setShowSuccessModal(false)}>
                      {isDraft ? 'Go to Drafts' : 'View Job'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='modal-backdrop fade show'></div>
        </>
      )}
    </div>
  );
};

export default CreateJob;
