import axios from 'axios';
import { LoginData, RegisterData, AuthResponse, User } from '@/types';

const API_BASE_URL = '/api/auth';

class AuthService {
  private api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Register new user
  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await this.api.post<AuthResponse>('/register', data);
    return response.data;
  }

  // Login user
  async login(data: LoginData): Promise<AuthResponse> {
    const response = await this.api.post<AuthResponse>('/login', data);
    return response.data;
  }

  // Get user profile
  async getProfile(userId: string): Promise<AuthResponse> {
    const token = this.getToken();
    const response = await this.api.get<AuthResponse>(`/profile/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }

  // Token management
  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  removeToken(): void {
    localStorage.removeItem('token');
  }

  // User management
  setUser(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser(): User | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  removeUser(): void {
    localStorage.removeItem('user');
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  // Logout
  logout(): void {
    this.removeToken();
    this.removeUser();
  }
}

export const authService = new AuthService();
