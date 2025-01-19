'use client';

import { useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { LOGIN } from '../../graphql/mutations/auth';

interface LoginFormInputs {
  email: string;
  password: string;
}

export default function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();
  const [login, { loading, error }] = useMutation(LOGIN);

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const response = await login({
        variables: {
          input: {
            email: data.email,
            password: data.password,
          },
        },
      });
      console.log('Login successful:', response.data.login);
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 shadow-lg rounded">
      <h1 className="text-2xl mb-4">Login</h1>
      <input
        {...register('email', { required: 'Email is required' })}
        placeholder="Email"
        className="block w-full p-2 border rounded mb-2"
      />
      <p className="text-red-500">{errors.email?.message}</p>

      <input
        {...register('password', { required: 'Password is required' })}
        type="password"
        placeholder="Password"
        className="block w-full p-2 border rounded mb-4"
      />
      <p className="text-red-500">{errors.password?.message}</p>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        disabled={loading}
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>
      {error && <p className="text-red-500 mt-2">{error.message}</p>}
    </form>
  );
}
