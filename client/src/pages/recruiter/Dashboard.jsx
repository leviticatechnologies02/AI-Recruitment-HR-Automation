
import React from 'react'
import AdminHeader from '../../components/admin/AdminHeader';
import AdminCounters from '../../components/admin/AdminCounters';

const RecruiterDashboard = () => {
  return (
    <div className="container-fluid p-4">
      <AdminHeader title='AI'/>
      <AdminCounters/>
    </div>
  )
}

export default RecruiterDashboard