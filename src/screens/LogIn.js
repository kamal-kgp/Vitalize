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
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
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
      if(response.status === 400 ){
         let errors = reply.errors;  //array of errors 
         let n = errors.length;
         let stringOfErrors = "";
         for(let i=0;i<n;i++){
            if(i<n-1) stringOfErrors += errors[i].msg + ", "; 
            else stringOfErrors += errors[i].msg;
         }
         alert(stringOfErrors);
      }
      else if(response.status === 401 ){
         alert(reply.error);
      }
      else if(response.status === 200) {
        localStorage.setItem("userEmail", credentials.email);
        localStorage.setItem("authToken", reply.authToken);
        localStorage.setItem("location", reply.location)
        navigate('/');
      }
      else if(response.status === 500){
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
          />
          <TextField
          label='Password'
          type='password'
          fullWidth
          margin='normal'
          required
          />

          <Button variant='contained' color='primary' fullWidth>Login</Button>

          <Grid container justifyContent='center' style={{marginTop:"10px"}}>
            <Grid item>
              <span>Don't have an account?</span>
              <Link to="/signup">  Signup</Link>
            </Grid>
          </Grid>

        </form>
      </Container>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">User Name</label>
          <input type="email" className="form-control" id="exampleInputEmail1" value={credentials.email} onChange={onChange} aria-describedby="emailHelp" placeholder="User Name" />
          <small id="emailHelp" className="form-text text-muted">User Name is Your Email Id</small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" value={credentials.password} onChange={onChange} placeholder="Password" />
        </div>
        {/* <div className="form-group form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
            <label className="form-check-label" for="exampleCheck1">Stay logged in</label>
        </div> */}
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/signup" className='m-3 btn btn-danger'>I am new user</Link>
      </form>
    </div>
  )
}
