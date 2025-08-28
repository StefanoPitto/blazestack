export interface Incident {
  id: string;
  title: string;
  description?: string;
  incident_type: 'Fire' | 'Explosion' | 'Chemical Spill';
  location?: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateIncidentData {
  title: string;
  description?: string;
  incident_type: 'Fire' | 'Explosion' | 'Chemical Spill';
  location?: string;
  image?: File;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface IncidentFormData {
  title: string;
  description: string;
  incident_type: 'Fire' | 'Explosion' | 'Chemical Spill' | '';
  location: string;
  image: FileList | null;
}

export interface ValidationError {
  field: string;
  message: string;
}

// Auth types
export interface User {
  _id: string;
  email: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
}

export interface AuthResponse {
  success: boolean;
  data?: {
    user: User;
    token: string;
  };
  message?: string;
  error?: string;
}

export interface FormErrors {
  [key: string]: string;
}

export type IncidentType = 'Fire' | 'Explosion' | 'Chemical Spill';

export interface IncidentTypeOption {
  value: IncidentType;
  label: string;
  color: 'error' | 'warning' | 'success';
  icon: string;
}
