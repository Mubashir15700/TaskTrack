import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import GLogin from "../../../../components/Users/GLogin";
import { loginSchema } from "../../../../validations/userValidations/loginSchema";
import initializeUser from "../../../../utils/initializeUser";
import { login } from "../../../../api/shared/auth";
import logo from "../../../../assets/images/logo.png";
import "./Login.css";

const Login = ({ role }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role
  });

  const [errors, setErrors] = useState({});
  const [formFilled, setFormFilled] = useState(false);
  const [serverResponse, setServerResponse] = useState("");

  const handleChange = (e) => {
    setServerResponse("");
    if (Object.values(formData).filter(value => value.trim() !== "").length === 2) {
      setFormFilled(true);
    }
    const { name, value } = e.target;
    errors[name] = null;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await loginSchema.validate(formData, { abortEarly: false });
      setErrors({});

      const response = await login(formData);

      if (response) {
        setServerResponse(response);
        if (response.status === 200) {
          if (role === "admin") {
            initializeUser("admin", dispatch);
            navigate("/admin");
          } else {
            initializeUser("user", dispatch);
            navigate("/");
          }
        }
      }
    } catch (error) {
      if (error.name === "ValidationError") {
        const validationErrors = {};
        error.inner.forEach(err => {
          validationErrors[err.path] = err.message;
        });
        setErrors(validationErrors);
      } else {
        console.error("Error during login:", error);
        setServerResponse({ status: "failed", message: "An error occurred during login" });
      }
    }
  };

  return (
    <div className="container-fluid main-div">
      <div className="sub-div">
        <img src={logo} alt="logo" />
        <h3>Log in to TaskTrack</h3>
      </div>
      <form className="mt-3" onSubmit={handleLogin}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control input"
            id="username"
            name="username"
            placeholder="Enter your username"
            onChange={handleChange}
          />
          {errors.username && <span className="error-display">{errors.username}</span>}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control input"
            id="password"
            name="password"
            placeholder="Enter your password"
            onChange={handleChange}
          />
          {errors.password && <span className="error-display">{errors.password}</span>}
          {role === "user" &&
            <Link className="link" to="/verify-email">Forgot password?</Link>
          }
        </div>
        <div className="d-flex flex-row justify-content-center bottom-div">
          <button type="submit" className="btn btn-primary login-btn" disabled={!formFilled}>
            Login
          </button>
          {role === "user" &&
            <GLogin onServerResponse={setServerResponse} />
          }
        </div>
        {serverResponse && (
          <div className={`alert ${["failed", "error"].includes(serverResponse.status) ? "alert-danger" : "alert-success"} mt-3`} role="alert">
            {serverResponse.message}
          </div>
        )}
        {role === "user" &&
          <p className="mt-3">Don't have an account?<Link className="link" to="/sign-up">Sign up</Link></p>}
      </form>
    </div>
  );
};

export default Login;
