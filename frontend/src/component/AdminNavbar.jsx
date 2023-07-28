import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";
import auth from "../auth";

const Navbar = () => {
  const state = useSelector((state) => state.handleCart);
  const isAuthenticated = auth.isAuthenticated;
  const navigate = useNavigate();

  const logoutHandler = () => {
    auth.signout();
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-white py-3 fixed-top shadow-sm">
        <div className="container">
          <NavLink className="navbar-brand fw-bold fs-4" to="/">
            AK COLLECTION
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link " to="/AdminProducts">
                  Admin Products
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link " to="/addProducts">
                  Add Products
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link " to="/contact">
                  Contct
                </NavLink>
              </li>
            </ul>
            {isAuthenticated ? (
              <div className="buttons">
                <button
                  onClick={logoutHandler}
                  className="btn btn-outline-dark"
                >
                  <i className="fa fa-sign-out me-1"></i> Logout{" "}
                </button>
              </div>
            ) : (
              <div className="buttons">
                <NavLink to="/login" className="btn btn-outline-dark">
                  <i className="fa fa-sign-in me-1"></i> Login{" "}
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
