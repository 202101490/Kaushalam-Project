import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { TextField, Button, Box, Typography, Container } from '@mui/material';
import Navbar from './Navbar';
function SignupPage() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = (event) => {
    event.preventDefault();
    // Check if all fields are filled
    if (!email || !username || !password) {
      alert('Please fill in all fields');
      return;
    }

    const newSign = {email,username,password};

    axios.post('http://localhost:5000/api/v1/register', newSign).then(res => {
        console.log(res);
        if(res.status === 200){
            const userData = res.data.user;
            localStorage.setItem('user', JSON.stringify(userData));
            navigate("/todo")
        }else{
            navigate("/")
        }
        console.log("Sign Up Successfull");
    }).catch(()=>{
        navigate("/");
    })

    // TODO: Implement signup logic, such as sending a POST request to the backend

    
    console.log('Signup data:', { email, username, password });
  };

  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Signup Form */}
      <Container maxWidth="sm">
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          minHeight="80vh"
        >
          <Typography variant="h4" gutterBottom>
            Sign Up
          </Typography>

          <Box component="form" onSubmit={handleSignup} width="100%">
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              Sign Up
            </Button>
          </Box>
        </Box>
      </Container>
    </div>
  );
}

export default SignupPage;
