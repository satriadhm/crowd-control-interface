'use client';

import { useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { REGISTER } from '../../graphql/mutations/auth';

interface RegisterFormInputs {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  passwordConfirmation: string;
  role: string;
}

const schema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
  role: yup.string().required('Role is required'),
});

export default function RegisterForm() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormInputs>({
    resolver: yupResolver(schema),
  });
  const [registerMutation, { loading, error }] = useMutation(REGISTER);

  const onSubmit = async (data: RegisterFormInputs) => {
    try {
      await registerMutation({ variables: { input: data } });
      router.push('/dashboard');
    } catch (err) {
      console.error('Registration error:', err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-8 shadow-lg rounded max-w-md mx-auto"
    >
      <h1 className="text-3xl font-bold mb-6 text-center">Register</h1>
      <input {...register('email')} placeholder="Email" className="block w-full p-2 border rounded mb-2" />
      <p className="text-red-500">{errors.email?.message}</p>
      <input {...register('firstName')} placeholder="First Name" className="block w-full p-2 border rounded mb-2" />
      <p className="text-red-500">{errors.firstName?.message}</p>
      <input {...register('lastName')} placeholder="Last Name" className="block w-full p-2 border rounded mb-2" />
      <p className="text-red-500">{errors.lastName?.message}</p>
      <input {...register('password')} type="password" placeholder="Password" className="block w-full p-2 border rounded mb-2" />
      <p className="text-red-500">{errors.password?.message}</p>
      <input {...register('passwordConfirmation')} type="password" placeholder="Confirm Password" className="block w-full p-2 border rounded mb-2" />
      <p className="text-red-500">{errors.passwordConfirmation?.message}</p>
      <select {...register('role')} className="block w-full p-2 border rounded mb-4">
        <option value="">Select Role</option>
        <option value="WORKER">Worker</option>
        <option value="ADMIN">Admin</option>
        <option value="COMPANY_REPRESENTATIVE">Company Representative</option>
      </select>
      <p className="text-red-500">{errors.role?.message}</p>
      <button
        type="submit"
        className={`px-4 py-2 rounded w-full text-white ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-500'}`}
        disabled={loading}
      >
        {loading ? 'Registering...' : 'Register'}
      </button>
      {error && <p className="text-red-500 mt-4">{error.message}</p>}
    </form>
  );
}
