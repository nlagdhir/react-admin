import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    const handleLoginSubmit = (e) => {
      e.preventDefault();
      navigate('/admin');
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
                      <input className="input-material" id="login-username" type="text" name="loginUsername" autoComplete="off" required data-validate-field="loginUsername" />
                      <label className="label-material" htmlFor="login-username">User Name</label>
                    </div>
                    <div className="input-material-group mb-4">
                      <input className="input-material" id="login-password" type="password" name="loginPassword" required data-validate-field="loginPassword" />
                      <label className="label-material" htmlFor="login-password">Password</label>
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