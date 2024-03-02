import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useContext } from "react";
import { AuthContext } from "../../firebase/AuthProvider";

import { Link } from "react-router-dom";

const MySurveys = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);
  const { isPending, error, data } = useQuery({
    queryKey: ["mySurveyPage"],
    queryFn: async () => {
      const response = await axiosPublic.get("/surveys");
      return response.data;
    },
  });

  const filter = data?.filter((item) => item.creatorEmail === user.email);

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;
  return (
    <div>
      <h1 className="text-2xl text-center my-4 font-semibold">
        All My Surveys
      </h1>
      <hr className="mb-4" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {filter?.map((item) => (
          <div key={item._id}>
            <Card className="max-w-sm">
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {item.title}
              </h5>
              <hr />
              <p className="font-medium text-gray-700 dark:text-gray-400">
                {item.descriptions}
              </p>
              <p>Category : {item.category}</p>
              <p>
                status :{" "}
                {item.status === "publish"
                  ? "Published"
                  : "" || item.status === "pending"
                  ? "Pending"
                  : "" || item.status === "unPublish"
                  ? "Rejected by Admin"
                  : ""}
              </p>

              <Link to={`/dashboard/update-survey/${item._id}`}>
                <Button>
                  Update
                  <svg
                    className="-mr-1 ml-2 h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Button>
              </Link>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MySurveys;
