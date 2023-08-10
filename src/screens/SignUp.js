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
  const onChange = (e)=>{
     setCredentials({...credentials, [e.target.name]:[e.target.value]});
  }
  
  const handleSubmit = ()=>{
      
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
            fullWidth
            margin="normal"
            required/>
            <TextField 
            label="Email" 
            type="email"
            fullWidth
            margin="normal"
            required/>
            <TextField 
            label="Password" 
            type="password"
            fullWidth
            margin="normal"
            required/>
            <TextField 
            label="Confirm Password"
            type="password" 
            fullWidth
            margin="normal"
            required/>
            <Button variant='contained' color='primary' fullWidth>Signup</Button>

          <Grid container justifyContent='center' style={{marginTop:"10px"}}>
            <Grid item>
              <span>Already have an account?</span>
              <Link to="/login">  Login</Link>
            </Grid>
          </Grid>
          </form>
        </Container>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="UserName" className="form-label">Name</label>
            <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange} placeholder='Enter Your Name'/>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Your Email Address"/>
            <small id="emailHelp" className="form-text text-muted">Your email is safe with us</small>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} id="exampleInputPassword1" placeholder='Set Your Password'/>
          </div>
          <div className="mb-3">
            <label htmlFor="address" className="form-label">Address</label>
            <input type="text" className="form-control" name='geolocation' value={credentials.geolocation} onChange={onChange} id="exampleInputPassword1" placeholder='Enter Your Current location' />
          </div>

          <button type="submit" className="m-3 btn btn-success">Submit</button>
          <Link to="/login" className='m-3 btn btn-danger'>Already a user</Link>
        </form>
      </div>
    </>
  )
}
