import { Outlet } from 'react-router-dom';
import MySidebar from './MySidebar';

const Dashboard = () => {
 return (
  <div className="flex justify-between container mx-auto min-h-screen">
   <div>
    <MySidebar></MySidebar>
   </div>
   <div className="flex-1 ml-4">
    <Outlet></Outlet>
   </div>
  </div>
 );
};

export default Dashboard;
