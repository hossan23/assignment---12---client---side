import { Outlet } from "react-router-dom";
import MySidebar from "./MySidebar";

const Dashboard = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between container mx-auto h-screen w-screen">
      <MySidebar></MySidebar>
      <Outlet></Outlet>
    </div>
  );
};

export default Dashboard;
