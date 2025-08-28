import React from 'react';
import { Typography, Box, Grid, Paper, IconButton } from '@mui/material';
import { Refresh, LocalFireDepartment } from '@mui/icons-material';
import { Incident } from '@/types';
import { IncidentCard } from '@/components/ui/IncidentCard';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ErrorAlert } from '@/components/ui/ErrorAlert';

interface IncidentListProps {
  incidents: Incident[];
  loading: boolean;
  error: string | null;
  onRefresh: () => void;
  onDelete?: (id: string) => void;
}

export const IncidentList: React.FC<IncidentListProps> = ({
  incidents,
  loading,
  error,
  onRefresh,
  onDelete,
}) => {
  if (loading) {
    return <LoadingSpinner message="Loading incidents..." />;
  }

  if (error) {
    return <ErrorAlert message={error} onRetry={onRefresh} />;
  }

  if (incidents.length === 0) {
    return (
      <Paper elevation={1} sx={{ p: 4, textAlign: 'center' }}>
        <LocalFireDepartment
          sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }}
        />
        <Typography variant="h6" color="text.secondary" gutterBottom>
          No incidents found
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Create your first incident to get started
        </Typography>
      </Paper>
    );
  }

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h5" component="h2">
          Recent Incidents ({incidents.length})
        </Typography>
        <IconButton onClick={onRefresh} color="primary">
          <Refresh />
        </IconButton>
      </Box>

      <Grid container spacing={3}>
        {incidents.map(incident => (
          <Grid item xs={12} sm={6} md={4} key={incident.id}>
            <IncidentCard incident={incident} onDelete={onDelete} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
