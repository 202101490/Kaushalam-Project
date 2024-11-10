import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { TextField, Button, Box, Typography, Container } from '@mui/material';
import Navbar from './Navbar'; // Make sure Navbar is correctly imported

function SignInPage() {
    
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignin = (event) => {
    event.preventDefault();
    // Check if both fields are filled
    if (!email || !password) {
      alert('Please enter both email and password');
      return;
    }

    const newSign = {email,password};

    axios.post('https://kaushalam-project.onrender.com/api/v1/login', newSign).then(res => {
        console.log(res);
        if(res.status === 200){
            const userData = res.data.others;
            localStorage.setItem('user', JSON.stringify(userData));
            navigate("/todo")
        }else{
            navigate("/")
        }
        console.log("Sign In Successfull");
    }).catch(()=>{
        navigate("/");
    })

    // TODO: Implement sign-in logic, such as sending a POST request to the backend
    console.log('Signin data:', { email, password });
  };

  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Signin Form */}
      <Container maxWidth="sm">
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          minHeight="80vh"
        >
          <Typography variant="h4" gutterBottom>
            Sign In
          </Typography>

          <Box component="form" onSubmit={handleSignin} width="100%">
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
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </div>
  );
}

export default SignInPage;
