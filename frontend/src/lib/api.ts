export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3002';

export async function apiFetch(path: string, options?: RequestInit = {}) {
    const res = await fetch(`${API_BASE_URL}${path}`, {
        ...options,
        credentials: 'include', // Include cookies for authentication
        headers: {
            'Content-Type': 'application/json',
            ...(options.headers || {}),
        },
    });

    const text = await res.text();
    let data = null;
    try { data = text ? JSON.parse(text) : null; } catch (e) { data = text; }

    if (!res.ok) {
      const err = new Error((data && data.message) || res.statusText);
      // @ts-ignore
      err.status = res.status;
      throw err;
    }
    return data;
}
