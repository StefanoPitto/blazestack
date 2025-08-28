import React from 'react';
import { Alert, IconButton, Box } from '@mui/material';
import { Refresh } from '@mui/icons-material';

interface ErrorAlertProps {
  message: string;
  onRetry?: () => void;
  severity?: 'error' | 'warning' | 'info';
}

export const ErrorAlert: React.FC<ErrorAlertProps> = ({
  message,
  onRetry,
  severity = 'error',
}) => {
  return (
    <Box mb={2}>
      <Alert
        severity={severity}
        action={
          onRetry && (
            <IconButton
              color="inherit"
              size="small"
              onClick={onRetry}
              aria-label="retry"
            >
              <Refresh />
            </IconButton>
          )
        }
      >
        {message}
      </Alert>
    </Box>
  );
};
