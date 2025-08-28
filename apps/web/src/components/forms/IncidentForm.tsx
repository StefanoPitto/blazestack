import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Paper,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  Alert,
  CircularProgress,
} from '@mui/material';
import { CloudUpload, Warning } from '@mui/icons-material';
import { CreateIncidentData, IncidentFormData } from '@/types';
import { incidentFormSchema } from '@/utils/validation';
import { INCIDENT_TYPES } from '@/utils/constants';

interface IncidentFormProps {
  onSubmit: (data: CreateIncidentData) => Promise<void>;
  onSuccess?: () => void;
}

export const IncidentForm: React.FC<IncidentFormProps> = ({
  onSubmit,
  onSuccess,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<IncidentFormData>({
    resolver: yupResolver(incidentFormSchema) as any,
    defaultValues: {
      title: '',
      description: '',
      incident_type: '',
      location: '',
      image: null,
    },
  });

  const selectedFile = watch('image');

  const STORAGE_KEY = 'incidentFormDraft';

  // Load persisted draft on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const draft = JSON.parse(raw) as Partial<IncidentFormData>;
        reset({
          title: draft.title || '',
          description: draft.description || '',
          incident_type: (draft.incident_type as any) || '',
          location: draft.location || '',
          image: null,
        });
      }
    } catch {
      // ignore corrupted storage
    }
  }, [reset]);

  // Persist draft on changes (except image)
  useEffect(() => {
    const subscription = watch(value => {
      try {
        const dataToPersist = {
          title: value?.title || '',
          description: value?.description || '',
          incident_type: (value?.incident_type as any) || '',
          location: value?.location || '',
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToPersist));
      } catch {
        // no-op
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const handleFormSubmit = async (data: IncidentFormData) => {
    setIsSubmitting(true);
    setError('');
    setSuccess('');

    try {
      const incidentData: CreateIncidentData = {
        title: data.title,
        description: data.description || undefined,
        incident_type:
          data.incident_type as CreateIncidentData['incident_type'],
        location: data.location || undefined,
        image: data.image?.[0] || undefined,
      };

      await onSubmit(incidentData);
      setSuccess('Incident created successfully!');
      localStorage.removeItem(STORAGE_KEY);
      reset();

      // Switch to incidents list after a short delay
      setTimeout(() => {
        if (onSuccess) onSuccess();
      }, 1500);
    } catch (err) {
      console.error('Error creating incident:', err);
      setError('Failed to create incident');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Create New Incident
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {success}
        </Alert>
      )}

      <Box
        component="form"
        onSubmit={handleSubmit(handleFormSubmit as any)}
        sx={{ mt: 2 }}
      >
        <TextField
          fullWidth
          label="Title *"
          {...register('title')}
          error={!!errors.title}
          helperText={errors.title?.message}
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          label="Description"
          multiline
          rows={3}
          {...register('description')}
          error={!!errors.description}
          helperText={errors.description?.message}
          sx={{ mb: 2 }}
        />

        <FormControl fullWidth sx={{ mb: 2 }} error={!!errors.incident_type}>
          <InputLabel>Incident Type *</InputLabel>
          <Select
            label="Incident Type *"
            {...register('incident_type')}
            defaultValue=""
          >
            {INCIDENT_TYPES.map(type => (
              <MenuItem key={type.value} value={type.value}>
                {type.label}
              </MenuItem>
            ))}
          </Select>
          {errors.incident_type && (
            <Typography
              variant="caption"
              color="error"
              sx={{ mt: 0.5, display: 'block' }}
            >
              {errors.incident_type.message}
            </Typography>
          )}
        </FormControl>

        <TextField
          fullWidth
          label="Location"
          {...register('location')}
          error={!!errors.location}
          helperText={errors.location?.message}
          sx={{ mb: 2 }}
        />

        <Box sx={{ mb: 3 }}>
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="image-upload"
            type="file"
            {...register('image')}
          />
          <label htmlFor="image-upload">
            <Button
              variant="outlined"
              component="span"
              startIcon={<CloudUpload />}
              sx={{ mb: 1 }}
            >
              Upload Image (Optional)
            </Button>
          </label>

          {selectedFile && selectedFile.length > 0 && (
            <Box sx={{ mt: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Selected: {selectedFile[0].name}
              </Typography>
            </Box>
          )}

          {errors.image && (
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
              <Warning color="error" sx={{ fontSize: 16, mr: 0.5 }} />
              <Typography variant="caption" color="error">
                {errors.image.message}
              </Typography>
            </Box>
          )}
        </Box>

        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={isSubmitting}
          startIcon={isSubmitting ? <CircularProgress size={20} /> : null}
          sx={{ py: 1.5 }}
        >
          {isSubmitting ? 'Creating Incident...' : 'Create Incident'}
        </Button>
      </Box>
    </Paper>
  );
};
