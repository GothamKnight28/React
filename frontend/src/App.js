import './App.css';
import {useEffect, useState} from 'react';
import "./Modal/zoomInModal.css";
import {BrowserRouter as Router, Routes, Route, Link, BrowserRouter} from "react-router-dom"
import ReactDOM from 'react-dom/client'
import { useNavigate } from 'react-router-dom';
import Login from "./components/login.component"
import SignUp from "./components/signup.component"
import PostsPage  from './postsPage'



function App() {
  

  return (   
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="signup" element={<SignUp/>}></Route>
        <Route path="postsPage" element={<PostsPage/>}></Route>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
