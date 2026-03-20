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

export function extractUserIdFromToken(token: string): string | null {
  return getUserIdFromPayload(decodeJwtPayload(token))
}

export function getCurrentUserId(): string | null {
  const directUserId = readStringStorage(['userId', 'user_id', 'auth_user_id'])
  if (directUserId) return directUserId

  const token = readStringStorage(['token', 'jwt', 'auth_token'])
  if (!token) return import.meta.env.VITE_DEFAULT_USER_ID ?? null

  return getUserIdFromPayload(decodeJwtPayload(token)) ?? import.meta.env.VITE_DEFAULT_USER_ID ?? null
}

