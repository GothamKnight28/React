import React, { Component, useState } from 'react'

export default function Login() {

  const [gmail,setGmail] = useState("")
  const [password,setPassword] = useState("")

  const handleSubmit = async (e) =>{
    e.preventDefault()
   try {
    const res = await fetch('http://localhost:5000/users/login',{
      headers:{
        "Content-Type" : "application/json" 
      },
      method:"POST",
      body:JSON.stringify({
        gmail:gmail,
        password:password
      })
    })
    const data = await res.json()
    console.log(data.data)
    
    if(data.data){
      localStorage.setItem('token',data.data)
      alert('Login succes')
      window.location.href = '/postsPage'
    }else{
      alert('Check your email and password')
    }

   } catch (error) {
    console.log(error)
   }
    
  }

    return (
      <form onSubmit={handleSubmit}>
        <h3>Sign In</h3>

        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            onChange={(e) => setGmail(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
            />
            <label className="custom-control-label" htmlFor="customCheck1">
              Remember me
            </label>
          </div>
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
        <p className="forgot-password text-right">
           <a href="http://localhost:3000/signup">Sign Up!</a>
        </p>
      </form>
    )
  }

