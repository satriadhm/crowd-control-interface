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
import Cookies from "js-cookie";
import { useAuthStore } from "@/store/authStore";
import { useState, useEffect } from "react";

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
  const { setAuth } = useAuthStore();
  const [isFormValid, setIsFormValid] = useState(false);
  
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RegisterFormInputs>({
    resolver: yupResolver(schema),
    mode: "onChange", // Enable real-time validation
  });
  
  const [registerMutation, { loading, error }] = useMutation(REGISTER);

  const password = watch("password");
  const passwordConfirmation = watch("passwordConfirmation");
  const email = watch("email");
  const firstName = watch("firstName");
  const lastName = watch("lastName");
  const userName = watch("userName");
  const role = watch("role");

  useEffect(() => {
    const passwordsMatch = !!(password && passwordConfirmation && password === passwordConfirmation);
    const allFieldsFilled = !!(email && firstName && lastName && userName && password && passwordConfirmation && role);
    const passwordValid = !!(password && password.length >= 8);
    const noErrors = Object.keys(errors).length === 0;
    
    setIsFormValid(passwordsMatch && allFieldsFilled && passwordValid && noErrors);
  }, [password, passwordConfirmation, email, firstName, lastName, userName, role, errors]);

  const onSubmit = async (data: RegisterFormInputs) => {
    try {
      const response = await registerMutation({ variables: { input: data } });
      const { role, accessToken, refreshToken } = response.data.register;
      Cookies.set("accessToken", accessToken, { expires: 1, path: "/" });
      Cookies.set("refreshToken", refreshToken, { expires: 7, path: "/" });
      setAuth(role, accessToken, refreshToken);

      if (data.role === "ADMIN") {
        router.push(`/task-management`);
      } else if (data.role === "QUESTION_VALIDATOR") {
        router.push(`/validate-question`);
      } else {
        router.push(`/dashboard`);
      }
    } catch (err) {
      console.error("Registration error:", err);
    }
  };

  // Function to get password confirmation status
  const getPasswordConfirmationStatus = () => {
    if (!password || !passwordConfirmation) return null;
    if (password === passwordConfirmation) return "match";
    return "mismatch";
  };

  const passwordStatus = getPasswordConfirmationStatus();

  return (
    <section className="rounded-3xl p-px border border-[#5b0ba1] bg-gradient-to-r from-[#5b0ba1] to-transparent">
      <div className="lg:grid grid-cols-2">
        <div className="col-span-1 hidden lg:flex items-center justify-center">
          <Image
            src="/icons/login-illustration.svg"
            width={400}
            height={100}
            alt="image-illustration"
          />
        </div>

        <div className="col-span-1 text-white flex flex-col px-4 justify-center py-12 w-full">
          <div className="text-left mb-8 w-full">
            <h1 className="text-2xl items-center gap-2">
              <span className="text-white font-semibold">Registration</span>
            </h1>
            <p className="text-white text-sm mt-2">
              Registering is quick and easy! Just fill out the form below, and{" "}
              {`you'll`} be on your way to enjoying everything{" "}
              <strong>TrustCrowd©</strong> has to offer
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="flex-1">
            <div className="mb-3">
              <Input {...register("email")} placeholder="Email" type="email" />
              <p className="text-red-400 text-xs">{errors.email?.message}</p>
            </div>
            <div className="grid grid-cols-2 space-x-4">
              <div className="mb-3">
                <Input {...register("firstName")} placeholder="First Name" />
                <p className="text-red-400 text-xs">
                  {errors.firstName?.message}
                </p>
              </div>
              <div className="mb-3">
                <Input {...register("lastName")} placeholder="Last Name" />
                <p className="text-red-400 text-xs">
                  {errors.lastName?.message}
                </p>
              </div>
            </div>
            <div className="mb-3">
              <Input {...register("userName")} placeholder="User Name" />
              <p className="text-red-400 text-xs">{errors.userName?.message}</p>
            </div>
            <div className="mb-3">
              <Input
                {...register("password")}
                type="password"
                placeholder="Password"
                className={`${
                  password && password.length >= 8
                    ? "border-green-500 focus:border-green-500"
                    : password && password.length > 0 && password.length < 8
                    ? "border-red-500 focus:border-red-500"
                    : ""
                }`}
              />
              <div className="mt-1">
                {password && password.length > 0 && (
                  <div className="text-xs">
                    {password.length >= 8 ? (
                      <p className="text-green-400">✓ Password meets minimum requirements</p>
                    ) : (
                      <p className="text-red-400">✗ Password must be at least 8 characters</p>
                    )}
                  </div>
                )}
                <p className="text-red-400 text-xs">{errors.password?.message}</p>
              </div>
            </div>
            <div className="mb-3">
              <Input
                {...register("passwordConfirmation")}
                type="password"
                placeholder="Confirm Password"
                className={`${
                  passwordStatus === "match"
                    ? "border-green-500 focus:border-green-500"
                    : passwordStatus === "mismatch"
                    ? "border-red-500 focus:border-red-500"
                    : ""
                }`}
              />
              <div className="mt-1">
                {passwordConfirmation && password && (
                  <div className="text-xs">
                    {passwordStatus === "match" ? (
                      <p className="text-green-400">✓ Passwords match</p>
                    ) : (
                      <p className="text-red-400">✗ Passwords do not match</p>
                    )}
                  </div>
                )}
                <p className="text-red-400 text-xs">
                  {errors.passwordConfirmation?.message}
                </p>
              </div>
            </div>
            <div className="mb-6">
              <Select onValueChange={(value) => setValue("role", value, { shouldValidate: true })}>
                <SelectTrigger className="bg-[#4c0e8f] border border-[#001333] text-white">
                  <SelectValue placeholder="Select Role" />
                </SelectTrigger>
                <SelectContent className="bg-[#4c0e8f] text-white">
                  <SelectItem value="WORKER">Crowd Worker</SelectItem>
                  <SelectItem value="QUESTION_VALIDATOR">Question Validator</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-red-400 text-xs">{errors.role?.message}</p>
            </div>

            {isFormValid ? (
              <Button
                type="submit"
                className="w-full bg-[#4c0e8f] border border-[#001333] transition-all duration-300 hover:bg-[#5c1a9f] hover:shadow-lg"
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
                  <span className="flex items-center justify-center gap-2">
                    ✓ Register
                  </span>
                )}
              </Button>
            ) : (
              <div className="w-full bg-gray-600 text-gray-400 py-2 px-4 rounded-md text-center cursor-not-allowed">
                Complete all fields to register
              </div>
            )}

            {error && <p className="text-red-400 mt-4">{error.message}</p>}
          </form>
          <span className="text-center w-full my-4 text-sm text-white">
            I have account ?{" "}
            <Link href="/login" className="font-semibold inline-block transition-transform duration-300 hover:scale-110">
              Login
            </Link>
          </span>
        </div>
      </div>
    </section>
  );
}