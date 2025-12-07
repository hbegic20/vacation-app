'use client';

import { useState } from 'react';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        const response = await fetch('/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
            credentials: 'include',
        });

        const data = await response.json();
        console.log('Login response:', data);
    };

    return (
        <form onSubmit={handleLogin} className="max-w-md mx-auto mt-10">
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
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 mb-4 border border-gray-300 rounded"
                required
            />
            <button
                type="submit"
                className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Log In
            </button>
        </form>
    );
}
