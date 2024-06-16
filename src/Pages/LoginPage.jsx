import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Avatar, Typography, TextField, FormControlLabel, Checkbox, Button } from '@mui/material';

const LoginPage = ({ setAuthenticate, setIsDrawerOpen }) => {
  const navigate = useNavigate();

  const loginUser = (event) => {
    event.preventDefault();
    console.log('login try');
    setAuthenticate(true);
    setIsDrawerOpen(false); // 드로워를 닫습니다.
    navigate('/');
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar src="/broken-image.jpg" />
        <Typography component="h1" variant="h5">
          login
        </Typography>
        <Box component="form" onSubmit={(event) => loginUser(event)} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="remember me" />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            login
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
