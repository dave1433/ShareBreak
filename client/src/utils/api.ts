import { authHeaders } from './auth'

const API_BASE = '/api'

export async function API(
  path: string,
  options: RequestInit = {}
): Promise<Response> {
  const url = `${API_BASE}/${path}`
  const headers = {
    'Content-Type': 'application/json',
    ...authHeaders(),
    ...options.headers,
  }

  return fetch(url, {
    ...options,
    headers,
  })
}

export async function apiGet<T>(path: string): Promise<T> {
  const res = await API(path, { method: 'GET' })
  if (!res.ok) throw new Error(`API Error: ${res.status}`)
  return res.json()
}

export async function apiPost<T>(path: string, body: unknown): Promise<T> {
  const res = await API(path, {
    method: 'POST',
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error(`API Error: ${res.status}`)
  return res.json()
}

export async function apiPut<T>(path: string, body: unknown): Promise<T> {
  const res = await API(path, {
    method: 'PUT',
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error(`API Error: ${res.status}`)
  return res.json()
}

export async function apiDelete(path: string): Promise<void> {
  const res = await API(path, { method: 'DELETE' })
  if (!res.ok) throw new Error(`API Error: ${res.status}`)
}
