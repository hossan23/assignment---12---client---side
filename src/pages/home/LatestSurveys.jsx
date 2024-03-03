import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
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
            <div className="card bg-red-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">{item.title}</h2>
                <p>{item.descriptions}</p>
                <p>Total Vote : {item.yes + item.no}</p>
                <p>
                  Comments :{" "}
                  {item?.commentText?.map((comment, index) => (
                    <p key={index} className="flex">{comment},</p>
                  ))}
                </p>

                <div className="card-actions">
                  <Link
                    className="btn btn-success"
                    to={`/surveysDetails/${item._id}`}
                  >
                    Navigate to Voting Page
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default LatestSurveys;
