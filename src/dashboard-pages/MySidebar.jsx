import { Sidebar, Spinner } from 'flowbite-react';
import { Link } from 'react-router-dom';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { AuthContext } from '../firebase/AuthProvider';

const MySidebar = () => {
 const axiosPublic = useAxiosPublic();
 const { user } = useContext(AuthContext);
 const { isPending, error, data } = useQuery({
  queryKey: ['sideBar'],
  queryFn: async () => {
   const response = await axiosPublic.get('/users');
   return response.data;
  },
 });

 const filter = data?.find(item => item?.email === user?.email);
 //  console.log(filter);

 if (isPending) return <Spinner aria-label="Extra large spinner example" size="xl" />;

 if (error) return console.log(error.message);

 return (
  <Sidebar aria-label="Default sidebar example">
   <Sidebar.Items>
    <Sidebar.ItemGroup>
     <h1 className="font-semibold text-sm border-sky-400 border">My Role : {filter?.role}</h1>
     <ul className="font-semibold space-y-4">
      <li>
       <Link to="/">Go back to Home</Link>
      </li>
      {/* surveyor */}
      {filter?.role === 'surveyor' && (
       <>
        <li>
         <Link to="survey-creation">Create Survey</Link>
        </li>
        <li>
         <Link to="my-surveys">My Surveys</Link>
        </li>

        <li>
         <Link to="admin-feedback">Admin Feedback</Link>
        </li>
        <li>
         <Link to="user-feedback">User Feedbacks</Link>
        </li>
       </>
      )}
      {/* admin */}
      {filter?.role === 'admin' && (
       <>
        <li>
         <Link to="manage-users">Manage users</Link>
        </li>
        <li>
         <Link to="manage-survey">Manage Survey</Link>
        </li>
       </>
      )}
      {/* user and pro-user */}
      {filter?.role === 'user' || filter?.role === 'pro-user' ? (
       <>
        <li>
         <Link to="participated-surveys">Participated Surveys</Link>
        </li>
       </>
      ) : (
       ''
      )}
     </ul>
    </Sidebar.ItemGroup>
   </Sidebar.Items>
  </Sidebar>
 );
};

export default MySidebar;
