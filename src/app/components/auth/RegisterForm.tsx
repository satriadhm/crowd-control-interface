import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required(),
});

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    console.log(data); // Replace with API call
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 shadow-lg rounded">
      <h1 className="text-2xl mb-4">Register</h1>
      <input {...register('email')} placeholder="Email" className="block w-full p-2 border rounded mb-2" />
      <p className="text-red-500">{errors.email?.message}</p>

      <input {...register('password')} type="password" placeholder="Password" className="block w-full p-2 border rounded mb-2" />
      <p className="text-red-500">{errors.password?.message}</p>

      <input {...register('confirmPassword')} type="password" placeholder="Confirm Password" className="block w-full p-2 border rounded mb-2" />
      <p className="text-red-500">{errors.confirmPassword?.message}</p>

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">Register</button>
    </form>
  );
}
