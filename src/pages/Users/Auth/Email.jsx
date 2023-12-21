import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import logo from '../../../assets/images/logo.png';
import './Email.css';

const Email = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');

    const handleLogin = () => {
        console.log('Verify email:', { email });
    };

    const handleCancel = () => {
        navigate(-1);
    };

    return (
        <div className="container-fluid main-div">
            <div className='sub-div'>
                <img src={logo} alt='logo' />
                <h3>Update your password</h3>
                <p>Enter your email address and select Send Email.</p>
            </div>
            <form className='mt-3'>
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
                <div className='d-flex justify-content-end bottom-div'>
                    <Link onClick={handleCancel} className='link mt-1'>
                        Cancel
                    </Link>
                    <button type="button" className="btn btn-primary send-mail-btn" onClick={handleLogin}>
                        Send Mail
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Email;
