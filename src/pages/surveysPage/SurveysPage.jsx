import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Link } from "react-router-dom";
import { FaLongArrowAltRight } from "react-icons/fa";
import MyLoader from "../../MyLoader";

const SurveysPage = () => {
  const axiosPublic = useAxiosPublic();
  const { isPending, error, data } = useQuery({
    queryKey: ["surveyPage1"],
    queryFn: async () => {
      const response = await axiosPublic.get("/surveys");
      return response.data;
    },
  });

  const filter = data?.filter((item) => item.status === "publish");

  if (isPending) return <MyLoader />;

  if (error) return "An error has occurred: " + error.message;
  return (
    <>
      <h1 className="text-2xl sm:text-3xl md:text-4xl  text-center font-semibold my-4 sm:my-6 md:my-8 capitalize">
        all surveys
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 my-10">
        {filter?.map((item) => (
          <div key={item._id}>
            {/* <Card className="max-w-sm">
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {item.title}
              </h5>
              <hr />
              <p className="font-medium text-gray-700 dark:text-gray-400">
                {item.descriptions}
              </p>
             
              <>
                {item?.commentText?.map((comment, index) => (
                  <p key={index}>Comment : {comment}</p>
                ))}
              </>
              <Link to={`/surveysDetails/${item._id}`}>
                <Button>
                  Navigate to Voting Page
                  <svg
                    className="-mr-1 ml-2 h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Button>
              </Link>
            </Card> */}
            <div className="card h-full bg-neutral text-neutral-content shadow-xl rounded-none sm:rounded-2xl">
              <div className="card-body">
                <h2 className="card-title">{item.title}</h2>
                <hr />
                <p>Descriptions : {item.descriptions}</p>

                <p>Category : {item.category}</p>
                <p>Total Like : {item.yes}</p>
                <p>Total DisLike : {item.no}</p>
                <p>Total Vote : {item.yes + item.no}</p>
                <p>
                  Comments :{" "}
                  {item?.commentText?.map((comment, index) => (
                    <span key={index}>{comment}, </span>
                  ))}
                </p>

                <div className="card-actions">
                  <Link
                    className="btn btn-success"
                    to={`/surveysDetails/${item._id}`}
                  >
                    Navigate to Voting Page <FaLongArrowAltRight />
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

export default SurveysPage;
