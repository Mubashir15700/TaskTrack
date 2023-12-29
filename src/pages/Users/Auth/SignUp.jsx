import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setUserData } from '../../../redux/slices/userSlice';
import { userSignUp } from '../../../services/api';
import logo from '../../../assets/images/logo.png';
import './SignUp.css';

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [formFilled, setFormFilled] = useState(false);
  const [serverResponse, setServerResponse] = useState('');

  const handleChange = (e) => {
    setServerResponse('');
    if (Object.values(formData).filter(value => value.trim() !== '').length === 5) {
      setFormFilled(true);
    }
    const { name, value } = e.target;
    errors[name] = null;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  const handleSignUp = async (e) => {
    e.preventDefault();

    const validationErrors = {};
    if (!formData.username.trim()) {
      validationErrors.username = "Username is required";
    }

    if (!formData.email.trim()) {
      validationErrors.email = "Email is required";
    } else if (!/^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/.test(formData.email)) {
      validationErrors.email = "Email is not valid";
    }

    if (!formData.phone.trim()) {
      validationErrors.phone = "Phone is required";
    } else if (formData.phone.length !== 10) {
      validationErrors.phone = "Phone is not valid";
    }

    if (!formData.password.trim()) {
      validationErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      validationErrors.password = "Password must be atleast 8 characters long";
    } else {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/;
      if (!passwordRegex.test(formData.password)) {
        validationErrors.password = "Password must contain at least one lowercase letter, one uppercase letter, and one special character.";
      }
    }

    if (!formData.confirmPassword.trim()) {
      validationErrors.confirmPassword = "Confirm password is required";
    } else if (formData.confirmPassword !== formData.password) {
      validationErrors.confirmPassword = "Password and Confirm password not match";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await userSignUp(formData);
        if (response) {
          console.log("sign-up response: ", response.data);
          setServerResponse(response.data);
          if (response.data.status === 'success') {
            dispatch(setUserData(response.data.currentUser));
            navigate(`/verify-otp?purpose=signup&email=${formData.email}`);
          }
        }
      } catch (error) {
        console.error('Error during signup:', error);
        setServerResponse({ status: 'failed', message: 'An error occurred during signup' });
      }
    }
  };

  return (
    <div className="container-fluid main-div">
      <div className='sub-div'>
        <img src={logo} alt='logo' />
        <h3>Create an Account</h3>
      </div>
      <form className='mt-3' onSubmit={handleSignUp}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username *
          </label>
          <input
            type="text"
            className="form-control input"
            id="username"
            name="username"
            placeholder="Enter your username"
            onChange={handleChange}
          />
          {errors.username && <span className='error-display'>{errors.username}</span>}
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email *
          </label>
          <input
            type="email"
            className="form-control input"
            id="email"
            name="email"
            placeholder="Enter your email"
            onChange={handleChange}
          />
          {errors.email && <span className='error-display'>{errors.email}</span>}
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Phone *
          </label>
          <input
            type="number"
            className="form-control input"
            id="phone"
            name="phone"
            placeholder="Enter your mobile number"
            onChange={handleChange}
          />
          {errors.phone && <span className='error-display'>{errors.phone}</span>}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password *
          </label>
          <input
            type="password"
            className="form-control input"
            id="password"
            name="password"
            placeholder="Enter your password"
            onChange={handleChange}
          />
          {errors.password && <span className='error-display'>{errors.password}</span>}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Confirm Password *
          </label>
          <input
            type="password"
            className="form-control input"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm your password"
            onChange={handleChange}
          />
          {errors.confirmPassword && <span className='error-display'>{errors.confirmPassword}</span>}
        </div>
        <div className='d-flex justify-content-center bottom-div'>
          <button type="submit" className="btn btn-primary sign-up-btn" disabled={!formFilled}>
            Sign Up
          </button>
        </div>
        {serverResponse && (
          <div className={`alert ${serverResponse.status === 'failed' ? 'alert-danger' : 'alert-success'} mt-3`} role="alert">
            {serverResponse.message}
          </div>
        )}
        <p className='mt-3'>Already have an account?<Link className='link' to="/login">Log In</Link></p>
      </form>
    </div>
  );
};

export default SignUp;
