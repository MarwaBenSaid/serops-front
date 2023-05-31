import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterPart1 from './components/RegisterPart1';
import RegisterPart2 from './components/RegisterPart2';
import RegisterPart3 from './components/RegisterPart3';
import Login from './components/Login';
import Dashboard from './pages/Dashboard';
import Application from './pages/Application';
import Code from './pages/Code';
import User from './pages/User';
import Server from './pages/Server';
import Project from './pages/Project';
import AddProject from './pages/AddProject';
import Add from './pages/Add';
import Profile from './pages/Profile';
import Environment from './pages/Environment';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Admin from './layouts/Admin';
import Auth from './layouts/Auth';


const App = (props) => {
  return (
    <div className='App'>
      <BrowserRouter>
      
   
   
        <Routes>
             
              <Route path="/sign1" element={<RegisterPart1/>} />
              <Route path="/sign2" element={<RegisterPart2/>} />
              <Route path="/sign3" element={<RegisterPart3/>} />
              <Route path='/login' element={<Login/>} />
              <Route path="/"element ={<Admin/>}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/projects" element={<Project />} />
              <Route path="/code" element={<Code />} />
              <Route path="/application" element={<Application />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/server" element={<Server />} />
              <Route path="/addproject" element={<AddProject />} />
              <Route path="/add" element={<Add />} />
              <Route path="/project/application" element={<Application/>} />
              <Route path="/project/application/environment" element={<Environment/>} />
              <Route path="/user" element={<User/>} />
              </Route>
        </Routes>
       
      </BrowserRouter>
    </div>
  );
};

export default App;
