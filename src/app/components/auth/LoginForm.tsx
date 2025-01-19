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
  } = useForm<LoginFormInputs>();
  const [loginMutation, { loading, error }] = useMutation(LOGIN);

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const response = await loginMutation({ variables: { input: data } });
      const { accessToken, refreshToken, role } = response.data.login;

      // Save tokens
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      // Redirect based on role
      if (role === "admin") {
        router.push("/admin");
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      if (err instanceof Error) {
        console.error("Login failed:", err.message);
      } else {
        console.error("Login failed:", err);
      }
      alert("Invalid credentials.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-8 shadow-lg rounded max-w-md mx-auto"
    >
      <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>
      <input
        {...register("email")}
        placeholder="Email"
        className="block w-full p-2 border rounded mb-2"
      />
      <p className="text-red-500">{errors.email?.message}</p>
      <input
        {...register("password")}
        type="password"
        placeholder="Password"
        className="block w-full p-2 border rounded mb-4"
      />
      <p className="text-red-500">{errors.password?.message}</p>
      <button
        type="submit"
        className={`px-4 py-2 rounded w-full text-white ${
          loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-500"
        }`}
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
      </button>
      {error && <p className="text-red-500 mt-4">{error.message}</p>}
    </form>
  );
}
