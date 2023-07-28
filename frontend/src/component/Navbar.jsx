import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, NavLink } from 'react-router-dom';

const Navbar = () => {
  const state = useSelector((state) => state.handleCart);
  const auth = localStorage.getItem('user');
  const navigate = useNavigate();
  const logoutHandler = () => {
    localStorage.clear();
    navigate('/');
  };

  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-white p-3 pb-3 mb-3 fixed-top shadow-sm">
        <div className="container">
          <NavLink className="navbar-brand fw-bold fs-4" to="/">
            AK COLLECTION
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            onClick={toggleNav}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`collapse navbar-collapse ${isNavOpen ? 'show' : ''}`} id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/" onClick={toggleNav}>
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/products" onClick={toggleNav}>
                  Products
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/about" onClick={toggleNav}>
                  About
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/contact" onClick={toggleNav}>
                  Contact
                </NavLink>
              </li>
            </ul>
            {auth ? (
              <div className="buttons">
                <button onClick={logoutHandler} className="btn btn-outline-dark">
                  <i className="fa fa-sign-out me-1"></i> Logout
                </button>
                <NavLink to="/cart" className="btn btn-outline-dark ms-2">
                  <i className="fa fa-shopping-cart me-1"></i> Cart ({state.length})
                </NavLink>
              </div>
            ) : (
              <div className="buttons">
                <NavLink to="/adminlogin" className="btn btn-outline-dark" onClick={toggleNav}>
                  <i className="fa fa-sign-in me-1"></i>Admin Login
                </NavLink>
                <NavLink to="/login" className="btn btn-outline-dark ms-2" onClick={toggleNav}>
                  <i className="fa fa-sign-in me-1"></i> Login
                </NavLink>
                <NavLink to="/register" className="btn btn-outline-dark ms-2" onClick={toggleNav}>
                  <i className="fa fa-user-plus me-1"></i> Register
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
