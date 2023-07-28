import React, { useState,useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/adminProducts");
      console.log("done");
    }
  });
  const handleLogin = async () => {
    console.warn("email,password", email, password);
     fetch("http://localhost:8000/adminlogin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        if (data.auth) {
            localStorage.setItem("user", JSON.stringify(data.user));
            localStorage.setItem("token", JSON.stringify(data.auth));
            navigate("/adminProducts");
          } else {
            alert("Please Enter Correct Details... ");
          }
      })
      .catch((error) => {
        // Handle login error
      });
    }

  return (
    <div className="vh-95 mt-5">
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black">
              <div className="card-body p-md-5">
                <div className="row flex-row-reverse justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                      className="img-fluid"
                    />
                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                     Admin Login
                    </p>
                    <form className="mx-1 mx-md-4">
                      <div className="form-outline mb-4">
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          id="form3Example3"
                          className="form-control form-control-lg"
                          placeholder="Enter a valid email address"
                        />
                        <label className="form-label">Email address</label>
                      </div>

                      <div className="form-outline mb-3">
                        <input
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          id="form3Example4"
                          className="form-control form-control-lg"
                          placeholder="Enter password"
                        />
                        <label className="form-label">Password</label>
                      </div>

                      <div className="d-flex justify-content-between align-items-center">
                        <div className="form-check mb-0">
                          <input
                            className="form-check-input me-2"
                            type="checkbox"
                            value=""
                            id="form2Example3"
                          />
                          <label className="form-check-label">
                            Remember me
                          </label>
                        </div>
                        <a href="#!" className="text-body">
                          Forgot password?
                        </a>
                      </div>
                      <div className="text-center text-lg-start mt-4 pt-2">
                        <button
                          type="button"
                          onClick={handleLogin}
                          className="btn  btn-primary bg-info btn-lg"
                        >
                          Login
                        </button>
                        
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default AdminLogin;
