import axios from "axios";
import React, {useState} from "react";
import { Link } from "react-router-dom";
import http from "../http";
import { InputJS } from "../utils/Scripts";
import swal from 'sweetalert';


const Register = () => {
    
    InputJS();

    const [registerInput, setRegisterInput] = useState({
        name: '',
        email : '',
        password : '',
        error_list : []
    });

    const handleInputChange = (event) => {
        console.log(event.target.value);
        setRegisterInput({...registerInput, [event.target.name] : event.target.value })
    }

    const handleRegisterSubmit = (event) => {
        event.preventDefault();

        const data = {
            name : registerInput.name,
            email : registerInput.email,
            password : registerInput.password
        }

        axios.get('http://localhost:8000/sanctum/csrf-cookie').then(response => {
            http.post(`register`, data).then(res => {
                if(res.data.status === 200) {
                    localStorage.setItem('auth_token', res.data.token);
                    localStorage.setItem('auth_name', res.data.username);

                    swal('success',res.data.message,'success').then(function() {
                        window.location = '/admin';
                    });
                    
                }else{
                    setRegisterInput({...registerInput, error_list: res.data.validator_errors})
                }
            })
        });
        
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
                                            <input className={registerInput.error_list.name ? 'input-material is-invalid' : 'input-material'} type="text" name="name"  data-validate-field="name" onChange={handleInputChange} value={registerInput.name} />
                                            <label className="label-material" htmlFor="register-name">Name</label>
                                            <div className='js-validate-error-label'>{registerInput.error_list.name}</div>
                                        </div>
                                        <div className="input-material-group mb-3">
                                            <input className={registerInput.error_list.email ? 'input-material is-invalid' : 'input-material'} type="email" name="email"  data-validate-field="email" onChange={handleInputChange} value={registerInput.email} />
                                            <label className="label-material">Email Address</label>
                                            <div className='js-validate-error-label'>{registerInput.error_list.email}</div>
                                        </div>
                                        <div className="input-material-group mb-4">
                                            <input className={registerInput.error_list.password ? 'input-material is-invalid' : 'input-material'} type="password" name="password"  data-validate-field="password" onChange={handleInputChange} value={registerInput.password} />
                                            <label className="label-material">Password</label>
                                            <div className='js-validate-error-label'>{registerInput.error_list.password}</div>
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