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
import { Trash2, UserPlus, Eye } from "lucide-react";
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
  const { data, loading, refetch } = useQuery(GET_ALL_USERS);
  const [createUser] = useMutation(CREATE_USER);
  const [deleteUser] = useMutation(DELETE_USER);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "WORKER",
  });

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

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
    if (confirm("Are you sure you want to delete this user?")) {
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
    }
  };

  const handleViewUserDetails = (id: string) => {
    setSelectedUserId(id);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  const users = data?.getAllUsers || [];
  const totalPages = Math.ceil(users.length / itemsPerPage);
  const paginatedUsers = users.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">User Management</h1>
        <Button
          className="flex items-center gap-2 bg-gradient-to-r from-tertiary to-tertiary-light text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
          onClick={() => setIsModalOpen(true)}
        >
          <UserPlus size={16} />
          Create User
        </Button>
      </div>

      <Dialog
        open={isModalOpen}
        onOpenChange={() => setIsModalOpen(!isModalOpen)}
      >
        <DialogContent className="bg-[#0a1e5e] text-white border border-white/20">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              Create New User
            </DialogTitle>
          </DialogHeader>

          <div className="mt-6">
            <div className="grid grid-cols-2 gap-4">
              <Input
                type="text"
                placeholder="First Name"
                value={newUser.firstName}
                onChange={(e) =>
                  setNewUser({ ...newUser, firstName: e.target.value })
                }
                className="bg-white/10 border-white/20 text-white"
              />
              <Input
                type="text"
                placeholder="Last Name"
                value={newUser.lastName}
                onChange={(e) =>
                  setNewUser({ ...newUser, lastName: e.target.value })
                }
                className="bg-white/10 border-white/20 text-white"
              />
            </div>
            <Input
              type="email"
              placeholder="Email"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
              className="w-full mt-4 bg-white/10 border-white/20 text-white"
            />

            <Select
              onValueChange={(value) =>
                setNewUser((prev) => ({ ...prev, role: value }))
              }
              value={newUser.role}
            >
              <SelectTrigger className="mt-4 bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Select Role" />
              </SelectTrigger>
              <SelectContent className="bg-[#0a1e5e] border border-white/20 text-white">
                <SelectItem value="WORKER" className="hover:bg-white/10">
                  Worker
                </SelectItem>
                <SelectItem value="ADMIN" className="hover:bg-white/10">
                  Admin
                </SelectItem>
                <SelectItem
                  value="COMPANY_REPRESENTATIVE"
                  className="hover:bg-white/10"
                >
                  Company Representative
                </SelectItem>
              </SelectContent>
            </Select>
            <div className="mt-8 gap-4 flex justify-end">
              <Button
                onClick={() => setIsModalOpen(false)}
                className="bg-white/10 hover:bg-white/20 border border-white/20 text-white"
              >
                Cancel
              </Button>
              <Button
                onClick={handleCreateUser}
                className="bg-gradient-to-r from-tertiary to-tertiary-light text-white hover:shadow-lg"
              >
                Create User
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        open={!!selectedUserId}
        onOpenChange={() => setSelectedUserId(null)}
      >
        <DialogContent className="bg-[#0a1e5e] text-white border border-white/20">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              User Details
            </DialogTitle>
          </DialogHeader>
          <div className="mb-8 bg-white/10 p-6 rounded-lg">
            <div className="space-y-4">
              <div className="grid grid-cols-2 border-b border-white/10 pb-2">
                <p className="font-semibold">First Name:</p>
                <p>{userData?.getUserById?.firstName}</p>
              </div>
              <div className="grid grid-cols-2 border-b border-white/10 pb-2">
                <p className="font-semibold">Last Name:</p>
                <p>{userData?.getUserById?.lastName}</p>
              </div>
              <div className="grid grid-cols-2 border-b border-white/10 pb-2">
                <p className="font-semibold">Email:</p>
                <p>{userData?.getUserById?.email}</p>
              </div>
              <div className="grid grid-cols-2">
                <p className="font-semibold">Role:</p>
                <p>
                  <span
                    className={`text-sm px-4 py-1 rounded-lg ${
                      userData?.getUserById?.role.includes("WORKER")
                        ? "bg-green-500 text-white"
                        : "bg-orange-500 text-white"
                    }`}
                  >
                    {userData?.getUserById?.role}
                  </span>
                </p>
              </div>
            </div>
          </div>
          <Button
            onClick={() => setSelectedUserId(null)}
            className="bg-gradient-to-r from-tertiary to-tertiary-light text-white hover:shadow-lg"
          >
            Close
          </Button>
        </DialogContent>
      </Dialog>

      <div className="bg-white/10 rounded-lg shadow-lg overflow-hidden">
        <Table>
          <TableCaption>All registered users in the system</TableCaption>
          <TableHeader className="bg-white/5">
            <TableRow>
              <TableHead className="text-white">Name</TableHead>
              <TableHead className="text-white">Email</TableHead>
              <TableHead className="text-white">Role</TableHead>
              <TableHead className="text-right text-white">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedUsers.map((user) => (
              <TableRow
                key={user.id}
                className="border-b border-white/10 hover:bg-white/5"
              >
                <TableCell className="font-medium text-white">
                  {user.firstName} {user.lastName}
                </TableCell>
                <TableCell className="text-gray-300">{user.email}</TableCell>
                <TableCell>
                  <span
                    className={`text-sm px-4 py-1 rounded-lg ${
                      user.role.includes("WORKER")
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
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                    size="sm"
                  >
                    <Eye size={14} className="mr-1" />
                    View
                  </Button>
                  <Button
                    onClick={() => handleDeleteUser(user.id)}
                    variant="destructive"
                    size="sm"
                  >
                    <Trash2 size={14} className="mr-1" />
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-between items-center px-6 py-4 bg-white/5">
            <Button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="bg-white/10 hover:bg-white/20 text-white disabled:opacity-50"
            >
              Previous
            </Button>
            <span className="text-white">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="bg-white/10 hover:bg-white/20 text-white disabled:opacity-50"
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
