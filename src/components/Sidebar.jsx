import React, { useState } from 'react';
import "../Styles/Sidebar.css"
import {
    FaTh,
    FaBars,
    FaCodeBranch,
    FaProjectDiagram,
    FaUsers,
    FaServer,
    FaBoxes
}from "react-icons/fa";
import { ImOffice} from "react-icons/im";
import {  AiOutlineFundProjectionScreen } from "react-icons/ai";
import { NavLink } from 'react-router-dom';
import Navbar from './Navbar';


const Sidebar = ({children}) => {
    
    const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);
    const menuItem=[
        {
            path:"/",
            name:"Dashboard",
            icon:<FaTh/>
        },
        {
            path:"/projects",
            name:"Project",
            icon:<AiOutlineFundProjectionScreen/>
                    
        }, 
        
        {
            path:"/code",
            name:"Source codes",
            icon:<FaCodeBranch/>
        },
        {
            path:"/servers",
            name:"Servers",
            icon:<FaServer/>
        },
        
        {
            path:"/users",
            name:"Users",
            icon:<FaUsers/>
        }
    ]
    return (
        <div className="container">
           <div style={{width: isOpen ? "230px" : "50px"}} className="sidebar js-sidebar-scroll">
               <div className="top_section">
                   <h1 style={{display: isOpen ? "block" : "none"}} className="logo-sidebar">
   
                <img src="../assets/images/Serops-Logo.png" alt="" className="logo-sidebar " /> 
             

                   </h1>
                   <div style={{marginLeft: isOpen ? "50px" : "0px"}} className="bars">
                       <FaBars onClick={toggle}/>
                   </div>
               </div>
               {
                   menuItem.map((item, index)=>(
                       <NavLink to={item.path} key={index} className="link" activeclassname="active">
                           <div>{item.icon}</div>
                           <div style={{display: isOpen ? "block" : "none"}} className="link_text">{item.name}</div>
                       </NavLink>
                     
                       
                                
                   ))
               }
           </div>
           <main >
            <Navbar/>
            {children}</main>
        </div>
    );
};

export default Sidebar;