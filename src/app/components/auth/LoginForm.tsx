import { useForm } from 'react-hook-form';

export default function LoginForm() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    console.log(data); // Replace with API call
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 shadow-lg rounded">
      <h1 className="text-2xl mb-4">Login</h1>
      <input {...register('email')} placeholder="Email" className="block w-full p-2 border rounded mb-2" />
      <input {...register('password')} type="password" placeholder="Password" className="block w-full p-2 border rounded mb-4" />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">Login</button>
    </form>
  );
}
