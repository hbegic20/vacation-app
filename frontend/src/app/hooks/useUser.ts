// src/hooks/useUser.ts
'use client';
import { useEffect, useState, useCallback } from 'react';
import { apiFetch } from '@/lib/api';

export function useUser() {
  const [user, setUser] = useState<unknown>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchUser = useCallback(async () => {
    setLoading(true);
    try {
      const data = await apiFetch('/auth/me');
      setUser(data);
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return { user, loading, refresh: fetchUser };
}
