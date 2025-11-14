import React, { useState, useMemo } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Users, Calendar, Clock, TrendingUp, Award, Download, Filter, ChevronDown, Eye, ArrowUp, ArrowDown, UserPlus, CalendarCheck, Timer, Target, Trophy, X } from 'lucide-react';

// Mock data for recruiter performance
const mockRecruiterData = [
  {
    id: 1,
    name: 'Nagendra Uggirala',
    candidatesAdded: 24,
    interviewsScheduled: 10,
    timeToHire: 14,
    offerAcceptanceRate: 80,
    hires: 4,
    pipelineData: {
      applied: 24,
      screening: 18,
      interview: 10,
      offer: 5,
      hired: 4
    },
    monthlyHires: [
      { month: 'Jan', hires: 3, timeToHire: 16 },
      { month: 'Feb', hires: 4, timeToHire: 14 },
      { month: 'Mar', hires: 2, timeToHire: 12 },
      { month: 'Apr', hires: 4, timeToHire: 14 }
    ]
  },
  {
    id: 2,
    name: 'Aisha Sharma',
    candidatesAdded: 15,
    interviewsScheduled: 6,
    timeToHire: 18,
    offerAcceptanceRate: 70,
    hires: 2,
    pipelineData: {
      applied: 15,
      screening: 12,
      interview: 6,
      offer: 3,
      hired: 2
    },
    monthlyHires: [
      { month: 'Jan', hires: 2, timeToHire: 20 },
      { month: 'Feb', hires: 1, timeToHire: 18 },
      { month: 'Mar', hires: 3, timeToHire: 16 },
      { month: 'Apr', hires: 2, timeToHire: 18 }
    ]
  },
  {
    id: 3,
    name: ' Kumar',
    candidatesAdded: 32,
    interviewsScheduled: 16,
    timeToHire: 12,
    offerAcceptanceRate: 85,
    hires: 6,
    pipelineData: {
      applied: 32,
      screening: 25,
      interview: 16,
      offer: 7,
      hired: 6
    },
    monthlyHires: [
      { month: 'Jan', hires: 5, timeToHire: 13 },
      { month: 'Feb', hires: 6, timeToHire: 12 },
      { month: 'Mar', hires: 4, timeToHire: 11 },
      { month: 'Apr', hires: 6, timeToHire: 12 }
    ]
  },
  {
    id: 4,
    name: 'Priya Singh',
    candidatesAdded: 19,
    interviewsScheduled: 8,
    timeToHire: 16,
    offerAcceptanceRate: 75,
    hires: 3,
    pipelineData: {
      applied: 19,
      screening: 15,
      interview: 8,
      offer: 4,
      hired: 3
    },
    monthlyHires: [
      { month: 'Jan', hires: 2, timeToHire: 17 },
      { month: 'Feb', hires: 3, timeToHire: 16 },
      { month: 'Mar', hires: 2, timeToHire: 15 },
      { month: 'Apr', hires: 3, timeToHire: 16 }
    ]
  }
];

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

export default function RecruiterPerformance() {
  const [selectedRecruiter, setSelectedRecruiter] = useState('all');
  const [dateRange, setDateRange] = useState('30');
  const [jobRole, setJobRole] = useState('all');
  const [showDrillDown, setShowDrillDown] = useState(null);
  const [selectedRecruiterDetails, setSelectedRecruiterDetails] = useState(null);
  const [sortBy, setSortBy] = useState('hires');
  const [sortOrder, setSortOrder] = useState('desc');

  // Filter and sort data
  const filteredData = useMemo(() => {
    let data = mockRecruiterData;
    
    if (selectedRecruiter !== 'all') {
      data = data.filter(r => r.id === parseInt(selectedRecruiter));
    }

    // Sort data
    data.sort((a, b) => {
      const aVal = a[sortBy];
      const bVal = b[sortBy];
      return sortOrder === 'desc' ? bVal - aVal : aVal - bVal;
    });

    return data;
  }, [selectedRecruiter, dateRange, jobRole, sortBy, sortOrder]);

  // Static metrics as requested
  const totalMetrics = {
    candidatesAdded: 90,
    interviewsScheduled: 40,
    avgTimeToHire: 15,
    avgOfferAcceptance: 78,
    totalHires: 15
  };

  // Chart data
  const barChartData = filteredData.map(r => ({
    name: r.name.split(' ')[0],
    candidates: r.candidatesAdded,
    interviews: r.interviewsScheduled,
    hires: r.hires
  }));

  const timeToHireData = filteredData[0]?.monthlyHires || [];

  const pipelineData = selectedRecruiter !== 'all' && filteredData.length === 1
    ? Object.entries(filteredData[0].pipelineData).map(([stage, count]) => ({
        name: stage.charAt(0).toUpperCase() + stage.slice(1),
        value: count
      }))
    : [
        { name: 'Applied', value: filteredData.reduce((sum, r) => sum + r.pipelineData.applied, 0) },
        { name: 'Screening', value: filteredData.reduce((sum, r) => sum + r.pipelineData.screening, 0) },
        { name: 'Interview', value: filteredData.reduce((sum, r) => sum + r.pipelineData.interview, 0) },
        { name: 'Offer', value: filteredData.reduce((sum, r) => sum + r.pipelineData.offer, 0) },
        { name: 'Hired', value: filteredData.reduce((sum, r) => sum + r.pipelineData.hired, 0) }
      ];

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const getSortIcon = (field) => {
    if (sortBy !== field) return null;
    return sortOrder === 'desc' ? <ArrowDown size={14} /> : <ArrowUp size={14} />;
  };

  // Export selected recruiter details as CSV
  const exportRecruiterDetails = (details) => {
    if (!details) return;
    const csvEscape = (val) => {
      if (val === null || val === undefined) return '""';
      return '"' + String(val).replace(/"/g, '""') + '"';
    };

    const parts = [];
    // Header / Basic info
    parts.push('Metric,Value');
    parts.push([ 'Name', details.name ].map(csvEscape).join(','));
    parts.push([ 'Candidates', details.candidatesAdded ].map(csvEscape).join(','));
    parts.push([ 'Interviews', details.interviewsScheduled ].map(csvEscape).join(','));
    parts.push([ 'Avg Time To Hire (days)', details.timeToHire ].map(csvEscape).join(','));
    parts.push([ 'Offer Acceptance Rate (%)', details.offerAcceptanceRate ].map(csvEscape).join(','));
    parts.push([ 'Hires', details.hires ].map(csvEscape).join(','));

    parts.push('');
    // Pipeline breakdown
    parts.push('Pipeline Stage,Count');
    Object.entries(details.pipelineData).forEach(([stage, count]) => {
      parts.push([ stage, count ].map(csvEscape).join(','));
    });

    parts.push('');
    // Monthly hires
    parts.push('Month,Hires,TimeToHire');
    (details.monthlyHires || []).forEach(m => {
      parts.push([ m.month, m.hires, m.timeToHire ].map(csvEscape).join(','));
    });

    const csv = parts.join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const fileNameSafe = details.name ? details.name.replace(/[^a-z0-9-_\. ]/gi, '_') : 'recruiter';
    const a = document.createElement('a');
    a.href = url;
    a.download = `recruiter-${fileNameSafe}-details.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  // Export summary report for currently filtered data
  const exportReport = () => {
    const csvEscape = (val) => {
      if (val === null || val === undefined) return '""';
      return '"' + String(val).replace(/"/g, '""') + '"';
    };

    const parts = [];
    // include selected filters
    parts.push(`Filters,Date Range=${dateRange},Recruiter=${selectedRecruiter},JobRole=${jobRole}`);
    parts.push('');

    // include summary metrics
    parts.push('Summary,Value');
    parts.push([ 'Total Recruiters', filteredData.length ].map(csvEscape).join(','));
    parts.push([ 'Total Candidates (sum)', filteredData.reduce((s, r) => s + r.candidatesAdded, 0) ].map(csvEscape).join(','));
    parts.push([ 'Total Interviews (sum)', filteredData.reduce((s, r) => s + r.interviewsScheduled, 0) ].map(csvEscape).join(','));
    parts.push([ 'Total Hires (sum)', filteredData.reduce((s, r) => s + r.hires, 0) ].map(csvEscape).join(','));
    parts.push('');

    // table header for per-recruiter data
    parts.push('Recruiter,Candidates,Interviews,TimeToHire,OfferAcceptanceRate,Hires');
    filteredData.forEach(r => {
      parts.push([
        r.name,
        r.candidatesAdded,
        r.interviewsScheduled,
        r.timeToHire,
        r.offerAcceptanceRate,
        r.hires
      ].map(csvEscape).join(','));
    });

    // pipeline totals
    parts.push('');
    parts.push('Pipeline Stage,Count');
    const pipelineTotals = {
      applied: filteredData.reduce((s, r) => s + (r.pipelineData?.applied || 0), 0),
      screening: filteredData.reduce((s, r) => s + (r.pipelineData?.screening || 0), 0),
      interview: filteredData.reduce((s, r) => s + (r.pipelineData?.interview || 0), 0),
      offer: filteredData.reduce((s, r) => s + (r.pipelineData?.offer || 0), 0),
      hired: filteredData.reduce((s, r) => s + (r.pipelineData?.hired || 0), 0)
    };
    Object.entries(pipelineTotals).forEach(([k, v]) => parts.push([k, v].map(csvEscape).join(',')));

    const csv = parts.join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const now = new Date().toISOString().slice(0,19).replace(/[:T]/g, '-');
    a.download = `recruiter-report-${now}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container-fluid py-4">
      <div className="mb-12">
        <h4 className="mb-2">Recruiter Performance</h4>
        <p className="text-secondary-light mb-0">Track performance and efficiency of recruiters.</p>
      </div>

      <div className="card border shadow-none mb-24">
        <div className="card-body p-24">
          <div className="d-flex flex-wrap align-items-center gap-2 mb-3">
            <Filter className="text-secondary-light" />
            <span className="fw-medium">Filters:</span>
          </div>
          <div className="row g-2 align-items-center">
            <div className="col-12 col-md-3">
              <select value={dateRange} onChange={(e) => setDateRange(e.target.value)} className="form-select">
                <option value="7">Last 7 days</option>
                <option value="30">Last 30 days</option>
                <option value="90">Quarter</option>
                <option value="custom">Custom</option>
              </select>
            </div>
            <div className="col-12 col-md-3">
              <select value={selectedRecruiter} onChange={(e) => setSelectedRecruiter(e.target.value)} className="form-select">
                <option value="all">All Recruiters</option>
                {mockRecruiterData.map(recruiter => (
                  <option key={recruiter.id} value={recruiter.id}>{recruiter.name}</option>
                ))}
              </select>
            </div>
            <div className="col-12 col-md-3">
              <select value={jobRole} onChange={(e) => setJobRole(e.target.value)} className="form-select">
                <option value="all">All Job Roles</option>
                <option value="engineering">Engineering</option>
                <option value="sales">Sales</option>
                <option value="marketing">Marketing</option>
              </select>
            </div>
            <div className="col-12 col-md-3 d-flex justify-content-md-end">
              <button className="btn btn-primary d-inline-flex align-items-center gap-2" onClick={exportReport}>
                <Download size={16} />
                <span>Export Report</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-md-4">
          <div className="card border-0 shadow-sm h-100" style={{backgroundColor: '#e3f2fd'}}>
            <div className="card-body p-4 d-flex align-items-center justify-content-between" style={{minHeight: '96px'}}>
              <div>
                <div className="text-primary fw-semibold small">Active Jobs</div>
                <div className="h3 mb-0 text-primary fw-bold">12</div>
              </div>
              <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" style={{width: '48px', height: '48px'}}>
                <CalendarCheck size={24} />
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="card border-0 shadow-sm h-100" style={{backgroundColor: '#e8f5e8'}}>
            <div className="card-body p-4 d-flex align-items-center justify-content-between" style={{minHeight: '96px'}}>
              <div>
                <div className="text-success fw-semibold small">Avg. Time-to-Hire</div>
                <div className="h3 mb-0 text-success fw-bold">18 days</div>
              </div>
              <div className="bg-success text-white rounded-circle d-flex align-items-center justify-content-center" style={{width: '48px', height: '48px'}}>
                <Clock size={24} />
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="card border-0 shadow-sm h-100" style={{backgroundColor: '#fff3e0'}}>
            <div className="card-body p-4 d-flex align-items-center justify-content-between" style={{minHeight: '96px'}}>
              <div>
                <div className="text-warning fw-semibold small">Applications This Week</div>
                <div className="h3 mb-0 text-warning fw-bold">56</div>
              </div>
              <div className="bg-warning text-white rounded-circle d-flex align-items-center justify-content-center" style={{width: '48px', height: '48px'}}>
                <TrendingUp size={24} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-3 mb-24">
        <div className="col-12 col-lg-6">
          <div className="card border shadow-none h-100">
            <div className="card-body p-24">
              <h6 className="mb-3">Candidates Processed by Recruiter</h6>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={barChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="candidates" fill="#3b82f6" name="Candidates" />
                  <Bar dataKey="interviews" fill="#10b981" name="Interviews" />
                  <Bar dataKey="hires" fill="#f59e0b" name="Hires" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-6">
          <div className="card border shadow-none h-100">
            <div className="card-body p-24">
              <h6 className="mb-3">Time-to-Hire Trend</h6>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={timeToHireData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="timeToHire" stroke="#3b82f6" strokeWidth={2} name="Time to Hire (days)" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-6">
          <div className="card border shadow-none h-100">
            <div className="card-body p-24">
              <h6 className="mb-3">Pipeline Distribution</h6>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={pipelineData} cx="50%" cy="50%" labelLine={false} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} outerRadius={60} dataKey="value">
                    {pipelineData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-6">
          <div className="card border shadow-none h-100">
            <div className="card-body p-24">
              <h6 className="mb-3">Top Performers</h6>
              <div className="d-grid gap-2">
                {filteredData.slice(0, 3).map((recruiter, index) => (
                  <div key={recruiter.id} className="d-flex align-items-center gap-2">
                    <span className="w-24-px h-24-px bg-primary-600 text-white rounded-circle d-flex justify-content-center align-items-center text-xs fw-bold">{index + 1}</span>
                    <div className="flex-grow-1 text-truncate">
                      <div className="fw-medium text-sm text-truncate">{recruiter.name}</div>
                      <div className="text-xs text-secondary-light">{recruiter.hires} hires • {recruiter.timeToHire}d avg</div>
                    </div>
                    <div className="text-end">
                      <div className="fw-semibold text-success text-sm">{recruiter.offerAcceptanceRate}%</div>
                      <div className="text-xs text-secondary-light">accept</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recruiter Comparison */}
      <div className="card border shadow-sm">
        <div className="card-header bg-white border-bottom">
          <h6 className="mb-0">Recruiter Comparison</h6>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th className="text-start fw-semibold">Recruiter</th>
                  <th className="text-center fw-semibold" onClick={() => handleSort('candidatesAdded')} style={{cursor:'pointer'}}>
                    Candidates Added {getSortIcon('candidatesAdded')}
                  </th>
                  <th className="text-center fw-semibold" onClick={() => handleSort('interviewsScheduled')} style={{cursor:'pointer'}}>
                    Interviews {getSortIcon('interviewsScheduled')}
                  </th>
                  <th className="text-center fw-semibold" onClick={() => handleSort('hires')} style={{cursor:'pointer'}}>
                    Hires {getSortIcon('hires')}
                  </th>
                  <th className="text-center fw-semibold" onClick={() => handleSort('timeToHire')} style={{cursor:'pointer'}}>
                    Time-to-Hire {getSortIcon('timeToHire')}
                  </th>
                  <th className="text-center fw-semibold" onClick={() => handleSort('offerAcceptanceRate')} style={{cursor:'pointer'}}>
                    Offer % {getSortIcon('offerAcceptanceRate')}
                  </th>
                  <th className="text-center fw-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((recruiter) => (
                  <tr key={recruiter.id}>
                    <td className="text-start">
                      <div className="d-flex align-items-center gap-3">
                        <div className="bg-primary text-white rounded-circle d-flex justify-content-center align-items-center fw-bold" style={{width: '40px', height: '40px'}}>
                          {recruiter.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="fw-medium">{recruiter.name}</span>
                      </div>
                    </td>
                    <td className="text-center">
                      <span className="fw-semibold">{recruiter.candidatesAdded}</span>
                    </td>
                    <td className="text-center">
                      <span className="fw-semibold">{recruiter.interviewsScheduled}</span>
                    </td>
                    <td className="text-center">
                      <span className="badge bg-success-subtle text-success px-3 py-2 fw-semibold">
                        {recruiter.hires}
                      </span>
                    </td>
                    <td className="text-center">
                      <span className="fw-semibold">{recruiter.timeToHire} days</span>
                    </td>
                    <td className="text-center">
                      <div className="d-flex align-items-center justify-content-center gap-2">
                        <div className="bg-light rounded-pill" style={{width:'80px', height:'8px'}}>
                          <div className="bg-primary rounded-pill" style={{width: `${recruiter.offerAcceptanceRate}%`, height:'8px'}}></div>
                        </div>
                        <span className="fw-semibold small">{recruiter.offerAcceptanceRate}%</span>
                      </div>
                    </td>
                    <td className="text-center">
                      <button 
                        onClick={() => setSelectedRecruiterDetails(recruiter)} 
                        className="btn btn-outline-primary btn-sm d-flex align-items-center gap-1"
                      >
                        <Eye size={14} /> View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {selectedRecruiterDetails && (
        <>
          <div className="modal d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-xl" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <div className="d-flex align-items-center gap-3">
                    <span className="w-48-px h-48-px bg-primary-600 text-white rounded-circle d-flex justify-content-center align-items-center fw-bold">{selectedRecruiterDetails.name.split(' ').map(n => n[0]).join('')}</span>
                    <div>
                      <h6 className="mb-0">{selectedRecruiterDetails.name}</h6>
                      <div className="text-secondary-light">Recruiter Performance Details</div>
                    </div>
                  </div>
                  <button type="button" className="btn-close" aria-label="Close" onClick={() => setSelectedRecruiterDetails(null)}></button>
                </div>
                <div className="modal-body">
                  <div className="row g-3 mb-3">
                    <div className="col-6 col-md-4 col-xl-2">
                      <div className="border rounded p-16 text-center h-100">
                        <div className="h5 mb-0 text-primary-600">{selectedRecruiterDetails.candidatesAdded}</div>
                        <div className="text-secondary-light text-sm">Candidates</div>
                      </div>
                    </div>
                    <div className="col-6 col-md-4 col-xl-2">
                      <div className="border rounded p-16 text-center h-100">
                        <div className="h5 mb-0 text-success">{selectedRecruiterDetails.interviewsScheduled}</div>
                        <div className="text-secondary-light text-sm">Interviews</div>
                      </div>
                    </div>
                    <div className="col-6 col-md-4 col-xl-2">
                      <div className="border rounded p-16 text-center h-100">
                        <div className="h5 mb-0 text-warning">{selectedRecruiterDetails.timeToHire}</div>
                        <div className="text-secondary-light text-sm">Days Avg</div>
                      </div>
                    </div>
                    <div className="col-6 col-md-4 col-xl-2">
                      <div className="border rounded p-16 text-center h-100">
                        <div className="h5 mb-0 text-primary-600">{selectedRecruiterDetails.offerAcceptanceRate}%</div>
                        <div className="text-secondary-light text-sm">Acceptance</div>
                      </div>
                    </div>
                    <div className="col-6 col-md-4 col-xl-2">
                      <div className="border rounded p-16 text-center h-100">
                        <div className="h5 mb-0 text-success">{selectedRecruiterDetails.hires}</div>
                        <div className="text-secondary-light text-sm">Hires</div>
                      </div>
                    </div>
                  </div>

                  <div className="row g-3 mb-3">
                    <div className="col-12 col-lg-6">
                      <div className="border rounded p-16 h-100">
                        <h6 className="mb-3">Pipeline Breakdown</h6>
                        <div className="d-grid gap-2">
                          {Object.entries(selectedRecruiterDetails.pipelineData).map(([stage, count]) => {
                            const percentage = Math.round((count / selectedRecruiterDetails.candidatesAdded) * 100);
                            return (
                              <div key={stage} className="d-flex align-items-center justify-content-between">
                                <div className="d-flex align-items-center gap-2">
                                  <span className="text-sm text-capitalize">{stage}:</span>
                                  <div className="bg-neutral-200 rounded-pill" style={{width:'120px', height:'6px'}}>
                                    <div className="bg-primary-600 rounded-pill" style={{width: `${percentage}%`, height:'6px'}}></div>
                                  </div>
                                </div>
                                <div>
                                  <span className="fw-semibold">{count}</span>
                                  <span className="text-secondary-light text-xs ms-1">({percentage}%)</span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-lg-6">
                      <div className="border rounded p-16 h-100">
                        <h6 className="mb-3">Monthly Performance</h6>
                        <ResponsiveContainer width="100%" height={250}>
                          <BarChart data={selectedRecruiterDetails.monthlyHires}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="hires" fill="#3b82f6" name="Hires" />
                            <Bar dataKey="timeToHire" fill="#10b981" name="Time to Hire (days)" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded p-16">
                    <h6 className="mb-3">Performance Insights</h6>
                    <div className="row g-2">
                      <div className="col-12 col-md-6 d-grid gap-2">
                        <div className="d-flex align-items-center gap-2"><span className="w-8-px h-8-px rounded-circle bg-success"></span><span className="text-sm"><strong>Conversion Rate:</strong> {Math.round((selectedRecruiterDetails.hires / selectedRecruiterDetails.candidatesAdded) * 100)}% from candidates to hires</span></div>
                        <div className="d-flex align-items-center gap-2"><span className="w-8-px h-8-px rounded-circle bg-primary-600"></span><span className="text-sm"><strong>Interview Success:</strong> {Math.round((selectedRecruiterDetails.hires / selectedRecruiterDetails.interviewsScheduled) * 100)}% of interviews lead to hires</span></div>
                      </div>
                      <div className="col-12 col-md-6 d-grid gap-2">
                        <div className="d-flex align-items-center gap-2"><span className="w-8-px h-8-px rounded-circle bg-warning"></span><span className="text-sm"><strong>Efficiency:</strong> {selectedRecruiterDetails.timeToHire < 15 ? 'Above Average' : selectedRecruiterDetails.timeToHire === 15 ? 'Average' : 'Below Average'} time-to-hire</span></div>
                        <div className="d-flex align-items-center gap-2"><span className="w-8-px h-8-px rounded-circle bg-purple"></span><span className="text-sm"><strong>Offer Success:</strong> {selectedRecruiterDetails.offerAcceptanceRate > 80 ? 'Excellent' : selectedRecruiterDetails.offerAcceptanceRate > 70 ? 'Good' : 'Needs Improvement'} offer acceptance rate</span></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-outline-secondary" onClick={() => setSelectedRecruiterDetails(null)}>Close</button>
                  <button className="btn btn-primary" onClick={() => exportRecruiterDetails(selectedRecruiterDetails)}>Export Details</button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </>
      )}
    </div>
  );
}