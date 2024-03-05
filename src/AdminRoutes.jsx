import { useContext } from "react";
import { AuthContext } from "./firebase/AuthProvider";
import { Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./hooks/useAxiosPublic";
import MyLoader from "./MyLoader";

const AdminRoutes = ({ children }) => {
  const { loading } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const { isPending, error, data } = useQuery({
    queryKey: ["adminRoute"],
    queryFn: async () => {
      const response = await axiosPublic.get("/users");
      return response.data;
    },
  });

  if (isPending) return <MyLoader />;

  if (error) return "An error has occurred: " + error.message;

  const admin = data?.find((item) => item?.role === "admin");
  if (admin) {
    return children;
  }

  if (loading) {
    return <MyLoader />;
  }

  return <Navigate to="/login"></Navigate>;
};

export default AdminRoutes;
