import React, { useState } from 'react';
import logo from '../../../assets/images/logo.png';
import './ResetPassword.css';

const Login = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleLogin = () => {
        console.log('Logging in with:', { username, password });
    };

    return (
        <div className="container-fluid main-div">
            <div className='sub-div'>
                <img src={logo} alt='logo' />
                <h3>Reset Password</h3>
                <p>Enter your new password.</p>
            </div>
            <form className='mt-3'>
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
                    <button type="button" className="btn btn-primary reset-password-btn" onClick={handleLogin}>
                        Reset Password
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Login;
