import React, { useState, useMemo } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import RecruiterDashboardLayout from '../recruiterDashboard/RecruiterDashboardLayout';

const Payroll = () => {
  const [payrollRecords, setPayrollRecords] = useState([
    {
      id: 1,
      employee: 'Sarah Johnson',
      employeeId: 'EMP001',
      department: 'Engineering',
      position: 'Senior Developer',
      basicSalary: 75000,
      overtime: 4500,
      bonus: 5000,
      deductions: 15000,
      netPay: 69500,
      payPeriod: '2024-01-01 to 2024-01-31',
      status: 'paid',
      payDate: '2024-02-01'
    },
    {
      id: 2,
      employee: 'Mike Chen',
      employeeId: 'EMP002',
      department: 'Marketing',
      position: 'Marketing Manager',
      basicSalary: 68000,
      overtime: 2000,
      bonus: 0,
      deductions: 13600,
      netPay: 56400,
      payPeriod: '2024-01-01 to 2024-01-31',
      status: 'paid',
      payDate: '2024-02-01'
    },
    {
      id: 3,
      employee: 'Alex Rivera',
      employeeId: 'EMP003',
      department: 'HR',
      position: 'HR Specialist',
      basicSalary: 58000,
      overtime: 1500,
      bonus: 3000,
      deductions: 11600,
      netPay: 50900,
      payPeriod: '2024-01-01 to 2024-01-31',
      status: 'pending',
      payDate: '2024-02-05'
    },
    {
      id: 4,
      employee: 'Emily Davis',
      employeeId: 'EMP004',
      department: 'Finance',
      position: 'Financial Analyst',
      basicSalary: 65000,
      overtime: 3000,
      bonus: 0,
      deductions: 13000,
      netPay: 55000,
      payPeriod: '2024-01-01 to 2024-01-31',
      status: 'paid',
      payDate: '2024-02-01'
    },
    {
      id: 5,
      employee: 'David Wilson',
      employeeId: 'EMP005',
      department: 'Sales',
      position: 'Sales Manager',
      basicSalary: 82000,
      overtime: 4000,
      bonus: 8000,
      deductions: 16400,
      netPay: 77600,
      payPeriod: '2024-01-01 to 2024-01-31',
      status: 'pending',
      payDate: '2024-02-05'
    },
    {
      id: 6,
      employee: 'Lisa Anderson',
      employeeId: 'EMP006',
      department: 'Operations',
      position: 'Operations Manager',
      basicSalary: 78000,
      overtime: 2500,
      bonus: 2000,
      deductions: 15600,
      netPay: 66900,
      payPeriod: '2024-01-01 to 2024-01-31',
      status: 'on-hold',
      payDate: '2024-02-08'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortConfig, setSortConfig] = useState({ key: 'payDate', direction: 'desc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const itemsPerPage = 5;

  // Calculate KPIs
  const kpis = useMemo(() => {
    const total = payrollRecords.reduce((sum, emp) => sum + emp.netPay, 0);
    const pending = payrollRecords.filter(emp => emp.status === 'pending');
    const pendingAmount = pending.reduce((sum, emp) => sum + emp.netPay, 0);
    const activeEmployees = payrollRecords.length;
    const lastPayout = payrollRecords
      .filter(emp => emp.status === 'paid')
      .sort((a, b) => new Date(b.payDate) - new Date(a.payDate))[0]?.payDate || 'N/A';

    return {
      totalPayroll: total,
      pendingCount: pending.length,
      pendingAmount: pendingAmount,
      activeEmployees: activeEmployees,
      lastPayout: lastPayout
    };
  }, [payrollRecords]);

  // Filter and search
  const filteredData = useMemo(() => {
    return payrollRecords.filter(emp => {
      const matchesSearch = emp.employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           emp.department.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'All' || emp.status === statusFilter.toLowerCase();
      return matchesSearch && matchesStatus;
    });
  }, [payrollRecords, searchTerm, statusFilter]);

  // Sort data
  const sortedData = useMemo(() => {
    const sorted = [...filteredData];
    sorted.sort((a, b) => {
      let aVal = a[sortConfig.key];
      let bVal = b[sortConfig.key];

      if (sortConfig.key === 'netPay' || sortConfig.key === 'basicSalary') {
        aVal = Number(aVal);
        bVal = Number(bVal);
      } else if (sortConfig.key === 'payDate') {
        aVal = new Date(aVal);
        bVal = new Date(bVal);
      }

      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [filteredData, sortConfig]);

  // Pagination
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const getStatusBadge = (status) => {
    const styles = {
      paid: 'bg-success-subtle text-success',
      pending: 'bg-warning-subtle text-warning',
      'on-hold': 'bg-danger-subtle text-danger'
    };

    const icons = {
      paid: 'heroicons:check-circle',
      pending: 'heroicons:clock',
      'on-hold': 'heroicons:x-circle'
    };

    return (
      <span className={`badge d-flex align-items-center ${styles[status]}`}>
        <Icon icon={icons[status]} className="me-1" />
        {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
      </span>
    );
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const downloadPayslip = (employee) => {
    // Create a simple CSV content for the payslip
    const payslipData = [
      ['Employee Name', employee.employee],
      ['Employee ID', employee.employeeId],
      ['Department', employee.department],
      ['Position', employee.position],
      ['Pay Period', employee.payPeriod],
      ['Pay Date', employee.payDate],
      ['Basic Salary', formatCurrency(employee.basicSalary)],
      ['Overtime', formatCurrency(employee.overtime)],
      ['Bonus', formatCurrency(employee.bonus)],
      ['Deductions', formatCurrency(employee.deductions)],
      ['Net Pay', formatCurrency(employee.netPay)],
      ['Status', employee.status]
    ];

    const csvContent = payslipData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${employee.employee}_payslip_${employee.payDate}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const exportAllCSV = () => {
    // Create CSV content for all payroll records
    const headers = ['Employee Name', 'Employee ID', 'Department', 'Position', 'Basic Salary', 'Overtime', 'Bonus', 'Deductions', 'Net Pay', 'Status', 'Pay Date'];
    const csvData = [headers];
    
    sortedData.forEach(record => {
      csvData.push([
        record.employee,
        record.employeeId,
        record.department,
        record.position,
        record.basicSalary,
        record.overtime,
        record.bonus,
        record.deductions,
        record.netPay,
        record.status,
        record.payDate
      ]);
    });

    const csvContent = csvData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `payroll_export_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const approveAllPayroll = () => {
    const updatedRecords = payrollRecords.map(record => ({
      ...record,
      status: record.status === 'pending' ? 'paid' : record.status
    }));
    setPayrollRecords(updatedRecords);
    alert('All pending payroll records have been approved!');
  };

  const refreshData = () => {
    // Simulate data refresh
    setCurrentPage(1);
    setSearchTerm('');
    setStatusFilter('All');
    setSortConfig({ key: 'payDate', direction: 'desc' });
    alert('Payroll data refreshed successfully!');
  };

  const processPayroll = () => {
    // Simulate payroll processing
    const updatedRecords = payrollRecords.map(record => ({
      ...record,
      status: record.status === 'pending' ? 'processing' : record.status
    }));
    setPayrollRecords(updatedRecords);
    alert('Payroll processing initiated! All pending records are now being processed.');
  };

  const editPayrollRecord = (record) => {
    // Simulate editing payroll record
    alert(`Editing payroll record for ${record.employee}. This would open an edit form in a real application.`);
    setShowModal(false);
  };

  const handleRecordClick = (record) => {
    setSelectedRecord(record);
    setShowModal(true);
  };

  return (
    <div className="container-fluid">
    {/* Header */}
    <div className="mb-4">
      <h3 className="text-3xl fw-bold text-dark mb-2 d-flex align-items-center gap-2">
        <Icon icon="heroicons:currency-dollar" className="text-primary" />
        Payroll Management
      </h3>
      <p className="text-muted">
        Manage employee payroll, salary calculations, and payment processing.
      </p>
    </div>

        {/* KPI Cards */}
        <div className="row g-4 mb-4">
          <div className="col-md-3">
            <div className="card border shadow-none h-100">
              <div className="card-body d-flex align-items-center">
                <div className="flex-shrink-0">
                  <div className="w-60-px h-60-px bg-primary-subtle rounded-circle d-flex align-items-center justify-content-center">
                    <Icon icon="heroicons:currency-dollar" className="text-primary text-2xl" />
                  </div>
                </div>
                <div className="flex-grow-1 ms-3">
                  <div className="text-muted mb-1 small">Total</div>
                  <div className="text-muted mb-1 small">Payroll</div>
                  <div className="fw-bold text-dark fs-4">{formatCurrency(kpis.totalPayroll)}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card border shadow-none h-100">
              <div className="card-body d-flex align-items-center">
                <div className="flex-shrink-0">
                  <div className="w-60-px h-60-px bg-warning-subtle rounded-circle d-flex align-items-center justify-content-center">
                    <Icon icon="heroicons:clock" className="text-warning text-2xl" />
                  </div>
                </div>
                <div className="flex-grow-1 ms-3">
                  <div className="text-muted mb-1 small">Pending</div>
                  <div className="text-muted mb-1 small">Payouts</div>
                  <div className="fw-bold text-dark fs-4">{kpis.pendingCount}</div>
                  <div className="text-muted small">{formatCurrency(kpis.pendingAmount)}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card border shadow-none h-100">
              <div className="card-body d-flex align-items-center">
                <div className="flex-shrink-0">
                  <div className="w-60-px h-60-px bg-success-subtle rounded-circle d-flex align-items-center justify-content-center">
                    <Icon icon="heroicons:users" className="text-success text-2xl" />
                  </div>
                </div>
                <div className="flex-grow-1 ms-3">
                  <div className="text-muted mb-1 small">Active</div>
                  <div className="text-muted mb-1 small">Employees</div>
                  <div className="fw-bold text-dark fs-4">{kpis.activeEmployees}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card border shadow-none h-100">
              <div className="card-body d-flex align-items-center">
                <div className="flex-shrink-0">
                  <div className="w-60-px h-60-px bg-info-subtle rounded-circle d-flex align-items-center justify-content-center">
                    <Icon icon="heroicons:calendar" className="text-info text-2xl" />
                  </div>
                </div>
                <div className="flex-grow-1 ms-3">
                  <div className="text-muted mb-1 small">Last</div>
                  <div className="text-muted mb-1 small">Payout</div>
                  <div className="fw-bold text-dark fs-4">
                    {kpis.lastPayout !== 'N/A' ? formatDate(kpis.lastPayout).split(' ').slice(0, 2).join(' ') : 'N/A'}
                  </div>
                  {kpis.lastPayout !== 'N/A' && (
                    <div className="fw-bold text-dark fs-4">
                      {formatDate(kpis.lastPayout).split(' ')[2]}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

    {/* Filters and Search */}
    <div className="card border shadow-none mb-4">
      <div className="card-body">
        <div className="d-flex flex-wrap gap-3 align-items-center">
          {/* Search */}
          <div className="position-relative flex-fill" style={{ minWidth: '300px' }}>
            <Icon icon="heroicons:magnifying-glass" className="position-absolute top-50 translate-middle-y text-muted ms-3" />
            <input
              type="text"
              placeholder="Search by name or department..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-control ps-5"
            />
          </div>

          {/* Status Filter */}
          <div style={{ minWidth: '150px' }}>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="form-select"
            >
              <option value="All">All Statuses</option>
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
              <option value="On Hold">On Hold</option>
            </select>
          </div>

              {/* Action Buttons */}
              <div className="d-flex gap-2">
                <button
                  onClick={processPayroll}
                  className="btn btn-success d-flex align-items-center"
                >
                  <Icon icon="heroicons:play" className="me-2" />
                  Process Payroll
                </button>
                <button
                  onClick={exportAllCSV}
                  className="btn btn-primary d-flex align-items-center"
                >
                  <Icon icon="heroicons:document-arrow-down" className="me-2" />
                  Export CSV
                </button>
              </div>
        </div>
      </div>
    </div>

    {/* Payroll Table */}
    <div className="card border shadow-none">
      <div className="card-header bg-transparent border-0">
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Payroll Records</h5>
          <div className="d-flex gap-2">
            <button 
              onClick={approveAllPayroll}
              className="btn btn-outline-success"
            >
              <Icon icon="heroicons:check-circle" className="me-2" />
              Approve All
            </button>
            <button 
              onClick={refreshData}
              className="btn btn-outline-primary"
            >
              <Icon icon="heroicons:arrow-path" className="me-2" />
              Refresh
            </button>
          </div>
        </div>
      </div>
      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead className="bg-light">
              <tr>
                <th 
                  className="border-0 px-4 py-3 text-uppercase small fw-semibold text-muted cursor-pointer"
                  onClick={() => handleSort('employee')}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="d-flex align-items-center gap-2">
                    Name
                    <Icon 
                      icon={`heroicons:chevron-${sortConfig.key === 'employee' && sortConfig.direction === 'asc' ? 'up' : 'down'}`} 
                      className="small" 
                    />
                  </div>
                </th>
                <th className="border-0 px-4 py-3 text-uppercase small fw-semibold text-muted">Department</th>
                <th 
                  className="border-0 px-4 py-3 text-uppercase small fw-semibold text-muted cursor-pointer"
                  onClick={() => handleSort('netPay')}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="d-flex align-items-center gap-2">
                    Amount
                    <Icon 
                      icon={`heroicons:chevron-${sortConfig.key === 'netPay' && sortConfig.direction === 'asc' ? 'up' : 'down'}`} 
                      className="small" 
                    />
                  </div>
                </th>
                <th className="border-0 px-4 py-3 text-uppercase small fw-semibold text-muted">Status</th>
                <th 
                  className="border-0 px-4 py-3 text-uppercase small fw-semibold text-muted cursor-pointer"
                  onClick={() => handleSort('payDate')}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="d-flex align-items-center gap-2">
                    Date
                    <Icon 
                      icon={`heroicons:chevron-${sortConfig.key === 'payDate' && sortConfig.direction === 'asc' ? 'up' : 'down'}`} 
                      className="small" 
                    />
                  </div>
                </th>
                <th className="border-0 px-4 py-3 text-center text-uppercase small fw-semibold text-muted">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((record) => (
                <tr key={record.id} className="border-bottom">
                  <td className="px-4 py-3">
                    <div className="d-flex align-items-center">
                      <div className="w-40-px h-40-px bg-light rounded-circle d-flex align-items-center justify-content-center me-3">
                        <Icon icon="heroicons:user" className="text-muted" />
                      </div>
                      <div>
                        <div className="fw-medium text-dark">{record.employee}</div>
                        <div className="small text-muted">{record.employeeId}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-muted">{record.department}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="fw-semibold text-dark">{formatCurrency(record.netPay)}</div>
                  </td>
                  <td className="px-4 py-3">
                    {getStatusBadge(record.status)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-muted">{formatDate(record.payDate)}</div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => downloadPayslip(record)}
                      className="btn btn-sm btn-outline-primary d-flex align-items-center gap-1"
                    >
                      <Icon icon="heroicons:document-arrow-down" />
                      Payslip
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {paginatedData.length === 0 && (
          <div className="text-center py-5 text-muted">
            <Icon icon="heroicons:currency-dollar" className="text-4xl mb-3" />
            <h5>No payroll records found</h5>
            <p>No records found matching your search criteria.</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-4 py-3 border-top d-flex align-items-center justify-content-between">
            <div className="small text-muted">
              Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, sortedData.length)} of {sortedData.length} employees
            </div>
            <div className="d-flex gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="btn btn-sm btn-outline-secondary"
              >
                Previous
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`btn btn-sm ${
                    currentPage === i + 1
                      ? 'btn-primary'
                      : 'btn-outline-secondary'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="btn btn-sm btn-outline-secondary"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>

    {/* Payroll Details Modal */}
    {showModal && selectedRecord && (
      <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title d-flex align-items-center gap-2">
                <Icon icon="heroicons:currency-dollar" />
                Payroll Details - {selectedRecord.employee}
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setShowModal(false)}
              ></button>
            </div>
            <div className="modal-body">
              <div className="row g-4">
                <div className="col-md-6">
                  <h6 className="fw-semibold mb-3">Employee Information</h6>
                  <div className="mb-2">
                    <label className="form-label small fw-semibold">Name</label>
                    <p className="form-control-plaintext">{selectedRecord.employee}</p>
                  </div>
                  <div className="mb-2">
                    <label className="form-label small fw-semibold">Employee ID</label>
                    <p className="form-control-plaintext">{selectedRecord.employeeId}</p>
                  </div>
                  <div className="mb-2">
                    <label className="form-label small fw-semibold">Department</label>
                    <p className="form-control-plaintext">{selectedRecord.department}</p>
                  </div>
                  <div className="mb-2">
                    <label className="form-label small fw-semibold">Position</label>
                    <p className="form-control-plaintext">{selectedRecord.position}</p>
                  </div>
                </div>
                <div className="col-md-6">
                  <h6 className="fw-semibold mb-3">Payroll Breakdown</h6>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Basic Salary:</span>
                    <span className="fw-semibold">{formatCurrency(selectedRecord.basicSalary)}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Overtime:</span>
                    <span className="text-success">{formatCurrency(selectedRecord.overtime)}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Bonus:</span>
                    <span className="text-info">{formatCurrency(selectedRecord.bonus)}</span>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between mb-2">
                    <span>Gross Pay:</span>
                    <span className="fw-semibold">{formatCurrency(selectedRecord.basicSalary + selectedRecord.overtime + selectedRecord.bonus)}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Deductions:</span>
                    <span className="text-danger">-{formatCurrency(selectedRecord.deductions)}</span>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between mb-2">
                    <span className="fw-bold">Net Pay:</span>
                    <span className="fw-bold text-primary">{formatCurrency(selectedRecord.netPay)}</span>
                  </div>
                </div>
              </div>
              <div className="row g-3 mt-3">
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Pay Period</label>
                  <p className="form-control-plaintext">{selectedRecord.payPeriod}</p>
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Pay Date</label>
                  <p className="form-control-plaintext">{formatDate(selectedRecord.payDate)}</p>
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Status</label>
                  <div>{getStatusBadge(selectedRecord.status)}</div>
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
              <button 
                type="button" 
                className="btn btn-primary"
                onClick={() => editPayrollRecord(selectedRecord)}
              >
                <Icon icon="heroicons:pencil" className="me-2" />
                Edit Payroll
              </button>
            </div>
          </div>
        </div>
      </div>
    )}
  </div>
  );
};

export default Payroll;
