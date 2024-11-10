

import React, { useEffect, useState } from 'react';
import { Container, TextField, Button, Typography, Box, Alert } from '@mui/material';
import Navbar from './Navbar';  // Adjust the path if needed
import axios from 'axios'; // Import axios for making API requests

const TodoPage = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const localemail = JSON.parse(localStorage.getItem("user")).email;
  const [email, setEmail] = useState(localemail); // Assuming you also want to send email
  const [todos, setTodos] = useState([]);
  const [alert, setAlert] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [editingTodo, setEditingTodo] = useState(null); // For handling the update

  // Fetch existing todos on page load
  useEffect(() => {
    if (localemail !== undefined) {
      const newemail = { email: localemail };

      axios
        .post('http://localhost:5000/api/v2/todos', newemail)
        .then((res) => {
          if (res.status === 200) {
            setTodos(res.data);
          }
        })
        .catch(() => {
          console.log("error");
        });
    }
  }, [localemail]);

  //Function to handle adding a new Todo
  const handleAddTodo = async () => {
    if (title.trim() === '' || body.trim() === '' || email.trim() === '') {
      setAlert('Title, body, and email cannot be empty!');
      return;
    }

    const newTodo = { title, body, email };

    try {
      const response = await axios.post('http://localhost:5000/api/v2/addTask', newTodo);

      if (response.status === 200) {
        setSuccessMessage('Task added successfully!');
        setTodos([...todos, newTodo]); // Add new task to the list
        setTitle('');
        setBody('');
        setAlert('');
      }

      window.location.reload();

    } catch (error) {
      setAlert('Error adding task: ' + error.message);
    }
  };

  const handleUpdateTodo = async () => {
    if (title.trim() === '' || body.trim() === '') {
      setAlert('Title and body cannot be empty!');
      return;
    }

    if (!editingTodo) {
      setAlert('No todo selected for editing!');
      return;
    }

    const updatedTodo = { title, body, email };

    try {
      const response = await axios.put(`http://localhost:5000/api/v2/updateTask/${editingTodo._id}`, updatedTodo);

      if (response.status === 200) {
        setSuccessMessage('Task updated successfully!');
        // Update todos state with the updated todo
        setTodos(todos.map((todo) => (todo._id === editingTodo._id ? response.data.task : todo)));
        setTitle('');
        setBody('');
        setEditingTodo(null); // Reset editing state
        setAlert('');
      }
    } catch (error) {
      setAlert('Error updating task: ' + error.message);
    }
  };

 
const handleDeleteTodo = async (todoId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/v2/deleteTask/${todoId}`, {
        data: { email } // Sending the email in the request body
      });
  
      if (response.status === 200) {
        setSuccessMessage('Task deleted successfully!');
        // Remove the task from the state immediately
        setTodos(todos.filter((todo) => todo._id !== todoId));
      } else {
        setAlert('Error deleting task: ' + response.statusText);
      }
    } catch (error) {
      console.error("Delete error:", error.response || error.message);
      setAlert('Error deleting task: ' + error.message || error.response.data.message);
    }
  };
  
  

  return (
    <div>
      {/* Navbar Component */}
      <Navbar />

      {/* Main Content */}
      <Container sx={{ marginTop: 4 }}>
        <Typography variant="h4" gutterBottom>
          Todo List
        </Typography>

        {/* Success Message */}
        {successMessage && (
          <Alert severity="success" sx={{ marginBottom: 2 }}>
            {successMessage}
          </Alert>
        )}

        {/* Alert if title, body, or email is empty */}
        {alert && (
          <Alert severity="error" sx={{ marginBottom: 2 }}>
            {alert}
          </Alert>
        )}

        {/* Input Fields for Title, Body, and Email */}
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Body"
          variant="outlined"
          fullWidth
          value={body}
          onChange={(e) => setBody(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ marginBottom: 2 }}
        />

        {/* Add or Update Todo Button */}
        <Button
          variant="contained"
          color="primary"
          onClick={editingTodo ? handleUpdateTodo : handleAddTodo}
        >
          {editingTodo ? 'Update Todo' : 'Add Todo'}
        </Button>

        {/* Display List of Todos */}
        <Box sx={{ marginTop: 4 }}>
          <Typography variant="h6" gutterBottom>
            Todo Records:
          </Typography>
          {todos.length > 0 ? (
            todos.map((todo, index) => (
              <Box key={index} sx={{ padding: 2, border: '1px solid #ddd', marginBottom: 2 }}>
                <Typography variant="h6">{todo.title}</Typography>
                <Typography variant="body1">{todo.body}</Typography>
                <Typography variant="body2" color="textSecondary">{todo.email}</Typography>
                <Box sx={{ marginTop: 2 }}>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                      setEditingTodo(todo);
                      setTitle(todo.title);
                      setBody(todo.body);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    sx={{ marginLeft: 2 }}
                    onClick={() => handleDeleteTodo(todo._id)}
                  >
                    Delete
                  </Button>
                </Box>
              </Box>
            ))
          ) : (
            <Typography>No tasks available</Typography>
          )}
        </Box>
      </Container>
    </div>
  );
};

export default TodoPage;
