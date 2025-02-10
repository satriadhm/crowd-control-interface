"use client";

import { useQuery, useMutation } from "@apollo/client";
import { GET_ALL_USERS } from "@/graphql/queries/users";
import { CREATE_USER, DELETE_USER } from "@/graphql/mutations/users";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Trash2, UserPlus } from "lucide-react";

export default function UserManagement() {
  const { data, refetch } = useQuery(GET_ALL_USERS);
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

  const handleDeleteUser = async (id: string) => {
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

  return (
    <div className="p-6 bg-gray-50">
      <div className="flex justify-end items-center mb-6">
        <button
          className="px-4 py-2 flex items-center gap-2 bg-[#001333] text-white rounded shadow"
          onClick={() => setIsModalOpen(true)}
        >
          <UserPlus size={16} /> Create User
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

      <div className="bg-white p-6 border rounded shadow">
        <Table>
          <TableCaption>A list of users.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="font-semibold text-primary">Name</TableHead>
              <TableHead className="font-semibold text-primary">
                Email
              </TableHead>
              <TableHead className="font-semibold text-primary">Role</TableHead>
              <TableHead className="font-semibold text-right text-primary">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.getAllUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">
                  {user.firstName} {user.lastName}
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <span
                    className={`text-white px-4 py-1 rounded-lg ${
                      user.role.includes("worker")
                        ? "bg-purple-400"
                        : "bg-red-500"
                    }`}
                  >
                    {user.role}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-400"
                  >
                    <Trash2 size={14} />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
