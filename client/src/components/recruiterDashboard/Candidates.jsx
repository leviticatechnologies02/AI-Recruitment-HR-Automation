import React from 'react';

const Candidates = () => {
  const rows = [
    { name: 'Aisha Sharma', role: 'Frontend Engineer', stage: 'Phone Screen', applied: '2 days ago' },
    { name: 'Ravi Kumar', role: 'Product Manager', stage: 'Rejected', applied: '5 days ago' },
    { name: 'Meera Patel', role: 'Data Scientist', stage: 'Onsite', applied: '1 day ago' }
  ];

  return (
    <div className='container-fluid py-4'>
      <div className='d-flex align-items-center justify-content-between mb-16'>
        <h5 className='mb-0'>Candidates</h5>
        <div className='d-flex align-items-center gap-2'>
          <input type='text' className='form-control' placeholder='Search candidates...' />
          <button className='btn btn-primary'>Search</button>
        </div>
      </div>

      <div className='card border shadow-none'>
        <div className='card-body p-0'>
          <div className='table-responsive'>
            <table className='table mb-0'>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Position</th>
                  <th>Stage</th>
                  <th>Applied</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, idx) => (
                  <tr key={idx}>
                    <td className='fw-medium'>{r.name}</td>
                    <td className='text-secondary-light'>{r.role}</td>
                    <td><span className='badge bg-primary-50 text-primary-600 border'>{r.stage}</span></td>
                    <td className='text-secondary-light'>{r.applied}</td>
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

export default Candidates;
