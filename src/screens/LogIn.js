import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

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
    <div>
      <div className='container'>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">User Name</label>
            <input type="email" className="form-control" name='email' id="exampleInputEmail1" value={credentials.email} onChange={onChange} aria-describedby="emailHelp" placeholder="User Name" />
            <small id="emailHelp" className="form-text text-muted">User Name is Your Email Id</small>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" name='password' id="exampleInputPassword1" value={credentials.password} onChange={onChange} placeholder="Password" />
          </div>
          <button type="submit" className="m-3 btn btn-primary">Submit</button>
          <Link to="/signup" className='m-3 btn btn-danger'>I am new user</Link>
        </form>
      </div>
    </div>
  )
}
