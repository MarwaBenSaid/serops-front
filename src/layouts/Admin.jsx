import React from "react";
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import {Outlet} from "react-router-dom";

const Admin = (props) => {
  
  return (
    
<div>
<Navbar/>
<Sidebar>
<Outlet/>
</Sidebar>
</div>
  

       
  );
};

export default Admin;