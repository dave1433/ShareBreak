import type { LoginRequest, RegisterRequest, LoginResponse } from '../types/auth';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5255';
const LOGIN_ENDPOINT = `${API_BASE_URL}/api/Login`;

class AuthService {
  /**
   * Login user with email and password
   */
  async login(request: LoginRequest): Promise<LoginResponse> {
    return this.post<LoginResponse>(`${LOGIN_ENDPOINT}/Login`, request);
  }

  /**
   * Register new user
   */
  async register(request: RegisterRequest): Promise<LoginResponse> {
    return this.post<LoginResponse>(`${LOGIN_ENDPOINT}/Register`, request);
  }

  /**
   * Generic POST request handler with error handling
   */
  private async post<T>(url: string, body: unknown): Promise<T> {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorData = await this.parseError(response);
        throw new Error(errorData);
      }

      return (await response.json()) as T;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('An unexpected error occurred');
    }
  }

  /**
   * Parse error response from server
   */
  private async parseError(response: Response): Promise<string> {
    try {
      const contentType = response.headers.get('content-type');
      if (contentType?.includes('application/json')) {
        const errorData = await response.json() as any;
        return errorData.message || errorData.title || `Error ${response.status}`;
      }
      const text = await response.text();
      return text || `Error ${response.status}`;
    } catch {
      return `Error ${response.status}: ${response.statusText}`;
    }
  }
}

export const authService = new AuthService();

