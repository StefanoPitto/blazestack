import { IServerConfig } from '../types';

const serverConfig: IServerConfig = {
  port: parseInt(process.env['PORT'] || '3001', 10),
  nodeEnv: process.env['NODE_ENV'] || 'development',
  corsOrigin: process.env['CORS_ORIGIN'] || 'http://localhost:3000',
};

export const isDevelopment = (): boolean =>
  serverConfig.nodeEnv === 'development';
export const isProduction = (): boolean =>
  serverConfig.nodeEnv === 'production';

export default serverConfig;
