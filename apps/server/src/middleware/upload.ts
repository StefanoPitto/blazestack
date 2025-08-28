import multer from 'multer';
import path from 'path';
import fs from 'fs';
import uploadConfig from '../config/upload';

// Ensure uploads directory exists
if (!fs.existsSync(uploadConfig.destination)) {
  fs.mkdirSync(uploadConfig.destination, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadConfig.destination);
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const fileFilter = (_req: Express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback): void => {
  const extname = uploadConfig.allowedExtensions.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = uploadConfig.allowedMimeTypes.includes(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only image files (jpeg, jpg, png, gif) are allowed!'));
  }
};

export const upload = multer({
  storage,
  limits: {
    fileSize: uploadConfig.fileSizeLimit,
  },
  fileFilter,
});

export default upload;
