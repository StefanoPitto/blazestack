import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { Incident, CreateIncidentData, ApiResponse } from '@/types';
import { authService } from './auth';

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: '/api',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor
    this.api.interceptors.request.use(
      config => {
        // Add auth token to requests
        const token = authService.getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      error => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.api.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      error => {
        console.error('API Error:', error);
        return Promise.reject(error);
      }
    );
  }

  // Incidents API
  async getIncidents(): Promise<Incident[]> {
    const response = await this.api.get<ApiResponse<Incident[]>>('/incidents');
    return response.data.data || [];
  }

  async getIncidentById(id: string): Promise<Incident> {
    const response = await this.api.get<ApiResponse<Incident>>(
      `/incidents/${id}`
    );
    return response.data.data!;
  }

  async createIncident(data: CreateIncidentData): Promise<Incident> {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description || '');
    formData.append('incident_type', data.incident_type);
    formData.append('location', data.location || '');

    if (data.image) {
      formData.append('image', data.image);
    }

    const response = await this.api.post<ApiResponse<Incident>>(
      '/incidents',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data.data!;
  }

  async updateIncident(
    id: string,
    data: Partial<CreateIncidentData>
  ): Promise<Incident> {
    const response = await this.api.put<ApiResponse<Incident>>(
      `/incidents/${id}`,
      data
    );
    return response.data.data!;
  }

  async deleteIncident(id: string): Promise<void> {
    await this.api.delete(`/incidents/${id}`);
  }

  // Health check
  async healthCheck(): Promise<ApiResponse> {
    const response = await this.api.get<ApiResponse>('/health');
    return response.data;
  }
}

export const apiService = new ApiService();
export default apiService;
