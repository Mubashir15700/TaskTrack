import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { setLoading, setLoggedIn, setSearchResults } from "../../../redux/slices/userSlice";
import { search } from "../../../services/adminApi";
import { logout } from "../../../services/authApi";
import logo from "../../../assets/images/logo.png";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(state => state.user.isLoggedIn);

  const [searchSelect, setSearchSelect] = useState("laborers");
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
    try {
      const inputValue = e.target.value.trim();

      if (inputValue !== "") {
        const response = await search({
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
          {isLoggedIn &&
            <div className="d-flex align-items-center mb-sm-3 mb-md-3 mb-lg-0">
              <NavLink to="/jobs/post-job" className="btn btn-outline-success post-job-btn" type="submit" >Post Job</NavLink>
              <div className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <i className="bi bi-caret-down-square-fill"></i>
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <NavLink to="/account" className="dropdown-item" aria-current="page">
                      <i className="bi bi-person-circle"></i> Account
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/notifications" className="dropdown-item" aria-current="page">
                      <i className="bi bi-bell"></i> Notifications
                    </NavLink>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button type="button" className="btn btn-danger logout-btn" onClick={confirmLogout}>
                      <i className="bi bi-power"></i> Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          }
          <form className="d-flex input-group search-form" role="search">
            <input
              className="form-control search-input"
              type="search" placeholder="Search"
              aria-label="Search"
              onChange={handleSearch}
            />
            <select
              className="form-select search-select"
              id="inputGroupSelect03"
              onChange={(e) => setSearchSelect(e.target.value)}
            >
              <option value="laborers">Laborers</option>
              <option value="jobs">Jobs</option>
            </select>
          </form>
          {!isLoggedIn &&
            <div className="login-signup-btn-div">
              <NavLink to="/login" type="button" className="btn btn-light header-login-btn">Login</NavLink>
              <NavLink to="/sign-up" className="btn btn-outline-success header-sign-up-btn" type="submit">Sign Up</NavLink>
            </div>
          }
        </div>
      </div>
    </nav>
  );
};

export default Header;
