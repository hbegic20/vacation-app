// src/components/Navbar.tsx
'use client';
import Link from 'next/link';
import { useUser } from '@/app/hooks/useUser';
import { apiFetch } from '@/lib/api';

export default function Navbar() {
  const { user, loading, refresh } = useUser();

  const handleLogout = async () => {
    try {
      await apiFetch('/auth/logout', { method: 'POST' });
      refresh();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <nav style={{ display: 'flex', gap: 12, padding: 12 }}>
      <Link href="/">Home</Link>
      {!loading && user ? (
        <>
          <span>Welcome, {user.email}</span>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <Link href="/login">Login</Link>
          <Link href="/signup">Signup</Link>
        </>
      )}
    </nav>
  );
}
