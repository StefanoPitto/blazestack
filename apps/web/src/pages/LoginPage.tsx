import React, { useState } from 'react';
import { Box } from '@mui/material';
import { LoginForm } from '@/components/auth/LoginForm';
import { RegisterForm } from '@/components/auth/RegisterForm';
import { LoginData, RegisterData } from '@/types';
import { useAuth } from '@/contexts/AuthContext';

export const LoginPage: React.FC = () => {
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const { login, register, error, clearError } = useAuth();

  const handleLogin = async (data: LoginData) => {
    await login(data);
  };

  const handleRegister = async (data: RegisterData) => {
    await register(data);
  };

  const handleSwitchToRegister = () => {
    setAuthMode('register');
    clearError();
  };

  const handleSwitchToLogin = () => {
    setAuthMode('login');
    clearError();
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'grey.50',
        p: 2,
      }}
    >
      {authMode === 'login' ? (
        <LoginForm
          onSubmit={handleLogin}
          onSwitchToRegister={handleSwitchToRegister}
          error={error}
        />
      ) : (
        <RegisterForm
          onSubmit={handleRegister}
          onSwitchToLogin={handleSwitchToLogin}
          error={error}
        />
      )}
    </Box>
  );
};
