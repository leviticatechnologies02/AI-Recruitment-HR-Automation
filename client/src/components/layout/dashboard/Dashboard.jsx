
import React from 'react'
import Sidebars from './Sidebars'
import DashBoardHeader from './Child/DashBoardHeader';
import Counters from './Child/Counters';
import SalesStatistic from './Child/SalesStatistic';
import TotalSubscriber from './Child/TotalSubscriber';
import UsersOverview from './Child/UsersOverview';
import LatestRegistered from './Child/LatestRegistered';

const Dashboard = () => {
  
  return (
    <div>
      <Sidebars>
        <DashBoardHeader title='AI'/>
        <Counters/>
        <div className="row gy-4 mt-4">
          <SalesStatistic/>
          <div className="col-xxl-6 col-xl-12">
            <div className="row gy-4">
              <TotalSubscriber/>
              <UsersOverview/>
              <LatestRegistered/>
            </div>
          </div>
        </div>
      </Sidebars>
    </div>
  )
}

export default Dashboard