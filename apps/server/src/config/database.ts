import mongoose from 'mongoose';
import { IDatabaseConfig } from '../types';

const databaseConfig: IDatabaseConfig = {
  uri: process.env['MONGODB_URI'] || 'mongodb://localhost:27017/fire-incidents',
  options: {},
};

export const connectDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(databaseConfig.uri, databaseConfig.options);
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

export const disconnectDatabase = async (): Promise<void> => {
  try {
    await mongoose.disconnect();
    console.log('✅ Disconnected from MongoDB');
  } catch (error) {
    console.error('❌ Error disconnecting from MongoDB:', error);
  }
};

export default databaseConfig;
