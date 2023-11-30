import { useQuery } from '@tanstack/react-query';
import { Button, Card } from 'flowbite-react';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { Link } from 'react-router-dom';

const SurveysPage = () => {
 const axiosPublic = useAxiosPublic();
 const { isPending, error, data } = useQuery({
  queryKey: ['surveyPage1'],
  queryFn: async () => {
   const response = await axiosPublic.get('/surveys');
   return response.data;
  },
 });

 const filter = data?.filter(item => item.status === 'publish');
 //  console.log(filter);

 if (isPending) return 'Loading...';

 if (error) return 'An error has occurred: ' + error.message;
 return (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-10">
   {filter?.map(item => (
    <div key={item._id}>
     <Card className="max-w-sm">
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{item.title}</h5>
      <hr />
      <p className="font-medium text-gray-700 dark:text-gray-400">{item.descriptions}</p>
      <p>Category : {item.category}</p>

      <p>Total Vote : {item.yes + item.no}</p>
      <>
       {item?.commentText?.map((comment, index) => (
        <p key={index}>Comment : {comment}</p>
       ))}
      </>
      <Link to={`/surveysDetails/${item._id}`}>
       <Button>
        Navigate to Voting Page
        <svg className="-mr-1 ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
         <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
       </Button>
      </Link>
     </Card>
    </div>
   ))}
  </div>
 );
};

export default SurveysPage;
