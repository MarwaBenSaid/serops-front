import React from "react";
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

const Admin = (props) => {
  
  return (
    
  <React.Fragment>
    <Navbar/>
<Sidebar>
    {this.props.children}
</Sidebar>
  </React.Fragment>    
       
  );
};

export default Admin;