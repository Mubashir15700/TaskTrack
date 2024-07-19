import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setLoggedIn } from "../redux/slices/adminSlice";
import { setLoggedIn as setUserLoggedIn } from "../redux/slices/userSlice";
import { setLoading } from "../redux/slices/commonSlice";
import SweetAlert from "./SweetAlert";
import { logout } from "../api/auth";

const NavDropDown = ({ role, onError, changeOpenBasicState }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    let count;
    if (role === "admin") {
        count = useSelector((state) => state.admin.adminNotificationCount);
    } else {
        count = useSelector((state) => state.user.userNotificationCount);
    }

    const confirmLogout = async () => {
        const result = await SweetAlert.confirmAction(
            "Log Out",
            "Are you sure you want to log out?",
            "Logout",
            "#d9534f"
        );

        if (result.isConfirmed) {
            handleLogout();
        }
    };

    const handleLogout = async () => {
        dispatch(setLoading(true));

        const response = await logout({ role });
        if (response && response.status === 200) {
            role === "admin" ? dispatch(setLoggedIn(false)) : dispatch(setUserLoggedIn(false));
            const navigateTo = role === "admin" ? "/admin/login" : "/login";
            navigate(navigateTo);
        } else {
            onError("An error occured while logging out");
            console.log("logout error: ", response);
        }
        dispatch(setLoading(false));
    };

    return (
        <div className={`nav-item dropdown ${role === "user" && "mx-4"}`}>
            <button className="nav-link" data-bs-toggle="dropdown" aria-expanded="false">
                <i className="bi bi-caret-down-square-fill fs-2"></i>
                {count > 0 && (
                    <span className="badge bg-danger text-light position-absolute start-10 translate-middle">
                        {count}
                    </span>
                )}
            </button>
            <ul className="dropdown-menu">
                {role === "user" && (
                    <>
                        <li>
                            <NavLink to="/account" className="dropdown-item" onClick={changeOpenBasicState} aria-current="page">
                                <i className="bi bi-person-circle"></i> Account
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/chats" className="dropdown-item" onClick={changeOpenBasicState} aria-current="page">
                                <i className="bi bi-chat-dots"></i> Chats
                            </NavLink>
                        </li>
                    </>
                )}
                <li>
                    <NavLink
                        to={role === "user" ? "/notifications" : "/admin/notifications"}
                        {...role && { state: role }}
                        className="dropdown-item"
                        onClick={changeOpenBasicState}
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
                <li className="text-center">
                    <button type="button" className="btn btn-sm btn-danger mb-2" onClick={confirmLogout}>
                        <i className="bi bi-power fs-5 me-2"></i> Logout
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default NavDropDown;
