import React from 'react'

const JobsList = () => {
  const jobs = [
    {
      id: 'ENG-2024-001',
      title: 'Senior Software Engineer',
      department: 'Engineering',
      employmentType: 'Full-time',
      location: 'San Francisco, CA',
      isRemote: false,
      currency: 'USD',
      salaryMin: 120000,
      salaryMax: 160000,
      expiryDate: '2025-12-31',
      status: 'Open'
    },
    {
      id: 'MKT-2025-014',
      title: 'Marketing Manager',
      department: 'Marketing',
      employmentType: 'Contract',
      location: '',
      isRemote: true,
      currency: 'USD',
      salaryMin: 70000,
      salaryMax: 95000,
      expiryDate: '2025-10-15',
      status: 'Draft'
    },
    {
      id: 'DSN-2025-007',
      title: 'Product Designer',
      department: 'Design',
      employmentType: 'Part-time',
      location: 'Berlin, DE',
      isRemote: false,
      currency: 'EUR',
      salaryMin: 45000,
      salaryMax: 65000,
      expiryDate: '2025-11-01',
      status: 'Closed'
    }
  ];

  const formatSalary = (currency, min, max) => {
    if (!min && !max) return '-';
    const fmt = (n) => n?.toLocaleString(undefined);
    return `${currency} ${fmt(min) || '0'} - ${fmt(max) || '0'}`;
  };

  return (
    <div className="container-fluid p-3">
      <div className="mb-3">
        <h4 className="mb-1">Jobs</h4>
        <p className="text-muted mb-0">Browse all posted jobs.</p>
      </div>
      <div className='card'>
        <div className='card-header'>
          <h5 className='card-title mb-0'>Jobs List</h5>
        </div>
        <div className='card-body'>
          <div className='table-responsive'>
            <table className='table table-hover align-middle mb-0'>
              <thead>
                <tr>
                  <th scope='col'>Job Title</th>
                  <th scope='col'>Department</th>
                  <th scope='col'>Type</th>
                  <th scope='col'>Location</th>
                  <th scope='col'>Salary</th>
                  <th scope='col'>Expiry</th>
                  <th scope='col' className='text-center'>Status</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job) => (
                  <tr key={job.id}>
                    <td>
                      <div className="d-flex flex-column">
                        <span className='fw-semibold'>{job.title}</span>
                        <small className='text-muted'>{job.id}</small>
                      </div>
                    </td>
                    <td>{job.department}</td>
                    <td>{job.employmentType}</td>
                    <td>{job.isRemote ? 'Remote' : (job.location || '-')}</td>
                    <td>{formatSalary(job.currency, job.salaryMin, job.salaryMax)}</td>
                    <td>{job.expiryDate ? new Date(job.expiryDate).toLocaleDateString() : '-'}</td>
                    <td className='text-center'>
                      {job.status === 'Open' && <span className='badge rounded-pill bg-success'>Open</span>}
                      {job.status === 'Draft' && <span className='badge rounded-pill bg-secondary'>Draft</span>}
                      {job.status === 'Closed' && <span className='badge rounded-pill bg-danger'>Closed</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};




export default JobsList