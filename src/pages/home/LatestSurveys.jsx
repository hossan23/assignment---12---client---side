import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Button, Card, Spinner } from "flowbite-react";
import { Link } from "react-router-dom";

const LatestSurveys = () => {
  const axiosPublic = useAxiosPublic();
  const { isPending, error, data } = useQuery({
    queryKey: ["LatestSurveyPage"],
    queryFn: async () => {
      const response = await axiosPublic.get("/surveys");
      return response.data;
    },
  });

  const filter = data?.filter((item) => item.status === "publish");

  //   if (isPending) return "sub2handsomeboy612😆👍...";
  if (isPending) return;

  if (error) return "An error has occurred: " + error.message;

  const latestSixSurveys = filter?.slice(0, 6);

  return (
    <>
      <h1 className="text-3xl text-center font-semibold my-4">
        Latest Surveys
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {latestSixSurveys?.map((item) => (
          <div key={item._id}>
            <Card className="max-w-sm">
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {item.title}
              </h5>
              <hr />
              <p className="font-medium text-gray-700 dark:text-gray-400">
                {item.descriptions}
              </p>
              <div className="flex">
                <button>Total Vote : {item.yes + item.no}</button>
              </div>
              <>
                {item?.commentText?.map((comment, index) => (
                  <p key={index}>Comment : {comment}</p>
                ))}
              </>

              <Link to={`/surveysDetails/${item._id}`}>
                <Button>
                  Navigate to Voting Page
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
    </>
  );
};

export default LatestSurveys;
