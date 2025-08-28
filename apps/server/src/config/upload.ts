import path from 'path';
import { IUploadConfig } from '../types';

const uploadConfig: IUploadConfig = {
  destination: path.join(__dirname, '../../uploads'),
  fileSizeLimit: 5 * 1024 * 1024, // 5MB
  allowedMimeTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'],
  allowedExtensions: /jpeg|jpg|png|gif/,
};

export default uploadConfig;
