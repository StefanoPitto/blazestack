import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import {
  LocalFireDepartment,
  Warning,
  Science,
  Delete,
} from '@mui/icons-material';
import { Incident, IncidentType } from '@/types';
import { formatDate } from '@/utils/formatters';
import { INCIDENT_TYPES } from '@/utils/constants';

interface IncidentCardProps {
  incident: Incident;
  onClick?: () => void;
  onDelete?: (id: string) => void;
}

const getIncidentIcon = (type: IncidentType) => {
  switch (type) {
    case 'Fire':
      return <LocalFireDepartment color="error" />;
    case 'Explosion':
      return <Warning color="warning" />;
    case 'Chemical Spill':
      return <Science color="success" />;
    default:
      return <LocalFireDepartment />;
  }
};

const getIncidentColor = (type: IncidentType) => {
  const typeConfig = INCIDENT_TYPES.find(t => t.value === type);
  return typeConfig?.color || 'default';
};

export const IncidentCard: React.FC<IncidentCardProps> = ({
  incident,
  onClick,
  onDelete,
}) => {
  const navigate = useNavigate();
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);

  const handleCardClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(`/incidents/${incident.id}`);
    }
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (onDelete) {
      onDelete(incident.id);
    }
    setDeleteDialogOpen(false);
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
  };
  return (
    <Card
      elevation={2}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: 4,
        },
      }}
      onClick={handleCardClick}
    >
      {incident.image ? (
        <CardMedia
          component="img"
          height="200"
          image={`/api${incident.image}`}
          alt={incident.title}
          sx={{ objectFit: 'cover' }}
        />
      ) : (
        <Box
          sx={{
            height: 200,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'grey.100',
            color: 'text.secondary',
          }}
        >
          <Box textAlign="center">
            <LocalFireDepartment sx={{ fontSize: 48, mb: 1 }} />
            <Typography variant="body2">No image</Typography>
          </Box>
        </Box>
      )}

      <CardContent
        sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}
      >
        <Box display="flex" alignItems="center" mb={1}>
          {getIncidentIcon(incident.incident_type)}
          <Typography variant="h6" component="h3" sx={{ ml: 1, flexGrow: 1 }}>
            {incident.title}
          </Typography>
          {onDelete && (
            <IconButton
              size="small"
              color="error"
              onClick={handleDeleteClick}
              sx={{ ml: 'auto' }}
            >
              <Delete />
            </IconButton>
          )}
        </Box>

        <Chip
          label={incident.incident_type}
          color={getIncidentColor(incident.incident_type)}
          size="small"
          sx={{ alignSelf: 'flex-start', mb: 1 }}
        />

        {incident.description && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 1, flexGrow: 1 }}
          >
            {incident.description}
          </Typography>
        )}

        {incident.location && (
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            📍 {incident.location}
          </Typography>
        )}

        <Typography variant="body2" color="text.secondary" sx={{ mt: 'auto' }}>
          {formatDate(incident.createdAt)}
        </Typography>
      </CardContent>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={handleCancelDelete}>
        <DialogTitle>Delete Incident</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete "{incident.title}"? This action
            cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete}>Cancel</Button>
          <Button
            onClick={handleConfirmDelete}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};
