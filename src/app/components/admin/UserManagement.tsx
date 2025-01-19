"use client";

import { useQuery, useMutation } from "@apollo/client";
import { GET_ALL_USERS } from "../../graphql/queries/users";
import { DELETE_USER } from "../../graphql/mutations/users";
import {
  GetAllUsersResponse,
  DeleteUserVariables,
} from "../../graphql/types/users";

export default function UserManagement() {
  const { data, loading, error, refetch } =
    useQuery<GetAllUsersResponse>(GET_ALL_USERS);
  const [deleteUser] = useMutation<
    { deleteUser: { id: string } },
    DeleteUserVariables
  >(DELETE_USER);

  const handleDelete = async (id: string) => {
    try {
      await deleteUser({ variables: { id } });
      alert("User deleted successfully!");
      refetch(); // Refresh user list after deletion
    } catch (err) {
      console.error("Error deleting user:", err);
      alert("Failed to delete user.");
    }
  };

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>Error loading users: {error.message}</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Users</h2>
      <ul>
        {data?.getAllUsers.map((user) => (
          <li key={user.id} className="mb-4">
            <div>
              <strong>
                {user.firstName} {user.lastName}
              </strong>{" "}
              ({user.role}) - {user.email}
            </div>
            <button
              onClick={() => handleDelete(user.id)}
              className="mt-2 px-4 py-1 bg-red-600 text-white rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
