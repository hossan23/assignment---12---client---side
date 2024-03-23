import { useContext } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { AuthContext } from "../../firebase/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import MyLoader from "../../MyLoader";

const AdminFeedBack = () => {
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
  const filter2 = filter?.filter((item) => item?.status === "unPublish");

  if (isPending) return <MyLoader />;

  if (error) return "An error has occurred: " + error.message;
  return (
    <div>
      <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-center font-semibold my-4">
        Admin FeedBack
      </h1>
      <hr />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 m-2">
        {filter2?.map((item, index) => (
          <div key={index}>
            <div className="card h-full bg-neutral text-neutral-content shadow-xl rounded-none sm:rounded-2xl capitalize glass">
              <div className="card-body">
                <h2 className="card-title">{item.title}</h2>
                <hr />
                <p>Description : {item.descriptions}</p>
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
                {item.adminFeedback && (
                  <p>
                    <span className="text-red-500 font-semibold">
                      Admin Feedback :{" "}
                    </span>
                    {item.adminFeedback}
                  </p>
                )}
                {item.report && (
                  <p>
                    <span className="text-red-500 font-semibold">
                      User Feedback :{" "}
                    </span>
                    {item.adminFeedback}
                  </p>
                )}
                <Link
                  to={`/dashboard/update-survey/${item._id}`}
                  className="btn btn-info"
                >
                  Update
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminFeedBack;
