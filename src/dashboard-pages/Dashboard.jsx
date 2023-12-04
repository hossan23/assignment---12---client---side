import { Outlet } from 'react-router-dom';
import MySidebar from './MySidebar';

const Dashboard = () => {
 return (
  <div className="flex flex-col md:flex-row justify-between container mx-auto">
   <div className="">
    <MySidebar></MySidebar>
   </div>
   <div className="flex-1 mx-2">
    <Outlet></Outlet>
   </div>
  </div>
 );
};

export default Dashboard;
