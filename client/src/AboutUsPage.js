// AboutUsPage.js
import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';  // Adjust the path if needed

const AboutUsPage = () => {
  return (
    <div>
      {/* Navbar Component */}
      <Navbar />

      {/* Main Content */}
      <Container sx={{ marginTop: 4, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          About Us
        </Typography>
        <Typography variant="body1" paragraph>
          Welcome to our Todo App! This is a simple app designed to help you keep track of your tasks and to-dos. 
          You can add, edit, and remove tasks, as well as mark them as complete.
        </Typography>
        <Typography variant="body1" paragraph>
          Our goal is to provide an easy-to-use, efficient tool for organizing your day-to-day activities.
        </Typography>
        <Button variant="contained" color="primary" component={Link} to="/todo">
          Go to Todo List
        </Button>
      </Container>
    </div>
  );
};

export default AboutUsPage;
