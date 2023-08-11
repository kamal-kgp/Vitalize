import React, { useState } from 'react';
import {
  Container,
  CssBaseline,
  ThemeProvider,
  createTheme,
  Paper,
  TextField,
  Button,
  Typography,
} from '@mui/material';
import { FaPlus, FaPlay, FaCheck } from 'react-icons/fa';

const theme = createTheme();

const Todo = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');

    const [once, setOnce] = useState(true);

    

    const fetchTodos = async () => {
        try {
          const response = await fetch('http://localhost:9000/api/todos');
          const data = await response.json();
          console.log(data);
          setTasks(data);
          //setTodos(data);
        } catch (error) {
          console.error('Error fetching todos:', error);
        }
      };

      const updateTodoStatus = async (id, newStatus) => {
        try {
          const response = await fetch(`http://localhost:9000/api/todos/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: newStatus }),
          });
          const updatedTodo = await response.json();
         
        //   setTodos(updatedTodos);
        } catch (error) {
          console.error('Error updating todo status:', error);
        }
      };
      

      const createTodo = async (text) => {
        try {
          const response = await fetch('http://localhost:9000/api/todos', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text }),
          });
          const newTodo = await response.json();
          console.log(newTodo);
          //setTodos([...todos, newTodo]);
        } catch (error) {
          console.error('Error creating todo:', error);
        }
      };
      
  
    const handleAddTask = () => {
      if (newTask.trim() === '') return;
  
      createTodo(newTask);
      setNewTask('');
      setOnce(true);
    };
  
    const handleUpdateStatus = (taskId, newStatus) => {
        updateTodoStatus(taskId, newStatus);
        setOnce(true);
    };

    if(once){
        fetchTodos()
        setOnce(false);

    }
  
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="sm">
          <h2>Todo App</h2>
          <Paper elevation={3} style={{ padding: '16px', marginBottom: '20px' }}>
            <TextField
              label="Add New Task"
              variant="outlined"
              fullWidth
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
            <Button variant="contained" color="primary" onClick={handleAddTask} style={{ marginTop: '10px' }}>
              <FaPlus style={{ marginRight: '8px' }} />
              Add Task
            </Button>
          </Paper>
          <div>
            <Typography variant="h6">Not Started</Typography>
            {tasks
              .filter((task) => task.status === 'not-started')
              .map((task) => (
                <div key={task._id}>
                  <span>{task.text}</span>
                  <Button onClick={() => handleUpdateStatus(task._id, 'on-going')}>
                    <FaPlay style={{ marginRight: '4px' }} />
                    Start
                  </Button>
                </div>
              ))}
          </div>
          <div>
            <Typography variant="h6">On Going</Typography>
            {tasks
              .filter((task) => task.status === 'on-going')
              .map((task) => (
                <div key={task._id}>
                  <span>{task.text}</span>
                  <Button onClick={() => handleUpdateStatus(task._id, 'completed')}>
                    <FaCheck style={{ marginRight: '4px' }} />
                    Complete
                  </Button>
                </div>
              ))}
          </div>
          <div>
            <Typography variant="h6">Completed</Typography>
            {tasks
              .filter((task) => task.status === 'completed')
              .map((task) => (
                <div key={task._id} >
                  <span>{task.text}</span>
                </div>
              ))}
          </div>
        </Container>
      </ThemeProvider>
    );
};

export default Todo;
