import { Outlet } from "react-router-dom";
import MySidebar from "./MySidebar";

const Dashboard = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between container mx-auto min-h-screen w-screen">
      <div className="md:w-1/4 lg:w-1/5">
        <MySidebar></MySidebar>
      </div>
      <div className="md:w-3/4 lg:w-4/5">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
