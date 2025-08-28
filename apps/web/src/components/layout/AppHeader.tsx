import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Avatar,
} from '@mui/material';
import { LocalFireDepartment, Logout, Person } from '@mui/icons-material';
import { useAuth } from '@/contexts/AuthContext';

export const AppHeader: React.FC = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <LocalFireDepartment sx={{ mr: 2 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Fire Incident Mini-Portal
        </Typography>

        {user && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.main' }}>
                <Person />
              </Avatar>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                {user.name}
              </Typography>
            </Box>
            <Button
              color="inherit"
              startIcon={<Logout />}
              onClick={handleLogout}
              sx={{ textTransform: 'none' }}
            >
              Logout
            </Button>
          </Box>
        )}

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 2 }}>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            BlazeStack Challenge
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
