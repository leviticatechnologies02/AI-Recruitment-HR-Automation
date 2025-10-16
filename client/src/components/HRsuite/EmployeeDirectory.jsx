import React, { useState } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import RecruiterDashboardLayout from '../recruiterDashboard/RecruiterDashboardLayout';

const EmployeeDirectory = () => {
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@company.com',
      phone: '+1 (555) 123-4567',
      department: 'Engineering',
      position: 'Senior Developer',
      location: 'New York, NY',
      startDate: '2022-03-15',
      status: 'active',
      avatar: null
    },
    {
      id: 2,
      name: 'Mike Chen',
      email: 'mike.chen@company.com',
      phone: '+1 (555) 234-5678',
      department: 'Marketing',
      position: 'Marketing Manager',
      location: 'San Francisco, CA',
      startDate: '2021-08-20',
      status: 'active',
      avatar: null
    },
    {
      id: 3,
      name: 'Alex Rivera',
      email: 'alex.rivera@company.com',
      phone: '+1 (555) 345-6789',
      department: 'HR',
      position: 'HR Specialist',
      location: 'Austin, TX',
      startDate: '2023-01-10',
      status: 'active',
      avatar: null
    },
    {
      id: 4,
      name: 'Emily Davis',
      email: 'emily.davis@company.com',
      phone: '+1 (555) 456-7890',
      department: 'Finance',
      position: 'Financial Analyst',
      location: 'Chicago, IL',
      startDate: '2022-11-05',
      status: 'on-leave',
      avatar: null
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const departments = ['all', 'Engineering', 'Marketing', 'HR', 'Finance', 'Sales'];

  const getStatusBadge = (status) => {
    const styles = {
      active: 'bg-success-subtle text-success',
      'on-leave': 'bg-warning-subtle text-warning',
      inactive: 'bg-danger-subtle text-danger'
    };

    return (
      <span className={`badge ${styles[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
      </span>
    );
  };

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = filterDepartment === 'all' || employee.department === filterDepartment;
    return matchesSearch && matchesDepartment;
  });

  const handleEmployeeClick = (employee) => {
    setSelectedEmployee(employee);
    setShowModal(true);
  };

  return (
    <div className="container-fluid">
        {/* Header */}
        <div className="mb-4">
          <h1 className="text-3xl fw-bold text-dark mb-2 d-flex align-items-center gap-2">
            <Icon icon="heroicons:users" className="text-primary" />
            Employee Directory
          </h1>
          <p className="text-muted">
            Browse and manage your organization's employee information.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="row g-4 mb-4">
          <div className="col-md-3">
            <div className="card border shadow-none">
              <div className="card-body text-center">
                <div className="w-60-px h-60-px bg-primary-subtle rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3">
                  <Icon icon="heroicons:users" className="text-primary text-2xl" />
                </div>
                <h4 className="fw-bold mb-1">{employees.length}</h4>
                <p className="text-muted mb-0">Total Employees</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card border shadow-none">
              <div className="card-body text-center">
                <div className="w-60-px h-60-px bg-success-subtle rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3">
                  <Icon icon="heroicons:check-circle" className="text-success text-2xl" />
                </div>
                <h4 className="fw-bold mb-1">{employees.filter(e => e.status === 'active').length}</h4>
                <p className="text-muted mb-0">Active</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card border shadow-none">
              <div className="card-body text-center">
                <div className="w-60-px h-60-px bg-warning-subtle rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3">
                  <Icon icon="heroicons:pause" className="text-warning text-2xl" />
                </div>
                <h4 className="fw-bold mb-1">{employees.filter(e => e.status === 'on-leave').length}</h4>
                <p className="text-muted mb-0">On Leave</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card border shadow-none">
              <div className="card-body text-center">
                <div className="w-60-px h-60-px bg-info-subtle rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3">
                  <Icon icon="heroicons:building-office" className="text-info text-2xl" />
                </div>
                <h4 className="fw-bold mb-1">{new Set(employees.map(e => e.department)).size}</h4>
                <p className="text-muted mb-0">Departments</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="card border shadow-none mb-4">
          <div className="card-body">
            <div className="d-flex flex-wrap gap-3 align-items-center">
              {/* Search */}
              <div className="position-relative flex-fill" style={{ minWidth: '300px' }}>
                <Icon icon="heroicons:magnifying-glass" className="position-absolute top-50 translate-middle-y text-muted ms-3" />
                <input
                  type="text"
                  placeholder="Search employees..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="form-control ps-5"
                />
              </div>

              {/* Department Filter */}
              <div style={{ minWidth: '150px' }}>
                <select
                  value={filterDepartment}
                  onChange={(e) => setFilterDepartment(e.target.value)}
                  className="form-select"
                >
                  {departments.map(dept => (
                    <option key={dept} value={dept}>
                      {dept === 'all' ? 'All Departments' : dept}
                    </option>
                  ))}
                </select>
              </div>

              {/* Add Employee Button */}
              <button className="btn btn-primary">
                <Icon icon="heroicons:plus" className="me-2" />
                Add Employee
              </button>
            </div>
          </div>
        </div>

        {/* Employees Grid */}
        <div className="row g-4">
          {filteredEmployees.map((employee) => (
            <div key={employee.id} className="col-lg-4 col-md-6">
              <div 
                className="card border shadow-none h-100 cursor-pointer hover-lift"
                onClick={() => handleEmployeeClick(employee)}
                style={{ cursor: 'pointer' }}
              >
                <div className="card-body text-center">
                  <div className="w-80-px h-80-px bg-light rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3">
                    {employee.avatar ? (
                      <img src={employee.avatar} alt={employee.name} className="w-100 h-100 rounded-circle object-fit-cover" />
                    ) : (
                      <Icon icon="heroicons:user" className="text-muted text-3xl" />
                    )}
                  </div>
                  
                  <h6 className="fw-semibold mb-1">{employee.name}</h6>
                  <p className="text-muted mb-2">{employee.position}</p>
                  <p className="small text-muted mb-2">{employee.department}</p>
                  
                  <div className="d-flex align-items-center justify-content-center gap-2 mb-3">
                    <Icon icon="heroicons:map-pin" className="text-muted small" />
                    <span className="small text-muted">{employee.location}</span>
                  </div>
                  
                  <div className="mb-3">
                    {getStatusBadge(employee.status)}
                  </div>

                  <div className="d-flex gap-2">
                    <button className="btn btn-sm btn-outline-primary flex-fill">
                      <Icon icon="heroicons:envelope" className="me-1" />
                      Email
                    </button>
                    <button className="btn btn-sm btn-outline-secondary flex-fill">
                      <Icon icon="heroicons:phone" className="me-1" />
                      Call
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredEmployees.length === 0 && (
          <div className="text-center py-5">
            <Icon icon="heroicons:users" className="text-muted text-4xl mb-3" />
            <h5 className="text-muted">No employees found</h5>
            <p className="text-muted">Try adjusting your search or filter criteria.</p>
          </div>
        )}

        {/* Employee Details Modal */}
        {showModal && selectedEmployee && (
          <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title d-flex align-items-center gap-2">
                    <Icon icon="heroicons:user" />
                    {selectedEmployee.name}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="row g-4">
                    <div className="col-md-4 text-center">
                      <div className="w-120-px h-120-px bg-light rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3">
                        {selectedEmployee.avatar ? (
                          <img src={selectedEmployee.avatar} alt={selectedEmployee.name} className="w-100 h-100 rounded-circle object-fit-cover" />
                        ) : (
                          <Icon icon="heroicons:user" className="text-muted text-4xl" />
                        )}
                      </div>
                      {getStatusBadge(selectedEmployee.status)}
                    </div>
                    <div className="col-md-8">
                      <div className="row g-3">
                        <div className="col-12">
                          <label className="form-label fw-semibold">Position</label>
                          <p className="form-control-plaintext">{selectedEmployee.position}</p>
                        </div>
                        <div className="col-md-6">
                          <label className="form-label fw-semibold">Department</label>
                          <p className="form-control-plaintext">{selectedEmployee.department}</p>
                        </div>
                        <div className="col-md-6">
                          <label className="form-label fw-semibold">Start Date</label>
                          <p className="form-control-plaintext">{selectedEmployee.startDate}</p>
                        </div>
                        <div className="col-12">
                          <label className="form-label fw-semibold">Email</label>
                          <p className="form-control-plaintext">{selectedEmployee.email}</p>
                        </div>
                        <div className="col-md-6">
                          <label className="form-label fw-semibold">Phone</label>
                          <p className="form-control-plaintext">{selectedEmployee.phone}</p>
                        </div>
                        <div className="col-md-6">
                          <label className="form-label fw-semibold">Location</label>
                          <p className="form-control-plaintext">{selectedEmployee.location}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button type="button" className="btn btn-primary">
                    <Icon icon="heroicons:pencil" className="me-2" />
                    Edit Employee
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
  );
};

export default EmployeeDirectory;
