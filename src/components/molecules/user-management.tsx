"use client";

import { useQuery, useMutation } from "@apollo/client";
import { GET_ALL_USERS, GET_USER_BY_ID } from "@/graphql/queries/users";
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
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

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

  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const { data: userData } = useQuery(GET_USER_BY_ID, {
    variables: { id: selectedUserId },
    skip: !selectedUserId,
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

  const handleViewUserDetails = (id: string) => {
    setSelectedUserId(id);
  };

  return (
    <div className={`p-6 bg-gray-50 ${selectedUserId ? "blur-sm" : ""}`}>
      <div className="flex justify-end items-center mb-6">
        <Button
          className="flex items-center gap-2 bg-[#001333] text-white rounded shadow"
          onClick={() => setIsModalOpen(true)}
        >
          <UserPlus size={16} /> Create User
        </Button>
      </div>

      <Dialog
        open={isModalOpen}
        onOpenChange={() => setIsModalOpen(!isModalOpen)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New User</DialogTitle>
          </DialogHeader>

          <div className="bg-white mt-6">
            <div className="grid grid-cols-2 gap-4">
              <Input
                type="text"
                placeholder="First Name"
                value={newUser.firstName}
                onChange={(e) =>
                  setNewUser({ ...newUser, firstName: e.target.value })
                }
                className="w-full p-3 mb-3 border rounded"
              />
              <Input
                type="text"
                placeholder="Last Name"
                value={newUser.lastName}
                onChange={(e) =>
                  setNewUser({ ...newUser, lastName: e.target.value })
                }
                className="w-full p-3 mb-3 border rounded"
              />
            </div>
            <Input
              type="email"
              placeholder="Email"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
              className="w-full p-3 mb-3 border rounded"
            />

            <Select
              onValueChange={(value) =>
                setNewUser((prev) => ({ ...prev, role: value }))
              }
            >
              <SelectTrigger className="bg-white">
                <SelectValue className="bg-white" placeholder="Select Role" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="WORKER">Worker</SelectItem>
                <SelectItem value="ADMIN">Admin</SelectItem>
                <SelectItem value="COMPANY_REPRESENTATIVE">
                  Company Representative
                </SelectItem>
              </SelectContent>
            </Select>
            <div className="mt-8 gap-4 flex justify-end">
              <Button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </Button>
              <Button onClick={handleCreateUser}>Create</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        open={!!selectedUserId}
        onOpenChange={() => setSelectedUserId(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Detail User</DialogTitle>
          </DialogHeader>
          <div className="mb-8">
            <div className="grid grid-cols-2">
              <p className="font-semibold">First Name </p>
              <p>: {userData?.getUserById?.firstName}</p>
            </div>
            <div className="grid grid-cols-2">
              <p className="font-semibold">Last Name </p>
              <p>: {userData?.getUserById?.lastName}</p>
            </div>
            <div className="grid grid-cols-2">
              <p className="font-semibold">Email </p>
              <p>: {userData?.getUserById?.email}</p>
            </div>
            <div className="grid grid-cols-2">
              <p className="font-semibold">Role </p>
              <p>: {userData?.getUserById?.role}</p>
            </div>
          </div>
          <Button onClick={() => setSelectedUserId(null)}>Close</Button>
        </DialogContent>
      </Dialog>

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
  className={`text-sm px-4 py-1 rounded-lg ${
    user.role.includes("worker")
      ? "bg-green-500 text-white border border-green-700"
      : "bg-orange-500 text-white border border-orange-700"
  }`}
>
  {user.role}
</span>

                </TableCell>
                <TableCell className="text-right flex items-center gap-2 justify-end">
                  <Button
                    onClick={() => handleViewUserDetails(user.id)}
                    className="bg-[#0a1e5e]"
                  >
                    View
                  </Button>
                  <Button
                    onClick={() => handleDeleteUser(user.id)}
                    variant="destructive"
                  >
                    <Trash2 size={14} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
