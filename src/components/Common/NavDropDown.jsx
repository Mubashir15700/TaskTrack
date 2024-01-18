import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAdminNotificationCount } from "../../services/adminApi";
import { getUserNotificationCount } from "../../services/userApi";

const NavDropDown = ({ role, onLogoutClick }) => {
    const [userNotificationCount, setUserNotificationCount] = useState(0);
    const [adminNotificationCount, setAdminNotificationCount] = useState(0);
    const [showCount, setShowCount] = useState(false);

    const currentUserId = role === "user" && useSelector((state) => state.user.userData._id);

    useEffect(() => {
        const fetchNotificationCount = async () => {
            try {
                let response;
                if (role === "admin") {
                    response = await getAdminNotificationCount();
                    setAdminNotificationCount(response.data.count);
                } else {
                    response = await getUserNotificationCount(currentUserId);
                    setUserNotificationCount(response.data.count);
                }
            } catch (error) {
                console.error("Error fetching notification count", error);
            }
        };

        fetchNotificationCount();
    }, []);

    useEffect(() => {
        if (role === "admin" && adminNotificationCount > 0) {
            setShowCount(true);
        } else if (role === "user" && userNotificationCount > 0) {
            setShowCount(true);
        }
    }, [adminNotificationCount, userNotificationCount]);


    console.log(adminNotificationCount, userNotificationCount, role);
    return (
        <div className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i className="bi bi-caret-down-square-fill"></i>
                {showCount && (
                    <span className="badge bg-danger text-light position-absolute top-0 start-10 translate-middle">
                        {role === "admin" ? adminNotificationCount : userNotificationCount}
                        <span className="visually-hidden">unread messages</span>
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
                        state:pendingRequest
                        className="dropdown-item"
                        aria-current="page">
                        <div className="d-flex align-items-center">
                            <i className="bi bi-bell me-1"></i>
                            {showCount && (
                                <span className="badge bg-danger text-light mx-1">
                                    {role === "admin" ? adminNotificationCount : userNotificationCount}
                                    <span className="visually-hidden">unread notifications</span>
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
