"use client";

import { useState } from "react";

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });

    const data = await response.json();
    console.log("Sign up response:", data);
  };

  return (
    <form onSubmit={handleSignUp} className="max-w-md mx-auto mt-10">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-300 rounded"
        required
      />
      <input
        type="password"
        name="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Sign up
    </button>
    </form>
  );
}
