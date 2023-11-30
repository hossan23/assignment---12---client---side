import { Button, Card } from 'flowbite-react';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const ManageSurvey = () => {
 const axiosPublic = useAxiosPublic();
 const { isPending, error, data, refetch } = useQuery({
  queryKey: ['manageSurveyPage'],
  queryFn: async () => {
   const response = await axiosPublic.get('/surveys');
   return response.data;
  },
 });

 if (isPending) return 'Loading...';

 if (error) return 'An error has occurred: ' + error.message;

 const handlePublish = id => {
  const filter = data?.find(item => item._id === id);
  console.log(filter?.title);
  const adminApprove = { title: filter?.title, descriptions: filter?.descriptions, category: filter?.category, status: 'publish' };
  axiosPublic
   .put(`/survey/${id}`, adminApprove)
   .then(res => {
    console.log(res.data);
    refetch();
   })
   .catch(err => console.log(err.message));
 };

 const handleUnPublish = id => {
  const filter = data?.find(item => item._id === id);
  var adminFeedbackElement = document.getElementById(`${id}`);
  var adminFeedback = adminFeedbackElement.value;
  console.log(adminFeedback);
  const adminApprove = { title: filter?.title, descriptions: filter?.descriptions, category: filter?.category, status: 'unPublish', adminFeedback };
  axiosPublic
   .put(`/survey/${id}`, adminApprove)
   .then(res => {
    console.log(res.data);
    refetch();
   })
   .catch(err => console.log(err.message));
 };

 return (
  <div>
   <h1>Manage Survey</h1>
   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {data?.map(item => (
     <div key={item._id}>
      <Card className="max-w-sm">
       <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{item.title}</h5>
       <hr />
       <p className="font-medium text-gray-700 dark:text-gray-400">{item.descriptions}</p>
       <p>Status : {item.status === 'publish' ? 'Published' : 'Pending' && item.status === 'unPublish' ? 'Un-Published' : 'Pending'}</p>

       <Button onClick={() => handlePublish(item._id)}>
        Publish
        <svg className="-mr-1 ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
         <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
       </Button>
       <form>
        <label>If you want to unpublish tell the surveyor why</label>
        <input type="text" name="adminFeedback" id={`${item._id}`} />
       </form>

       <Button onClick={() => handleUnPublish(item._id)}>
        Un-Publish
        <svg className="-mr-1 ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
         <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
       </Button>
      </Card>
     </div>
    ))}
   </div>
  </div>
 );
};

export default ManageSurvey;