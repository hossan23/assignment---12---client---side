import { useLoaderData, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useContext } from "react";
import { AuthContext } from "../../firebase/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import MyLoader from "../../MyLoader";

const SurveyDetails = () => {
  const navigate = useNavigate();
  const { _id, title, descriptions, category, status } = useLoaderData();
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);

  const { isPending, error, data } = useQuery({
    queryKey: ["surveyDetails"],
    queryFn: async () => {
      const response = await axiosPublic.get("/users");
      return response.data;
    },
  });
  const { data: data2 } = useQuery({
    queryKey: ["surveyDetails2"],
    queryFn: async () => {
      const response = await axiosPublic.get("/voters");
      return response.data;
    },
  });

  const usersData = data?.find((item) => item?.email === user?.email);

  const votersData = data2?.filter((item) => item?.voterEmail === user?.email);

  //  console.log(votersData);

  const filter = votersData?.find((item) => item.surveyId === _id);
  //  console.log(filter?.surveyId);

  if (isPending) return <MyLoader />;

  if (error) return console.log(error.message);

  const handleVote = (e) => {
    e.preventDefault();
    const form = e.target;
    const vote = form.vote.value;
    const surveyFeedBack = form.surveyFeedBack.value;
    const voterEmail = user.email;
    const voterData = { voterEmail, surveyId: _id };
    const commentText = form?.comment?.value;
    const report = form?.report?.value;
    const myData = {
      vote,
      surveyFeedBack,
      title,
      descriptions,
      category,
      status,
      commentText,
      report,
    };
    console.log(myData);
    axiosPublic
      .put(`/survey/${_id}`, myData)
      .then((res) => {
        console.log(res.data);
        Swal.fire("Thanks For voting!");
        navigate(`/surveysResult/${_id}`);
        axiosPublic
          .post("/voters", voterData)
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => console.log(err.message));
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <>
      <form className="card-body capitalize text-center" onSubmit={handleVote}>
        <div className="form-control space-y-2">
          <h1 className="text-2xl font-semibold">{title}</h1>
          <hr />
          <p>{descriptions}</p>
        </div>
        <div className="form-control">
          <h1 className="text-xl">Place your vote here</h1>
          <div className="space-x-10 my-4">
            <span>Yes</span>
            <input
              type="radio"
              name="vote"
              value="yes"
              className="radio radio-success"
            />
            <input
              type="radio"
              name="vote"
              value="no"
              className="radio radio-success"
            />
            <span>No</span>
          </div>
          {/*  */}
          <h1 className="text-xl">Do you like this survey?</h1>
          <div className="space-x-10 my-4">
            <span>Like</span>
            <input
              type="radio"
              name="surveyFeedBack"
              value="like"
              className="radio radio-success"
            />
            <input
              type="radio"
              name="surveyFeedBack"
              value="disLike"
              className="radio radio-success"
            />
            <span>DisLike</span>
          </div>

          {usersData?.role === "pro-user" && (
            <>
              <label className="mb-2">
                You can put a comment about this survey
              </label>
              <input
                type="text"
                placeholder="Comment here . . ."
                className="input input-bordered"
                name="comment"
                required
              />
            </>
          )}
          <label className="mb-2">
            if u Do not like this survey, you can tell us about it.
          </label>
          <input
            type="text"
            placeholder="Type here . . ."
            className="input input-bordered"
            name="report"
            required
          />
        </div>

        <div className="form-control mt-2">
          <button
            type="submit"
            disabled={
              usersData?.role === "admin" ||
              usersData?.role === "surveyor" ||
              filter?.surveyId === _id
            }
            className="btn btn-success"
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default SurveyDetails;
