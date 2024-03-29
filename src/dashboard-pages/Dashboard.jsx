import { Outlet } from "react-router-dom";
import MySidebar from "./MySidebar";

const Dashboard = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between container mx-auto w-screen min-h-screen">
      <div className="md:w-1/4 lg:w-1/5">
        <MySidebar />
      </div>
      <div className="md:w-3/4 lg:w-4/5">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
