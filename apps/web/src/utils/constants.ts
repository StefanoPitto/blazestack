import { IncidentTypeOption } from '@/types';

export const INCIDENT_TYPES: IncidentTypeOption[] = [
  {
    value: 'Fire',
    label: 'Fire',
    color: 'error',
    icon: 'LocalFireDepartment',
  },
  {
    value: 'Explosion',
    label: 'Explosion',
    color: 'warning',
    icon: 'Warning',
  },
  {
    value: 'Chemical Spill',
    label: 'Chemical Spill',
    color: 'success',
    icon: 'Science',
  },
];

export const API_ENDPOINTS = {
  INCIDENTS: '/api/incidents',
  HEALTH: '/api/health',
} as const;

export const FILE_UPLOAD = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'],
} as const;

export const DATE_FORMAT = {
  DISPLAY: 'es-ES',
  OPTIONS: {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  },
} as const;
