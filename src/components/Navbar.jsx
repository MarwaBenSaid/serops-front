import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import AuthService from '../services/auth.service';

function Navbar({ isOpen }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const user = AuthService.getUser();
    if (user) {
     setUsername(user);
    }
  }, []);

  const logout = () => {
    AuthService.logout();
    navigate('/login');
  };

  const toggleDropdown = () => {
    setDropdownOpen((prevState) => !prevState);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setDropdownOpen(false);
  };
    return (
    <nav className={`navbar ${isOpen ? 'navbar-open' : 'navbar-closed'}`}>
      <ul className="navbar-nav">
        <li className={`nav-item ${dropdownOpen ? 'show' : ''}`} style={{ position: 'relative' }}>
          <a
            className="nav-link dropbtn dropdown-toggle"
            href="#"
            id="userDropdown"
            role="button"
            onClick={toggleDropdown}
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded={dropdownOpen ? 'true' : 'false'}
          >
            <span className="mr-2 d-none d-lg-inline account-user-name text-gray-600 small">{username}</span>
            <img className="img-profile rounded-circle" src="../assets/images/users/avatar-3.jpg" alt="Profile" />
          </a>
          <div className={`dropdown-menu dropdown-menu-right ${dropdownOpen ? 'show' : ''}`} aria-labelledby="userDropdown">
            <a className="dropdown-item" onClick={() => navigate('/Profile')}>
              <Icon className="icon" icon="mdi:user" />
              Profile
            </a>
            <a className="dropdown-item" onClick={logout}>
              <Icon className="icon" icon="ri:logout-box-line" />
              Logout
            </a>
          </div>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
