"use client";

import { useQuery, useMutation } from "@apollo/client";
import { GET_ALL_USERS } from "../../graphql/queries/users";
import { DELETE_USER } from "../../graphql/mutations/users";
import { GetAllUsersResponse, DeleteUserVariables } from "../../graphql/types/users";

export default function UserManagement() {
  const { data, loading, error, refetch, fetchMore } = useQuery<GetAllUsersResponse>(GET_ALL_USERS, {
    variables: { skip: 0, take: 10 },
  });

  const [deleteUser, { loading: deleteLoading }] = useMutation<
    { deleteUser: boolean },
    DeleteUserVariables
  >(DELETE_USER);

  const handleDelete = async (id: string) => {
    try {
      await deleteUser({ variables: { id } });
      alert("User deleted successfully!");
      refetch();
    } catch (err) {
      console.error("Error deleting user:", err);
      alert("Failed to delete user.");
    }
  };

  const loadMoreUsers = () => {
    if (data) {
      fetchMore({
        variables: { skip: data.getAllUsers.length, take: 10 },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          return {
            getAllUsers: [...prev.getAllUsers, ...fetchMoreResult.getAllUsers],
          };
        },
      });
    }
  };

  if (loading) return <p className="text-center mt-4">Loading users...</p>;
  if (error) {
    console.error("Error loading users:", error);
    return <p className="text-center text-red-600 mt-4">Error loading users: {error.message}</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">User Management</h2>
      <div className="bg-white shadow-md rounded p-6">
        <ul className="space-y-6">
          {data?.getAllUsers.map((user) => (
            <li
              key={user.id}
              className="p-4 border rounded-lg flex justify-between items-center shadow-sm hover:shadow-md"
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-700">
                  {user.firstName} {user.lastName}
                </h3>
                <p className="text-sm text-gray-500">
                  {user.role} - {user.email}
                </p>
              </div>
              <button
                onClick={() => handleDelete(user.id)}
                className="px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded hover:bg-red-700 disabled:opacity-50"
                disabled={deleteLoading}
              >
                {deleteLoading ? "Deleting..." : "Delete"}
              </button>
            </li>
          ))}
        </ul>
        <div className="mt-8 text-center">
          <button
            onClick={loadMoreUsers}
            className="px-6 py-3 bg-blue-600 text-white text-sm font-semibold rounded hover:bg-blue-700"
          >
            Load More
          </button>
        </div>
      </div>
    </div>
  );
}
