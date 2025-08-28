import React from 'react';
import { Box, Container, Typography, Paper } from '@mui/material';
import { AppHeader } from './AppHeader';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        bgcolor: 'grey.50',
      }}
    >
      {/* Header */}
      <AppHeader />

      {/* Main Content */}
      <Box
        sx={{
          flexGrow: 1,
          py: 3,
          minHeight: 0, // Important for flex layout
        }}
      >
        <Container maxWidth="lg">{children}</Container>
      </Box>

      {/* Footer */}
      <Paper
        elevation={1}
        sx={{
          mt: 'auto',
          py: 2,
          px: 3,
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="body2"
            align="center"
            sx={{
              fontWeight: 500,
              letterSpacing: 0.5,
            }}
          >
            BlazeStack Challenge by Stefano Pitto
          </Typography>
        </Container>
      </Paper>
    </Box>
  );
};
