import { useContext } from 'react';
import { AuthContext } from './firebase/AuthProvider';
import { Navigate } from 'react-router-dom';
import { Spinner } from 'flowbite-react';

const PrivateRoutes = ({ children }) => {
 const { user, loading } = useContext(AuthContext);
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

 return <Navigate to="/login"></Navigate>;
};

export default PrivateRoutes;
