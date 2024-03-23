import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Link } from "react-router-dom";
import MyLoader from "../../MyLoader";

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

  if (isPending) return <MyLoader />;

  if (error) return "An error has occurred: " + error.message;

  const latestSixSurveys = filter?.slice(0, 6);

  return (
    <>
      <h1 className="text-2xl sm:text-3xl md:text-4xl  text-center font-semibold my-4 sm:my-6 md:my-8 capitalize">
        latest surveys
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {latestSixSurveys?.map((item, index) => (
          <div key={index}>
            <div className="card h-full bg-neutral  text-neutral-content shadow-xl rounded-none sm:rounded-2xl glass">
              <div className="card-body">
                <h2 className="card-title">{item.title}</h2>
                <hr />
                <p>{item.descriptions}</p>
                <p>Category : {item.category}</p>
                <p>Total Vote : {item.yes + item.no}</p>
                <p>
                  Comments :{" "}
                  {item?.commentText?.map((comment, index) => (
                    <span key={index}>{comment}, </span>
                  ))}
                </p>

                <Link
                  className="btn btn-success"
                  to={`/surveysDetails/${item._id}`}
                >
                  Navigate to Voting Page
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default LatestSurveys;
