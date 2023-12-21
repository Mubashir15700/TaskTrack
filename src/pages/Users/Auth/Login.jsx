import React, { useState } from 'react';
import { Link } from "react-router-dom";
import logo from '../../../assets/images/logo.png';
import './Login.css';

const Login = ({ role }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Logging in with:', { username, password });
  };

  console.log(role);

  return (
    <div className="container-fluid main-div">
      <div className='sub-div'>
        <img src={logo} alt='logo' />
        <h3>Log in to TaskTrack</h3>
      </div>
      <form className='mt-3'>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control input"
            id="username"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control input"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Link className='link' to="/verify-email">Forgot password?</Link>
        </div>
        <div className='d-flex justify-content-center bottom-div'>
          <button type="button" className="btn btn-primary login-btn" onClick={handleLogin}>
            Login
          </button>
        </div>
        {role === 'user' &&
          <p className='mt-3'>Don't have an account?<Link className='link' to="/sign-up">Sign up</Link></p>}
      </form>
    </div>
  );
};

export default Login;
