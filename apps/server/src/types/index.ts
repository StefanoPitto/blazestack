import { Request } from 'express';
import { ConnectOptions } from 'mongoose';

export interface IIncident {
  _id?: string;
  title: string;
  description?: string;
  incident_type: 'Fire' | 'Explosion' | 'Chemical Spill';
  location?: string;
  image?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IIncidentDocument extends IIncident, Document {}

export interface ICreateIncidentRequest {
  title: string;
  description?: string;
  incident_type: 'Fire' | 'Explosion' | 'Chemical Spill';
  location?: string;
}

export interface IIncidentResponse {
  success: boolean;
  data?: IIncident | IIncident[];
  error?: string;
  message?: string;
}

export interface IFileUploadRequest extends Request {
  file?: Express.Multer.File;
}

export interface IApiError extends Error {
  statusCode?: number;
  isOperational?: boolean;
}

export interface IDatabaseConfig {
  uri: string;
  options: ConnectOptions;
}

export interface IServerConfig {
  port: number;
  nodeEnv: string;
  corsOrigin: string;
}

export interface IUploadConfig {
  destination: string;
  fileSizeLimit: number;
  allowedMimeTypes: string[];
  allowedExtensions: RegExp;
}

// Auth types
export interface IUser {
  _id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface IRegisterRequest {
  email: string;
  password: string;
  name: string;
}

export interface IAuthResponse {
  success: boolean;
  data?: {
    user: IUser;
    token: string;
  };
  message?: string;
  error?: string;
}

export interface IAuthenticatedRequest extends Request {
  user?: IUser;
}
