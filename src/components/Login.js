import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {InputJS } from '../utils/Scripts';
import http from '../http';
import swal from 'sweetalert';

const Login = () => {

    InputJS();

    const navigate = useNavigate();

    const [loginField, setLoginField] = useState({
      email : '',
      password : '',
      error_list : []
    });

    const handleLoginSubmit = (e) => { 
      e.preventDefault();

      const data = {
        email : loginField.email,
        password : loginField.password        
      }

      http.post('login',data).then(res => {
        if(res.data.status === 200) {
            localStorage.setItem('auth_token', res.data.token);
            localStorage.setItem('auth_name', res.data.username);

            swal('success',res.data.message,'success').then(function() {
                navigate('/admin');
            });
        } else if(res.data.status === 401) {
          swal('warning',res.data.message,'warning');
        } else {
          setLoginField({...loginField, error_list:res.data.validators_errors});
        }
      })
      

      //navigate('/admin');
    }

    const handleInputChange = (event) => {
      setLoginField({...loginField, [event.target.name]:event.target.value});
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
                  <form className="login-form py-5 w-100" method="get" onSubmit={handleLoginSubmit}>
                    <div className="input-material-group mb-3">
                      <input className="input-material" id="email" type="text" name="email" onChange={handleInputChange} value={loginField.email} autoComplete="off" data-validate-field="loginUsername" />
                      <label className="label-material" htmlFor="name">Email</label>
                      <span>{loginField.error_list.email}</span>
                    </div>
                    <div className="input-material-group mb-4">
                      <input className="input-material" id="password" type="password" onChange={handleInputChange} value={loginField.password} name="password" data-validate-field="loginPassword" />
                      <label className="label-material" htmlFor="password">Password</label>
                      <span>{loginField.error_list.password}</span>
                    </div>
                    <button className="btn btn-primary mb-3" id="login" type="submit">Login</button><br />
                    <Link to="/forgot-password" className="text-sm text-paleBlue">Forgot Password?</Link>
                    <br /><small className="text-gray-500">Do not have an account? </small>
                    <Link to="/register" className="text-sm text-paleBlue" >Register</Link>
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
    );
}

export default Login;