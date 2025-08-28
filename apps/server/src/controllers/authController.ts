import { Request, Response, NextFunction } from 'express';
import User from '../models/User';
import { ILoginRequest, IRegisterRequest, IAuthResponse } from '../types';
import { createError } from '../utils/errorHandler';
import { generateToken } from '../middleware/auth';

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password, name }: IRegisterRequest = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      throw createError('User with this email already exists.', 400);
    }

    // Create new user
    const user = new User({
      email: email.toLowerCase(),
      password,
      name,
    });

    await user.save();

    // Generate token
    const token = generateToken(user);

    const response: IAuthResponse = {
      success: true,
      data: {
        user: {
          _id: user._id,
          email: user.email,
          name: user.name,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
        token,
      },
      message: 'User registered successfully',
    };

    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password }: ILoginRequest = req.body;

    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      throw createError('Invalid email or password.', 401);
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      throw createError('Invalid email or password.', 401);
    }

    // Generate token
    const token = generateToken(user);

    const response: IAuthResponse = {
      success: true,
      data: {
        user: {
          _id: user._id,
          email: user.email,
          name: user.name,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
        token,
      },
      message: 'Login successful',
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
};

export const getProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = await User.findById(req.params['id']).select('-password');

    if (!user) {
      throw createError('User not found.', 404);
    }

    const response: IAuthResponse = {
      success: true,
      data: {
        user: {
          _id: user._id,
          email: user.email,
          name: user.name,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
        token: '', // Not needed for profile
      },
      message: 'Profile retrieved successfully',
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
};
