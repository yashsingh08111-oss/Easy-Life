import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar({ user, onLogout }) {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <NavLink to="/" className="brand-link">Easy Life</NavLink>
      </div>

      <div className="navbar-links">
        <NavLink to="/" end className="nav-link">
          Home
        </NavLink>
        {user ? (
          <>
            <span className="nav-user">Hello, {user.name}</span>
            <button type="button" className="btn secondary nav-logout" onClick={onLogout}>
              Logout
            </button>
          </>
        ) : (
          <NavLink to="/login" className="btn primary nav-link">
            Login
          </NavLink>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
