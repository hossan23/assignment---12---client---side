import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useContext } from "react";
import { AuthContext } from "../../firebase/AuthProvider";
import Swal from "sweetalert2";
import MyLoader from "../../MyLoader";

const ManageUsers = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);
  const { isPending, error, data, refetch } = useQuery({
    queryKey: ["manageUser"],
    queryFn: async () => {
      const response = await axiosPublic.get("/users");
      return response.data;
    },
  });

  const filter = data?.filter((item) => item?.email !== user?.email);

  if (isPending) return <MyLoader />;

  if (error) return "An error has occurred: " + error.message;

  const handleMakeAdmin = (item) => {
    const role = { role: "admin" };

    axiosPublic
      .patch(`/users/${item.email}`, role)
      .then((res) => {
        console.log(res.data);
        refetch();
        Swal.fire(`${item.name} is now an Admin`);
      })
      .catch((err) => console.log(err.message));
  };

  const handleMakeSurveyor = (item) => {
    const role = { role: "surveyor" };

    axiosPublic
      .patch(`/users/${item.email}`, role)
      .then((res) => {
        console.log(res.data);
        refetch();
        Swal.fire(`${item.name} is now a Surveyor`);
      })
      .catch((err) => console.log(err.message));
  };
  const handleMakeUser = (item) => {
    const role = { role: "user" };

    axiosPublic
      .patch(`/users/${item.email}`, role)
      .then((res) => {
        console.log(res.data);
        refetch();
        Swal.fire(`${item.name} is now a User`);
      })
      .catch((err) => console.log(err.message));
  };
  return (
    <div>
      <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-center font-semibold my-4">
        Manage Users
      </h1>
      <hr />
      <div className="overflow-x-auto">
        <table className="table font-semibold">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Current-Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filter?.map((item, index) => (
              <tr className="hover" key={index}>
                <td>{index + 1}</td>
                <td>{item?.name}</td>
                <td>{item?.email}</td>
                <td>{item?.role}</td>
                <td className="space-x-2">
                  <button
                    className="btn btn-sm btn-accent"
                    onClick={() => handleMakeUser(item)}
                  >
                    User
                  </button>
                  <button
                    className="btn btn-sm btn-secondary"
                    onClick={() => handleMakeSurveyor(item)}
                  >
                    Surveyor
                  </button>

                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => handleMakeAdmin(item)}
                  >
                    Admin
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
