import React from 'react';
import Sidebars from '../layout/dashboard/Sidebars';
import SuperAdminHeader from './SuperAdminHeader';
import SuperAdminCounters from './SuperAdminCounters';

const SuperAdminPanel = () => {
  
  return (
    <div>
      <Sidebars>
        <SuperAdminHeader title='Administration'/>
        <SuperAdminCounters/>
      </Sidebars>
    </div>
  );
};

export default SuperAdminPanel;
