import React from 'react';
import Sidebars from '../components/sidebar/Sidebars';

const DashboardLayout = ({ children }) => {
  return (
    <div className="dashboard-layout">
      <Sidebars>
        {children}
      </Sidebars>
    </div>
  );
};

export default DashboardLayout;
