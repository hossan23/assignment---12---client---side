import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./firebase/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./hooks/useAxiosPublic";
import Swal from "sweetalert2";
import Headroom from "react-headroom";

const MyNavbar = () => {
  const { logOut, user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const { isPending, error, data } = useQuery({
    queryKey: ["navOnRole"],
    queryFn: async () => {
      const response = await axiosPublic.get("/users");
      return response.data;
    },
  });

  const userRole = data?.find((item) => item?.email === user?.email);

  if (isPending) return;

  if (error) return "An error has occurred: " + error.message;
  const handleLogOut = () => {
    logOut()
      .then((res) => {
        console.log("logged Out");
        navigate("/");
        Swal.fire("Logged out successfully!");
        console.log(res.data);
      })
      .catch((err) => console.log(err.message));
  };

  const navi = (
    <>
      <Link className="hover:scale-105 transition" to="/">
        Home
      </Link>
      <Link className="hover:scale-105 transition" to="/surveys-page">
        Surveys Page
      </Link>
      <Link className="hover:scale-105 transition" to="/about">
        About Us
      </Link>
      <Link className="hover:scale-105 transition" to="/contact">
        Contact Us
      </Link>
      <Link className="hover:scale-105 transition" to="/privacy">
        Privacy & Policy
      </Link>
      {userRole?.role === "user" && <Link to="/become-pro">Become A pro</Link>}
    </>
  );
  return (
    <>
      <Headroom>
        <div className="navbar bg-info text-info-content sm:rounded-b-2xl">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>

              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content z-[1] p-2 shadow bg-neutral text-neutral-content rounded-box w-40"
              >
                {navi}
              </ul>
            </div>
            <Link to="/" className="btn btn-ghost text-xl">
              <img
                src="/surveyor.png"
                className="h-6 sm:h-9"
                alt="Flowbite React Logo"
              />
              InsightPulse!
            </Link>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 space-x-10 text-lg font-medium">
              {navi}
            </ul>
          </div>
          <div className="navbar-end">
            <details className="dropdown">
              <summary className="m-1 btn bg-neutral border-none">
                <img
                  className="w-10 rounded-full"
                  src={user?.photoURL ? user.photoURL : "user.png"}
                />
              </summary>
              <ul className="p-2 shadow menu dropdown-content z-[1] bg-neutral text-neutral-content rounded-box right-0 space-y-2 ">
                {user ? (
                  <>
                    <span className="block text-sm">{user?.displayName}</span>
                    <span className="block truncate text-sm font-medium">
                      {user?.email}
                    </span>
                    <hr />
                    <Link className="btn btn-success btn-sm" to="/dashboard">
                      Dashboard
                    </Link>
                    <hr />
                    <button
                      className="btn btn-sm btn-error"
                      onClick={handleLogOut}
                    >
                      Sign out
                    </button>
                  </>
                ) : (
                  <>
                    <Link className="btn btn-sm" to="/register">
                      Register
                    </Link>
                    <hr />
                    <Link className="btn btn-sm" to="/login">
                      Login
                    </Link>
                  </>
                )}
              </ul>
            </details>
          </div>
        </div>
      </Headroom>
    </>
  );
};

export default MyNavbar;
