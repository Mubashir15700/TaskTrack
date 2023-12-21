import { Link } from "react-router-dom";
import logo from '../../../assets/images/logo.png';
import './Header.css';

const Header = () => {
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
                            <Link to="/admin" className="nav-link" aria-current="page">Dashboard</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/admin/users" className="nav-link" aria-current="page">Users</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/admin/subscription-plans" className="nav-link" aria-current="page">Plans</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/admin/banners" className="nav-link" aria-current="page">Banners</Link>
                        </li>
                    </ul>
                    <>
                        <div className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="bi bi-caret-down-square-fill"></i>
                            </a>
                            <ul className="dropdown-menu">
                                <li>
                                    <Link to="/notifications" className="dropdown-item" aria-current="page">
                                        <i className="bi bi-bell"></i> Notifications
                                    </Link>
                                </li>
                                <li><hr className="dropdown-divider" /></li>
                                <li>
                                    <button type="button" className="btn btn-danger logout-btn">
                                        <i className="bi bi-power"></i> Logout
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </>
                    <form className="d-flex input-group search-form" role="search">
                        <input className="form-control search-input " type="search" placeholder="Search" aria-label="Search" />
                        <select className="form-select search-select" id="inputGroupSelect03" aria-label="Example select with button addon">
                            <option value="laborers">Employers</option>
                            <option value="laborers">Laborers</option>
                            <option value="laborers">Plans</option>
                            <option value="laborers">Banners</option>
                        </select>
                    </form>
                </div>
            </div>
        </nav>
    );
};

export default Header;
