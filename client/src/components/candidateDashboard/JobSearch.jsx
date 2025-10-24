import React, { useState, useMemo } from 'react';
import { Icon } from '@iconify/react';
import { Search, MapPin, DollarSign, Briefcase, Clock, Building2, Globe, Users, Award, FileText, User, CheckCircle, Upload, Mail } from 'lucide-react';

const JobSearch = () => {
  // Navigation state
  const [currentView, setCurrentView] = useState('search');
  const [selectedJob, setSelectedJob] = useState(null);

  // Sample job data
  const [jobs] = useState([
    {
      id: 1,
      title: "Frontend Developer (React.js)",
      company: "Veritech Software Pvt. Ltd.",
      location: "Hyderabad, India",
      salary: "6 LPA",
      experience: "0-1 Year",
      skills: ["React.js", "JavaScript (ES6+)", "HTML5", "CSS3", "REST API", "Git"],
      type: "Full-Time",
      workType: "Onsite",
      salaryRange: "3-6",
      roleType: "Frontend",
      postedDate: "2 Oct 2025",
      description: "We are looking for a talented Frontend Developer skilled in React.js and modern UI frameworks to join our team at Veritech Software.",
      responsibilities: [
        "Develop and maintain responsive front-end applications using React.js",
        "Work closely with backend teams to integrate APIs",
        "Ensure performance, scalability, and code quality",
        "Collaborate in daily stand-up meetings and sprint planning"
      ],
      companyDetails: {
        website: "www.veritechsoft.com",
        teamSize: "50-100",
        industry: "Software & Web Development",
        about: "Veritech Software specializes in web development and digital solutions. We focus on modern frontend technologies like React.js and Node.js.",
        email: "hr@veritechsoft.com"
      }
    },
    {
      id: 2,
      title: "Full Stack Developer",
      company: "DCM Tech Pvt Ltd",
      location: "Remote",
      salary: "5 – 8 LPA",
      experience: "1–3 Years",
      skills: ["Node.js", "React", "MongoDB", "Express", "JavaScript"],
      type: "Remote",
      workType: "Remote",
      salaryRange: "3-6",
      roleType: "Full Stack",
      postedDate: "1 Oct 2025",
      description: "Looking for a Full Stack Developer to build scalable web applications using modern technologies.",
      responsibilities: [
        "Build full-stack applications using MERN stack",
        "Design and implement RESTful APIs",
        "Write clean, maintainable code",
        "Collaborate with cross-functional teams"
      ],
      companyDetails: {
        website: "www.dcmtech.com",
        teamSize: "100-200",
        industry: "IT Services",
        about: "DCM Tech is a leading IT services company focused on digital transformation and cloud solutions.",
        email: "hr@dcmtech.com"
      }
    },
    {
      id: 3,
      title: "React Developer",
      company: "Tech Innovations",
      location: "Bangalore",
      salary: "6 – 10 LPA",
      experience: "2–4 Years",
      skills: ["React.js", "Redux", "TypeScript", "JavaScript", "CSS"],
      type: "Hybrid",
      workType: "Hybrid",
      salaryRange: "6-10",
      roleType: "Frontend",
      postedDate: "30 Sep 2025",
      description: "Join our innovative team as a React Developer to build cutting-edge web applications.",
      responsibilities: [
        "Develop complex React applications",
        "Implement state management with Redux",
        "Write TypeScript code for better maintainability",
        "Optimize application performance"
      ],
      companyDetails: {
        website: "www.techinnovations.com",
        teamSize: "50-100",
        industry: "Technology",
        about: "Tech Innovations is at the forefront of technology, creating solutions that shape the future.",
        email: "careers@techinnovations.com"
      }
    },
    {
      id: 4,
      title: "Backend Developer",
      company: "Cloud Systems",
      location: "Pune",
      salary: "7 – 12 LPA",
      experience: "3–5 Years",
      skills: ["Python", "Django", "PostgreSQL", "REST API", "Docker"],
      type: "Onsite",
      workType: "Onsite",
      salaryRange: "6-10",
      roleType: "Backend",
      postedDate: "29 Sep 2025",
      description: "Backend Developer to build robust server-side applications and APIs.",
      responsibilities: [
        "Develop RESTful APIs using Python and Django",
        "Design database schemas and optimize queries",
        "Implement security best practices",
        "Deploy applications using containerization"
      ],
      companyDetails: {
        website: "www.cloudsystems.com",
        teamSize: "150-300",
        industry: "Cloud Computing",
        about: "Cloud Systems provides enterprise-grade cloud solutions and backend services.",
        email: "jobs@cloudsystems.com"
      }
    },
    {
      id: 5,
      title: "UI/UX Designer",
      company: "Design Studio",
      location: "Remote",
      salary: "4 – 7 LPA",
      experience: "1–3 Years",
      skills: ["Figma", "Adobe XD", "Prototyping", "User Research", "Wireframing"],
      type: "Remote",
      workType: "Remote",
      salaryRange: "3-6",
      roleType: "UI/UX",
      postedDate: "28 Sep 2025",
      description: "Creative UI/UX Designer needed to design beautiful user experiences.",
      responsibilities: [
        "Create wireframes and prototypes",
        "Design user interfaces for web and mobile",
        "Conduct user research and usability testing",
        "Collaborate with development teams"
      ],
      companyDetails: {
        website: "www.designstudio.com",
        teamSize: "20-50",
        industry: "Design & Creative",
        about: "Design Studio specializes in creating exceptional user experiences and digital products.",
        email: "hello@designstudio.com"
      }
    },
    {
      id: 6,
      title: "Junior React Developer",
      company: "StartupHub",
      location: "Hyderabad",
      salary: "3 – 5 LPA",
      experience: "0–1 Years",
      skills: ["React.js", "JavaScript", "HTML/CSS", "Git", "Bootstrap"],
      type: "Onsite",
      workType: "Onsite",
      salaryRange: "0-3",
      roleType: "Frontend",
      postedDate: "27 Sep 2025",
      description: "Perfect opportunity for freshers to start their career in React development.",
      responsibilities: [
        "Learn and implement React.js components",
        "Work on responsive web designs",
        "Collaborate with senior developers",
        "Participate in code reviews and learning sessions"
      ],
      companyDetails: {
        website: "www.startuphub.com",
        teamSize: "10-20",
        industry: "Startup",
        about: "StartupHub is an innovative startup focused on building the next generation of web applications.",
        email: "join@startuphub.com"
      }
    }
  ]);

  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [savedJobs, setSavedJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 4;

  // Filters state
  const [filters, setFilters] = useState({
    salary: [],
    roleType: [],
    experience: [],
    workMode: []
  });

  // Toggle filter
  const toggleFilter = (category, value) => {
    setFilters(prev => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter(item => item !== value)
        : [...prev[category], value]
    }));
    setCurrentPage(1);
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      salary: [],
      roleType: [],
      experience: [],
      workMode: []
    });
    setSearchKeyword('');
    setSearchLocation('');
    setCurrentPage(1);
  };

  // Filter and search logic
  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const matchesKeyword = !searchKeyword ||
        job.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        job.company.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        job.skills.some(skill => skill.toLowerCase().includes(searchKeyword.toLowerCase()));

      const matchesLocation = !searchLocation ||
        job.location.toLowerCase().includes(searchLocation.toLowerCase());

      const matchesSalary = filters.salary.length === 0 ||
        filters.salary.includes(job.salaryRange);

      const matchesRole = filters.roleType.length === 0 ||
        filters.roleType.includes(job.roleType);

      const matchesWorkMode = filters.workMode.length === 0 ||
        filters.workMode.includes(job.type);

      return matchesKeyword && matchesLocation && matchesSalary && matchesRole && matchesWorkMode;
    });
  }, [jobs, searchKeyword, searchLocation, filters]);

  // Pagination
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  // Toggle save job
  const toggleSaveJob = (jobId) => {
    setSavedJobs(prev =>
      prev.includes(jobId)
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    );
  };

  // Navigation handlers
  const handleJobClick = (job) => {
    setSelectedJob(job);
    setCurrentView('detail');
  };

  const handleBackToSearch = () => {
    setCurrentView('search');
    setSelectedJob(null);
  };

  // Job Detail Page Component
  const JobDetailPage = ({ job, onBack }) => {
    const [applicationMethod, setApplicationMethod] = useState('profile');
    const [selectedFile, setSelectedFile] = useState(null);
    const [submitted, setSubmitted] = useState(false);

    // Existing profile data
    const candidateProfile = {
      name: "Nagendra Uggirala",
      role: "Frontend Developer",
      skills: ["React.js", "JavaScript", "SQL"],
      resume: "/uploads/Nagendra_Resume.pdf"
    };

    const handleFileChange = (e) => {
      setSelectedFile(e.target.files[0]);
    };

    const handleApply = () => {
      setSubmitted(true);
      // Simulate API call
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    };

    // Use default job data if no job is selected (fallback)
    const currentJob = job || {
      id: 1,
      title: "Frontend Developer (React.js)",
      company: "Veritech Software Pvt. Ltd.",
      location: "Hyderabad, India",
      salary: "6 LPA",
      experience: "0-1 Year",
      skills: ["React.js", "JavaScript (ES6+)", "HTML5", "CSS3", "REST API", "Git"],
      type: "Full-Time",
      workType: "Onsite",
      postedDate: "2 Oct 2025",
      description: "We are looking for a talented Frontend Developer skilled in React.js and modern UI frameworks to join our team at Veritech Software.",
      responsibilities: [
        "Develop and maintain responsive front-end applications using React.js",
        "Work closely with backend teams to integrate APIs",
        "Ensure performance, scalability, and code quality",
        "Collaborate in daily stand-up meetings and sprint planning"
      ],
      companyDetails: {
        website: "www.veritechsoft.com",
        teamSize: "50-100",
        industry: "Software & Web Development",
        about: "Veritech Software specializes in web development and digital solutions. We focus on modern frontend technologies like React.js and Node.js.",
        email: "hr@veritechsoft.com"
      }
    };

    if (submitted) {
      return (
        <div className="min-h-screen flex items-center justify-content-center p-6" style={{ marginTop: "200px", width: "600px", marginLeft: "350px" }}>
          <div className="p-12 max-w-2xl text-center" style={{ backgroundColor: '#ffffff', borderRadius: '16px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}>
            {/* <div className="rounded-full flex items-center justify-center mx-auto mb-6 mt-4" style={{ backgroundColor: '#10b981',width:"100px",height:"40px" }}>
              <CheckCircle className="mt-2" style={{ color: '#ffffff',}} />
            </div> */}
            <div className='w-64-px h-64-px bg-success-600 rounded-circle mx-auto mb-12 d-flex align-items-center justify-content-center'>
              <Icon icon='heroicons:check' className='text-white' style={{ fontSize: '24px' }} />
            </div>
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#1f2937' }}>Application Submitted Successfully!</h2>
            <p className="text-lg mb-8" style={{ color: '#6b7280' }}>
              We'll notify you once {currentJob.company} reviews your profile.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="px-8 py-2 rounded-lg transition"
              style={{ backgroundColor: '#3b82f6', color: '#ffffff' }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#2563eb'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#3b82f6'}
            >
              Back to Job Details
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className='dashboard-main-body bg-neutral-50'>
        <button
          onClick={onBack}
          className='btn btn-light mb-20 mt-2 d-flex align-items-center gap-2 fw-medium'
        >
          <Icon icon='heroicons:arrow-left' style={{ fontSize: '20px' }} />
          Back to Search
        </button>
        {/* Header Section */}
        <div className='bg-gradient-primary text-dark py-40' style={{ maxWidth: "97%", marginLeft: "25px" }}>
          <div className='container-fluid px-24'>
            {/* Back Button */}


            {/* Main Header Content */}
            <div className='row align-items-end justify-content-between'>
              {/* Left Content */}
              <div className='col-12 col-lg-8' >
                <h4 className='text-4xl fw-bold mb-12'>{currentJob.title}</h4>
                <p className='text-xl mb-0'>{currentJob.company}</p>
              </div>

              {/* Right Content - Apply Button */}
              <div className='col-12 col-lg-4 text-lg-end'>
                <button
                  onClick={() => document.getElementById('apply-section').scrollIntoView({ behavior: 'smooth' })}
                  className='btn btn-light btn-lg fw-semibold px-24 py-12'
                >
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className='container-fluid px-24 py-24'>
          {/* Single Large Content Card */}
          <div className='card border-0 shadow-sm mb-24'>
            <div className='card-body p-24'>

              {/* Job Overview */}
              <div className='mb-24'>
                <div className='row g-3'>
                  <div className='col-12 col-md-6'>
                    <div className='d-flex align-items-center gap-2'>
                      <Icon icon='heroicons:map-pin' className='text-secondary-light' style={{ fontSize: '20px' }} />
                      <span className='text-gray-700 fw-medium'>{currentJob.location}</span>
                    </div>
                  </div>
                  <div className='col-12 col-md-6'>
                    <div className='d-flex align-items-center gap-2'>
                      <Icon icon='heroicons:currency-rupee' className='text-secondary-light' style={{ fontSize: '20px' }} />
                      <span className='text-gray-700 fw-medium'>{currentJob.salary}</span>
                    </div>
                  </div>
                  <div className='col-12 col-md-6'>
                    <div className='d-flex align-items-center gap-2'>
                      <Icon icon='heroicons:clock' className='text-secondary-light' style={{ fontSize: '20px' }} />
                      <span className='text-gray-700 fw-medium'>{currentJob.type}</span>
                    </div>
                  </div>
                  <div className='col-12 col-md-6'>
                    <div className='d-flex align-items-center gap-2'>
                      <Icon icon='heroicons:briefcase' className='text-secondary-light' style={{ fontSize: '20px' }} />
                      <span className='text-gray-700 fw-medium'>{currentJob.experience}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Job Description */}
              <div className='mb-24'>
                <h2 className='text-xl fw-bold text-gray-900 mb-12'>Job Description</h2>
                <p className='text-gray-700 lh-lg'>
                  {currentJob.description || 'No description available.'}
                </p>
              </div>

              {/* Responsibilities */}
              <div className='mb-24'>
                <h2 className='text-xl fw-bold text-gray-900 mb-12'>Responsibilities</h2>
                <ul className='ps-20'>
                  {(currentJob.responsibilities || []).map((resp, idx) => (
                    <li key={idx} className='text-gray-700 mb-8'>
                      {resp}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Required Skills */}
              <div className='mb-24'>
                <h2 className='text-xl fw-bold text-gray-900 mb-12'>Required Skills</h2>
                <div className='d-flex flex-wrap gap-2 mb-16'>
                  {(currentJob.skills || []).map((skill, idx) => (
                    <span
                      key={idx}
                      className='badge bg-primary-50 text-primary-600 px-12 py-6 fw-medium'
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                <div className='d-flex align-items-center gap-2 text-secondary-light'>
                  <Icon icon='heroicons:clock' style={{ fontSize: '16px' }} />
                  <span className='text-sm'>Posted on: {currentJob.postedDate || 'N/A'}</span>
                </div>
              </div>

              {/* Company Details */}
              <div>
                <h2 className='text-xl fw-bold text-gray-900 mb-12'>Company Details</h2>
                <div>
                  <h3 className='fw-semibold text-lg text-gray-900 mb-8'>
                    {currentJob.company}
                  </h3>
                  <p className='text-gray-700 lh-lg'>
                    {currentJob.companyDetails?.about || 'Leading technology company focused on innovation and growth.'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Apply Section */}
          <div id='apply-section' className='card border-0 shadow-sm'>
            <div className='card-body p-24'>
              <div className='d-flex align-items-center gap-3 mb-20'>
                <Icon icon='heroicons:arrow-up-tray' className='text-primary-600' style={{ fontSize: '24px' }} />
                <h2 className='text-xl fw-bold text-gray-900 mb-0'>
                  Apply for this Job
                </h2>
              </div>

              <div className='d-flex flex-column gap-3'>
                <p className='text-gray-700 mb-12'>Choose how you want to apply:</p>

                {/* Upload Resume Option */}
                <div className={`border rounded-lg p-20 ${applicationMethod === 'upload' ? 'border-primary-600 border-2' : 'border-gray-300'}`}>
                  <label className='d-flex align-items-start gap-3' style={{ cursor: 'pointer' }}>
                    <input
                      type='radio'
                      name='applicationMethod'
                      value='upload'
                      checked={applicationMethod === 'upload'}
                      onChange={(e) => setApplicationMethod(e.target.value)}
                      className='form-check-input mt-1'
                    />
                    <div className='flex-grow-1'>
                      <div className='d-flex align-items-center gap-2 mb-8'>
                        <Icon icon='heroicons:arrow-up-tray' className='text-secondary-light' style={{ fontSize: '16px' }} />
                        <span className='fw-semibold text-gray-900'>Upload Resume</span>
                      </div>
                      {applicationMethod === 'upload' && (
                        <div className='mt-12'>
                          <input
                            type='file'
                            accept='.pdf,.doc,.docx'
                            onChange={handleFileChange}
                            className='form-control'
                          />
                          {selectedFile && (
                            <p className='mt-8 text-sm fw-medium text-success-600'>✓ {selectedFile.name}</p>
                          )}
                        </div>
                      )}
                    </div>
                  </label>
                </div>

                {/* Use Existing Profile Option */}
                <div className={`border rounded-lg p-20 ${applicationMethod === 'profile' ? 'border-primary-600 border-2' : 'border-gray-300'}`}>
                  <label className='d-flex align-items-start gap-3' style={{ cursor: 'pointer' }}>
                    <input
                      type='radio'
                      name='applicationMethod'
                      value='profile'
                      checked={applicationMethod === 'profile'}
                      onChange={(e) => setApplicationMethod(e.target.value)}
                      className='form-check-input mt-1'
                    />
                    <div className='flex-grow-1'>
                      <div className='d-flex align-items-center gap-2 mb-8'>
                        <Icon icon='heroicons:user' className='text-secondary-light' style={{ fontSize: '16px' }} />
                        <span className='fw-semibold text-gray-900'>Use Existing Profile</span>
                      </div>
                      {applicationMethod === 'profile' && (
                        <div
                          className='mt-8 bg-neutral-50 rounded-lg'
                          style={{ padding: '8px 12px', maxWidth: '420px' }}
                        >
                          <p className='fw-semibold text-gray-900 mb-2' style={{ fontSize: '15px' }}>{candidateProfile.name}</p>
                          <p className='text-sm text-secondary-light mb-8' style={{ marginBottom: '8px' }}>{candidateProfile.role}</p>
                          <div className='d-flex flex-wrap gap-2 mb-8' style={{ gap: '6px' }}>
                            {candidateProfile.skills.map((skill, idx) => (
                              <span
                                key={idx}
                                className='badge'
                                style={{
                                  backgroundColor: '#ffffff',
                                  color: '#374151',
                                  border: '1px solid #e5e7eb',
                                  padding: '4px 8px',
                                  fontSize: '12px',
                                  borderRadius: '6px'
                                }}
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                          <p className='text-sm text-secondary-light' style={{ fontSize: '13px' }}>
                            Resume: <span className='fw-semibold text-primary-600' style={{ color: '#2563eb' }}>{candidateProfile.resume}</span>
                          </p>
                        </div>
                      )}
                    </div>
                  </label>
                </div>

                <button
                  onClick={handleApply}
                  disabled={applicationMethod === 'upload' && !selectedFile}
                  className={`btn py-12 fw-semibold ${applicationMethod === 'upload' && !selectedFile
                      ? 'btn-secondary'
                      : 'btn-primary'
                    }`}
                  style={{ width: "130px" }}
                >
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Conditional rendering
  if (currentView === 'detail') {
    return <JobDetailPage job={selectedJob} onBack={handleBackToSearch} />;
  }

  return (
    <div className='dashboard-main-body bg-neutral-50'>
      {/* Header */}
      <div className='shadow-sm border-bottom mb-20'>
        <div className='container-fluid px-24 py-16'>
          <h1 className='text-2xl fw-bold text-gray-800 mb-4'>Find Your Dream Job</h1>
          <p className='text-secondary-light text-sm mb-0'>Discover opportunities that match your skills</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className='bg-white shadow-sm border-bottom mb-24' style={{ maxWidth: '97%', marginLeft: '1.5%' }}>
        <div className='container-fluid px-24 py-20' >
          <div className='row g-3'>
            <div className='col-12 col-md-5'>
              <div className='position-relative'>
                <Icon icon='heroicons:magnifying-glass' className='position-absolute start-0 top-50 translate-middle-y ms-12 text-secondary-light' style={{ fontSize: '20px' }} />
                <input
                  type='text'
                  placeholder='Job Title / Skill / Company'
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  className='form-control ps-40 py-12'
                />
              </div>
            </div>
            <div className='col-12 col-md-5'>
              <div className='position-relative'>
                <Icon icon='heroicons:map-pin' className='position-absolute start-0 top-50 translate-middle-y ms-12 text-secondary-light' style={{ fontSize: '20px' }} />
                <input
                  type='text'
                  placeholder='Location'
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className='form-control ps-40 py-12'
                />
              </div>
            </div>
            <div className='col-12 col-md-2'>
              <button className='btn btn-primary w-100 py-12 fw-medium'>
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='container-fluid px-24'>
        <div className='row g-4'>
          {/* Filters Sidebar */}
          <div className='col-12 col-lg-3'>
            <div className='card border-0 shadow-sm' style={{ position: 'sticky', top: '20px' }}>
              <div className='card-body p-20'>
                <div className='d-flex justify-content-between align-items-center mb-16'>
                  <h5 className='fw-semibold text-gray-800 mb-0'>Filters</h5>
                  <button onClick={clearFilters} className='btn  btn-sm text-primary-600 p-0'>
                    Clear All
                  </button>

                </div>

                {/* Salary Range */}
                <div className='mb-20'>
                  <h6 className='fw-medium text-gray-700 mb-12 d-flex align-items-center gap-2'>
                    <Icon icon='heroicons:currency-rupee' style={{ fontSize: '16px' }} />
                    Salary Range
                  </h6>
                  <div className='d-flex flex-column gap-2'>
                    {['0-3', '3-6', '6-10', '10+'].map(range => (
                      <label key={range} className='d-flex align-items-center gap-2' style={{ cursor: 'pointer' }}>
                        <input
                          type='checkbox'
                          checked={filters.salary.includes(range)}
                          onChange={() => toggleFilter('salary', range)}
                          className='form-check-input mt-0'
                        />
                        <span className='text-sm text-gray-700'>{range} LPA</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Role Type */}
                <div className='mb-20'>
                  <h6 className='fw-medium text-gray-700 mb-12 d-flex align-items-center gap-2'>
                    <Icon icon='heroicons:briefcase' style={{ fontSize: '16px' }} />
                    Role Type
                  </h6>
                  <div className='d-flex flex-column gap-2'>
                    {['Frontend', 'Backend', 'Full Stack', 'UI/UX'].map(role => (
                      <label key={role} className='d-flex align-items-center gap-2' style={{ cursor: 'pointer' }}>
                        <input
                          type='checkbox'
                          checked={filters.roleType.includes(role)}
                          onChange={() => toggleFilter('roleType', role)}
                          className='form-check-input mt-0'
                        />
                        <span className='text-sm text-gray-700'>{role}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Work Mode */}
                <div className='mb-20'>
                  <h6 className='fw-medium text-gray-700 mb-12'>Work Mode</h6>
                  <div className='d-flex flex-column gap-2'>
                    {['Remote', 'Onsite', 'Hybrid'].map(mode => (
                      <label key={mode} className='d-flex align-items-center gap-2' style={{ cursor: 'pointer' }}>
                        <input
                          type='checkbox'
                          checked={filters.workMode.includes(mode)}
                          onChange={() => toggleFilter('workMode', mode)}
                          className='form-check-input mt-0'
                        />
                        <span className='text-sm text-gray-700'>{mode}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Experience */}
                <div className='mb-0'>
                  <h6 className='fw-medium text-gray-700 mb-12 d-flex align-items-center gap-2'>
                    <Icon icon='heroicons:academic-cap' style={{ fontSize: '16px' }} />
                    Experience
                  </h6>
                  <div className='d-flex flex-column gap-2'>
                    {['Fresher', '1-2 Years', '3-5 Years', '5+ Years'].map(exp => (
                      <label key={exp} className='d-flex align-items-center gap-2' style={{ cursor: 'pointer' }}>
                        <input
                          type='checkbox'
                          checked={filters.experience.includes(exp)}
                          onChange={() => toggleFilter('experience', exp)}
                          className='form-check-input mt-0'
                        />
                        <span className='text-sm text-gray-700'>{exp}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Job Listings */}
          <div className='col-12 col-lg-9'>
            <div className='mb-16 d-flex justify-content-between align-items-center'>
              <p className='text-secondary-light mb-0'>
                <span className='fw-semibold text-gray-800'>{filteredJobs.length}</span> Jobs Found
              </p>
            </div>

            {currentJobs.length === 0 ? (
              <div className='card border-0 shadow-sm text-center py-40'>
                <div className='card-body'>
                  <p className='text-secondary-light text-lg mb-12'>No jobs found matching your criteria</p>
                  <button onClick={clearFilters} className='btn btn-link text-primary-600'>
                    Clear filters to see all jobs
                  </button>
                </div>
              </div>
            ) : (
              <div className='d-flex flex-column gap-4'>
                {currentJobs.map(job => (
                  <div key={job.id} className='card border-0 shadow-sm hover-shadow-md transition'>
                    <div className='card-body p-20'>
                      <div className='row align-items-start g-3'>
                        <div className='col-auto'>
                          {/* Company Logo */}
                          <div className='w-48-px h-48-px bg-primary-50 rounded-lg d-flex align-items-center justify-content-center'>
                            <span className='fw-semibold text-primary-600 text-lg'>
                              {job.company.split(' ').map(word => word.charAt(0)).join('').substring(0, 2).toUpperCase()}
                            </span>
                          </div>
                        </div>

                        <div className='col'>
                          {/* Job Details */}
                          <h3 className='text-lg fw-semibold text-gray-900 mb-4'>{job.title}</h3>
                          <p className='text-gray-700 mb-12'>{job.company}</p>

                          {/* Job Attributes */}
                          <div className='d-flex flex-wrap gap-3 text-sm text-secondary-light mb-12'>
                            <span className='d-flex align-items-center gap-1'>
                              <Icon icon='heroicons:map-pin' style={{ fontSize: '16px' }} />
                              {job.location}
                            </span>
                            <span className='d-flex align-items-center gap-1'>
                              <Icon icon='heroicons:currency-rupee' style={{ fontSize: '16px' }} />
                              {job.salary}
                            </span>
                            <span className='d-flex align-items-center gap-1'>
                              <Icon icon='heroicons:clock' style={{ fontSize: '16px' }} />
                              {job.type}
                            </span>
                          </div>

                          {/* Skills */}
                          <div className='d-flex gap-2 flex-wrap'>
                            {job.skills.map((skill, idx) => (
                              <span key={idx} className='badge bg-secondary-50 text-secondary-600 px-8 py-4 fw-medium'>
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className='col-auto'>
                          {/* Apply Button */}
                          <button
                            onClick={() => handleJobClick(job)}
                            className='btn btn-success px-20 py-8 fw-medium'
                          >
                            Apply
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className='mt-24 d-flex justify-content-center align-items-center gap-2'>
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className='btn btn-outline-secondary p-8'
                  style={{ opacity: currentPage === 1 ? 0.5 : 1 }}
                >
                  <Icon icon='heroicons:chevron-left' style={{ fontSize: '20px' }} />
                </button>

                {[...Array(totalPages)].map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentPage(idx + 1)}
                    className={`btn px-16 py-8 fw-medium ${currentPage === idx + 1
                        ? 'btn-primary'
                        : 'btn-outline-secondary'
                      }`}
                  >
                    {idx + 1}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className='btn btn-outline-secondary p-8'
                  style={{ opacity: currentPage === totalPages ? 0.5 : 1 }}
                >
                  <Icon icon='heroicons:chevron-right' style={{ fontSize: '20px' }} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobSearch;