import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setLoading, setLoggedIn, setSearchResults } from "../../../redux/slices/adminSlice";
import { search } from "../../../services/adminApi";
import { logout } from "../../../services/authApi";
import logo from "../../../assets/images/logo.png";
import "./AdminHeader.css";

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [searchSelect, setSearchSelect] = useState("employers");
    const [error, setError] = useState("");

    const confirmLogout = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "Are you sure you want to log out?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "Cancel",
            confirmButtonText: "Logout",
        }).then((result) => {
            if (result.isConfirmed) {
                handleLogout();
            }
        });
    };

    const handleSearch = async (e) => {
        if (e.target.value !== "") {
            const response = await search({
                searchWith: e.target.value,
                searchOn: searchSelect
            });
            if (response) {
                if (response.data.status === "success") {
                    dispatch(setSearchResults({
                        searchOn: searchSelect, results: response.data.result
                    }));
                    if (searchSelect === "employers" || searchSelect === "laborers") {
                        navigate("/admin/users");
                    } else if (searchSelect === "plans") {
                        navigate("/admin/subscription-plans");
                    } else {
                        navigate("/admin/banners");
                    }
                } else {
                    setError("An error occured while searching");
                }
            } else {
                setError("An error occured while searching");
            }
        } else {
            dispatch(setSearchResults({
                searchOn: null, results: null
            }));
        }
    };

    const handleLogout = async () => {
        dispatch(setLoading(true));

        const response = await logout({ role: "admin" });
        if (response && response.status === 200) {
            dispatch(setLoggedIn(false));
            navigate("/admin/login");
        } else {
            setError("An error occured while logging out");
            console.log("logout error: ", response);
        }
        dispatch(setLoading(false));
    }

    useEffect(() => {
        error && toast.error(error);
    }, [error]);

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
            <div className="container-fluid">
                <img src={logo} alt="logo" className="mt-3" style={{ height: "40px" }} />
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink to="/admin" className="nav-link" aria-current="page" end>Dashboard</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/admin/users" className="nav-link" aria-current="page">Users</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/admin/subscription-plans" className="nav-link" aria-current="page">
                                Pricing
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/admin/transactions" className="nav-link" aria-current="page">
                                Transactions
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/admin/laborer-requests" className="nav-link" aria-current="page">
                                Requests
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/admin/banners" className="nav-link" aria-current="page">Banners</NavLink>
                        </li>
                    </ul>
                    <div className="d-md-flex flex-md-row flex-column">
                        <div className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="bi bi-caret-down-square-fill"></i>
                            </a>
                            <ul className="dropdown-menu">
                                <li>
                                    <NavLink to="/admin/notifications" className="dropdown-item" aria-current="page">
                                        <i className="bi bi-bell"></i> Notifications
                                    </NavLink>
                                </li>
                                <li><hr className="dropdown-divider" /></li>
                                <li>
                                    <button type="button" className="btn btn-danger logout-btn" data-bs-toggle="modal"
                                        data-bs-target="#logoutModal" onClick={confirmLogout}>
                                        <i className="bi bi-power"></i> Logout
                                    </button>
                                </li>
                            </ul>
                        </div>
                        <form className="d-flex input-group search-form" role="search">
                            <input
                                className="form-control search-input"
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                                onChange={handleSearch}
                            />
                            <select
                                className="form-select search-select"
                                id="inputGroupSelect03"
                                onChange={(e) => setSearchSelect(e.target.value)}
                            >
                                <option value="employers">Employers</option>
                                <option value="laborers">Laborers</option>
                                <option value="plans">Plans</option>
                                <option value="banners">Banners</option>
                            </select>
                        </form>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;
