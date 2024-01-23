import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { setLoggedIn, setLoading, setSearchResults } from "../../../redux/slices/userSlice";
import NavDropDown from "../../Common/NavDropDown";
import SearchBar from "../../Common/SearchBar";
import SweetAlert from "../../Common/SweetAlert";
import { search } from "../../../api/sharedApi/utilityApi";
import { logout } from "../../../api/sharedApi/authApi";
import logo from "../../../assets/images/logo.png";
import "./Header.css";
import socket from "../../../socket/socket";
import { handleNotifyRequestAction, handleNotifyChatMessage } from "../../../socket/userSocketEvents";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(state => state.user.isLoggedIn);
  const currentUserId = useSelector(state => state.user.userData?._id);
  const notificationsCount = useSelector((state) => state.user.userNotificationCount);

  useEffect(() => {
    console.log("1");
    if (currentUserId && !socket.connected) {
      console.log("2");
      // Listen for the "connect" event
      socket.on("connect", () => {
        console.log("3");
        // Once connected, emit the "set_role" event
        socket.emit("set_role", { role: "user", userId: currentUserId });
      });

      // Connect the socket
      socket.connect();
    }

    const newCount = notificationsCount + 1;
    // Create a wrapper function to pass dispatch to handleNotifyRequestAction
    const notifyActionHandler = (data) => handleNotifyRequestAction(data, dispatch, newCount);
    socket.on("notify_request_action", notifyActionHandler);
    console.log("4");
    const notifyChatMessage = (data) => handleNotifyChatMessage(data, dispatch, newCount);
    socket.on("chat_notification", notifyChatMessage);

    return () => {
      console.log("5");
      if (socket.connected) {
        socket.disconnect();
      }
    };
  }, [currentUserId, dispatch, notificationsCount, socket]);


  // useEffect(() => {
  //   console.log("1");
  //   if (currentUserId && !socket.connected) {
  //     console.log("2");
  //     socket.connect();
  //     socket.emit("set_role", { role: "user", userId: currentUserId });
  //   }
  //   console.log("3");
  //   const newCount = notificationsCount + 1;
  //   // Create a wrapper function to pass dispatch to handleNotifyRequestAction
  //   const notifyActionHandler = (data) => handleNotifyRequestAction(data, dispatch, newCount);
  //   socket.on("notify_request_action", notifyActionHandler);
  //   console.log("4");
  //   const notifyChatMessage = (data) => handleNotifyChatMessage(data, dispatch, newCount);
  //   socket.on("chat_notification", notifyChatMessage);

  //   return () => {
  //     console.log("5");
  //     if (socket.connected) {
  //       socket.disconnect();
  //     }
  //   };
  // }, []);

  const [searchSelect, setSearchSelect] = useState("laborers");
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    try {
      const inputValue = e.target.value.trim();

      if (inputValue !== "") {
        const response = await search({
          currentUserId,
          searchWith: inputValue,
          searchOn: searchSelect
        });

        if (response && response.data.status === "success") {
          const { result } = response.data;

          dispatch(setSearchResults({
            searchOn: searchSelect,
            results: result
          }));

          const destination = (searchSelect === "laborers") ? "/laborers" : "/jobs";
          navigate(destination);
        } else {
          setError("An error occurred while searching");
        }
      } else {
        dispatch(setSearchResults({
          searchOn: null,
          results: null
        }));
      }
    } catch (error) {
      console.error("Error during search:", error);
      setError("An error occurred while searching");
    }
  };

  const changeSearchSelect = (selectedValue) => {
    setSearchSelect(selectedValue);
  };

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

    const response = await logout({ role: "user" });
    if (response && response.status === 200) {
      dispatch(setLoggedIn(false));
      navigate("/login");
    } else {
      setError("An error occured while logging out");
      console.log("logout error: ", response);
    }
    dispatch(setLoading(false));
  };

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
      <div className="container-fluid">
        <img src={logo} alt="logo" className="mt-2" style={{ height: "45px" }} />
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink to="/" className="nav-link" aria-current="page">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/about" className="nav-link" aria-current="page">
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/contact" className="nav-link" aria-current="page">
                Contact
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/laborers" className="nav-link" aria-current="page">
                Laborers
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/jobs" className="nav-link" aria-current="page">
                Jobs
              </NavLink>
            </li>
          </ul>
          {isLoggedIn && (
            <>
              <NavLink to="/jobs/post-job" className="btn btn-outline-success post-job-btn" type="submit" >Post Job</NavLink>
              <NavDropDown role={"user"} onLogoutClick={confirmLogout} />
            </>
          )}
          <SearchBar role={"user"} onSearch={handleSearch} onSelect={changeSearchSelect} />
          {!isLoggedIn &&
            <div className="login-signup-btn-div">
              <NavLink to="/login" type="button" className="btn btn-light header-login-btn">
                Login
              </NavLink>
              <NavLink to="/sign-up" className="btn btn-outline-success header-sign-up-btn" type="submit">
                Sign Up
              </NavLink>
            </div>
          }
        </div>
      </div>
    </nav>
  );
};

export default Header;
