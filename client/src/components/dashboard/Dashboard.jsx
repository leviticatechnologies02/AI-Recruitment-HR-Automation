
import React from 'react'
import Sidebars from './Sidebars'
import DashBoardHeader from './Child/DashBoardHeader';
import Counters from './Child/Counters';

const Dashboard = () => {
  
  return (
    <div>

      <Sidebars>
        <DashBoardHeader title='AI'/>
       <Counters/>
      </Sidebars>
    </div>

  )
}

export default Dashboard