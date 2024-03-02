import { Outlet } from "react-router-dom";
import MyNavbar from "./MyNavbar";
import MyFooter from "./MyFooter";

const Root = () => {
  return (
    <>
      <MyNavbar />

      <div className="container mx-auto pt-20 min-h-[calc(100vh-68px)]">
        <Outlet></Outlet>
      </div>
      <MyFooter></MyFooter>
    </>
  );
};

export default Root;
