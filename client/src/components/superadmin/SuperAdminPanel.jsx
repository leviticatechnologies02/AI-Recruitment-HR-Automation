import React from 'react';
import { useLocation } from 'react-router-dom';
import Sidebars from '../sidebar/Sidebars';
import SuperAdminHeader from './SuperAdminHeader';
import SuperAdminCounters from './SuperAdminCounters';

// Import recruitment components
import PostJob from '../recruitment/PostJob';
import HiringFunnel from '../recruitment/HiringFunnel';
import TimeToHire from '../recruitment/TimeToHire';
import SelectedCandidates from '../recruitment/SelectedCandidates';
import CandidatesGenerator from '../recruitment/CandidatesGenerator';

const SuperAdminPanel = () => {
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
      case '/candidates-generator':
        return <CandidatesGenerator />;
      case '/super-admin':
      default:
        return (
          <>
            <SuperAdminHeader title='Administration'/>
            <SuperAdminCounters/>
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
  );
};

export default SuperAdminPanel;
