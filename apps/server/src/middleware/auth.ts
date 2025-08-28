import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { IAuthenticatedRequest } from '../types';
import { IUser } from '../models/User';
import { createError } from '../utils/errorHandler';

const JWT_SECRET = process.env['JWT_SECRET'] || 'your-secret-key';

export const generateToken = (user: IUser): string => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      name: user.name,
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
};

export const verifyToken = (
  req: IAuthenticatedRequest,
  _res: Response,
  next: NextFunction
): void => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw createError('Access denied. No token provided.', 401);
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    const decoded = jwt.verify(token, JWT_SECRET) as any;

    req.user = {
      _id: decoded.id,
      email: decoded.email,
      name: decoded.name,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      next(createError('Invalid token.', 401));
    } else if (error instanceof jwt.TokenExpiredError) {
      next(createError('Token expired.', 401));
    } else {
      next(error);
    }
  }
};

export const requireAuth = (
  req: IAuthenticatedRequest,
  _res: Response,
  next: NextFunction
): void => {
  if (!req.user) {
    next(createError('Authentication required.', 401));
    return;
  }
  next();
};
