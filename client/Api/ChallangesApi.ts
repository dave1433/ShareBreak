const API_BASE_URL = import.meta.env.VITE_API_URL?.replace(/\/$/, '') ?? 'http://localhost:5255'
const API_URL = `${API_BASE_URL}/api/Challenge`

export interface ChallengeDto {
  id?: string
  title?: string
  description?: string
  categoryId?: string
  isActive?: boolean
  isRepeatable?: boolean
  startDate?: string
  endDate?: string
  timesCompleted?: number
}

export interface ActivateChallengeRequestDto {
  userId: string
  challengeId: string
}

export interface FinishChallengeRequestDto {
  userId: string
  challengeId: string
  isFinished: boolean
  finishDate?: string
}

class ApiError extends Error {
  public readonly status: number
  public readonly details?: unknown

  constructor(
  status: number,
  message: string,
  details?: unknown
  ) {
	super(message)
	this.name = 'ApiError'
  this.status = status
  this.details = details
  }
}

type RequestInitWithBody = Omit<RequestInit, 'body'> & {
  body?: unknown
}

async function request<T>(path = '', init?: RequestInitWithBody): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
	...init,
	headers: {
	  'Content-Type': 'application/json',
	  ...(init?.headers ?? {})
	},
	body: init?.body === undefined ? undefined : JSON.stringify(init.body)
  })

  const contentType = response.headers.get('content-type') ?? ''
  const rawText = await response.text()

  if (!contentType.includes('application/json') && rawText.trimStart().startsWith('<!doctype')) {
    throw new ApiError(
    response.status,
    'Expected JSON but received HTML. Check API route spelling and Vite /api proxy configuration.',
    rawText
    )
  }

  const payload = contentType.includes('application/json')
    ? (rawText ? JSON.parse(rawText) : null)
    : rawText

  if (!response.ok) {
	const message =
	  typeof payload === 'object' &&
	  payload !== null &&
	  'message' in payload &&
	  typeof (payload as { message: unknown }).message === 'string'
		? (payload as { message: string }).message
    : typeof payload === 'string' && payload.trim().length > 0
      ? payload.split('\n')[0]
		: `Request failed with status ${response.status}`

	throw new ApiError(response.status, message, payload)
  }

  return payload as T
}

export async function getAllPossibleChallenges(): Promise<ChallengeDto[]> {
  return request<ChallengeDto[]>('/GetAllPossibleChallenges')
}

export async function getAllActiveChallenges(userId: string): Promise<ChallengeDto[]> {
  const query = `?userId=${encodeURIComponent(userId)}`
  return request<ChallengeDto[]>(`/GetAllActiveChallenges${query}`)
}

export async function getAllPendingChallenges(userId: string): Promise<ChallengeDto[]> {
  const query = `?userId=${encodeURIComponent(userId)}`
  return request<ChallengeDto[]>(`/GetAllPendingChallenges${query}`)
}

export async function activateChallenge(payload: ActivateChallengeRequestDto): Promise<void> {
  await request<unknown>('/ActivateChallenge', {
	method: 'POST',
	body: payload
  })
}

export async function finishChallenge(payload: FinishChallengeRequestDto): Promise<void> {
  await request<unknown>('/FinishChallenge', {
	method: 'POST',
	body: payload
  })
}

export { ApiError }

export default {
  getAllPossibleChallenges,
  getAllActiveChallenges,
  getAllPendingChallenges,
  activateChallenge,
  finishChallenge
}
