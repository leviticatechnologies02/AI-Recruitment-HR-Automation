
import React from 'react'
import { useLocation } from 'react-router-dom'
import Sidebars from '../sidebar/Sidebars'
import AdminHeader from './AdminHeader';
import AdminCounters from './AdminCounters';

// Import recruitment components
import PostJob from '../recruitment/PostJob';
import HiringFunnel from '../recruitment/HiringFunnel';
import TimeToHire from '../recruitment/TimeToHire';
import SelectedCandidates from '../recruitment/SelectedCandidates';

const AdminPanel = () => {
  const location = useLocation();
  
  const renderContent = () => {
    switch (location.pathname) {
      case '/post-job':
        return <PostJob />;
      case '/hiring-funnel':
        return <HiringFunnel />;
      case '/time-to-hire':
        return <TimeToHire />;
      case '/selected-candidates':
        return <SelectedCandidates />;
      case '/dashboard':
      default:
        return (
          <>
            <AdminHeader title='AI'/>
            <AdminCounters/>
          </>
        );
    }
  };
  
  return (
    <div>
      <Sidebars>
        {renderContent()}
      </Sidebars>
    </div>
  )
}

export default AdminPanel