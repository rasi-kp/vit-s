import React, { useState } from 'react';
import { TextField, Button, Container, Box, Typography, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';

import adminTheme from '../../themes/adminTheme';
import { useAuth } from '../../contexts/AuthContext';
import { login as loginApiCall } from '../../services/ApiClientService';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const tokens = await loginApiCall(email, password);

      if (tokens.accessToken && tokens.refreshToken) {
        login(tokens.accessToken, tokens.refreshToken);
        navigate('/admin');
      } else {
        setError('Invalid credentials');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <ThemeProvider theme={adminTheme}>
      <Container maxWidth="sm">
        <Box mt={10}>
          <Typography variant="h4" component="h1" gutterBottom>
            Admin Login
          </Typography>
          {error && <Box mb={2}><Alert severity="error">{error}</Alert></Box>}
          <form onSubmit={handleLogin}>
            <Box mb={2}>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Box>
            <Box mb={2}>
              <TextField
                label="Password"
                variant="outlined"
                type="password"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Box>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Login
            </Button>
          </form>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default LoginPage;
