import React from 'react';
import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Login from './components/Login';
import Dashboard from './pages/Dashboard';
import Application from './pages/Application';
import Code from './pages/Code';
import User from './pages/User';
import Server from './pages/Server';
import Project from './pages/Project';
import Profile from './pages/Profile';
import Environment from './pages/Environment';
import Admin from './layouts/Admin';
import Auth from './layouts/Auth';
import PrivateRoute from './utils/PrivateRoute';
import AuthService , { AuthContext } from './services/auth.service';
import Register from './components/Register';
import UpdateProject from './pages/UpdateProject';
import UpdatePassword from './components/UpdatePassword';
import RegisterPart3 from './components/RegisterPart3';
import { Navbar } from 'reactstrap';


const App = (props) => {
  const user = AuthService.getUser();
  return (
    <div className='App'>
      <BrowserRouter>
      
   
   
        <Routes>
      
              <Route path="/register" element={<Register/>} />
              <Route path="/register_verif" element={<RegisterPart3/>} />
              <Route path='/login' element={<Login/>} />
              <Route path="/updatepassword" element={<UpdatePassword/>} />
             
            <Route path="/" element={<Admin />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/projects" element={<Project />} />
              <Route path="/projects/update" element={<UpdateProject />} />
              <Route path="/code" element={<Code />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/servers" element={<Server />} />
              <Route path="/projects/applications" element={<Application />} />
              <Route path="/projects/applications/environment"element={<Environment />} />
              <Route path="/users" element={<User />} />
            </Route>
              
        </Routes>
       
      </BrowserRouter>
    </div>
  );
};

export default App;
