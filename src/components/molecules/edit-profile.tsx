"use client";

import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "@/graphql/mutations/users";
import { useRouter } from "next/navigation";

interface EditProfileFormInputs {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address1: string;
  address2: string;
}

export default function EditProfile() {
  const { accessToken } = useAuthStore();
  const router = useRouter();
  const {
    register,
    handleSubmit,
  } = useForm<EditProfileFormInputs>();

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

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input
            {...register("firstName", { required: "First Name is required" })}
            placeholder="First Name"
          />
          <Input
            {...register("lastName", { required: "Last Name is required" })}
            placeholder="Last Name"
          />
        </div>
        <Input
          {...register("email", { required: "Email is required" })}
          placeholder="Email"
          type="email"
        />
        <Input {...register("phoneNumber")} placeholder="Phone Number" />
        <Input {...register("address1")} placeholder="Address Line 1" />
        <Input {...register("address2")} placeholder="Address Line 2" />
        <Button type="submit" className="w-full bg-[#001333]">
          Save Changes
        </Button>
      </form>
    </div>
  );
}
