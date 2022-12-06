import React, { Component } from 'react'
import {useEffect,useState} from 'react'



export default function SignUp () {
  
const [name,setName] = useState("")
const [gmail,setGmail] = useState("")
const [password,setPassword] = useState("")
const userStatus = ["admin","user"]
const userStatusNumber = Math.floor(Math.random() * 2);

const registerSubmit = async (e) => {
  e.preventDefault()
  //console.log(name,gmail,password)
  try {
    const res = await fetch('http://localhost:5000/users/',{
      headers:{
        "Content-Type" : "application/json"
      },
      method:"POST",
      body:JSON.stringify({
        username:name,
        gmail:gmail,
        password:password,
        status:userStatus[userStatusNumber]
      })
    });
    
    
    let resJson = await res.json()

    if (res.status === 201) {
      setName("")
      setGmail("")
      setPassword("")

      console.log("User registered")
    }
    
  } catch (error) {
    console.log(error)
  }
}

    return (
      <form onSubmit={registerSubmit}>
        <h3>Sign Up</h3>

        <div className="mb-3">
          <label>First name</label>
          <input
            type="text"
            className="form-control"
            placeholder="First name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>

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

        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </div>
        <p className="forgot-password text-right">
          Already registered <a href="/">sign in?</a>
        </p>
      </form>
    )
  
}
