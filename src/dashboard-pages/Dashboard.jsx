import { Link, Outlet } from 'react-router-dom';

const Dashboard = () => {
 return (
  <>
   <div className="flex justify-between container mx-auto min-h-screen">
    <div className="basis-1/4 bg-red-500">
     <ul>
      <li>
       <Link to="/">Home</Link>
      </li>
      <li>
       <Link to="/dashboard/survey-creation">Survey Creation</Link>
      </li>
      <li>
       <Link to="/dashboard/survey-creation">Survey Creation</Link>
      </li>
     </ul>
    </div>
    <div className="basis-3/4 bg-green-500 flex justify-center flex-col">
     <Outlet></Outlet>
    </div>
   </div>
  </>
 );
};

export default Dashboard;
