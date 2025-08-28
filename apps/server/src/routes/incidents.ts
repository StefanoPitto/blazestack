import { Router } from 'express';
import {
  createIncident,
  getIncidents,
  getIncidentById,
  updateIncident,
  deleteIncident,
} from '../controllers/incidentController';
import { upload } from '../middleware/upload';
import {
  validateIncidentData,
  validateFileUpload,
} from '../middleware/validation';
import { verifyToken, requireAuth } from '../middleware/auth';

const router = Router();

// All routes require authentication
router.use(verifyToken, requireAuth);

// GET /api/incidents - Get all incidents
router.get('/', getIncidents);

// GET /api/incidents/:id - Get incident by ID
router.get('/:id', getIncidentById);

// POST /api/incidents - Create new incident
router.post(
  '/',
  upload.single('image'),
  validateFileUpload,
  validateIncidentData,
  createIncident as any
);

// PUT /api/incidents/:id - Update incident
router.put('/:id', validateIncidentData, updateIncident);

// DELETE /api/incidents/:id - Delete incident
router.delete('/:id', deleteIncident);

export default router;
