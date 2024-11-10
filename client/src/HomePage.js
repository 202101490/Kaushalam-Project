// HomePage.js
import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';  // Adjust the path if needed

const HomePage = () => {
  return (
    <div>
      {/* Navbar Component */}
      <Navbar />

      {/* Main Content */}
      <Container sx={{ marginTop: 4, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Welcome to the Todo App
        </Typography>
        <Button variant="contained" color="primary" component={Link} to="/todo">
          Go to Todo List
        </Button>
      </Container>
    </div>
  );
};

export default HomePage;
