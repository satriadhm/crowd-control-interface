"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Definisikan tipe data untuk input form
interface RegisterFormInputs {
  email: string;
  password: string;
  confirmPassword: string;
}

// Validasi schema menggunakan Yup
const schema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

export default function RegisterForm() {
  // Gunakan useForm dengan tipe data dan resolver Yup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>({
    resolver: yupResolver(schema),
  });

  // Tipe data pada parameter `data` sekarang sesuai dengan RegisterFormInputs
  const onSubmit = (data: RegisterFormInputs) => {
    console.log(data); // Ganti dengan API call
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-8 shadow-lg rounded"
    >
      <h1 className="text-2xl mb-4">Register</h1>

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
        className="block w-full p-2 border rounded mb-2"
      />
      <p className="text-red-500">{errors.password?.message}</p>

      <input
        {...register("confirmPassword")}
        type="password"
        placeholder="Confirm Password"
        className="block w-full p-2 border rounded mb-2"
      />
      <p className="text-red-500">{errors.confirmPassword?.message}</p>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded w-full"
      >
        Register
      </button>
    </form>
  );
}
