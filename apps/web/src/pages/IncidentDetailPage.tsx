import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  Chip,
  Button,
  CircularProgress,
  Alert,
  Card,
  CardMedia,
  Grid,
} from '@mui/material';
import { ArrowBack, Edit, Delete } from '@mui/icons-material';
import { apiService } from '@/services/api';
import { Incident } from '@/types';
import { formatDate } from '@/utils/formatters';
import { INCIDENT_TYPES } from '@/utils/constants';

export const IncidentDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [incident, setIncident] = useState<Incident | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchIncident = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        setError(null);
        const data = await apiService.getIncidentById(id);
        setIncident(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load incident');
      } finally {
        setLoading(false);
      }
    };

    fetchIncident();
  }, [id]);

  const handleDelete = async () => {
    if (!incident) return;
    
    try {
      await apiService.deleteIncident(incident._id);
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete incident');
    }
  };

  const getIncidentTypeConfig = (type: string) => {
    return INCIDENT_TYPES.find(t => t.value === type);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !incident) {
    return (
      <Box sx={{ p: 4 }}>
        <Alert severity="error">
          {error || 'Incident not found'}
        </Alert>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate('/dashboard')}
          sx={{ mt: 2 }}
        >
          Back to Dashboard
        </Button>
      </Box>
    );
  }

  const typeConfig = getIncidentTypeConfig(incident.incident_type);

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate('/dashboard')}
          sx={{ mr: 2 }}
        >
          Back
        </Button>
        <Typography variant="h4" component="h1" sx={{ flexGrow: 1 }}>
          {incident.title}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="outlined"
            startIcon={<Edit />}
            onClick={() => navigate(`/incidents/${incident._id}/edit`)}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            color="error"
            startIcon={<Delete />}
            onClick={handleDelete}
          >
            Delete
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Main Content */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Chip
                label={incident.incident_type}
                color={typeConfig?.color || 'default'}
                sx={{ mr: 2 }}
              />
              <Typography variant="body2" color="text.secondary">
                Created {formatDate(incident.createdAt)}
              </Typography>
            </Box>

            {incident.description && (
              <Typography variant="body1" sx={{ mb: 2 }}>
                {incident.description}
              </Typography>
            )}

            {incident.location && (
              <Typography variant="body2" color="text.secondary">
                📍 {incident.location}
              </Typography>
            )}
          </Paper>
        </Grid>

        {/* Image */}
        <Grid item xs={12} md={4}>
          {incident.image ? (
            <Card>
              <CardMedia
                component="img"
                height="300"
                image={`/api${incident.image}`}
                alt={incident.title}
                sx={{ objectFit: 'cover' }}
              />
            </Card>
          ) : (
            <Paper
              sx={{
                height: 300,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'grey.100',
              }}
            >
              <Typography variant="body2" color="text.secondary">
                No image available
              </Typography>
            </Paper>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};
