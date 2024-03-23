import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../firebase/AuthProvider";
import MyLoader from "../../MyLoader";

const UserFeedBack = () => {
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
  const filteredWithReports = filter?.filter((item) => item.report?.length > 0);

  console.log(filteredWithReports);

  if (isPending) return <MyLoader />;

  if (error) return "An error has occurred: " + error.message;
  return (
    <>
      <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-center font-semibold my-4">
        User FeedBacks
      </h1>
      <hr />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 m-2">
        {filteredWithReports?.map((item, index) => (
          <div key={index}>
            <div className="max-w-sm">
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {item.title}
              </h5>
              <hr />
              <p className="font-medium text-gray-700 dark:text-gray-400">
                {item.descriptions}
              </p>
              <p>Category : {item.category}</p>
              <>
                {item?.report?.map((comment, index) => (
                  <p key={index}>
                    <span className="text-red-500">User-Report :</span>
                    {comment}
                  </p>
                ))}
              </>
              <Link to={`/dashboard/update-survey/${item._id}`}>Update</Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default UserFeedBack;
