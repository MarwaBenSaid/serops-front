import React, { useEffect } from "react";
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { Navigate, Outlet } from "react-router-dom";
import AuthService from "../services/auth.service";

const Admin = () => {
    return (
      
      <div>
        <Sidebar>
          <Outlet />
        </Sidebar>
      </div>
    );
    }
    
  

export default Admin;