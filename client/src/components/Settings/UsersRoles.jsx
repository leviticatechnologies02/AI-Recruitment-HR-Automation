import React, { useState } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import RecruiterDashboardLayout from '../recruiterDashboard/RecruiterDashboardLayout';

const UsersRoles = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'Nagendra Uggirala',
      email: 'nagendra@veritechsoft.com',
      role: 'Admin',
      status: 'active'
    },
    {
      id: 2,
      name: 'Ravi Kumar',
      email: 'ravi@veritechsoft.com',
      role: 'Recruiter',
      status: 'pending'
    },
    {
      id: 3,
      name: 'Sita Rani',
      email: 'sita@veritechsoft.com',
      role: 'Hiring Manager',
      status: 'active'
    },
    {
      id: 4,
      name: 'Anil Sharma',
      email: 'anil@veritechsoft.com',
      role: 'Recruiter',
      status: 'disabled'
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [successMessage, setSuccessMessage] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Recruiter',
    permissions: {
      manageJobs: true,
      viewAnalytics: false,
      manageOffers: false,
      manageUsers: false
    }
  });

  const roles = [
    {
      name: 'Admin',
      description: 'Full control over all settings',
      permissions: 'Manage users, jobs, analytics'
    },
    {
      name: 'Recruiter',
      description: 'Handles candidate pipelines',
      permissions: 'Manage candidates, post jobs'
    },
    {
      name: 'Hiring Manager',
      description: 'Reviews and approves candidates',
      permissions: 'View candidates, comment, approve'
    }
  ];

  const getStatusBadge = (status) => {
    const styles = {
      active: 'bg-success text-white',
      pending: 'bg-warning text-dark',
      disabled: 'bg-danger text-white'
    };
    
    const icons = {
      active: <Icon icon="heroicons:check" className="me-1" />,
      pending: <Icon icon="heroicons:pause" className="me-1" />,
      disabled: <Icon icon="heroicons:lock-closed" className="me-1" />
    };

    const labels = {
      active: 'Active',
      pending: 'Pending',
      disabled: 'Disabled'
    };

    return (
      <span className={`badge d-flex align-items-center ${styles[status]}`}>
        {icons[status]}
        {labels[status]}
      </span>
    );
  };

  const handleAddUser = () => {
    if (!formData.name || !formData.email) return;

    const newUser = {
      id: users.length + 1,
      name: formData.name,
      email: formData.email,
      role: formData.role,
      status: 'pending'
    };

    setUsers([...users, newUser]);
    setSuccessMessage(`Invite sent successfully to ${formData.name} (${formData.email}).`);
    setShowModal(false);
    setFormData({
      name: '',
      email: '',
      role: 'Recruiter',
      permissions: {
        manageJobs: true,
        viewAnalytics: false,
        manageOffers: false,
        manageUsers: false
      }
    });

    setTimeout(() => setSuccessMessage(''), 5000);
  };

  const handleRemoveUser = (id) => {
    setUsers(users.filter(u => u.id !== id));
  };

  const handleResendInvite = (user) => {
    setSuccessMessage(`Invite resent to ${user.name} (${user.email}).`);
    setTimeout(() => setSuccessMessage(''), 5000);
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      permissions: {
        manageJobs: true,
        viewAnalytics: false,
        manageOffers: false,
        manageUsers: false
      }
    });
    setShowModal(true);
  };

  const handleUpdateUser = () => {
    if (!formData.name || !formData.email) return;

    setUsers(users.map(user => 
      user.id === editingUser.id 
        ? { ...user, name: formData.name, email: formData.email, role: formData.role }
        : user
    ));
    
    setSuccessMessage(`User ${formData.name} updated successfully.`);
    setShowModal(false);
    setEditingUser(null);
    setFormData({
      name: '',
      email: '',
      role: 'Recruiter',
      permissions: {
        manageJobs: true,
        viewAnalytics: false,
        manageOffers: false,
        manageUsers: false
      }
    });

    setTimeout(() => setSuccessMessage(''), 5000);
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleDragStart = (e) => {
    setIsDragging(true);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <RecruiterDashboardLayout>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            {/* Success Message */}
            {successMessage && (
              <div className="alert alert-success alert-dismissible fade show d-flex align-items-center justify-content-between" role="alert">
                <span>{successMessage}</span>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setSuccessMessage('')}
                ></button>
              </div>
            )}

            {/* Header */}
            <div className="mb-4">
              <h1 className="text-3xl fw-bold text-dark mb-2 d-flex align-items-center gap-2">
                <Icon icon="heroicons:users" className="text-primary" />
                Users & Roles
              </h1>
              <p className="text-muted">
                Manage team members, their roles, and permissions within your organization.
              </p>
            </div>

            {/* Controls Bar */}
            <div 
              className="card shadow-sm border-0 mb-4"
              draggable
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              style={{ 
                cursor: isDragging ? 'grabbing' : 'grab',
                opacity: isDragging ? 0.8 : 1
              }}
            >
              <div className="card-body">
                <div className="d-flex flex-wrap gap-3 align-items-center justify-content-between">
                  <div className="d-flex flex-wrap gap-3 flex-fill">
                    {/* Search */}
                    <div className="position-relative flex-fill" style={{ minWidth: '250px' }}>
                      <Icon icon="heroicons:magnifying-glass" className="position-absolute top-50 translate-middle-y text-muted ms-3" />
                      <input
                        type="text"
                        placeholder="Search by name or email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="form-control ps-5"
                      />
                    </div>

                    {/* Role Filter */}
                    <select
                      value={filterRole}
                      onChange={(e) => setFilterRole(e.target.value)}
                      className="form-select"
                      style={{ minWidth: '120px' }}
                    >
                      <option value="all">All Roles</option>
                      <option value="Admin">Admin</option>
                      <option value="Recruiter">Recruiter</option>
                      <option value="Hiring Manager">Hiring Manager</option>
                    </select>

                    {/* Status Filter */}
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="form-select"
                      style={{ minWidth: '120px' }}
                    >
                      <option value="all">All Statuses</option>
                      <option value="active">Active</option>
                      <option value="pending">Pending</option>
                      <option value="disabled">Disabled</option>
                    </select>
                  </div>

                  {/* Add User Button */}
                  <button
                    onClick={() => setShowModal(true)}
                    className="btn btn-primary d-flex align-items-center"
                  >
                    <Icon icon="heroicons:plus" className="me-2" />
                    Add User
                  </button>
                </div>
              </div>
            </div>

            {/* Users Table */}
            <div className="card shadow-sm border-0">
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead className="bg-light">
                      <tr>
                        <th className="border-0 px-4 py-3 text-uppercase small fw-semibold text-muted">Name</th>
                        <th className="border-0 px-4 py-3 text-uppercase small fw-semibold text-muted">Email</th>
                        <th className="border-0 px-4 py-3 text-uppercase small fw-semibold text-muted">Role</th>
                        <th className="border-0 px-4 py-3 text-uppercase small fw-semibold text-muted">Status</th>
                        <th className="border-0 px-4 py-3 text-uppercase small fw-semibold text-muted">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map((user) => (
                        <tr key={user.id} className="border-bottom">
                          <td className="px-4 py-3">
                            <div className="fw-medium text-dark">{user.name}</div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="text-muted">{user.email}</div>
                          </td>
                          <td className="px-4 py-3">
                            <span className="text-dark">{user.role}</span>
                          </td>
                          <td className="px-4 py-3">
                            {getStatusBadge(user.status)}
                          </td>
                          <td className="px-4 py-3">
                            <div className="d-flex align-items-center gap-3">
                              {user.status === 'pending' ? (
                                <button
                                  onClick={() => handleResendInvite(user)}
                                  className="btn btn-link text-primary p-0 d-flex align-items-center gap-1"
                                >
                                  <Icon icon="heroicons:envelope" />
                                  <span className="small">Resend</span>
                                </button>
                              ) : (
                                <button 
                                  onClick={() => handleEditUser(user)}
                                  className="btn btn-link text-primary p-0 d-flex align-items-center gap-1"
                                >
                                  <Icon icon="heroicons:pencil" />
                                  <span className="small">Edit</span>
                                </button>
                              )}
                              <button
                                onClick={() => handleRemoveUser(user.id)}
                                className="btn btn-link text-danger p-0 d-flex align-items-center gap-1"
                              >
                                <Icon icon="heroicons:trash" />
                                <span className="small">Remove</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {filteredUsers.length === 0 && (
                  <div className="text-center py-5 text-muted">
                    No users found matching your filters.
                  </div>
                )}
              </div>
            </div>

            {/* Add User Modal */}
            {showModal && (
              <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                <div className="modal-dialog modal-lg modal-dialog-centered">
                  <div className="modal-content shadow-lg border-0">
                    {/* Modal Header */}
                    <div className="modal-header border-0 pb-0">
                      <h2 className="modal-title h4 fw-bold">
                        {editingUser ? 'Edit User' : 'Add New User'}
                      </h2>
                      <button
                        type="button"
                        className="btn-close"
                        onClick={() => {
                          setShowModal(false);
                          setEditingUser(null);
                          setFormData({
                            name: '',
                            email: '',
                            role: 'Recruiter',
                            permissions: {
                              manageJobs: true,
                              viewAnalytics: false,
                              manageOffers: false,
                              manageUsers: false
                            }
                          });
                        }}
                      ></button>
                    </div>

                    {/* Modal Body */}
                    <div className="modal-body">
                      <div className="row g-4">
                        {/* Full Name */}
                        <div className="col-12">
                          <label className="form-label fw-semibold text-dark">
                            <Icon icon="heroicons:user" className="me-2 text-primary" />
                            Full Name <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Enter user's full name"
                            className="form-control form-control-lg"
                          />
                        </div>

                        {/* Email */}
                        <div className="col-12">
                          <label className="form-label fw-semibold text-dark">
                            <Icon icon="heroicons:envelope" className="me-2 text-primary" />
                            Email Address <span className="text-danger">*</span>
                          </label>
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="user@veritechsoft.com"
                            className="form-control form-control-lg"
                          />
                        </div>

                        {/* Role Selector */}
                        <div className="col-12">
                          <label className="form-label fw-semibold text-dark">
                            <Icon icon="heroicons:user-group" className="me-2 text-primary" />
                            Role <span className="text-danger">*</span>
                          </label>
                          <select
                            value={formData.role}
                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                            className="form-select form-select-lg"
                          >
                            {roles.map((role) => (
                              <option key={role.name} value={role.name}>
                                {role.name} - {role.description}
                              </option>
                            ))}
                          </select>

                          {/* Role Description */}
                          <div className="mt-3 p-4 bg-primary bg-opacity-10 border border-primary border-opacity-20 rounded">
                            <div className="d-flex align-items-center mb-2">
                              <Icon icon="heroicons:information-circle" className="text-primary me-2" />
                              <h6 className="fw-semibold text-primary mb-0">Role Information</h6>
                            </div>
                            <p className="small fw-medium text-primary mb-1">
                              {roles.find(r => r.name === formData.role)?.description}
                            </p>
                            <p className="small text-primary mb-0">
                              <strong>Default permissions:</strong> {roles.find(r => r.name === formData.role)?.permissions}
                            </p>
                          </div>
                        </div>

                        {/* Permissions Toggle */}
                        <div className="col-12">
                          <label className="form-label fw-semibold text-dark">
                            <Icon icon="heroicons:shield-check" className="me-2 text-primary" />
                            Custom Permissions <span className="text-muted small">(Optional)</span>
                          </label>
                          <div className="bg-light p-4 rounded border">
                            <div className="mb-3">
                              <p className="small text-muted mb-0">
                                Override default permissions for this user. Leave unchecked to use role defaults.
                              </p>
                            </div>
                            <div className="row g-3">
                              {[
                                { key: 'manageJobs', label: 'Manage Jobs', desc: 'Create, edit, and delete job postings', icon: 'heroicons:briefcase' },
                                { key: 'viewAnalytics', label: 'View Analytics', desc: 'Access reports and dashboard analytics', icon: 'heroicons:chart-bar' },
                                { key: 'manageOffers', label: 'Manage Offers', desc: 'Create and send job offers', icon: 'heroicons:document-text' },
                                { key: 'manageUsers', label: 'Manage Users', desc: 'Add or edit team members', icon: 'heroicons:users' }
                              ].map((perm) => (
                                <div key={perm.key} className="col-md-6">
                                  <div className="d-flex align-items-start gap-3 p-3 bg-white rounded border">
                                    <div className="form-check form-switch mt-1">
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={formData.permissions[perm.key]}
                                        onChange={() => setFormData({
                                          ...formData,
                                          permissions: {
                                            ...formData.permissions,
                                            [perm.key]: !formData.permissions[perm.key]
                                          }
                                        })}
                                      />
                                    </div>
                                    <div className="flex-fill">
                                      <div className="d-flex align-items-center gap-2 mb-1">
                                        <Icon icon={perm.icon} className="text-primary small" />
                                        <div className="fw-semibold text-dark small">{perm.label}</div>
                                      </div>
                                      <div className="text-muted small">{perm.desc}</div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Modal Footer */}
                    <div className="modal-footer bg-light border-0 d-flex justify-content-between align-items-center px-4 py-3">
                      <div className="small text-muted">
                        <Icon icon="heroicons:information-circle" className="me-1" />
                        {editingUser ? 'Update user information and permissions.' : 'Fill in the details to invite a new team member.'}
                      </div>
                      <div className="d-flex gap-3">
                        <button
                          type="button"
                          className="btn btn-outline-secondary d-flex align-items-center gap-2"
                          onClick={() => {
                            setShowModal(false);
                            setEditingUser(null);
                            setFormData({
                              name: '',
                              email: '',
                              role: 'Recruiter',
                              permissions: {
                                manageJobs: true,
                                viewAnalytics: false,
                                manageOffers: false,
                                manageUsers: false
                              }
                            });
                          }}
                        >
                          <Icon icon="heroicons:x-mark" />
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={editingUser ? handleUpdateUser : handleAddUser}
                          disabled={!formData.name || !formData.email}
                          className="btn btn-primary d-flex align-items-center gap-2 px-4"
                        >
                          <Icon icon={editingUser ? "heroicons:check" : "heroicons:envelope"} />
                          {editingUser ? 'Update User' : 'Send Invite'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </RecruiterDashboardLayout>
  );
};

export default UsersRoles;
