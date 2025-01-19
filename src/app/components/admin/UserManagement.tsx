"use client";

import { useQuery, useMutation } from "@apollo/client";
import { GET_ALL_USERS } from "../../graphql/queries/users";
import { DELETE_USER } from "../../graphql/mutations/users";

export default function UserManagement() {
  const { data, loading, error } = useQuery(GET_ALL_USERS);
  const [deleteUser] = useMutation(DELETE_USER);

  const handleDelete = async (id: string) => {
    await deleteUser({ variables: { id } });
  };

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>Error loading users: {error.message}</p>;

  return (
    <div>
      <h1>User Management</h1>
      <ul>
        {data.getAllUsers.map((user: any) => (
          <li key={user.id}>
            {user.firstName} {user.lastName}
            <button onClick={() => handleDelete(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
