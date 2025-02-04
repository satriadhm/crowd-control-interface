"use client";

import { useQuery, useMutation } from "@apollo/client";
import { GET_ALL_USERS } from "@/graphql/queries/users";
import { CREATE_USER, DELETE_USER } from "@/graphql/mutations/users";
import { useState } from "react";

export default function UserManagement() {
  const { data, loading, error, refetch } = useQuery(GET_ALL_USERS);
  const [createUser] = useMutation(CREATE_USER);
  const [deleteUser] = useMutation(DELETE_USER);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "WORKER",
  });

  const handleCreateUser = async () => {
    try {
      await createUser({
        variables: { input: newUser },
      });
      alert("User created successfully!");
      refetch();
      setIsModalOpen(false);
      setNewUser({ firstName: "", lastName: "", email: "", role: "WORKER" });
    } catch (err) {
      if (err instanceof Error) {
        alert("Error creating user: " + err.message);
      } else {
        alert("Error creating user");
      }
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await deleteUser({ variables: { id } });
      alert("User deleted successfully!");
      refetch();
    } catch (err) {
      if (err instanceof Error) {
        alert("Error deleting user: " + err.message);
      } else {
        alert("Error deleting user");
      }
    }
  };

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>Error loading users: {error.message}</p>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">User Management</h1>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-500"
          onClick={() => setIsModalOpen(true)}
        >
          Create User
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-1/2">
            <h2 className="text-xl font-bold mb-4">Create New User</h2>
            <input
              type="text"
              placeholder="First Name"
              value={newUser.firstName}
              onChange={(e) =>
                setNewUser({ ...newUser, firstName: e.target.value })
              }
              className="w-full p-3 mb-3 border rounded"
            />
            <input
              type="text"
              placeholder="Last Name"
              value={newUser.lastName}
              onChange={(e) =>
                setNewUser({ ...newUser, lastName: e.target.value })
              }
              className="w-full p-3 mb-3 border rounded"
            />
            <input
              type="email"
              placeholder="Email"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
              className="w-full p-3 mb-3 border rounded"
            />
            <select
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              className="w-full p-3 mb-3 border rounded"
            >
              <option value="WORKER">Worker</option>
              <option value="ADMIN">Admin</option>
              <option value="COMPANY_REPRESENTATIVE">
                Company Representative
              </option>
            </select>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateUser}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-400"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">User List</h2>
        <ul className="space-y-4">
          {data?.getAllUsers.map((user) => (
            <li
              key={user.id}
              className="p-4 border rounded flex justify-between items-center"
            >
              <div>
                <p className="font-bold">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-sm text-gray-500">{user.email}</p>
                <p className="text-sm text-gray-500">Role: {user.role}</p>
              </div>
              <button
                onClick={() => handleDeleteUser(user.id)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-400"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
