'use client';
import { useEffect, useState, useCallback } from "react";

export function useUser() {
    const [user, serUser] = useState<{ email: string } | null>(null);

    useEffect(() => {
        fetch("/auth/me", {
            credentials: 'include',
        })
        .then((res) => {
            if(!res.ok) return null;
            return res.json();
        })
        .then((data) => {
            serUser(data);
        })
        .catch(() => {
            serUser(null);
        });
    }, []);

    return user;
}
