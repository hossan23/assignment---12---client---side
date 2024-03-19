import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const ManageSurvey = () => {
  const axiosPublic = useAxiosPublic();
  const { isPending, error, data, refetch } = useQuery({
    queryKey: ["manageSurveyPage"],
    queryFn: async () => {
      const response = await axiosPublic.get("/surveys");
      return response.data;
    },
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  const handlePublish = (id) => {
    const filter = data?.find((item) => item._id === id);
    console.log(filter?.title);
    const adminApprove = {
      title: filter?.title,
      descriptions: filter?.descriptions,
      category: filter?.category,
      status: "publish",
    };
    axiosPublic
      .put(`/survey/${id}`, adminApprove)
      .then((res) => {
        console.log(res.data);
        refetch();
      })
      .catch((err) => console.log(err.message));
  };

  const handleUnPublish = (id) => {
    const filter = data?.find((item) => item._id === id);
    var adminFeedbackElement = document.getElementById(`${id}`);
    var adminFeedback = adminFeedbackElement.value;
    console.log(adminFeedback);
    const adminApprove = {
      title: filter?.title,
      descriptions: filter?.descriptions,
      category: filter?.category,
      status: "unPublish",
      adminFeedback,
    };
    axiosPublic
      .put(`/survey/${id}`, adminApprove)
      .then((res) => {
        console.log(res.data);
        refetch();
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <div>
      <h1 className="text-2xl text-center font-semibold my-4">
        Manage Surveys
      </h1>
      <hr />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 m-2">
        {data?.map((item, index) => (
          <div key={index}>
            <div className="card h-full bg-neutral text-neutral-content shadow-xl rounded-none sm:rounded-2xl capitalize glass">
              <div className="card-body">
                <h2 className="card-title">{item.title}</h2>
                <hr />
                <p>Description : {item.descriptions}</p>
                <p>
                  Status :{" "}
                  {item.status === "publish"
                    ? "Published"
                    : "Pending" && item.status === "unPublish"
                    ? "Un-Published"
                    : "Pending"}
                </p>

                <p>
                  <span className="text-error">User-Reports</span>:{" "}
                  {item?.report?.map((comment, index) => (
                    <span key={index}>{comment}. </span>
                  ))}
                </p>

                <button
                  className="btn btn-info"
                  onClick={() => handlePublish(item._id)}
                >
                  Publish
                </button>

                <form>
                  <label className="font-semibold capitalize">
                    If you want to unpublish tell the surveyor why
                  </label>
                  <textarea
                    className="w-full"
                    type="text"
                    name="adminFeedback"
                    id={`${item._id}`}
                  />
                </form>

                <button
                  className="btn btn-error"
                  onClick={() => handleUnPublish(item._id)}
                >
                  Un-Publish
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageSurvey;
