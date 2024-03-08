import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setSearchResults } from "../../redux/slices/adminSlice";
import NavDropDown from "../Common/NavDropDown";
import SearchBar from "../Common/SearchBar";
import { search } from "../../api/shared/utility";
import socket from "../../socket/socket";
import { handleNotifyRequestSubmit } from "../../socket/adminSocketEvents";
import logo from "../../assets/images/logo.png";
import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarToggler,
    MDBIcon,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBCollapse,
} from "mdb-react-ui-kit";
import axios from "../../config/axiosConfig";

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [searchSelect, setSearchSelect] = useState("users");
    const [error, setError] = useState("");

    const [openBasic, setOpenBasic] = useState(false);

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
        // Check if the search input is not empty
        if (e.target.value !== "") {
            // Create a CancelToken source
            const cancelTokenSource = axios.CancelToken.source();

            try {
                // Perform the search request with the cancel token
                const response = await search({
                    searchWith: e.target.value,
                    searchOn: searchSelect
                }, cancelTokenSource.token);

                // Check if the response is successful (status code 200)
                if (response && response.status === 200) {
                    // Dispatch the search results to Redux store
                    dispatch(setSearchResults({
                        searchOn: searchSelect, results: response.result
                    }));

                    // Navigate to the appropriate page based on searchSelect
                    if (searchSelect === "users") {
                        navigate("/admin/users");
                    } else if (searchSelect === "plans") {
                        navigate("/admin/subscription-plans");
                    } else {
                        navigate("/admin/banners");
                    }
                } else {
                    // Handle the case where the response status is not 200
                    setError("An error occurred while searching");
                }
            } catch (error) {
                // Handle errors, including cancellation
                if (axios.isCancel(error)) {
                    console.log("Search request canceled:", error.message);
                } else {
                    setError("An error occurred while searching");
                }
            } finally {
                // Cancel the request if component unmounts or performs a new search
                cancelTokenSource.cancel("Request canceled by the user");
            }
        } else {
            // Clear the search results if the search input is empty
            dispatch(setSearchResults({ searchOn: null, results: null }));
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
        <MDBNavbar expand="lg" light bgColor="light" className="fixed-top">
            <MDBContainer fluid>
                <MDBNavbarBrand href="#">
                    <img src={logo} alt="logo" className="mt-2" style={{ height: "40px" }} />
                </MDBNavbarBrand>

                <MDBNavbarToggler
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                    onClick={() => setOpenBasic(!openBasic)}
                >
                    <MDBIcon icon="bars" fas />
                </MDBNavbarToggler>

                <MDBCollapse navbar open={openBasic}>
                    <MDBNavbarNav className="mr-auto mb-2 mb-lg-0">
                        <MDBNavbarItem className="align-self-lg-center">
                            <NavLink to="/admin" className="nav-link" aria-current="page" end>
                                Dashboard
                            </NavLink>
                        </MDBNavbarItem>
                        <MDBNavbarItem className="align-self-lg-center">
                            <NavLink to="/admin/users" className="nav-link" aria-current="page">
                                Users
                            </NavLink>
                        </MDBNavbarItem>
                        <MDBNavbarItem className="align-self-lg-center">
                            <NavLink to="/admin/subscription-plans" className="nav-link" aria-current="page">
                                Pricing
                            </NavLink>
                        </MDBNavbarItem>
                        <MDBNavbarItem className="align-self-lg-center">
                            <NavLink to="/admin/subscriptions" className="nav-link" aria-current="page">
                                Subscriptions
                            </NavLink>
                        </MDBNavbarItem>
                        <MDBNavbarItem className="align-self-lg-center">
                            <NavLink to="/admin/laborer-requests" className="nav-link" aria-current="page">
                                Requests
                            </NavLink>
                        </MDBNavbarItem>
                        <MDBNavbarItem className="align-self-lg-center">
                            <NavLink to="/admin/banners" className="nav-link" aria-current="page">
                                Banners
                            </NavLink>
                        </MDBNavbarItem>
                        <NavDropDown role={"admin"} onError={setError} />
                    </MDBNavbarNav>
                    <SearchBar role={"admin"} onSearch={handleSearch} onSelect={changeSearchSelect} />
                </MDBCollapse>
            </MDBContainer>
        </MDBNavbar>
    );
};

export default Header;
