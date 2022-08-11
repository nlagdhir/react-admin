import axios from "axios";
import React, {useState} from "react";
import { Link } from "react-router-dom";

const Register = () => {

    const [registerInput, setRegisterInput] = useState({
        username: '',
        email : '',
        password : ''
    });

    const handleInputChange = (event) => {
        setRegisterInput({...registerInput, [event.target.username] : event.target.value })
    }

    const handleRegisterSubmit = (event) => {
        event.preventDefault();

        const data = {
            username : registerInput.name,
            email : registerInput.email,
            password : registerInput.password
        }

        // axios.post(`/api/register`, data).then(res => {

        // })
    }



    return (
        <div className="login-page">
            <div className="container d-flex align-items-center position-relative py-5">
                <div className="card shadow-sm w-100 rounded overflow-hidden bg-none">
                    <div className="card-body p-0">
                        <div className="row gx-0 align-items-stretch">
                            <div className="col-lg-6">
                                <div className="info d-flex justify-content-center flex-column p-4 h-100">
                                    <div className="py-5">
                                        <h1 className="display-6 fw-bold">Dashboard</h1>
                                        <p className="fw-light mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 bg-white">
                                <div className="d-flex align-items-center px-4 px-lg-5 h-100">
                                    <form className="register-form py-5 w-100" method="get" action="login.html" onSubmit={handleRegisterSubmit}>
                                        <div className="input-material-group mb-3">
                                            <input className="input-material" type="text" name="username" required data-validate-field="username" onChange={handleInputChange} value={registerInput.username} />
                                            <label className="label-material" htmlFor="register-username">Username</label>
                                        </div>
                                        <div className="input-material-group mb-3">
                                            <input className="input-material" type="email" name="registerEmail" required data-validate-field="registerEmail" onChange={handleInputChange} value={registerInput.email} />
                                            <label className="label-material">Email Address</label>
                                        </div>
                                        <div className="input-material-group mb-4">
                                            <input className="input-material" type="password" name="registerPassword" required data-validate-field="registerPassword" onChange={handleInputChange} value={registerInput.password} />
                                            <label className="label-material">Password</label>
                                        </div>
                                        <div className="form-check mb-4">
                                            <input className="form-check-input" id="register-agree" name="registerAgree" type="checkbox" required value="1" data-validate-field="registerAgree" />
                                            <label className="form-check-label form-label" htmlFor="register-agree">I agree with the terms and policy                        </label>
                                        </div>
                                        <button className="btn btn-primary mb-3" id="login" type="submit">Register</button><br /><small className="text-gray-500">Already have an account?  </small>
                                        <Link to="/login" className="text-sm text-paleBlue">Login</Link>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-center position-absolute bottom-0 start-0 w-100 z-index-20">
                <p className="text-white">Design by <a className="external" href="https://bootstrapious.com/p/admin-template">Bootstrapious</a>
                </p>
            </div>
        </div>

    )
}

export default Register;