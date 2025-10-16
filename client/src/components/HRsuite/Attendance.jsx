import React, { useState } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import RecruiterDashboardLayout from '../recruiterDashboard/RecruiterDashboardLayout';

const Attendance = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 9, 1));
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [leaveForm, setLeaveForm] = useState({
    leaveType: 'Casual Leave',
    startDate: '',
    endDate: '',
    reason: ''
  });

  const [attendanceData] = useState([
    { date: '2025-10-01', employee: 'Nagendra', status: 'Present' },
    { date: '2025-10-02', employee: 'Nagendra', status: 'Leave' },
    { date: '2025-10-03', employee: 'Nagendra', status: 'Present' },
    { date: '2025-10-04', employee: 'Nagendra', status: 'Present' },
    { date: '2025-10-05', employee: 'Nagendra', status: 'Absent' },
    { date: '2025-10-06', employee: 'Nagendra', status: 'Present' },
    { date: '2025-10-07', employee: 'Nagendra', status: 'Present' },
    { date: '2025-10-08', employee: 'Nagendra', status: 'Present' },
    { date: '2025-10-09', employee: 'Nagendra', status: 'Leave' },
    { date: '2025-10-10', employee: 'Nagendra', status: 'Present' },
  ]);

  const [leaveHistory, setLeaveHistory] = useState([
    { id: 1, type: 'Casual Leave', from: '2025-10-10', to: '2025-10-12', reason: 'Festival visit', status: 'Approved', days: 3 },
    { id: 2, type: 'Sick Leave', from: '2025-10-05', to: '2025-10-06', reason: 'Flu', status: 'Rejected', days: 2 },
    { id: 3, type: 'Earned Leave', from: '2025-09-28', to: '2025-09-30', reason: 'Personal work', status: 'Pending', days: 3 },
  ]);

  const [attendanceRecords, setAttendanceRecords] = useState([
    {
      id: 1,
      employee: 'Sarah Johnson',
      date: '2024-01-15',
      checkIn: '09:00 AM',
      checkOut: '06:00 PM',
      totalHours: '9.0',
      status: 'present',
      department: 'Engineering'
    },
    {
      id: 2,
      employee: 'Mike Chen',
      date: '2024-01-15',
      checkIn: '08:45 AM',
      checkOut: '05:30 PM',
      totalHours: '8.75',
      status: 'present',
      department: 'Marketing'
    },
    {
      id: 3,
      employee: 'Alex Rivera',
      date: '2024-01-15',
      checkIn: '09:15 AM',
      checkOut: '06:15 PM',
      totalHours: '9.0',
      status: 'late',
      department: 'HR'
    },
    {
      id: 4,
      employee: 'Emily Davis',
      date: '2024-01-15',
      checkIn: '-',
      checkOut: '-',
      totalHours: '0.0',
      status: 'absent',
      department: 'Finance'
    },
    {
      id: 5,
      employee: 'David Wilson',
      date: '2024-01-15',
      checkIn: '10:00 AM',
      checkOut: '07:00 PM',
      totalHours: '9.0',
      status: 'present',
      department: 'Sales'
    }
  ]);

  const [selectedDate, setSelectedDate] = useState('2024-01-15');
  const [filterDepartment, setFilterDepartment] = useState('all');

  const departments = ['all', 'Engineering', 'Marketing', 'HR', 'Finance', 'Sales'];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getMonthName = (date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const getAttendanceStatus = (day) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const record = attendanceData.find(a => a.date === dateStr);
    return record ? record.status : null;
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Present': return 'bg-success-subtle text-success border-success';
      case 'Absent': return 'bg-danger-subtle text-danger border-danger';
      case 'Leave': return 'bg-warning-subtle text-warning border-warning';
      case 'Approved': return 'bg-success-subtle text-success';
      case 'Rejected': return 'bg-danger-subtle text-danger';
      case 'Pending': return 'bg-warning-subtle text-warning';
      default: return 'bg-secondary-subtle text-secondary';
    }
  };

  const handleLeaveSubmit = (e) => {
    e.preventDefault();
    const newLeave = {
      id: leaveHistory.length + 1,
      type: leaveForm.leaveType,
      from: leaveForm.startDate,
      to: leaveForm.endDate,
      reason: leaveForm.reason,
      status: 'Pending',
      days: Math.ceil((new Date(leaveForm.endDate) - new Date(leaveForm.startDate)) / (1000 * 60 * 60 * 24)) + 1
    };
    setLeaveHistory([newLeave, ...leaveHistory]);
    setShowLeaveModal(false);
    setLeaveForm({ leaveType: 'Casual Leave', startDate: '', endDate: '', reason: '' });
  };

  const handleViewLeave = (leave) => {
    setSelectedLeave(leave);
    setShowViewModal(true);
  };

  const handleCancelLeave = (leaveId) => {
    setLeaveHistory(leaveHistory.filter(leave => leave.id !== leaveId));
  };

  const closeViewModal = () => {
    setShowViewModal(false);
    setSelectedLeave(null);
  };

  const getStatusBadge = (status) => {
    const styles = {
      present: 'bg-success-subtle text-success',
      late: 'bg-warning-subtle text-warning',
      absent: 'bg-danger-subtle text-danger',
      'half-day': 'bg-info-subtle text-info',
      Present: 'bg-success-subtle text-success',
      Absent: 'bg-danger-subtle text-danger',
      Leave: 'bg-warning-subtle text-warning',
      Approved: 'bg-success-subtle text-success',
      Rejected: 'bg-danger-subtle text-danger',
      Pending: 'bg-warning-subtle text-warning'
    };

    const icons = {
      present: 'heroicons:check-circle',
      late: 'heroicons:clock',
      absent: 'heroicons:x-circle',
      'half-day': 'heroicons:minus-circle',
      Present: 'heroicons:check-circle',
      Absent: 'heroicons:x-circle',
      Leave: 'heroicons:calendar',
      Approved: 'heroicons:check-circle',
      Rejected: 'heroicons:x-circle',
      Pending: 'heroicons:clock'
    };

    return (
      <span className={`badge d-flex align-items-center ${styles[status]}`}>
        <Icon icon={icons[status]} className="me-1" />
        {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
      </span>
    );
  };

  const filteredRecords = attendanceRecords.filter(record => {
    const matchesDate = record.date === selectedDate;
    const matchesDepartment = filterDepartment === 'all' || record.department === filterDepartment;
    return matchesDate && matchesDepartment;
  });

  const attendanceStats = {
    total: filteredRecords.length,
    present: filteredRecords.filter(r => r.status === 'present').length,
    late: filteredRecords.filter(r => r.status === 'late').length,
    absent: filteredRecords.filter(r => r.status === 'absent').length
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-20 border border-muted"></div>);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const status = getAttendanceStatus(day);
      days.push(
        <div key={day} className={`h-20 border border-muted p-2 ${status ? getStatusColor(status) : 'bg-white'}`}>
          <div className="fw-semibold small">{day}</div>
          {status && (
            <div className="mt-1 small fw-medium">
              {status === 'Present' ? 'P' : status === 'Absent' ? 'A' : 'L'}
            </div>
          )}
        </div>
      );
    }

    return (
      <>
        {dayNames.map(name => (
          <div key={name} className="fw-semibold text-center py-2 bg-light text-muted border border-muted">
            {name}
          </div>
        ))}
        {days}
      </>
    );
  };

  return (
    <div className="container-fluid">
        {/* Header */}
        <div className="mb-4">
          <h1 className="text-3xl fw-bold text-dark mb-2 d-flex align-items-center gap-2">
            <Icon icon="heroicons:clock" className="text-primary" />
            Attendance & Leave Tracking
          </h1>
          <p className="text-muted">Monitor attendance and manage leave requests</p>
        </div>

        {/* Stats Cards */}
        <div className="row g-4 mb-4">
          <div className="col-md-3">
            <div className="card border shadow-none">
              <div className="card-body">
                <div className="d-flex align-items-center gap-3">
                  <div className="bg-success-subtle p-3 rounded-circle">
                    <Icon icon="heroicons:check-circle" className="text-success" />
                  </div>
                  <div>
                    <p className="small text-muted fw-medium mb-1">Present Days</p>
                    <p className="h3 fw-bold text-dark mb-0">22</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card border shadow-none">
              <div className="card-body">
                <div className="d-flex align-items-center gap-3">
                  <div className="bg-danger-subtle p-3 rounded-circle">
                    <Icon icon="heroicons:x-circle" className="text-danger" />
                  </div>
                  <div>
                    <p className="small text-muted fw-medium mb-1">Absent Days</p>
                    <p className="h3 fw-bold text-dark mb-0">2</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card border shadow-none">
              <div className="card-body">
                <div className="d-flex align-items-center gap-3">
                  <div className="bg-warning-subtle p-3 rounded-circle">
                    <Icon icon="heroicons:calendar" className="text-warning" />
                  </div>
                  <div>
                    <p className="small text-muted fw-medium mb-1">Leave Days</p>
                    <p className="h3 fw-bold text-dark mb-0">6</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card border shadow-none">
              <div className="card-body">
                <div className="d-flex align-items-center gap-3">
                  <div className="bg-primary-subtle p-3 rounded-circle">
                    <Icon icon="heroicons:clock" className="text-primary" />
                  </div>
                  <div>
                    <p className="small text-muted fw-medium mb-1">Pending Requests</p>
                    <p className="h3 fw-bold text-dark mb-0">1</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Calendar View */}
        <div className="card border shadow-none mb-4">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="h4 fw-bold text-dark">Monthly Attendance Calendar</h2>
              <div className="d-flex align-items-center gap-4">
                <button onClick={previousMonth} className="btn btn-outline-secondary">
                  <Icon icon="heroicons:chevron-left" />
                </button>
                <span className="fw-semibold h5">{getMonthName(currentDate)}</span>
                <button onClick={nextMonth} className="btn btn-outline-secondary">
                  <Icon icon="heroicons:chevron-right" />
                </button>
              </div>
            </div>
            
            <div className="mb-4 d-flex gap-4 small">
              <div className="d-flex align-items-center gap-2">
                <div className="w-16-px h-16-px bg-success-subtle border border-success rounded"></div>
                <span>Present (P)</span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <div className="w-16-px h-16-px bg-danger-subtle border border-danger rounded"></div>
                <span>Absent (A)</span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <div className="w-16-px h-16-px bg-warning-subtle border border-warning rounded"></div>
                <span>Leave (L)</span>
              </div>
            </div>

            <div className="d-grid" style={{ gridTemplateColumns: 'repeat(7, 1fr)' }}>
              {renderCalendar()}
            </div>
          </div>
        </div>

        <div className="row g-4">
          {/* Leave Request Form */}
          <div className="col-lg-6">
            <div className="card border shadow-none">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h2 className="h4 fw-bold text-dark">Apply for Leave</h2>
                  <button 
                    onClick={() => setShowLeaveModal(true)}
                    className="btn btn-primary d-flex align-items-center gap-2"
                  >
                    <Icon icon="heroicons:plus" className="me-1" />
                    New Request
                  </button>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Leave Type</label>
                  <select className="form-select">
                    <option>Casual Leave</option>
                    <option>Sick Leave</option>
                    <option>Earned Leave</option>
                    <option>Maternity Leave</option>
                    <option>Paternity Leave</option>
                  </select>
                </div>

                <div className="row g-3 mb-3">
                  <div className="col-6">
                    <label className="form-label fw-semibold">Start Date</label>
                    <input type="date" className="form-control" />
                  </div>
                  <div className="col-6">
                    <label className="form-label fw-semibold">End Date</label>
                    <input type="date" className="form-control" />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Reason</label>
                  <textarea 
                    rows="3" 
                    placeholder="Enter reason for leave..."
                    className="form-control"
                  ></textarea>
                </div>

                <div className="alert alert-info">
                  <div className="d-flex align-items-start gap-2">
                    <Icon icon="heroicons:exclamation-triangle" className="text-info mt-1" />
                    <div>
                      <p className="fw-medium mb-1">Leave Balance</p>
                      <p className="small mb-0">Casual: 8 days | Sick: 5 days | Earned: 12 days</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Leave Balance Summary */}
          <div className="col-lg-6">
            <div className="card border shadow-none">
              <div className="card-body">
                <h2 className="h4 fw-bold text-dark mb-4">Leave Balance Summary</h2>
                <div className="mb-4">
                  <div className="card border">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="fw-medium text-muted">Casual Leave</span>
                        <span className="h3 fw-bold text-dark">8</span>
                      </div>
                      <div className="progress mb-2" style={{ height: '8px' }}>
                        <div className="progress-bar bg-primary" style={{width: '53%'}}></div>
                      </div>
                      <div className="d-flex justify-content-between small text-muted">
                        <span>Used: 7 days</span>
                        <span>Total: 15 days</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="card border">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="fw-medium text-muted">Sick Leave</span>
                        <span className="h3 fw-bold text-dark">5</span>
                      </div>
                      <div className="progress mb-2" style={{ height: '8px' }}>
                        <div className="progress-bar bg-success" style={{width: '50%'}}></div>
                      </div>
                      <div className="d-flex justify-content-between small text-muted">
                        <span>Used: 5 days</span>
                        <span>Total: 10 days</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="card border">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="fw-medium text-muted">Earned Leave</span>
                        <span className="h3 fw-bold text-dark">12</span>
                      </div>
                      <div className="progress mb-2" style={{ height: '8px' }}>
                        <div className="progress-bar bg-warning" style={{width: '40%'}}></div>
                      </div>
                      <div className="d-flex justify-content-between small text-muted">
                        <span>Used: 8 days</span>
                        <span>Total: 20 days</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Leave History Table */}
        <div className="card border shadow-none mt-4">
          <div className="card-body">
            <h2 className="h4 fw-bold text-dark mb-4">Leave Request History</h2>
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead className="bg-light">
                  <tr>
                    <th className="border-0 px-4 py-3 text-uppercase small fw-semibold text-muted">Leave Type</th>
                    <th className="border-0 px-4 py-3 text-uppercase small fw-semibold text-muted">From Date</th>
                    <th className="border-0 px-4 py-3 text-uppercase small fw-semibold text-muted">To Date</th>
                    <th className="border-0 px-4 py-3 text-uppercase small fw-semibold text-muted">Days</th>
                    <th className="border-0 px-4 py-3 text-uppercase small fw-semibold text-muted">Reason</th>
                    <th className="border-0 px-4 py-3 text-uppercase small fw-semibold text-muted">Status</th>
                    <th className="border-0 px-4 py-3 text-uppercase small fw-semibold text-muted">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {leaveHistory.map((leave) => (
                    <tr key={leave.id}>
                      <td className="px-4 py-3">
                        <div className="fw-medium text-dark">{leave.type}</div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-muted">{new Date(leave.from).toLocaleDateString('en-GB')}</div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-muted">{new Date(leave.to).toLocaleDateString('en-GB')}</div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-muted">{leave.days}</div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-muted">{leave.reason}</div>
                      </td>
                      <td className="px-4 py-3">
                        {getStatusBadge(leave.status)}
                      </td>
                      <td className="px-4 py-3">
                        <button 
                          className="btn btn-sm btn-outline-primary me-2"
                          onClick={() => handleViewLeave(leave)}
                        >
                          View
                        </button>
                        {leave.status === 'Pending' && (
                          <button 
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleCancelLeave(leave.id)}
                          >
                            Cancel
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Leave Request Modal */}
        {showLeaveModal && (
          <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">New Leave Request</h5>
                  <button 
                    type="button" 
                    className="btn-close" 
                    onClick={() => setShowLeaveModal(false)}
                  ></button>
                </div>
                
                <form onSubmit={handleLeaveSubmit}>
                  <div className="modal-body">
                    <div className="mb-3">
                      <label className="form-label">Leave Type</label>
                      <select 
                        value={leaveForm.leaveType}
                        onChange={(e) => setLeaveForm({...leaveForm, leaveType: e.target.value})}
                        className="form-select"
                        required
                      >
                        <option>Casual Leave</option>
                        <option>Sick Leave</option>
                        <option>Earned Leave</option>
                      </select>
                    </div>

                    <div className="row g-3 mb-3">
                      <div className="col-6">
                        <label className="form-label">Start Date</label>
                        <input 
                          type="date" 
                          value={leaveForm.startDate}
                          onChange={(e) => setLeaveForm({...leaveForm, startDate: e.target.value})}
                          className="form-control"
                          required
                        />
                      </div>
                      <div className="col-6">
                        <label className="form-label">End Date</label>
                        <input 
                          type="date" 
                          value={leaveForm.endDate}
                          onChange={(e) => setLeaveForm({...leaveForm, endDate: e.target.value})}
                          className="form-control"
                          required
                        />
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Reason</label>
                      <textarea 
                        rows="3"
                        value={leaveForm.reason}
                        onChange={(e) => setLeaveForm({...leaveForm, reason: e.target.value})}
                        placeholder="Enter reason for leave..."
                        className="form-control"
                        required
                      ></textarea>
                    </div>
                  </div>

                  <div className="modal-footer">
                    <button 
                      type="button"
                      onClick={() => setShowLeaveModal(false)}
                      className="btn btn-secondary"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      className="btn btn-primary"
                    >
                      Submit Request
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* View Leave Details Modal */}
        {showViewModal && selectedLeave && (
          <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title d-flex align-items-center gap-2">
                    <Icon icon="heroicons:document-text" className="text-primary" />
                    Leave Request Details
                  </h5>
                  <button 
                    type="button" 
                    className="btn-close" 
                    onClick={closeViewModal}
                  ></button>
                </div>
                
                <div className="modal-body">
                  <div className="row g-4">
                    <div className="col-md-6">
                      <div className="card border">
                        <div className="card-body">
                          <h6 className="fw-semibold text-dark mb-3">Request Information</h6>
                          <div className="mb-3">
                            <label className="form-label fw-medium text-muted">Leave Type</label>
                            <p className="form-control-plaintext fw-semibold">{selectedLeave.type}</p>
                          </div>
                          <div className="mb-3">
                            <label className="form-label fw-medium text-muted">Duration</label>
                            <p className="form-control-plaintext fw-semibold">{selectedLeave.days} day(s)</p>
                          </div>
                          <div className="mb-3">
                            <label className="form-label fw-medium text-muted">Status</label>
                            <div>
                              {getStatusBadge(selectedLeave.status)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="col-md-6">
                      <div className="card border">
                        <div className="card-body">
                          <h6 className="fw-semibold text-dark mb-3">Date Information</h6>
                          <div className="mb-3">
                            <label className="form-label fw-medium text-muted">From Date</label>
                            <p className="form-control-plaintext fw-semibold">
                              {new Date(selectedLeave.from).toLocaleDateString('en-US', { 
                                weekday: 'long', 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                              })}
                            </p>
                          </div>
                          <div className="mb-3">
                            <label className="form-label fw-medium text-muted">To Date</label>
                            <p className="form-control-plaintext fw-semibold">
                              {new Date(selectedLeave.to).toLocaleDateString('en-US', { 
                                weekday: 'long', 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                              })}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <div className="card border">
                      <div className="card-body">
                        <h6 className="fw-semibold text-dark mb-3">Reason for Leave</h6>
                        <p className="text-dark mb-0">{selectedLeave.reason}</p>
                      </div>
                    </div>
                  </div>

                  {/* Additional Information */}
                  <div className="mt-4">
                    <div className="card bg-light border">
                      <div className="card-body">
                        <h6 className="fw-semibold text-dark mb-3">Additional Information</h6>
                        <div className="row g-3">
                          <div className="col-md-6">
                            <div className="d-flex align-items-center gap-2">
                              <Icon icon="heroicons:calendar" className="text-muted" />
                              <span className="small text-muted">Requested on:</span>
                              <span className="small fw-medium">October 10, 2025</span>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="d-flex align-items-center gap-2">
                              <Icon icon="heroicons:clock" className="text-muted" />
                              <span className="small text-muted">Request ID:</span>
                              <span className="small fw-medium">LR-{selectedLeave.id.toString().padStart(4, '0')}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="modal-footer">
                  <button 
                    type="button"
                    onClick={closeViewModal}
                    className="btn btn-secondary"
                  >
                    Close
                  </button>
                  {selectedLeave.status === 'Pending' && (
                    <button 
                      type="button"
                      onClick={() => {
                        handleCancelLeave(selectedLeave.id);
                        closeViewModal();
                      }}
                      className="btn btn-outline-danger"
                    >
                      Cancel Request
                    </button>
                  )}
                  <button 
                    type="button"
                    className="btn btn-primary d-flex align-items-center gap-2"
                  >
                    <Icon icon="heroicons:arrow-down-tray" className="me-1" />
                    Download
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
  );
};

export default Attendance;
