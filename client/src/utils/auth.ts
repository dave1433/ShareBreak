const CLAIM_KEYS = [
  'sub',
  'nameid',
  'userId',
  'uid',
  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
]

function decodeJwtPayload(token: string): Record<string, unknown> | null {
  const parts = token.split('.')
  if (parts.length < 2) return null

  try {
    const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/')
    const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), '=')
    const payloadJson = atob(padded)
    return JSON.parse(payloadJson) as Record<string, unknown>
  } catch {
    return null
  }
}

function readStringStorage(keys: string[]): string | null {
  for (const key of keys) {
    const value = localStorage.getItem(key) ?? sessionStorage.getItem(key)
    if (value && value.trim().length > 0) return value.trim()
  }

  return null
}

function getUserIdFromPayload(payload: Record<string, unknown> | null): string | null {
  if (!payload) return null
  for (const key of CLAIM_KEYS) {
    const value = payload[key]
    if (typeof value === 'string' && value.trim().length > 0) {
      return value.trim()
    }
  }

  return null
}

// Save token to localStorage
export function saveToken(token: string): void {
  localStorage.setItem('token', token)
}

// Get token from localStorage or sessionStorage
export function getToken(): string | null {
  return readStringStorage(['token', 'jwt', 'auth_token'])
}

// Clear only token
export function clearToken(): void {
  localStorage.removeItem('token')
  sessionStorage.removeItem('token')
}

// Get auth headers for API calls
export function authHeaders(): Record<string, string> {
  const token = getToken()
  if (!token) return {}
  return { Authorization: `Bearer ${token}` }
}

// Check if user is authenticated
export function isAuthenticated(): boolean {
  return getToken() !== null
}

export function extractUserIdFromToken(token: string): string | null {
  return getUserIdFromPayload(decodeJwtPayload(token))
}

// Get current user ID from token or storage
export function getCurrentUserId(): string | null {
  const directUserId = readStringStorage(['userId', 'user_id', 'auth_user_id'])
  if (directUserId) return directUserId

  const token = readStringStorage(['token', 'jwt', 'auth_token'])
  if (!token) return import.meta.env.VITE_DEFAULT_USER_ID ?? null

  return getUserIdFromPayload(decodeJwtPayload(token)) ?? import.meta.env.VITE_DEFAULT_USER_ID ?? null
}

// Clear all auth data including token and userId
export function clearAuthData() {
  for (const key of ['token', 'jwt', 'auth_token']) {
    localStorage.removeItem(key)
    sessionStorage.removeItem(key)
  }
  for (const key of ['userId', 'user_id', 'auth_user_id']) {
    localStorage.removeItem(key)
    sessionStorage.removeItem(key)
  }
}
