"use client";

import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { LOGIN } from "@/graphql/mutations/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import Image from "next/image";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import Cookies from "js-cookie";
import { LoginFormInputs } from "@/graphql/types/users";

export default function LoginForm() {
  const router = useRouter();
  const { setAuth } = useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({ mode: "onSubmit" });
  const [loginMutation, { loading, error }] = useMutation(LOGIN, {
    fetchPolicy: "no-cache",
  });

  const onSubmit = async (input: LoginFormInputs) => {
    try {
      const response = await loginMutation({ variables: { input } });
      if (!response?.data?.login) {
        throw new Error("Invalid API response");
      }

      const { role, accessToken, refreshToken } = response.data.login;
      Cookies.set("accessToken", accessToken, { expires: 1, path: "/" });
      Cookies.set("refreshToken", refreshToken, { expires: 7, path: "/" });
      setAuth(role, accessToken, refreshToken);

      if (role === "admin") {
        router.push(`/task-management`);
      } else if (role === "question_validator") {
        router.push(`/validate-question`);
      } else {
        router.push(`/dashboard`);
      }
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <section className="rounded-3xl p-px border border-[#5b0ba1] bg-gradient-to-r from-[#5b0ba1] to-transparent">
      <div className="lg:grid grid-cols-2">
        <div className="col-span-1 lg:flex hidden items-center justify-center">
          <Image
            src="/icons/login-illustration.svg"
            width={400}
            height={100}
            alt="image-illustration"
          />
        </div>
        <div className="col-span-1 text-white flex flex-col px-4 justify-center py-12 items-center w-full">
          <div className="text-left mb-8 w-full">
            <h1 className="text-2xl items-center gap-2">
              Hi, Welcome <br /> to{" "}
              <span className="text-white font-semibold">TrustCrowd©</span>
            </h1>
          </div>
          <div className="w-full">
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error.message}</AlertDescription>
              </Alert>
            )}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Input
                  {...register("identifier", {
                    required: "Username or Email is required",
                  })}
                  placeholder="Username or Email"
                  type="text"
                />
                {errors.identifier && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.identifier.message}
                  </p>
                )}
              </div>
              <div>
                <Input
                  {...register("password", {
                    required: "Password diperlukan",
                  })}
                  placeholder="Password"
                  type="password"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <Button
                type="submit"
                className="w-full bg-[#4c0e8f] border border-[#001333]"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </Button>
            </form>
          </div>
          <span className="text-center text-white w-full my-4 text-sm">
            {`Don't`} have account?{" "}
            <Link
              href="/register"
              className="font-semibold inline-block transition-transform duration-300 hover:scale-110"
            >
              Register
            </Link>
          </span>
        </div>
      </div>
    </section>
  );
}
