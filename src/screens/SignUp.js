import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Typography,
  Container,
  TextField,
  Button,
  Grid,
} from "@mui/material";

export default function SignUp() {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    location: ""
  })
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.id]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:9000/api/createuser", {
      method: 'Post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, location: credentials.location })
    })
    const status = await response.status;
    const reply = await response.json();
    if (status === 400) {
      let errors = reply.errors;  //array of errors 
      let n = errors.length;
      let stringOfErrors = "";
      for (let i = 0; i < n; i++) {
        if (i < n - 1) stringOfErrors += errors[i].msg + ", ";
        else stringOfErrors += errors[i].msg;
      }
      alert(stringOfErrors);
    }
    else if (status === 401) {
      alert("Try again later")
    }
    else {
      alert("Thank you for signing up")
    }
  }

  return (
    <>
      <div className='container'>
        <Container maxWidth="xs">
          <Typography variant='h4' align='center' gutterBottom>Signup</Typography>
          <form>
            <TextField
              label="Name"
              type="text"
              id="name"
              fullWidth
              margin="normal"
              required
              value={credentials.name} onChange={onChange} />
            <TextField
              label="Email"
              type="email"
              id="email"
              fullWidth
              margin="normal"
              required
              value={credentials.email} onChange={onChange} />
            <TextField
              label="Password"
              type="password"
              id="password"
              fullWidth
              margin="normal"
              required
              value={credentials.password} onChange={onChange}
           />
             {/* <TextField 
            label="Confirm Password"
            type="Password" 
            fullWidth
            margin="normal"
            required
            />  */}
            <TextField
              label="location"
              type="text"
              id="location"
              fullWidth
              margin="normal"
              required
              value={credentials.location} onChange={onChange} />
            <Button variant='contained' color='primary' fullWidth onClick={handleSubmit}>Signup</Button>

            <Grid container justifyContent='center' style={{ marginTop: "10px" }}>
              <Grid item>
                <span>Already have an account?</span>
                <Link to="/login">  Login</Link>
              </Grid>
            </Grid>
          </form>
        </Container>
      </div>
    </>
  )
}
