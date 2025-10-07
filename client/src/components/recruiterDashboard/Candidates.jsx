import React, { useState } from 'react';

const Candidates = () => {
  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const [viewingCandidate, setViewingCandidate] = useState(null);
  const [expandedSkills, setExpandedSkills] = useState({});
  
  const candidates = [
    { 
      id: 1,
      name: 'Robert Brown', 
      email: 'robert.brown@example.com',
      phone: '+1 (555) 123-4567',
      role: 'DevOps Engineer', 
      skills: ['Azure', 'Docker', 'Kubernetes', 'AWS', 'Jenkins', 'Terraform'],
      stage: 'APPLIED',
      stageColor: 'primary',
      experience: '5 years',
      location: 'San Francisco, CA',
      appliedDate: '2024-01-15',
      resume: 'Robert_Brown_Resume.pdf',
      linkedin: 'https://linkedin.com/in/robertbrown',
      github: 'https://github.com/robertbrown',
      notes: 'Strong background in cloud infrastructure and automation. Previous experience at TechCorp.',
      education: 'BS Computer Science, Stanford University',
      availability: 'Available immediately'
    },
    { 
      id: 2,
      name: 'Emily Davis', 
      email: 'emily.davis@example.com',
      phone: '+1 (555) 234-5678',
      role: 'React Developer', 
      skills: ['React', 'Redux', 'Material-UI', 'JavaScript', 'TypeScript'],
      stage: 'INTERVIEW',
      stageColor: 'success',
      experience: '3 years',
      location: 'New York, NY',
      appliedDate: '2024-01-12',
      resume: 'Emily_Davis_Resume.pdf',
      linkedin: 'https://linkedin.com/in/emilydavis',
      github: 'https://github.com/emilydavis',
      notes: 'Excellent frontend developer with strong UI/UX skills. Currently working at StartupXYZ.',
      education: 'BS Software Engineering, MIT',
      availability: '2 weeks notice'
    },
    { 
      id: 3,
      name: 'Alex Thompson', 
      email: 'alex.thompson@example.com',
      phone: '+1 (555) 345-6789',
      role: 'Backend Engineer', 
      skills: ['Java', 'Spring Boot', 'MySQL', 'REST API', 'Microservices', 'Redis'],
      stage: 'SCREENING',
      stageColor: 'warning',
      experience: '4 years',
      location: 'Austin, TX',
      appliedDate: '2024-01-18',
      resume: 'Alex_Thompson_Resume.pdf',
      linkedin: 'https://linkedin.com/in/alexthompson',
      github: 'https://github.com/alexthompson',
      notes: 'Experienced backend developer with strong database design skills. Previous role at DataCorp.',
      education: 'MS Computer Science, University of Texas',
      availability: 'Available immediately'
    },
    { 
      id: 4,
      name: 'Maria Garcia', 
      email: 'maria.garcia@example.com',
      phone: '+1 (555) 456-7890',
      role: 'Frontend Developer', 
      skills: ['Angular', 'TypeScript', 'RxJS', 'HTML', 'CSS', 'Bootstrap'],
      stage: 'REJECTED',
      stageColor: 'danger',
      experience: '2 years',
      location: 'Miami, FL',
      appliedDate: '2024-01-20',
      resume: 'Maria_Garcia_Resume.pdf',
      linkedin: 'https://linkedin.com/in/mariagarcia',
      github: 'https://github.com/mariagarcia',
      notes: 'Junior developer with strong Angular skills and great potential for growth.',
      education: 'BS Computer Science, University of Miami',
      availability: 'Available immediately'
    },
    {
      id: 5,
      name: 'Daniel Wilson',
      email: 'daniel.wilson@example.com',
      phone: '+1 (555) 567-8901',
      role: 'Full Stack Developer',
      skills: ['Node.js', 'Express', 'MongoDB', 'React', 'Redux', 'Material-UI'],
      stage: 'OFFER',
      stageColor: 'success',
      experience: '5 years',
      location: 'San Francisco, CA',
      appliedDate: '2024-01-25',
      resume: 'Daniel_Wilson_Resume.pdf',
      linkedin: 'https://linkedin.com/in/danielwilson',
      github: 'https://github.com/danielwilson',
      notes: 'Experienced full stack developer with strong React and Node.js skills. Previous role at TechCorp.',
      education: 'BS Computer Science, Stanford University',
      availability: 'Available immediately'
    }
  ];

  const handleSelectCandidate = (candidateId) => {
    setSelectedCandidates(prev => 
      prev.includes(candidateId) 
        ? prev.filter(id => id !== candidateId)
        : [...prev, candidateId]
    );
  };

  const handleSelectAll = () => {
    setSelectedCandidates(
      selectedCandidates.length === candidates.length 
        ? [] 
        : candidates.map(c => c.id)
    );
  };

  const getStageBadgeClass = (stageColor) => {
    const colorMap = {
      'primary': 'bg-primary text-white',
      'success': 'bg-success text-white', 
      'warning': 'bg-warning text-dark',
      'danger': 'bg-danger text-white'
    };
    return colorMap[stageColor] || 'bg-secondary text-white';
  };

  const handleViewCandidate = (candidateId) => {
    const candidate = candidates.find(c => c.id === candidateId);
    setViewingCandidate(candidate);
  };

  const closeCandidateDetails = () => {
    setViewingCandidate(null);
  };

  const toggleSkillsExpansion = (candidateId) => {
    setExpandedSkills(prev => ({
      ...prev,
      [candidateId]: !prev[candidateId]
    }));
  };

  return (
    <div className='container-fluid py-4'>
      {/* Header */}
      <div className='d-flex align-items-center justify-content-between mb-4'>
        <h4 className='mb-0 fw-bold'>Candidates</h4>
        <div className='text-muted'>
          Showing 1-{candidates.length} of {candidates.length} candidates
        </div>
      </div>

      {/* Filtering Section */}
      <div className='row mb-4'>
        <div className='col-md-3'>
          <input 
            type='text' 
            className='form-control' 
            placeholder='Search by name or email' 
          />
        </div>
        <div className='col-md-3'>
          <input 
            type='text' 
            className='form-control' 
            placeholder='Filter by skill' 
          />
        </div>
        <div className='col-md-3'>
          <input 
            type='text' 
            className='form-control' 
            placeholder='Filter by role' 
          />
        </div>
        <div className='col-md-3'>
          <select className='form-select'>
            <option>All</option>
            <option>APPLIED</option>
            <option>SCREENING</option>
            <option>INTERVIEW</option>
            <option>OFFER</option>
            <option>REJECTED</option>
          </select>
        </div>
      </div>

      {/* Bulk Actions */}
      <div className='d-flex align-items-center justify-content-between mb-3 p-3 bg-light rounded'>
        <div className='text-muted'>
          {selectedCandidates.length === 0 ? 'No selection' : `${selectedCandidates.length} selected`}
        </div>
        <div className='d-flex gap-2'>
          <select className='form-select' style={{width: '150px'}}>
            <option>Move to stage...</option>
            <option>APPLIED</option>
            <option>SCREENING</option>
            <option>INTERVIEW</option>
            <option>OFFER</option>
            <option>REJECTED</option>
          </select>
          <select className='form-select' style={{width: '150px'}}>
            <option>Assign to job...</option>
            <option>Frontend Developer</option>
            <option>Backend Engineer</option>
            <option>DevOps Engineer</option>
            <option>React Developer</option>
          </select>
          <button className='btn btn-outline-secondary btn-sm'>Clear Selection</button>
        </div>
      </div>

      {/* Candidates Table */}
      <div className='card border shadow-none' style={{border: '2px solid #000', borderRadius: '20px'}}>
        <div className='card-body p-0'>
          <div className='table-responsive'>
            <table className='table mb-0'>
              <thead className='table-light'>
                <tr>
                  <th>
                    <input 
                      type='checkbox' 
                      className='form-check-input'
                      checked={selectedCandidates.length === candidates.length}
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th className='fw-semibold'>NAME</th>
                  <th className='fw-semibold'>ROLE</th>
                  <th className='fw-semibold'>SKILLS</th>
                  <th className='fw-semibold'>STAGE</th>
                  <th className='fw-semibold'>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {candidates.map((candidate) => (
                  <tr key={candidate.id}>
                    <td>
                      <input 
                        type='checkbox' 
                        className='form-check-input'
                        checked={selectedCandidates.includes(candidate.id)}
                        onChange={() => handleSelectCandidate(candidate.id)}
                      />
                    </td>
                    <td>
                      <div>
                        <div className='fw-medium'>{candidate.name}</div>
                        <div className='text-muted small'>{candidate.email}</div>
                      </div>
                    </td>
                    <td className='text-secondary'>{candidate.role}</td>
                    <td>
                      <div className='d-flex flex-wrap gap-1'>
                        {(expandedSkills[candidate.id] ? candidate.skills : candidate.skills.slice(0, 3)).map((skill, idx) => (
                          <span key={idx} className='badge bg-light text-dark border'>
                            {skill}
                          </span>
                        ))}
                        {candidate.skills.length > 3 && (
                          <button 
                            className='badge bg-light text-primary border border-primary'
                            style={{cursor: 'pointer', fontSize: '0.75rem'}}
                            onClick={() => toggleSkillsExpansion(candidate.id)}
                          >
                            {expandedSkills[candidate.id] ? 'Show less' : `+${candidate.skills.length - 3} more`}
                          </button>
                        )}
                      </div>
                    </td>
                    <td>
                      <span className={`badge ${getStageBadgeClass(candidate.stageColor)}`}>
                        {candidate.stage}
                      </span>
                    </td>
                    <td>
                      <div className='d-flex gap-2'>
                        <button 
                          className='btn btn-sm btn-outline-primary'
                          onClick={() => handleViewCandidate(candidate.id)}
                        >
                          View
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

      {/* Candidate Details Modal */}
      {viewingCandidate && (
        <div className='modal show d-block' style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <div className='modal-dialog modal-lg'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h5 className='modal-title'>Candidate Details</h5>
                <button 
                  type='button' 
                  className='btn-close' 
                  onClick={closeCandidateDetails}
                ></button>
              </div>
              <div className='modal-body'>
                <div className='row'>
                  <div className='col-md-4'>
                    <div className='text-center mb-4'>
                      <div className='bg-primary rounded-circle d-inline-flex align-items-center justify-content-center' 
                           style={{width: '80px', height: '80px'}}>
                        <span className='text-white fs-3 fw-bold'>
                          {viewingCandidate.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <h4 className='mt-3 mb-1'>{viewingCandidate.name}</h4>
                      <p className='text-muted mb-0'>{viewingCandidate.role}</p>
                      <span className={`badge ${getStageBadgeClass(viewingCandidate.stageColor)} mt-2`}>
                        {viewingCandidate.stage}
                      </span>
                    </div>
                  </div>
                  <div className='col-md-8'>
                    <div className='row mb-3'>
                      <div className='col-sm-6'>
                        <strong>Email:</strong><br/>
                        <span className='text-muted'>{viewingCandidate.email}</span>
                      </div>
                      <div className='col-sm-6'>
                        <strong>Phone:</strong><br/>
                        <span className='text-muted'>{viewingCandidate.phone}</span>
                      </div>
                    </div>
                    <div className='row mb-3'>
                      <div className='col-sm-6'>
                        <strong>Location:</strong><br/>
                        <span className='text-muted'>{viewingCandidate.location}</span>
                      </div>
                      <div className='col-sm-6'>
                        <strong>Experience:</strong><br/>
                        <span className='text-muted'>{viewingCandidate.experience}</span>
                      </div>
                    </div>
                    <div className='row mb-3'>
                      <div className='col-sm-6'>
                        <strong>Applied Date:</strong><br/>
                        <span className='text-muted'>{viewingCandidate.appliedDate}</span>
                      </div>
                      <div className='col-sm-6'>
                        <strong>Availability:</strong><br/>
                        <span className='text-muted'>{viewingCandidate.availability}</span>
                      </div>
                    </div>
                    <div className='mb-3'>
                      <strong>Education:</strong><br/>
                      <span className='text-muted'>{viewingCandidate.education}</span>
                    </div>
                    <div className='mb-3'>
                      <strong>Skills:</strong><br/>
                      <div className='d-flex flex-wrap gap-1 mt-1'>
                        {viewingCandidate.skills.map((skill, idx) => (
                          <span key={idx} className='badge bg-primary text-white'>
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className='mb-3'>
                      <strong>Notes:</strong><br/>
                      <span className='text-muted'>{viewingCandidate.notes}</span>
                    </div>
                    <div className='mb-3'>
                      <strong>Links:</strong><br/>
                      <div className='mt-1'>
                        <a href={viewingCandidate.linkedin} target='_blank' rel='noopener noreferrer' 
                           className='btn btn-sm btn-outline-primary me-2'>
                          <i className='ri-linkedin-line'></i> LinkedIn
                        </a>
                        <a href={viewingCandidate.github} target='_blank' rel='noopener noreferrer' 
                           className='btn btn-sm btn-outline-dark me-2'>
                          <i className='ri-github-line'></i> GitHub
                        </a>
                        <a href={`/resumes/${viewingCandidate.resume}`} target='_blank' rel='noopener noreferrer' 
                           className='btn btn-sm btn-outline-success'>
                          <i className='ri-file-pdf-line'></i> Resume
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='modal-footer'>
                <button 
                  type='button' 
                  className='btn btn-secondary' 
                  onClick={closeCandidateDetails}
                >
                  Close
                </button>
                <button type='button' className='btn btn-primary'>
                  Schedule Interview
                </button>
                <button type='button' className='btn btn-success'>
                  Move to Next Stage
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Candidates;
