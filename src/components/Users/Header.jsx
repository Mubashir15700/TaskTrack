import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { setSearchResults } from "../../redux/slices/userSlice";
import SearchBar from "../Common/SearchBar";
import { search } from "../../api/shared/utility";
import socket from "../../socket/socket";
import {
  handleNotifyRequestAction,
  handleNotifyChatMessage,
  handleNotifyNewApplication,
  handleNotifyApplicationCancel,
  handleNotifyApplicationAction
} from "../../socket/userSocketEvents";
import logo from "../../assets/images/logo.png";
import NavDropDown from "../Common/NavDropDown";
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
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(state => state.user.isLoggedIn);
  const currentUserId = useSelector(state => state.user.userData?._id);
  const notificationsCount = useSelector((state) => state.user.userNotificationCount);

  useEffect(() => {
    let notifyActionHandler;
    let notifyChatMessage;
    let notifyNewApplicant;
    let notifyApplicationCancel;
    let notifyApplicationAction;

    if (currentUserId && !socket.connected) {
      // Listen for the "connect" event
      socket.on("connect", () => {
        // Once connected, emit the "set_role" event
        socket.emit("set_role", { role: "user", userId: currentUserId });
      });

      // Connect the socket
      socket.connect();
    }

    const newCount = notificationsCount + 1;

    // Create wrapper functions to pass dispatch to the respective handlers
    notifyActionHandler = (data) => handleNotifyRequestAction(data, dispatch, newCount);
    socket.on("notify_request_action", notifyActionHandler);

    notifyChatMessage = (data) => handleNotifyChatMessage(data, dispatch, newCount);
    socket.on("chat_notification", notifyChatMessage);

    notifyNewApplicant = (data) => handleNotifyNewApplication(data, dispatch, newCount);
    socket.on("notify_new_applicant", notifyNewApplicant);

    notifyApplicationCancel = (data) => handleNotifyApplicationCancel(data, dispatch, newCount);
    socket.on("notify_application_cancel", notifyApplicationCancel);

    notifyApplicationAction = (data) => handleNotifyApplicationAction(data, dispatch, newCount);
    socket.on("notify_application_action", notifyApplicationAction);

    // Cleanup function
    return () => {
      socket.off("notify_request_action", notifyActionHandler);
      socket.off("chat_notification", notifyChatMessage);
      socket.off("notify_new_applicant", notifyNewApplicant);
      socket.off("notify_application_cancel", notifyApplicationCancel);
      socket.off("notify_application_action", notifyApplicationAction);

      if (socket.connected) {
        socket.disconnect();
      }
    };
  }, [currentUserId, dispatch, notificationsCount, socket]);

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

        if (response && response.status === 200) {
          const { result } = response;

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

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const [openBasic, setOpenBasic] = useState(false);

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
          <MDBNavbarNav className="mb-2 mb-lg-0">
            <MDBNavbarItem className="align-self-lg-center">
              <NavLink to="/" className="nav-link" aria-current="page">
                Home
              </NavLink>
            </MDBNavbarItem>
            <MDBNavbarItem className="align-self-lg-center">
              <NavLink to="/laborers" className="nav-link" aria-current="page">
                Laborers
              </NavLink>
            </MDBNavbarItem>
            <MDBNavbarItem className="align-self-lg-center">
              <NavLink to="/jobs" className="nav-link" aria-current="page">
                Jobs
              </NavLink>
            </MDBNavbarItem>
            {isLoggedIn && (
              <div className="d-flex ms-lg-3">
                <NavLink
                  to="/jobs/post-job"
                  className="btn btn-primary align-self-center"
                  type="submit"
                >
                  Post Job
                </NavLink>
                <NavDropDown role={"user"} onError={setError} />
              </div>
            )}
          </MDBNavbarNav>

          <SearchBar role={"user"} onSearch={handleSearch} onSelect={changeSearchSelect} />

          {!isLoggedIn &&
            <NavLink to="/login" type="button" className="btn btn-primary my-2 my-lg-0 ms-lg-2">
              Login
            </NavLink>
          }
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
};

export default Header;
