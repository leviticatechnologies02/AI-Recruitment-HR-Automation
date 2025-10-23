import React, { useState } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import RecruiterDashboardLayout from '../recruiterDashboard/RecruiterDashboardLayout';

const HRDashboard = () => {
  const [stats, setStats] = useState({
    totalEmployees: 245,
    newHires: 12,
    pendingTasks: 8,
    attendanceRate: 94.5
  });

  const recentActivities = [
    {
      id: 1,
      type: 'new-hire',
      message: 'Sarah Johnson completed onboarding',
      time: '2 hours ago',
      icon: 'heroicons:user-plus'
    },
    {
      id: 2,
      type: 'document',
      message: 'Contract signed by Mike Chen',
      time: '4 hours ago',
      icon: 'heroicons:document-text'
    },
    {
      id: 3,
      type: 'attendance',
      message: 'Attendance report generated',
      time: '1 day ago',
      icon: 'heroicons:clock'
    },
    {
      id: 4,
      type: 'payroll',
      message: 'Payroll processed for 245 employees',
      time: '2 days ago',
      icon: 'heroicons:currency-dollar'
    }
  ];

  const quickActions = [
    {
      title: 'Add New Employee',
      description: 'Onboard a new team member',
      icon: 'heroicons:user-plus',
      color: 'primary',
      link: '/hr/onboarding-documents'
    },
    {
      title: 'View Directory',
      description: 'Browse employee directory',
      icon: 'heroicons:users',
      color: 'success',
      link: '/hr/employee-directory'
    },
    {
      title: 'Check Attendance',
      description: 'View attendance records',
      icon: 'heroicons:clock',
      color: 'warning',
      link: '/hr/attendance'
    },
    {
      title: 'Process Payroll',
      description: 'Manage payroll system',
      icon: 'heroicons:currency-dollar',
      color: 'info',
      link: '/hr/payroll'
    }
  ];

  return (
    <div className="container-fluid">
        {/* Header */}
        <div className="mb-4">
          <h5 className="text-3xl fw-bold text-dark mb-2 mt-3 d-flex align-items-center gap-2">
            <Icon icon="heroicons:building-office" />
            HR Dashboard
          </h5>
          <p className="text-muted">
            Manage your human resources, employee data, and HR processes efficiently.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="row g-4 mb-4">
          <div className="col-xl-3 col-md-6">
            <div className="card border shadow-none">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div className="flex-shrink-0">
                    <div className="w-50-px h-50-px bg-primary-subtle rounded-circle d-flex align-items-center justify-content-center">
                      <Icon icon="heroicons:users" className="text-primary text-2xl" />
                    </div>
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <h6 className="text-muted mb-1">Total Employees</h6>
                    <h6 className="fw-bold mb-0">{stats.totalEmployees}</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-md-6">
            <div className="card border shadow-none">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div className="flex-shrink-0">
                    <div className="w-50-px h-50-px bg-success-subtle rounded-circle d-flex align-items-center justify-content-center">
                      <Icon icon="heroicons:user-plus" className="text-success text-2xl" />
                    </div>
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <h6 className="text-muted mb-1">New Hires</h6>
                    <h6 className="fw-bold mb-0">{stats.newHires}</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-md-6">
            <div className="card border shadow-none">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div className="flex-shrink-0">
                    <div className="w-50-px h-50-px bg-warning-subtle rounded-circle d-flex align-items-center justify-content-center">
                      <Icon icon="heroicons:clipboard-document-list" className="text-warning text-2xl" />
                    </div>
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <h6 className="text-muted mb-1">Pending Tasks</h6>
                    <h6 className="fw-bold mb-0">{stats.pendingTasks}</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-md-6">
            <div className="card border shadow-none">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div className="flex-shrink-0">
                    <div className="w-50-px h-50-px bg-info-subtle rounded-circle d-flex align-items-center justify-content-center">
                      <Icon icon="heroicons:clock" className="text-info text-2xl" />
                    </div>
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <h6 className="text-muted mb-1">Attendance Rate</h6>
                    <h6 className="fw-bold mb-0">{stats.attendanceRate}%</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row g-4">
          {/* Quick Actions */}
          <div className="col-lg-8">
            <div className="card border shadow-none">
              <div className="card-header bg-transparent border-0">
                <h5 className="mb-0">Quick Actions</h5>
              </div>
              <div className="card-body">
                <div className="row g-3">
                  {quickActions.map((action, index) => (
                    <div key={index} className="col-md-6">
                      <a href={action.link} className="card border-2 h-100 text-decoration-none hover-lift">
                        <div className="card-body text-center">
                          <div className={`w-60-px h-60-px bg-${action.color}-subtle rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3`}>
                            <Icon icon={action.icon} className={`text-${action.color} text-2xl`} />
                          </div>
                          <h6 className="fw-semibold mb-2">{action.title}</h6>
                          <p className="text-muted mb-0 small">{action.description}</p>
                        </div>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activities */}
          <div className="col-lg-4">
            <div className="card border shadow-none">
              <div className="card-header bg-transparent border-0">
                <h5 className="mb-0">Recent Activities</h5>
              </div>
              <div className="card-body">
                <div className="d-flex flex-column gap-3">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="d-flex align-items-start gap-3">
                      <div className="flex-shrink-0">
                        <div className="w-40-px h-40-px bg-light rounded-circle d-flex align-items-center justify-content-center">
                          <Icon icon={activity.icon} className="text-muted" />
                        </div>
                      </div>
                      <div className="flex-grow-1">
                        <p className="mb-1 small">{activity.message}</p>
                        <span className="text-muted small">{activity.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default HRDashboard;