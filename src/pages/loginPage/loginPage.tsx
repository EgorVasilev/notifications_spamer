import React, {FormEvent, useState} from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  TextField,
  Typography,
} from '@mui/material';
import {useLocation, useNavigate} from 'react-router-dom';

import {authService} from '../../services/authService';
import {useAuthToken} from '../../hooks/useAuthToken';

export const LoginPage = () => {
  const {setToken} = useAuthToken();
  const [hasError, setError] = useState(false);
  const [isLoading, setLoadingStatus] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');

    if (typeof email === 'string' && typeof password === 'string') {
      setError(false);
      setLoadingStatus(true);

      authService
        .login({
          email,
          password,
        })
        .then(token => {
          setToken(token);

          const origin = location.state?.from?.pathname;

          console.log('origin', origin);

          if (origin) {
            navigate(origin);
          }
        })
        .catch(() => {
          setError(true);
        })
        .finally(() => {
          setLoadingStatus(false);
        });
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" component="h1" color="white" gutterBottom>
        Login Page
      </Typography>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: 'white',
          padding: 2,
          borderRadius: 1,
        }}>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address(any)"
            name="email"
            autoComplete="email"
            autoFocus
            error={hasError}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password(use 12345)"
            type="password"
            id="password"
            autoComplete="current-password"
            error={hasError}
            helperText={hasError ? 'Wrong credentials' : ''}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{mt: 3, mb: 2}}>
            {isLoading ? (
              <CircularProgress style={{color: 'white'}} size={24} />
            ) : (
              'Sign In'
            )}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
