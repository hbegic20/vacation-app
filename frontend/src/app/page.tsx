'use client';

import { useUser } from '@/app/hooks/useUser';

export default function Home() {
  const user = useUser();

  return (
    <div>
      {user ? (
        <p>Welcome, {user.email}</p>
      ) : (
        <p>You are not logged in</p>
      )}
    </div>
  );
}
