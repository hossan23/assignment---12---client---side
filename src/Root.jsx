import { Outlet } from "react-router-dom";
import MyNavbar from "./MyNavbar";
import MyFooter from "./MyFooter";

const Root = () => {
  return (
    <div className="container mx-auto ">
      <MyNavbar />
      <div className="min-h-screen">
        <Outlet />
      </div>
      <MyFooter />
    </div>
  );
};

export default Root;
