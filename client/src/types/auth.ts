export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  birthday: string;
}

export interface LoginResponse {
  token: string;
  expiration: string;
  userName: string;
  email: string;
}

export interface AuthUser {
  email: string;
  userName: string;
  token: string;
  expiration: string;
}

export interface AuthError {
  message: string;
  code?: string;
}

export interface AuthContextType {
  user: AuthUser | null;
  isLoggedIn: boolean;
  loading: boolean;
  error: AuthError | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, birthday: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

