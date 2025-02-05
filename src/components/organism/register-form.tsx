"use client";

import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { REGISTER } from "@/graphql/mutations/auth";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface RegisterFormInputs {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  userName: string;
  passwordConfirmation: string;
  role: string;
}

const schema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  userName: yup.string().required("User Name is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
  role: yup.string().required("Role is required"),
});

export default function RegisterForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>({
    resolver: yupResolver(schema),
  });
  const [registerMutation, { loading, error }] = useMutation(REGISTER);

  const onSubmit = async (data: RegisterFormInputs) => {
    try {
      await registerMutation({ variables: { input: data } });
      router.push("/dashboard?isActive=true");
    } catch (err) {
      console.error("Registration error:", err);
    }
  };

  return (
    <section className="border rounded-lg shadow-lg lg:max-w-[60rem] w-full mx-2">
      <div className="lg:grid grid-cols-2">
        <div className="col-span-1 hidden lg:flex items-center justify-center">
          <Image
            src="/icons/login-illustration.svg"
            width={400}
            height={100}
            alt="image-illustration"
          />
        </div>

        <div className="col-span-1 flex flex-col px-4 justify-center py-12 w-full">
          <div className="text-left mb-8 w-full">
            <h1 className="text-2xl items-center gap-2">
              Hi, Welcome <br /> to{" "}
              <span className="text-primary font-semibold">Evaluate</span>
            </h1>
            <p className="text-gray-500 text-sm mt-2">
              Registering is quick and easy! Just fill out the form below, and
              {`you'll`} be on your way to enjoying everything{" "}
              <strong>Evaluate</strong> has to offer
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="flex-1">
            <Input
              {...register("email")}
              placeholder="Email"
              className="block w-full p-3 border border-gray-300 rounded-lg mb-3 bg-white bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-opacity-70"
            />
            <p className="text-red-400 text-sm">{errors.email?.message}</p>
            <Input
              {...register("firstName")}
              placeholder="First Name"
              className="block w-full p-3 border border-gray-300 rounded-lg mb-3 bg-white bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-opacity-70"
            />
            <p className="text-red-400 text-sm">{errors.firstName?.message}</p>
            <Input
              {...register("lastName")}
              placeholder="Last Name"
              className="block w-full p-3 border border-gray-300 rounded-lg mb-3 bg-white bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-opacity-70"
            />
            <p className="text-red-400 text-sm">{errors.lastName?.message}</p>
            <Input
              {...register("userName")}
              placeholder="User Name"
              className="block w-full p-3 border border-gray-300 rounded-lg mb-3 bg-white bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-opacity-70"
            />
            <p className="text-red-400 text-sm">{errors.userName?.message}</p>
            <Input
              {...register("password")}
              type="password"
              placeholder="Password"
              className="block w-full p-3 border border-gray-300 rounded-lg mb-3 bg-white bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-opacity-70"
            />
            <p className="text-red-400 text-sm">{errors.password?.message}</p>
            <Input
              {...register("passwordConfirmation")}
              type="password"
              placeholder="Confirm Password"
              className="block w-full p-3 border border-gray-300 rounded-lg mb-3 bg-white bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-opacity-70"
            />
            <p className="text-red-400 text-sm">
              {errors.passwordConfirmation?.message}
            </p>
            <Select {...register("role")}>
              <SelectTrigger className="mb-6">
                <SelectValue placeholder="Select Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="WORKER">Worker</SelectItem>
                <SelectItem value="ADMIN">Admin</SelectItem>
                <SelectItem value="COMPANY_REPRESENTATIVE">
                  Company Representative
                </SelectItem>
              </SelectContent>
            </Select>

            <p className="text-red-400 text-sm">{errors.role?.message}</p>
            <Button
              type="submit"
              className={`${
                loading ? "cursor-not-allowed opacity-50" : ""
              } w-full`}
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    ></path>
                  </svg>
                  Registering...
                </span>
              ) : (
                "Register"
              )}
            </Button>
            {error && <p className="text-red-400 mt-4">{error.message}</p>}
          </form>
          <span className="text-center w-full my-4 text-sm text-primary">
            I have account ?{" "}
            <Link href="/login" className="font-semibold text-primary">
              Login
            </Link>
          </span>

          <div className="flex flex-col gap-2 w-full">
            <Button disabled variant="outline" className="w-full">
              <Image
                src="/icons/google-icon.svg"
                width={23}
                height={23}
                alt="image-illustration"
              />
              Email
            </Button>
            <Button disabled variant="outline" className="w-full">
              <Image
                src="/icons/github-icon.svg"
                width={23}
                height={23}
                alt="image-illustration"
              />
              Github
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
