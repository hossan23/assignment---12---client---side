import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="flex justify-center items-center h-screen flex-col">
      <h1>This is error page</h1>
      <Link to="/">
        <button className="btn btn-primary">Go Back Home</button>
      </Link>
    </div>
  );
};

export default ErrorPage;
