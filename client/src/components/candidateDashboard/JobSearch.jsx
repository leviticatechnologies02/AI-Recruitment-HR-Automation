import React, { useState, useMemo } from 'react';
import { Icon } from '@iconify/react';

const JobSearch = () => {
  // Sample job data
  const [jobs] = useState([
    {
      id: 1,
      title: "Frontend Developer",
      company: "Veritech Software",
      location: "Hyderabad",
      salary: "₹4 – ₹6 LPA",
      experience: "0–2 Years",
      skills: ["React.js", "JavaScript", "Tailwind CSS"],
      type: "Onsite",
      salaryRange: "3-6",
      roleType: "Frontend"
    },
    {
      id: 2,
      title: "Full Stack Developer",
      company: "DCM Tech",
      location: "Remote",
      salary: "₹5 – ₹8 LPA",
      experience: "1–3 Years",
      skills: ["Node.js", "React", "MongoDB"],
      type: "Remote",
      salaryRange: "3-6",
      roleType: "Full Stack"
    },
    {
      id: 3,
      title: "React Developer",
      company: "Tech Innovations",
      location: "Bangalore",
      salary: "₹6 – ₹10 LPA",
      experience: "2–4 Years",
      skills: ["React.js", "Redux", "TypeScript"],
      type: "Hybrid",
      salaryRange: "6-10",
      roleType: "Frontend"
    },
    {
      id: 4,
      title: "Backend Developer",
      company: "Cloud Systems",
      location: "Pune",
      salary: "₹7 – ₹12 LPA",
      experience: "3–5 Years",
      skills: ["Python", "Django", "PostgreSQL"],
      type: "Onsite",
      salaryRange: "6-10",
      roleType: "Backend"
    },
    {
      id: 5,
      title: "UI/UX Designer",
      company: "Design Studio",
      location: "Remote",
      salary: "₹4 – ₹7 LPA",
      experience: "1–3 Years",
      skills: ["Figma", "Adobe XD", "Prototyping"],
      type: "Remote",
      salaryRange: "3-6",
      roleType: "UI/UX"
    },
    {
      id: 6,
      title: "Junior React Developer",
      company: "StartupHub",
      location: "Hyderabad",
      salary: "₹3 – ₹5 LPA",
      experience: "0–1 Years",
      skills: ["React.js", "JavaScript", "HTML/CSS"],
      type: "Onsite",
      salaryRange: "0-3",
      roleType: "Frontend"
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

  return (
    <div className='dashboard-main-body bg-neutral-50'>
      {/* Header */}
      <div className='bg-white shadow-sm border-bottom mb-20'>
        <div className='container-fluid px-24 py-16'>
          <h1 className='text-2xl fw-bold text-gray-800 mb-4'>Find Your Dream Job</h1>
          <p className='text-secondary-light text-sm mb-0'>Discover opportunities that match your skills</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className='bg-white shadow-sm border-bottom mb-24'>
        <div className='container-fluid px-24 py-20'>
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
            <div className='card border-0 shadow-sm sticky-top' style={{ top: '20px' }}>
              <div className='card-body p-20'>
                <div className='d-flex justify-content-between align-items-center mb-16'>
                  <h5 className='fw-semibold text-gray-800 mb-0'>Filters</h5>
                  <button onClick={clearFilters} className='btn btn-link btn-sm text-primary-600 p-0'>
                    Clear All
                  </button>
                </div>

                {/* Salary Range */}
                <div className='mb-20'>
                  <h6 className='fw-medium text-gray-700 mb-12 d-flex align-items-center gap-2'>
                    <Icon icon='heroicons:currency-dollar' style={{ fontSize: '16px' }} />
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
                <div className='mb-0'>
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
                    <div className='card-body p-24'>
                      <div className='d-flex justify-content-between align-items-start mb-16'>
                        <div>
                          <h3 className='text-xl fw-semibold text-gray-800 mb-4'>{job.title}</h3>
                          <p className='text-secondary-light fw-medium mb-0'>{job.company}</p>
                        </div>
                        <button
                          onClick={() => toggleSaveJob(job.id)}
                          className={`btn btn-sm rounded-circle p-8 ${
                            savedJobs.includes(job.id)
                              ? 'bg-danger-50 text-danger-600'
                              : 'bg-secondary-50 text-secondary-400'
                          }`}
                        >
                          <Icon 
                            icon={savedJobs.includes(job.id) ? 'heroicons:heart-solid' : 'heroicons:heart'} 
                            style={{ fontSize: '20px' }} 
                          />
                        </button>
                      </div>

                      <div className='d-flex flex-wrap gap-3 mb-16 text-sm text-secondary-light'>
                        <span className='d-flex align-items-center gap-1'>
                          <Icon icon='heroicons:map-pin' style={{ fontSize: '16px' }} />
                          {job.location}
                        </span>
                        <span className='d-flex align-items-center gap-1'>
                          <Icon icon='heroicons:currency-dollar' style={{ fontSize: '16px' }} />
                          {job.salary}
                        </span>
                        <span className='d-flex align-items-center gap-1'>
                          <Icon icon='heroicons:briefcase' style={{ fontSize: '16px' }} />
                          {job.experience}
                        </span>
                        <span className='badge bg-primary-50 text-primary-600 px-8 py-4 text-xs fw-medium'>
                          {job.type}
                        </span>
                      </div>

                      <div className='mb-16'>
                        <p className='text-sm text-secondary-light mb-8'>Skills Required:</p>
                        <div className='d-flex flex-wrap gap-2'>
                          {job.skills.map((skill, idx) => (
                            <span key={idx} className='badge bg-secondary-50 text-secondary-700 px-12 py-6 text-sm'>
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className='d-flex gap-3'>
                        <button className='btn btn-primary px-24 py-8 fw-medium'>
                          Apply Now
                        </button>
                        <button className='btn btn-outline-secondary flex-grow-1 py-8 fw-medium'>
                          View Details
                        </button>
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
                    className={`btn px-16 py-8 fw-medium ${
                      currentPage === idx + 1
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

