import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = ({ toggleSidebar }) => {
  return (
    <nav className="navbar">
      <button className="hamburger" onClick={toggleSidebar}>
        &#9776;
      </button>
      <div className="logo">ClarityOS</div>
      <div className="user-avatar">JD</div>
    </nav>
  );
};

export default Navbar;