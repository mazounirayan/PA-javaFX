import React from 'react';

import SessionList from '../../components/session/sessionList';
import EmployeeList from '../../components/Employee/EmployeeList';

const Dashboard: React.FC = () => {
  return (
    <>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
      <EmployeeList />
        </div>       
    </>
  );
};

export default Dashboard;
