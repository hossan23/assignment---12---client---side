import { Button } from 'flowbite-react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
 return (
  <div className="flex justify-center items-center h-screen flex-col">
   <h1>This is error page</h1>
   <Link to="/">
    <Button>Go back to home</Button>
   </Link>
  </div>
 );
};

export default ErrorPage;
