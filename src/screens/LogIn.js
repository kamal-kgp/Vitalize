import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
// import Navbar from '../components/Navbar'
import {
  Typography,
  Container,
  TextField,
  Button,
  Grid,
} from "@mui/material";

export default function LogIn() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.type]: e.target.value });
  }

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const options = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password
      })
    }

    try {
      const response = await fetch("http://localhost:9000/api/loginuser", options);
      const reply = await response.json();
      if (response.status === 400) {
        let errors = reply.errors;  //array of errors 
        let n = errors.length;
        let stringOfErrors = "";
        for (let i = 0; i < n; i++) {
          if (i < n - 1) stringOfErrors += errors[i].msg + ", ";
          else stringOfErrors += errors[i].msg;
        }
        alert(stringOfErrors);
      }
      else if (response.status === 401) {
        alert(reply.error);
      }
      else if (response.status === 200) {
        localStorage.setItem('lastLogin', Date.now());
        localStorage.setItem('_id', reply._id);
        localStorage.setItem("userEmail", credentials.email);
        localStorage.setItem("authToken", reply.authToken);
        localStorage.setItem("location", reply.location)
        alert("Hii, drink 4 litre of water to stay hydrated for more chekout Blogs")
        navigate('/');
      }
      else if (response.status === 500) {
        alert(reply.error);
      }
    } catch (error) {
      console.error(error);
    }
  }


  return (
    <div className='container'>
      <Container maxWidth="xs" style={{marginTop:"5px"}}>
        <Typography variant='h4' align='center' gutterBottom>
          Login
        </Typography>
        <form>
          <TextField 
          label="Email"
          type="email"
          fullWidth
          margin='normal'
          required
          value={credentials.email} onChange={onChange}
          />
          <TextField
          label='Password'
          type='password'
          fullWidth
          margin='normal'
          required
          value={credentials.password} onChange={onChange}
          />

          <Button variant='contained' color='primary' fullWidth onClick={handleSubmit}>Login</Button>

          <Grid container justifyContent='center' style={{marginTop:"10px"}}>
            <Grid item>
              <span>Don't have an account?</span>
              <Link to="/signup">  Signup</Link>
            </Grid>
          </Grid>

        </form>
      </Container>
    </div>  
  )
}
