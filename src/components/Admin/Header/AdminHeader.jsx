import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setSearchResults } from "../../../redux/slices/adminSlice";
import NavDropDown from "../../Common/NavDropDown";
import SearchBar from "../../Common/SearchBar";
import { search } from "../../../api/shared/utility";
import socket from "../../../socket/socket";
import { handleNotifyRequestSubmit } from "../../../socket/adminSocketEvents";
import logo from "../../../assets/images/logo.png";
import "./AdminHeader.css";

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [searchSelect, setSearchSelect] = useState("users");
    const [error, setError] = useState("");

    const notificationsCount = useSelector((state) => state.admin.adminNotificationCount);

    useEffect(() => {
        let notifySubmitHandler;

        if (!socket.connected) {
            // Listen for the "connect" event
            socket.on("connect", () => {
                // Once connected, emit the "set_role" event
                socket.emit("set_role", { role: "admin" });
            });

            const newCount = notificationsCount + 1;
            // Create a wrapper function to pass dispatch to handleNotifyRequestSubmit
            notifySubmitHandler = () => handleNotifyRequestSubmit(dispatch, newCount);
            socket.on("notify_request_submit", notifySubmitHandler);

            // Connect the socket
            socket.connect();
        }

        return () => {
            // Remove the event listener when the component is unmounted
            socket.off("notify_request_submit", notifySubmitHandler);

            if (socket.connected) {
                socket.disconnect();
            }
        };
    }, [dispatch, notificationsCount, socket]);

    const handleSearch = async (e) => {
        if (e.target.value !== "") {
            const response = await search({
                searchWith: e.target.value,
                searchOn: searchSelect
            });
            if (response) {
                if (response.status === 200) {
                    dispatch(setSearchResults({
                        searchOn: searchSelect, results: response.result
                    }));
                    if (searchSelect === "users") {
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

    const changeSearchSelect = (selectedValue) => {
        setSearchSelect(selectedValue);
    };

    useEffect(() => {
        error && toast.error(error);
    }, [error]);

    const searchBarProps = {
        role: "admin",
        onSearch: handleSearch,
        onSelect: changeSearchSelect
    };

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
                            <NavLink to="/admin" className="nav-link" aria-current="page" end>
                                Dashboard
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/admin/users" className="nav-link" aria-current="page">
                                Users
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/admin/subscription-plans" className="nav-link" aria-current="page">
                                Pricing
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/admin/subscriptions" className="nav-link" aria-current="page">
                                Subscriptions
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/admin/laborer-requests" className="nav-link" aria-current="page">
                                Requests
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/admin/banners" className="nav-link" aria-current="page">
                                Banners
                            </NavLink>
                        </li>
                    </ul>
                    <div className="d-md-flex flex-md-row flex-column">
                        <NavDropDown role={"admin"} onError={setError} />
                        <SearchBar {...searchBarProps} />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;
