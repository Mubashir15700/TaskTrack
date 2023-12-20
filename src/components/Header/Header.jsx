import { useState } from 'react';
import { Link } from "react-router-dom";
import logo from '../../assets/images/logo.png';
import './Header.css';

const Header = () => {

  const [isAuth, setIsAuth] = useState(false);

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <img src={logo} alt="logo" />
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link" aria-current="page">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link" aria-current="page">About</Link>
            </li>
            <li className="nav-item">
              <Link to="/contact" className="nav-link" aria-current="page">Contact</Link>
            </li>
            <li className="nav-item">
              <Link to="/laborers" className="nav-link" aria-current="page">Laborers</Link>
            </li>
            <li className="nav-item">
              <Link to="/jobs" className="nav-link" aria-current="page">Jobs</Link>
            </li>
          </ul>
          {isAuth &&
            <>
              <Link to="/post-job" className="btn btn-outline-success post-job-btn" type="submit">Post Job</Link>
              <div className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <i class="bi bi-caret-down-square-fill"></i>
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/profile" className="dropdown-item" aria-current="page">
                      <i class="bi bi-person-circle"></i> Profile
                    </Link>
                  </li>
                  <li>
                    <Link to="/notifications" className="dropdown-item" aria-current="page">
                      <i class="bi bi-bell"></i> Notifications
                    </Link>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button type="button" className="btn btn-danger logout-btn">
                      <i class="bi bi-power"></i> Logout
                    </button>
                  </li>
                </ul>
              </div>
            </>
          }
          <form className="d-flex input-group search-form" role="search">
            <input className="form-control search-input " type="search" placeholder="Search" aria-label="Search" />
            <select class="form-select search-select" id="inputGroupSelect03" aria-label="Example select with button addon">
              <option value="laborers">Laborers</option>
              <option value="jobs">Jobs</option>
            </select>
          </form>
          {!isAuth &&
            <div >
              <Link to="/login" type="button" class="btn btn-light login-btn">Login</Link>
              <Link to="/sign-up" className="btn btn-outline-success sign-up-btn" type="submit">Sign Up</Link>
            </div>
          }
        </div>
      </div>
    </nav>
  );
};

export default Header;
