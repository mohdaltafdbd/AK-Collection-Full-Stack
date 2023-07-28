/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(()=>{
        const auth=localStorage.getItem('user');
        if(auth){
            navigate('/')
        }
    })

    const collectData = async () => {
        console.warn(name, email, phone, password);
        let result = await fetch('http://localhost:8000/register', {
            method: 'post',
            body: JSON.stringify({ name, email,phone, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        result = await result.json();
        console.warn(result);
        localStorage.setItem("user", JSON.stringify(result.result));
        // localStorage.setItem("token", JSON.stringify(result.auth));
        navigate('/')
    }

    return (
        <>
        <div className="vh-95 p-5 mt-2">
            <div className="container h-100 p-5">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-lg-12 col-xl-11">
                        <div className="card text-black">
                            <div className="card-body p-md-5">
                                <div className="row justify-content-center">
                                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-2">Sign up</p>
                                        <form className="mx-1 mx-md-4">
                                            <div className="d-flex flex-row align-items-center mb-4">

                                                <div className="form-outline flex-fill mb-0">
                                                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter Name' className="form-control" />
                                                    <label className="form-label">Name</label>
                                                </div>
                                            </div>
                                            <div className="d-flex flex-row align-items-center mb-4">

                                                <div className="form-outline flex-fill mb-0">
                                                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter Email' className="form-control" />
                                                    <label className="form-label">Email</label>
                                                </div>
                                            </div>
                                            <div className="d-flex flex-row align-items-center mb-4">

                                                <div className="form-outline flex-fill mb-0">
                                                    <input type="tel"  type="number" name="phone"onChange={(e) => setPhone(e.target.value)} placeholder='Enter Phone No' className="form-control" />
                                                    <label className="form-label">Phone</label>
                                                </div>
                                            </div>
                                            <div className="d-flex flex-row align-items-center mb-4">

                                                <div className="form-outline flex-fill mb-0">
                                                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter Password' className="form-control" />
                                                    <label className="form-label">Password</label>
                                                </div>
                                            </div>
                                            <div className="form-check d-flex justify-content-center mb-5">
                                                <input className="form-check-input me-2" type="checkbox"/>
                                                <label className="form-check-label">
                                                    I agree all statements in <a href="#!">Terms of service</a>
                                                </label>
                                            </div>
                                            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                <button type="button" onClick={collectData} className="btn btn-primary bg-info btn-lg">Register</button>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                                            className="img-fluid" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
export default SignUp;