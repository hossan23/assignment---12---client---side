import { useLoaderData, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useContext } from "react";
import { AuthContext } from "../../firebase/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

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

  if (isPending)
    return <Spinner aria-label="Extra large spinner example" size="xl" />;

  if (error) return console.log(error.message);

  //survey

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
    <form onSubmit={handleVote}>
      <Card className="max-w-sm" horizontal>
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h5>
        <hr />
        <p className="font-medium text-gray-700 dark:text-gray-400">
          {descriptions}
        </p>
        <hr />
        {/* vote */}
        <fieldset className="flex max-w-md  gap-4 ">
          <legend className="mb-4">Place Your Vote Here</legend>
          <div className="flex items-center gap-2">
            <Radio id="yes" name="vote" value="yes" />
            <Label htmlFor="yes">Yes</Label>
          </div>
          <div className="flex items-center gap-2">
            <Radio id="no" name="vote" value="no" />
            <Label htmlFor="no">No</Label>
          </div>
        </fieldset>
        {/* like or dislike */}
        <fieldset className="flex max-w-md  gap-4 ">
          <legend className="mb-4">Do you like this survey?</legend>
          <div className="flex items-center gap-2">
            <Radio id="Like" name="surveyFeedBack" value="like" />
            <Label htmlFor="Like">Like</Label>
          </div>
          <div className="flex items-center gap-2">
            <Radio id="Dislike" name="surveyFeedBack" value="disLike" />
            <Label htmlFor="Dislike">Dislike</Label>
          </div>
        </fieldset>
        {usersData?.role === "pro-user" && (
          <>
            <label>You can put a comment about this survey</label>
            <input type="text" name="comment" />
          </>
        )}
        <label className="capitalize">
          if u Do not like this survey tell us about it!
        </label>
        <input type="text" name="report" />
        <button
          disabled={
            usersData?.role === "admin" ||
            usersData?.role === "surveyor" ||
            filter?.surveyId === _id
          }
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-500"
        >
          Submit
        </button>
      </Card>
    </form>
  );
};

export default SurveyDetails;
