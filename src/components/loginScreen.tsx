
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // If you're using axios
import { useAuth } from '../auth/auth';
import { Button, Stack, TextField, styled } from '@mui/material';

const StyledStack = styled(Stack)`
  height:100vh;
  width:20%;
  justify-content:center;
`;

function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const auth = useAuth();

  const handleLogin = async () => {
    try {
      // Replace with your API endpoint
      const response = await axios.post('http://192.168.1.134:5009/api/usuarios/login', {
        Username: username,
        Password: password
    }, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
    

      // Assuming the JWT token is in response.data.token
      const token = response.data.token;

      // Update your auth context or global state with the token
      auth.login(token);

      // Navigate to the protected route
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      // Handle errors (e.g., show error message)
    }
  };

  return (
    <StyledStack spacing={2}>
      <TextField
        id="username"
        label="Username"
        variant="outlined"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        id="password"
        label="Password"
        type="password"
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button variant='contained' onClick={handleLogin}>
        Login
      </Button>
    </StyledStack>
  );
}

export default LoginScreen;



















