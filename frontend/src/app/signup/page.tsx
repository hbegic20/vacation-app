// src/app/signup/page.tsx
'use client';
import { useState } from 'react';
import { apiFetch } from '@/lib/api';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignup = async (e: any) => {
    e.preventDefault();
    try {
      const res = await apiFetch('/auth/signup', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      setMessage('Signup successful — please login');
      setEmail('');
      setPassword('');
    } catch (err: any) {
      setMessage(err.message || 'Error');
    }
  };

  return (
    <form
      onSubmit={handleSignup}
      className="max-w-md w-full mx-auto space-y-5 rounded-2xl bg-black/60 backdrop-blur p-8 shadow-xl border border-white/10"
    >
      <h2 className="text-2xl font-semibold text-white text-center">
        Sign up
      </h2>

      <input
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email"
        className="w-full rounded-lg bg-white/10 px-4 py-3 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        value={password}
        onChange={e => setPassword(e.target.value)}
        type="password"
        placeholder="Password"
        className="w-full rounded-lg bg-white/10 px-4 py-3 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        type="submit"
        className="w-full rounded-lg bg-blue-600 py-3 text-sm font-medium text-white hover:bg-blue-700 transition"
      >
        Create account
      </button>

      {message && (
        <div className="text-center text-sm text-red-400">
          {message}
        </div>
      )}
    </form>

  );
}
