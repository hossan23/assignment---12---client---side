import { useLoaderData, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const UpdateSurvey = () => {
  const { _id, title, descriptions, category } = useLoaderData();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const handleCreate = (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const descriptions = form.descriptions.value;
    const category = form.category.value;
    const myData = {
      title,
      descriptions,
      category,
      status: "pending",
      adminFeedback: null,
    };
    console.log(myData);
    axiosPublic
      .put(`/survey/${_id}`, myData)
      .then((res) => {
        console.log(res.data);
        Swal.fire("Survey Updated successfully! Wait for admin to publish it");
        navigate("/dashboard/my-surveys");
        form.reset();
      })
      .catch((err) => console.log(err.message));
  };
  return (
    <>
      <form onSubmit={handleCreate} className="mt-2 sm:mt-4 md:mt-6 lg:mt-8">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label
            className="block capitalize tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="title"
          >
            Title
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="title"
            type="text"
            placeholder="Title..."
            name="title"
            defaultValue={title}
          />
        </div>
        <div className="w-full md:w-1/2 px-3">
          <label
            className="block capitalize tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-last-name"
          >
            Descriptions
          </label>
          <textarea
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-last-name"
            type="text"
            placeholder="Descriptions..."
            name="descriptions"
            defaultValue={descriptions}
          />
        </div>

        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label
            className="block capitalize tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-state"
          >
            Category
          </label>
          <div className="relative">
            <select
              className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-state"
              name="category"
              defaultValue={category}
            >
              <option>Technology</option>
              <option>Health</option>
              <option>Consumer</option>
              <option>Education</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="text-center sm:text-start">
          <button type="submit" className="btn btn-info m-3 w-60">
            Update
          </button>
        </div>
      </form>
    </>
  );
};

export default UpdateSurvey;
