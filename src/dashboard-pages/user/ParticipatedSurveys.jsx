import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../firebase/AuthProvider";
import MyLoader from "../../MyLoader";

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

  if (isPending) return <MyLoader />;

  if (error) return "An error has occurred: " + error.message;
  return (
    <div>
      <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-center font-semibold my-4">
        Participated Surveys
      </h1>
      <hr />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 m-2">
        {filter?.map((item, index) => (
          <div key={index}>
            {/*  */}
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
                  to={`/surveysResult/${item._id}`}
                  className="btn btn-info"
                >
                  Result
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParticipatedSurveys;
