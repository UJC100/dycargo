const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL!

export async function api<T>(
  path: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  })

  if (!res.ok) {
    throw new Error('API request failed')
  }

  return res.json()
}