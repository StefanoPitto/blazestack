import mongoose, { Schema } from 'mongoose';
import { IIncidentDocument } from '../types';

const incidentSchema = new Schema<IIncidentDocument>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      minlength: [3, 'Title must be at least 3 characters long'],
    },
    description: {
      type: String,
      trim: true,
    },
    incident_type: {
      type: String,
      required: [true, 'Incident type is required'],
      enum: {
        values: ['Fire', 'Explosion', 'Chemical Spill'],
        message: 'Incident type must be Fire, Explosion, or Chemical Spill',
      },
    },
    location: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_doc, ret: any) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

// Index for better query performance
incidentSchema.index({ createdAt: -1 });
incidentSchema.index({ incident_type: 1 });

const Incident = mongoose.model<IIncidentDocument>('Incident', incidentSchema);

export default Incident;
