import { useQuery } from "@tanstack/react-query";

import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useContext } from "react";
import { AuthContext } from "../../firebase/AuthProvider";

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

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  const handleMakeAdmin = (item) => {
    const role = { role: "admin" };
    console.log("hi", role);

    axiosPublic
      .patch(`/users/${item.email}`, role)
      .then((res) => {
        console.log(res.data);
        refetch();
      })
      .catch((err) => console.log(err.message));
  };

  const handleMakeSurveyor = (item) => {
    const role = { role: "surveyor" };
    console.log("hi", role);
    axiosPublic
      .patch(`/users/${item.email}`, role)
      .then((res) => {
        console.log(res.data);
        refetch();
      })
      .catch((err) => console.log(err.message));
  };
  return (
    <div>
      <h1 className="text-center text-2xl my-4">Manage Users</h1>

      <div className="overflow-x-auto">
        <Table striped>
          <Table.Head>
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>Email</Table.HeadCell>
            <Table.HeadCell>Role</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">admin</span>
            </Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Surveyor</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {filter?.map((item) => (
              <Table.Row
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
                key={item._id}
              >
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {item.name}
                </Table.Cell>
                <Table.Cell>{item.email}</Table.Cell>
                <Table.Cell>{item.role}</Table.Cell>
                <Table.Cell>
                  <button
                    onClick={() => handleMakeAdmin(item)}
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                    name="admin"
                  >
                    Admin
                  </button>
                </Table.Cell>
                <Table.Cell>
                  <button
                    onClick={() => handleMakeSurveyor(item)}
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                    name="surveyor"
                  >
                    Surveyor
                  </button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};

export default ManageUsers;
