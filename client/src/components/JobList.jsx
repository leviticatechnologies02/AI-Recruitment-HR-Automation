import React from 'react'
import { Link } from 'react-router-dom'

const JobList = () => {
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
    <div className="container-fluid py-4">
      <div className="mb-12">
        <h4 className="mb-2">Jobs</h4>
        <p className="text-secondary-light mb-0">Browse all posted jobs.</p>
      </div>
      <div className='card border shadow-none'>
        <div className='card-header bg-base border-bottom d-flex align-items-center justify-content-between'>
          <h5 className='card-title mb-0'>Jobs List</h5>
          <Link to='/jobs/new' className='btn btn-primary d-inline-flex align-items-center gap-2'>
            <span>+ Create Job</span>
          </Link>
        </div>
        <div className='card-body p-24'>
          <div className='table-responsive'>
            <table className='table mb-0 align-middle'>
              <thead>
                <tr>
                  <th scope='col'>Job Title</th>
                  <th scope='col'>Department</th>
                  <th scope='col'>Type</th>
                  <th scope='col'>Location</th>
                  <th scope='col'>Salary</th>
                  <th scope='col'>Expiry</th>
                  <th scope='col' className='text-center'>Apply</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job) => (
                  <tr key={job.id}>
                    <td>
                      <div className="d-flex flex-column">
                        <span className='fw-semibold'>{job.title}</span>
                        <small className='text-secondary-light'>{job.id}</small>
                      </div>
                    </td>
                    <td>{job.department}</td>
                    <td>{job.employmentType}</td>
                    <td>{job.isRemote ? 'Remote' : (job.location || '-')}</td>
                    <td>{formatSalary(job.currency, job.salaryMin, job.salaryMax)}</td>
                    <td>{job.expiryDate ? new Date(job.expiryDate).toLocaleDateString() : '-'}</td>
                    <td className='text-center'>
                      <Link to='/candidates' className='btn btn-outline-success btn-sm'>Apply</Link>
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




export default JobList;