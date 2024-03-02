import { useContext } from "react";
import { AuthContext } from "./firebase/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  if (user) {
    return children;
  }

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Spinner aria-label="Extra large spinner example" size="xl" />
      </div>
    );
  }

  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoutes;
