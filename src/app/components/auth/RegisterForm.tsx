"use client";

import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { REGISTER } from "../../graphql/mutations/auth";

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
      router.push("/dashboard");
    } catch (err) {
      console.error("Registration error:", err);
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-40 p-16 ">
      <div className="bg-gradient-to-r from-white/10 to-white/20 p-16 shadow-lg rounded-2xl max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-32 backdrop-blur-xl bg-opacity-50 border border-white/40">
        <form onSubmit={handleSubmit(onSubmit)} className="flex-1">
          <h1 className="text-6xl font-bold mb-6 text-center text-white">
            Register
          </h1>
          <input
            {...register("email")}
            placeholder="Email"
            className="block w-full p-3 border border-gray-300 rounded-lg mb-3 bg-white bg-opacity-10 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-opacity-70"
          />
          <p className="text-red-400 text-sm">{errors.email?.message}</p>
          <input
            {...register("firstName")}
            placeholder="First Name"
            className="block w-full p-3 border border-gray-300 rounded-lg mb-3 bg-white bg-opacity-10 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-opacity-70"
          />
          <p className="text-red-400 text-sm">{errors.firstName?.message}</p>
          <input
            {...register("lastName")}
            placeholder="Last Name"
            className="block w-full p-3 border border-gray-300 rounded-lg mb-3 bg-white bg-opacity-10 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-opacity-70"
          />
          <p className="text-red-400 text-sm">{errors.lastName?.message}</p>
          <input
            {...register("userName")}
            placeholder="User Name"
            className="block w-full p-3 border border-gray-300 rounded-lg mb-3 bg-white bg-opacity-10 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-opacity-70"
          />
          <p className="text-red-400 text-sm">{errors.userName?.message}</p>
          <input
            {...register("password")}
            type="password"
            placeholder="Password"
            className="block w-full p-3 border border-gray-300 rounded-lg mb-3 bg-white bg-opacity-10 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-opacity-70"
          />
          <p className="text-red-400 text-sm">{errors.password?.message}</p>
          <input
            {...register("passwordConfirmation")}
            type="password"
            placeholder="Confirm Password"
            className="block w-full p-3 border border-gray-300 rounded-lg mb-3 bg-white bg-opacity-10 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-opacity-70"
          />
          <p className="text-red-400 text-sm">
            {errors.passwordConfirmation?.message}
          </p>
          <select
            {...register("role")}
            className="block w-full p-3 border border-gray-300 rounded-lg mb-4 bg-white bg-opacity-10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" className="text-gray-400">
              Select Role
            </option>
            <option value="WORKER" className="text-black">
              Worker
            </option>
            <option value="ADMIN" className="text-black">
              Admin
            </option>
            <option value="COMPANY_REPRESENTATIVE" className="text-black">
              Company Representative
            </option>
          </select>
          <p className="text-red-400 text-sm">{errors.role?.message}</p>
          <button
            type="submit"
            className={`w-full py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-lg shadow-md flex items-center justify-center transition-transform duration-300 hover:scale-105 hover:from-indigo-600 hover:to-purple-700 ${
              loading ? "cursor-not-allowed opacity-50" : ""
            }`}
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
          </button>
          {error && <p className="text-red-400 mt-4">{error.message}</p>}
            <p className="text-white text-center mt-6">
            Already have an account? <br />
            <a href="/login" className="underline hover:text-blue-300">
              Login here
            </a>
            </p>
        </form>

        <div className="flex flex-col items-center flex-1 gap-4">
          <h2 className="text-2xl font-bold text-white">Or Login with</h2>
          <button className="w-full py-4 bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold rounded-lg shadow-md flex items-center justify-center gap-3 transition-transform duration-300 hover:scale-105 hover:from-green-500 hover:to-green-700">
            <img
              src="https://cdn-icons-png.flaticon.com/512/825/825474.png"
              alt="MetaMask"
              className="h-8 w-8"
            />{" "}
            MetaMask
          </button>
          <button className="w-full py-4 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-lg shadow-md flex items-center justify-center gap-3 transition-transform duration-300 hover:scale-105 hover:from-red-600 hover:to-red-700">
            <img
              src="https://cdn-icons-png.flaticon.com/512/281/281769.png"
              alt="Google"
              className="h-8 w-8"
            />{" "}
            Google
          </button>
          <button className="w-full py-4 bg-gradient-to-r from-gray-700 to-gray-800 text-white font-semibold rounded-lg shadow-md flex items-center justify-center gap-3 transition-transform duration-300 hover:scale-105 hover:from-gray-800 hover:to-black">
            <img
              src="https://cdn-icons-png.flaticon.com/512/179/179326.png"
              alt="Apple"
              className="h-8 w-8"
            />{" "}
            Apple
          </button>
        </div>
      </div>
    </div>
  );
}
