import { Link } from "react-router-dom";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../firebase/AuthProvider";
import { FaHome } from "react-icons/fa";
import { IoCreate } from "react-icons/io5";
import { RiSurveyFill } from "react-icons/ri";
import { MdAdminPanelSettings } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { MdManageAccounts } from "react-icons/md";
import { MdOutlineManageSearch } from "react-icons/md";
import { FaDatabase } from "react-icons/fa";

const MySidebar = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);
  const { isPending, error, data } = useQuery({
    queryKey: ["sideBar"],
    queryFn: async () => {
      const response = await axiosPublic.get("/users");
      return response.data;
    },
  });

  const filter = data?.find((item) => item?.email === user?.email);
  //  console.log(filter);

  if (isPending)
    return <span className="loading loading-dots loading-lg"></span>;

  if (error) return console.log(error.message);

  return (
    <div className="bg-neutral text-neutral-content h-full p-4 font-semibold">
      <h1 className="capitalize text-lg">
        My Role : <span className="font-bold text-info">{filter?.role}</span>
      </h1>
      <hr />
      <ul className="mt-4 space-y-1 sm:space-y-2 md:space-y-3 lg:space-y-4 capitalize">
        <li className="hover:bg-base-content p-2 rounded">
          <Link to="/">
            Go back to Home <FaHome />
          </Link>
        </li>
        {/* surveyor */}
        {filter?.role === "surveyor" && (
          <>
            <li className="hover:bg-base-content p-2 rounded">
              <Link to="survey-creation">
                Create Survey
                <IoCreate />
              </Link>
            </li>
            <li className="hover:bg-base-content p-2 rounded">
              <Link to="my-surveys">
                My Surveys
                <RiSurveyFill />
              </Link>
            </li>

            <li className="hover:bg-base-content p-2 rounded">
              <Link to="admin-feedback">
                Admin Feedback
                <MdAdminPanelSettings />
              </Link>
            </li>
            <li className="hover:bg-base-content p-2 rounded">
              <Link to="user-feedback">
                User Feedbacks
                <FaUser />
              </Link>
            </li>
          </>
        )}
        {/* admin */}
        {filter?.role === "admin" && (
          <>
            <li className="hover:bg-base-content p-2 rounded">
              <Link to="manage-users">
                Manage users
                <MdManageAccounts />
              </Link>
            </li>
            <li className="hover:bg-base-content p-2 rounded">
              <Link to="manage-survey">
                Manage Survey
                <MdOutlineManageSearch />
              </Link>
            </li>
          </>
        )}
        {/* user and pro-user */}
        {filter?.role === "user" || filter?.role === "pro-user" ? (
          <>
            <li className="hover:bg-base-content p-2 rounded">
              <Link to="participated-surveys">
                Participated Surveys
                <FaDatabase />
              </Link>
            </li>
          </>
        ) : (
          ""
        )}
      </ul>
    </div>
  );
};

export default MySidebar;
