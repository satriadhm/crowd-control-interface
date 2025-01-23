"use client";

import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { LOGIN } from "../../graphql/mutations/auth";

interface LoginFormInputs {
  email: string;
  password: string;
}

export default function LoginForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({ mode: "onSubmit" });
  const [loginMutation, { loading, error }] = useMutation(LOGIN, {
    fetchPolicy: "no-cache", // Ensures fresh login data
  });

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const response = await loginMutation({ variables: { input: data } });

      if (!response?.data?.login) {
        throw new Error("Invalid API response");
      }

      const { role } = response.data.login;

      if (role === "admin") {
        router.push("/admin/task-management");
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      console.error("Login failed:", err);
      alert(`Login failed: ${err instanceof Error ? err.message : "Unknown error"}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-gradient-to-r from-white/10 to-white/20 p-16 shadow-lg rounded-lg max-w-lg mx-auto"
    >
      <h1 className="text-4xl font-bold mb-8 text-center text-white">Login</h1>
      <div className="mb-6">
        <input
          {...register("email", { required: "Email is required" })}
          placeholder="Email"
          className="block w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300"
        />
        <p className="text-red-400 text-sm mt-2">{errors.email?.message}</p>
      </div>
      <div className="mb-6">
        <input
          {...register("password", { required: "Password is required" })}
          type="password"
          placeholder="Password"
          className="block w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300"
        />
        <p className="text-red-400 text-sm mt-2">{errors.password?.message}</p>
      </div>
      <button
        type="submit"
        className={`w-full py-3 rounded-lg font-semibold text-white transition-all duration-300 shadow-lg ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-indigo-600 hover:bg-indigo-700"
        }`}
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
      </button>
      {error && (
        <p className="text-red-400 text-center mt-6">{error.message}</p>
      )}
    </form>
  );
}
