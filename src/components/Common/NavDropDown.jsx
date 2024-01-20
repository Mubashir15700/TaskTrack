import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const NavDropDown = ({ role, onLogoutClick }) => {
    let count;
    if (role === "admin") {
        count = useSelector((state) => state.admin.adminNotificationCount);
    } else {
        count = useSelector((state) => state.user.userNotificationCount);
    }

    return (
        <div className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i className="bi bi-caret-down-square-fill"></i>
                {count > 0 && (
                    <span className="badge bg-danger text-light position-absolute top-0 start-10 translate-middle">
                        {count}
                    </span>
                )}
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
                    <NavLink
                        to={role === "user" ? "/notifications" : "/admin/notifications"}
                        {...role && { state: role }}
                        className="dropdown-item"
                        aria-current="page">
                        <div className="d-flex align-items-center">
                            <i className="bi bi-bell me-1"></i>
                            {count > 0 && (
                                <span className="badge bg-danger text-light mx-1">
                                    {count}
                                </span>
                            )}
                            <span>Notifications</span>
                        </div>
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
