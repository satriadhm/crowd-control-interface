"use client";

import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { LOGIN } from "@/graphql/mutations/auth";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { setCookie } from "cookies-next/client";

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
    fetchPolicy: "no-cache",
  });

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const response = await loginMutation({ variables: { input: data } });

      if (!response?.data?.login) {
        throw new Error("Invalid API response");
      }
      const { role, accessToken, refreshToken } = response.data.login;

      setCookie("accessToken", accessToken);
      setCookie("refreshToken", refreshToken);

      router.push(role === "admin" ? `/admin/task-management` : `/dashboard`);
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <Card className="max-w-md mx-auto p-6 shadow-lg">
      <CardHeader>
        <h1 className="text-2xl font-bold text-center">Login</h1>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error.message}</AlertDescription>
          </Alert>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Input
              {...register("email", { required: "Email is required" })}
              placeholder="Email"
              type="email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <Input
              {...register("password", { required: "Password is required" })}
              placeholder="Password"
              type="password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="text-center text-sm text-gray-500">
        <p>
          Need an account?{" "}
          <a href="/register" className="text-indigo-500 hover:underline">
            Sign up
          </a>
        </p>
      </CardFooter>
    </Card>
  );
}
