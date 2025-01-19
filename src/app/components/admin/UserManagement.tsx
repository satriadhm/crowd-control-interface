"use client";

import { useQuery, useMutation } from "@apollo/client";
import { GET_ALL_USERS } from "../../graphql/queries/users";
import { DELETE_USER } from "../../graphql/mutations/users";
import {
  GetAllUsersResponse,
  DeleteUserVariables,
} from "../../graphql/types/users";

export default function UserManagement() {
  const { data, loading, error } = useQuery<GetAllUsersResponse>(GET_ALL_USERS);
  const [deleteUser] = useMutation<
    { deleteUser: { id: string } },
    DeleteUserVariables
  >(DELETE_USER);

  const handleDelete = async (id: string) => {
    try {
      await deleteUser({ variables: { id } });
      alert("User deleted successfully!");
    } catch (err) {
      console.error("Error deleting user:", err);
      alert("Failed to delete user.");
    }
  };

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>Error loading users: {error.message}</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      <ul className="list-disc pl-6">
        {data?.getAllUsers.map((user) => (
          <li key={user.id} className="mb-2">
            <div className="flex justify-between items-center">
              <span>
                <strong>
                  {user.firstName} {user.lastName}
                </strong>{" "}
                - {user.email} ({user.role})
              </span>
              <button
                onClick={() => handleDelete(user.id)}
                className="ml-4 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-500"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
