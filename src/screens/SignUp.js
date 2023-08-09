import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function SignUp() {
  const [credentials, setCredentials] = useState({
     name: "",
     email: "",
     password: "",
     location: ""
  })
  const onChange = (e)=>{
     setCredentials({...credentials, [e.target.name]: e.target.value});
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
    const status = await response.status ;
    const reply = await response.json() ;
    if(status === 400){
      let errors = reply.errors;  //array of errors 
         let n = errors.length;
         let stringOfErrors = "";
         for(let i=0;i<n;i++){
            if(i<n-1) stringOfErrors += errors[i].msg + ", "; 
            else stringOfErrors += errors[i].msg;
         }
         alert(stringOfErrors);
    }
    else if(status === 401) {
        alert("Try again later")
    }
    else {
        alert("Thank you for signing up")
    }
  }

  return (
    <>
      <div className='container'>
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
            <input type="text" className="form-control" name='location' value={credentials.location} onChange={onChange} id="exampleInputPassword1" placeholder='Enter Your Current location' />
          </div>

          <button type="submit" className="m-3 btn btn-success">Submit</button>
          <Link to="/login" className='m-3 btn btn-danger'>Already a user</Link>
        </form>
      </div>
    </>
  )
}
