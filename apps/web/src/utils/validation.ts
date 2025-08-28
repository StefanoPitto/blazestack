import * as yup from 'yup';
import { IncidentFormData } from '@/types';

export const incidentFormSchema = yup.object({
  title: yup
    .string()
    .required('Title is required')
    .min(3, 'Title must be at least 3 characters'),
  description: yup.string(),
  incident_type: yup
    .string()
    .required('Incident type is required')
    .oneOf(['Fire', 'Explosion', 'Chemical Spill'], 'Invalid incident type'),
  location: yup.string(),
  image: yup
    .mixed()
    .test('fileSize', 'File size must be less than 5MB', (value: any) => {
      if (!value || value.length === 0) return true;
      return value[0]?.size <= 5 * 1024 * 1024;
    })
    .test('fileType', 'Only image files are allowed', (value: any) => {
      if (!value || value.length === 0) return true;
      return ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'].includes(
        value[0]?.type
      );
    }),
});

export type IncidentFormSchema = yup.InferType<typeof incidentFormSchema>;

export const validateForm = async (
  data: IncidentFormData
): Promise<{ isValid: boolean; errors: Record<string, string> }> => {
  try {
    await incidentFormSchema.validate(data, { abortEarly: false });
    return { isValid: true, errors: {} };
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      const errors: Record<string, string> = {};
      error.inner.forEach(err => {
        if (err.path) {
          errors[err.path] = err.message;
        }
      });
      return { isValid: false, errors };
    }
    return { isValid: false, errors: { general: 'Validation failed' } };
  }
};
