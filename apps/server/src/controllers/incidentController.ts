import { Request, Response, NextFunction } from 'express';
import Incident from '../models/Incident';
import { IIncident, IIncidentResponse, IFileUploadRequest } from '../types';
import { createError } from '../utils/errorHandler';

export const createIncident = async (
  req: IFileUploadRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { title, description, incident_type, location }: IIncident = req.body;

    const incidentData: Partial<IIncident> = {
      title,
      incident_type,
      ...(description && { description }),
      ...(location && { location }),
    };

    // Add image path if file was uploaded
    if (req.file) {
      incidentData.image = `/uploads/${req.file.filename}`;
    }

    const incident = new Incident(incidentData);
    await incident.save();

    const response: IIncidentResponse = {
      success: true,
      data: incident,
      message: 'Incident created successfully',
    };

    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

export const getIncidents = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const incidents = await Incident.find()
      .sort({ createdAt: -1 })
      .select('title incident_type createdAt image');

    const response: IIncidentResponse = {
      success: true,
      data: incidents,
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
};

export const getIncidentById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const incident = await Incident.findById(req.params['id']);

    if (!incident) {
      return next(createError('Incident not found', 404));
    }

    const response: IIncidentResponse = {
      success: true,
      data: incident,
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
};

export const updateIncident = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const incident = await Incident.findByIdAndUpdate(
      req.params['id'],
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!incident) {
      return next(createError('Incident not found', 404));
    }

    const response: IIncidentResponse = {
      success: true,
      data: incident,
      message: 'Incident updated successfully',
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
};

export const deleteIncident = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const incident = await Incident.findByIdAndDelete(req.params['id']);

    if (!incident) {
      return next(createError('Incident not found', 404));
    }

    const response: IIncidentResponse = {
      success: true,
      message: 'Incident deleted successfully',
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
};
