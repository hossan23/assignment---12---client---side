import { Avatar, Dropdown, Navbar } from 'flowbite-react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from './firebase/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './hooks/useAxiosPublic';

const MyNavbar = () => {
 const { logOut, user } = useContext(AuthContext);
 const axiosPublic = useAxiosPublic();

 const { isPending, error, data } = useQuery({
  queryKey: ['navOnRole'],
  queryFn: async () => {
   const response = await axiosPublic.get('/users');
   return response.data;
  },
 });

 const userRole = data?.find(item => item?.email === user?.email);

 if (isPending) return 'Loading...';

 if (error) return 'An error has occurred: ' + error.message;
 const handleLogOut = () => {
  logOut()
   .then(console.log('logged Out'))
   .catch(err => console.log(err.message));
 };
 return (
  <>
   <Navbar fluid rounded className="fixed top-0 w-full z-50 bg-slate-200">
    <Navbar.Brand href="/">
     {/* <img src="/favicon.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" /> */}
     <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">InsightPulse!</span>
    </Navbar.Brand>
    <div className="flex md:order-2">
     <Dropdown arrowIcon={false} inline label={<Avatar alt="User settings" img={user?.photoURL} rounded />}>
      {user && (
       <>
        <Dropdown.Header>
         <span className="block text-sm">{user.displayName}</span>
         <span className="block truncate text-sm font-medium">{user.email}</span>
        </Dropdown.Header>
        <Link to="/dashboard">
         <Dropdown.Item>Dashboard</Dropdown.Item>
        </Link>
        <Dropdown.Divider />
        <Dropdown.Item onClick={handleLogOut}>Sign out</Dropdown.Item>
       </>
      )}

      {!user && (
       <>
        <Link to="/register">
         <Dropdown.Item>Register</Dropdown.Item>
        </Link>
        <Dropdown.Divider />
        <Link to="/login">
         <Dropdown.Item>Login</Dropdown.Item>
        </Link>
       </>
      )}
     </Dropdown>
     <Navbar.Toggle />
    </div>
    <Navbar.Collapse>
     <Link to="/">Home</Link>
     <Link to="/surveys-page">Surveys Page</Link>
     <Link to="/about">About Us</Link>
     <Link to="/contact">Contact Us</Link>
     <Link to="/privacy">Privacy & Policy</Link>
     {userRole?.role === 'user' && <Link to="/become-pro">Become A pro</Link>}
    </Navbar.Collapse>
   </Navbar>
  </>
 );
};

export default MyNavbar;
