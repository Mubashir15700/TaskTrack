import { NavLink } from "react-router-dom";

const NavDropDown = ({ role, onLogoutClick }) => {

    return (
        <div className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i className="bi bi-caret-down-square-fill"></i>
            </a>
            <ul className="dropdown-menu">
                {role === "user" && (
                    <li>
                        <NavLink to="/account" className="dropdown-item" aria-current="page">
                            <i className="bi bi-person-circle"></i> Account
                        </NavLink>
                    </li>
                )}
                <li>
                    <NavLink to={role === "user" ? "/notifications" : "/admin/notifications"} className="dropdown-item" aria-current="page">
                        <i className="bi bi-bell"></i> Notifications
                    </NavLink>
                </li>
                <li><hr className="dropdown-divider" /></li>
                <li>
                    <button type="button" className="btn btn-danger logout-btn" onClick={onLogoutClick}>
                        <i className="bi bi-power"></i> Logout
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default NavDropDown;
