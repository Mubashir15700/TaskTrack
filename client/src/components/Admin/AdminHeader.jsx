import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import NavDropDown from "../NavDropDown";
import SearchBar from "../SearchBar";
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

const Header = () => {
    const [error, setError] = useState("");
    const [openBasic, setOpenBasic] = useState(false);

    const dispatch = useDispatch();
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

    const changeOpenBasicState = () => {
        // Check if the screen width is less than 992
        if (window.innerWidth < 992) {
            setOpenBasic(!openBasic);
        }
    };

    useEffect(() => {
        error && toast.error(error);
    }, [error]);

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
                    onClick={changeOpenBasicState}
                >
                    <MDBIcon icon="bars" fas />
                </MDBNavbarToggler>

                <MDBCollapse navbar open={openBasic}>
                    <MDBNavbarNav className="mr-auto mb-2 mb-lg-0">
                        <MDBNavbarItem className="align-self-lg-center">
                            <NavLink to="/admin" className="nav-link" onClick={changeOpenBasicState}
                                aria-current="page" end>
                                Dashboard
                            </NavLink>
                        </MDBNavbarItem>
                        <MDBNavbarItem className="align-self-lg-center">
                            <NavLink to="/admin/users" className="nav-link" onClick={changeOpenBasicState}
                                aria-current="page">
                                Users
                            </NavLink>
                        </MDBNavbarItem>
                        <MDBNavbarItem className="align-self-lg-center">
                            <NavLink to="/admin/subscription-plans" className="nav-link" onClick={changeOpenBasicState}
                                aria-current="page">
                                Pricing
                            </NavLink>
                        </MDBNavbarItem>
                        <MDBNavbarItem className="align-self-lg-center">
                            <NavLink to="/admin/subscriptions" className="nav-link" onClick={changeOpenBasicState}
                                aria-current="page">
                                Subscriptions
                            </NavLink>
                        </MDBNavbarItem>
                        <MDBNavbarItem className="align-self-lg-center">
                            <NavLink to="/admin/laborer-requests" className="nav-link" onClick={changeOpenBasicState}
                                aria-current="page">
                                Requests
                            </NavLink>
                        </MDBNavbarItem>
                        <MDBNavbarItem className="align-self-lg-center">
                            <NavLink to="/admin/banners" className="nav-link" onClick={changeOpenBasicState}
                                aria-current="page">
                                Banners
                            </NavLink>
                        </MDBNavbarItem>
                        <NavDropDown role={"admin"} onError={setError} changeOpenBasicState={changeOpenBasicState} />
                    </MDBNavbarNav>
                    <SearchBar role={"admin"} onError={setError} />
                </MDBCollapse>
            </MDBContainer>
        </MDBNavbar>
    );
};

export default Header;
