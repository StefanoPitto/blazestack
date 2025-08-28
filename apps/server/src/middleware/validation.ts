import { Request, Response, NextFunction } from 'express';
import { createError } from '../utils/errorHandler';
import { ICreateIncidentRequest } from '../types';

export const validateIncidentData = (
  req: Request,
  _res: Response,
  next: NextFunction
): void => {
  const { title, incident_type }: ICreateIncidentRequest = req.body;

  if (!title || !incident_type) {
    return next(createError('Title and incident_type are required', 400));
  }

  const validTypes = ['Fire', 'Explosion', 'Chemical Spill'];
  if (!validTypes.includes(incident_type)) {
    return next(createError('Invalid incident_type', 400));
  }

  if (title.length < 3) {
    return next(createError('Title must be at least 3 characters long', 400));
  }

  next();
};

export const validateFileUpload = (
  req: Request,
  _res: Response,
  next: NextFunction
): void => {
  if (!req.file) {
    return next(); // File is optional
  }

  const file = req.file;
  const maxSize = 5 * 1024 * 1024; // 5MB

  if (file.size > maxSize) {
    return next(createError('File too large. Maximum size is 5MB.', 400));
  }

  const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
  if (!allowedMimeTypes.includes(file.mimetype)) {
    return next(createError('Only image files are allowed!', 400));
  }

  next();
};
