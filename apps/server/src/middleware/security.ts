import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import compression from 'compression';
import serverConfig from '../config/server';

// Rate limiting
export const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    success: false,
    error: 'Too many requests from this IP, please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// CORS configuration
export const corsOptions = {
  origin: serverConfig.corsOrigin,
  credentials: true,
  optionsSuccessStatus: 200,
};

// Security middleware
export const securityMiddleware = [
  helmet(),
  cors(corsOptions),
  compression(),
  rateLimiter,
];
