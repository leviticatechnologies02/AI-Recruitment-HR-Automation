import React from 'react';
import SuperAdminHeader from '../../components/superadmin/SuperAdminHeader';
import SuperAdminCounters from '../../components/superadmin/SuperAdminCounters';

const SuperAdminDashboard = () => {
  return (
    <div className="container-fluid p-4">
      <SuperAdminHeader title='Administration'/>
      <SuperAdminCounters/>
    </div>
  );
};

export default SuperAdminDashboard;
