'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiLogin } from '../utils/apiAction';

const LoginPage = () => {
  const router = useRouter();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const data = await apiLogin(identifier, password);
      if (data?.token) {
        router.push('/');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Your Company"
          src="/icon-sosro.svg"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
          Masuk
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="identifier" className="block text-sm font-medium text-gray-900">
              Email atau Nomor HP
            </label>
            <div className="mt-2">
              <input
                id="identifier"
                name="identifier"
                type="text"
                placeholder="Email atau Nomor HP"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
                autoComplete="identifier"
                className="block w-full rounded-md border-2 border-gray-300 p-2 text-gray-900 shadow-sm focus:ring-2 focus:ring-orange-600 focus:outline-none"
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="password"
                className="block w-full rounded-md border-2 border-gray-300 p-2 text-gray-900 shadow-sm focus:ring-2 focus:ring-orange-600 focus:outline-none"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-red-600 p-2 font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            >
              Masuk
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
