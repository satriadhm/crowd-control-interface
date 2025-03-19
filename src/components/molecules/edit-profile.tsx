"use client";

import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";
import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_USER } from "@/graphql/mutations/users";
import { GET_LOGGED_IN_USER } from "@/graphql/queries/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { EditProfileFormInputs } from "@/graphql/types/tasks";


export default function EditProfile() {
  const { accessToken } = useAuthStore();
  const router = useRouter();

  const { data: userData, loading: queryLoading, error: queryError } = useQuery(GET_LOGGED_IN_USER, {
    variables: { token: accessToken },
    context: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  });

  const { register, handleSubmit, reset } = useForm<EditProfileFormInputs>();

  useEffect(() => {
    if (userData && userData.me) {
      reset({
        id: userData.me.id,
        firstName: userData.me.firstName,
        lastName: userData.me.lastName,
        email: userData.me.email,
        phoneNumber: userData.me.phoneNumber || "",
        address1: userData.me.address1 || "",
        address2: userData.me.address2 || "",
      });
    }
  }, [userData, reset]);

  const [updateUser] = useMutation(UPDATE_USER);

  const onSubmit = async (data: EditProfileFormInputs) => {
    try {
      await updateUser({
        variables: { input: data },
        context: {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      });
      alert("Profile updated successfully!");
      router.push("/dashboard");
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  if (queryLoading) return <p>Loading...</p>;
  if (queryError) return <p>Error: {queryError.message}</p>;

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#0a1e5e] to-[#001333] flex items-center justify-center">
      <div className="w-full max-w-xl p-6 bg-white rounded-lg shadow-md text-black">
        <h1 className="text-2xl font-bold mb-6 text-center">Edit Profile</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              {...register("firstName", { required: "First Name is required" })}
              placeholder="First Name"
              className="text-black"
            />
            <Input
              {...register("lastName", { required: "Last Name is required" })}
              placeholder="Last Name"
              className="text-black"
            />
          </div>
          <Input
            {...register("email", { required: "Email is required" })}
            placeholder="Email"
            type="email"
            className="text-black"
          />
          <Input {...register("phoneNumber")} placeholder="Phone Number" className="text-black" />
          <Input {...register("address1")} placeholder="Address Line 1" className="text-black" />
          <Input {...register("address2")} placeholder="Address Line 2" className="text-black" />
          <Button type="submit" className="w-full bg-[#001333]">
            Save Changes
          </Button>
        </form>
      </div>
    </div>
  );
}
