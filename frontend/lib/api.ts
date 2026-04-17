// Base API utility — used by all lib/*.ts files once the backend is ready
// TODO: configure base URL from environment variable

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api"

export async function apiFetch<T>(
  path: string,
  init?: RequestInit
): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    ...init,
  })

  if (!res.ok) {
    throw new Error(`API error ${res.status}: ${res.statusText}`)
  }

  // DELETE responses may have no body
  if (res.status === 204) return undefined as T

  return res.json() as Promise<T>
}
