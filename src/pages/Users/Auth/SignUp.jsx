import React, { useState } from 'react';
import { Link } from "react-router-dom";
import logo from '../../../assets/images/logo.png';
import './SignUp.css';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleLogin = () => {
    console.log('Signing up with:', { username, password });
  };

  return (
    <div className="container-fluid main-div">
      <div className='sub-div'>
        <img src={logo} alt='logo' />
        <h3>Create an Account</h3>
      </div>
      <form className='mt-3'>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username *
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
          <label htmlFor="email" className="form-label">
            Email *
          </label>
          <input
            type="email"
            className="form-control input"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Phone *
          </label>
          <input
            type="text"
            className="form-control input"
            id="phone"
            placeholder="Enter your mobile number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password *
          </label>
          <input
            type="password"
            className="form-control input"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Confirm Password *
          </label>
          <input
            type="password"
            className="form-control input"
            id="confirm-password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className='d-flex justify-content-center bottom-div'>
          <button type="button" className="btn btn-primary sign-up-btn" onClick={handleLogin}>
            Sign Up
          </button>
        </div>
        <p className='mt-3'>Already have an account?<Link className='link' to="/login">Log In</Link></p>
      </form>
    </div>
  );
};

export default SignUp;
