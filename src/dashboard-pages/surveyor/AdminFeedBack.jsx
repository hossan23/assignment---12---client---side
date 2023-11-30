import { useContext } from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { AuthContext } from '../../firebase/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import { Card } from 'flowbite-react';

const AdminFeedBack = () => {
 const axiosPublic = useAxiosPublic();
 const { user } = useContext(AuthContext);
 const { isPending, error, data } = useQuery({
  queryKey: ['mySurveyPage'],
  queryFn: async () => {
   const response = await axiosPublic.get('/surveys');
   return response.data;
  },
 });

 const filter = data?.filter(item => item.creatorEmail === user.email);
 const filter2 = filter?.filter(item => item?.status === 'unPublish');

 if (isPending) return 'Loading...';

 if (error) return 'An error has occurred: ' + error.message;
 return (
  <div>
   <h1>Admin FeedBack</h1>
   <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
    {filter2?.map(item => (
     <div key={item._id}>
      <Card className="max-w-sm">
       <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{item.title}</h5>
       <hr />
       <p className="font-medium text-gray-700 dark:text-gray-400">{item.descriptions}</p>
       <p>Category : {item.category}</p>
       <p>status : {item.status === 'publish' ? 'Published' : '' || item.status === 'pending' ? 'Pending' : '' || item.status === 'unPublish' ? 'Rejected by Admin' : ''}</p>
       {item.adminFeedback && <p className="text-red-500 font-semibold">Admin Feedback : {item.adminFeedback}</p>}
      </Card>
     </div>
    ))}
   </div>
  </div>
 );
};

export default AdminFeedBack;
