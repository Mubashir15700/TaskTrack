import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import logo from '../../../assets/images/logo.png';
import './OTP.css';

const OTP = () => {
  const navigate = useNavigate();

  const [otp, setOtp] = useState('');

  const handleLogin = () => {
    console.log('Verify otp:', { otp });
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="container-fluid main-div">
      <div className='sub-div'>
        <img src={logo} alt='logo' />
        <h3>Verify your email</h3>
        <p>Enter the OTP that has been sent to your Email.</p>
      </div>
      <form className='mt-3'>
        <div className="mb-3">
          <label htmlFor="otp" className="form-label">
            OTP *
          </label>
          <input
            type="number"
            className="form-control input"
            id="otp"
            placeholder="Enter the OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
        </div>
        <div className='d-flex justify-content-end bottom-div'>
          <Link onClick={handleCancel} className='link mt-1'>
            Cancel
          </Link>
          <button type="button" className="btn btn-primary otp-verify-btn" onClick={handleLogin}>
            Verify
          </button>
        </div>
      </form>
    </div>
  );
};

export default OTP;
