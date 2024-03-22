import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Link } from "react-router-dom";

import { useContext } from "react";
import { AuthContext } from "../../firebase/AuthProvider";

const ParticipatedSurveys = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);
  const { isPending, error, data } = useQuery({
    queryKey: ["ParticipatedSurveyPage"],
    queryFn: async () => {
      const response = await axiosPublic.get("/surveys");
      return response.data;
    },
    onSuccess: () => {
      data2.refetch();
    },
  });

  const { data: data2 } = useQuery({
    queryKey: ["voters"],
    queryFn: async () => {
      const response = await axiosPublic.get("/voters");
      return response.data;
    },
  });

  const filter2 = data2?.filter((item) => item?.voterEmail === user?.email);
  const surveyIdsFromData2 = filter2?.map((item) => item.surveyId);
  const filter = data?.filter((item1) =>
    surveyIdsFromData2?.includes(item1._id)
  );
  console.log(filter);

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;
  return (
    <div>
      <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-center font-semibold my-4">
        Participated Surveys
      </h1>
      <hr />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 m-2">
        {filter?.map((item) => (
          <div key={item._id}>
            <div className="max-w-sm">
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {item.title}
              </h5>
              <hr />
              <p className="font-medium text-gray-700 dark:text-gray-400">
                {item.descriptions}
              </p>
              <p>Category : {item.category}</p>

              <p>Total Vote : {item.yes + item.no}</p>

              <>
                {item?.commentText?.map((comment, index) => {
                  <p key={index}>Comment : {comment}</p>;
                })}
              </>

              <Link to={`/surveysResult/${item._id}`} className="btn btn-info">
                Result
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParticipatedSurveys;
