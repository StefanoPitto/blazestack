import { Router } from 'express';
import path from 'path';
import incidentRoutes from './incidents';
import authRoutes from './auth';

const router = Router();

// Health check endpoint
router.get('/health', (_req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

// Serve uploaded images through API
router.get('/uploads/:filename', (req, res) => {
  const { filename } = req.params;
  const imagePath = path.join(__dirname, '../../uploads', filename);
  res.sendFile(imagePath);
});

// Auth routes (public)
router.use('/auth', authRoutes);

// Protected API routes
router.use('/incidents', incidentRoutes);

export default router;
