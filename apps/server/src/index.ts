import express from 'express';
import path from 'path';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Import configurations and utilities
import { connectDatabase, disconnectDatabase } from './config/database';
import serverConfig, { isDevelopment } from './config/server';
import { securityMiddleware } from './middleware/security';
import { errorHandler, notFound } from './utils/errorHandler';
import routes from './routes';

// Create Express app
const app = express();

// Security middleware
app.use(securityMiddleware);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// API routes
app.use('/api', routes);

// 404 handler
app.use(notFound);

// Error handling middleware
app.use(errorHandler);

// Graceful shutdown
const gracefulShutdown = async (signal: string): Promise<void> => {
  console.log(`\n🛑 Received ${signal}. Starting graceful shutdown...`);

  try {
    await disconnectDatabase();
    console.log('✅ Graceful shutdown completed');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error during graceful shutdown:', error);
    process.exit(1);
  }
};

// Handle shutdown signals
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Start server
const startServer = async (): Promise<void> => {
  try {
    // Connect to database
    await connectDatabase();

    // Start listening
    app.listen(serverConfig.port, () => {
      console.log('🚀 Fire Incident Mini-Portal Server');
      console.log('=====================================');
      console.log(`📍 Environment: ${serverConfig.nodeEnv}`);
      console.log(`🌐 Server running on port ${serverConfig.port}`);
      console.log(`🔗 API Base URL: http://localhost:${serverConfig.port}/api`);
      console.log(
        `🏥 Health Check: http://localhost:${serverConfig.port}/api/health`
      );

      if (isDevelopment()) {
        console.log('🔧 Development mode enabled');
      }

      console.log('=====================================\n');
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

// Start the server
startServer();
