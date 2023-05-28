import React, { useState , useContext } from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import AuthContext from '../Context/AuthContext';
import "../Styles/Navbar.css";
import { Icon } from '@iconify/react';

function Navbar()  {
  
  let {user, logoutUser}=useContext(AuthContext)
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const navigate = useNavigate();

  
  const toggleDropdown = () => {
    setDropdownOpen(prevState => !prevState);
  }
  const handleItemClick = (item) => {
    setSelectedItem(item);
    setDropdownOpen(false);}

  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        <li className={`nav-item ${dropdownOpen ? 'show' : ''}`} style={{ position: 'relative' }}>
          <a className="nav-link  dropbtn dropdown-toggle" href="#" id="userDropdown" role="button" onClick={toggleDropdown}
            data-toggle="dropdown" aria-haspopup="true" aria-expanded={dropdownOpen ? 'true' : 'false'}>
            <span className="mr-2 d-none d-lg-inline account-user-name text-gray-600 small">foulen ben foulen</span>
            <img className="img-profile rounded-circle" src="../assets/images/users/avatar-3.jpg" alt="Profile" />
          </a>
          <div className={`dropdown-menu dropdown-menu-right  ${dropdownOpen ? 'show' : ''}`} aria-labelledby="userDropdown">
            <a className="dropdown-item " onClick={() => navigate('/Profile')}>
            <Icon className="icon" icon="mdi:user" />
               Profile
             </a>
             {user ? (
             <a className="dropdown-item" onClick={logoutUser}>
             <Icon className="icon" icon="ri:logout-box-line" />
               Logout
             </a>) : (
            <Link  to="/login"/> 
            )}
          </div>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
