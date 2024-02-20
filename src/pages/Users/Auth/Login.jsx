import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  MDBBtn, MDBContainer, MDBCard, MDBCardBody, MDBInput
} from "mdb-react-ui-kit";
import GLogin from "../../../components/Users/GLogin";
import FormErrorDisplay from "../../../components/Common/FormErrorDisplay";
import handleInputChange from "../../../utils/formUtils/handleInputChange";
import handleFormErrors from "../../../utils/formUtils/handleFormErrors";
import { loginSchema } from "../../../validations/userValidations/loginSchema";
import initializeUser from "../../../utils/initializeUser";
import { login } from "../../../api/shared/auth";
import logo from "../../../assets/images/logo.png";

const Login = ({ role }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverResponse, setServerResponse] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    handleInputChange(e, formData, setFormData, setServerResponse, setErrors);
  };

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
      handleFormErrors(error, setErrors, setServerResponse);
    }
  };

  return (
    <div className="vh-100 d-flex flex-column justify-content-center align-items-center">
      <MDBContainer fluid className="col-md-8 col-10">
        <MDBCard
          className="cascading-right"
          style={{ background: "hsla(0, 0%, 100%, 0.55)", backdropFilter: "blur(30px)" }}
        >
          <MDBCardBody
            className="p-5 shadow-5 d-flex flex-column justify-content-center align-items-center"
          >
            <img src={logo} alt="logo" />
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
            <h2 className="fw-bold mb-5">Login to your account</h2>
            <div className="w-75">
              <div className="mb-3">
                <MDBInput
                  label={"Username"}
                  name={"username"}
                  onChange={handleChange}
                  type={"text"}
                />
                {errors.username &&
                  <FormErrorDisplay error={errors.username} />
                }
              </div>
              <div className="d-flex position-relative">
                <MDBInput
                  label={"Password"}
                  name={"password"}
                  onChange={handleChange}
                  type={showPassword ? "text" : "password"}
                />
                <MDBBtn
                  className="mx-2 position-absolute end-0 top-50 translate-middle-y"
                  color="tertiary"
                  rippleColor="light"
                >
                  <i
                    className={`fas text-dark ${showPassword ?
                      "fa-eye-slash" :
                      "fa-eye"}`
                    }
                    onClick={togglePasswordVisibility}
                  ></i>
                </MDBBtn>
              </div>
              {errors.password &&
                <FormErrorDisplay error={errors.password} />
              }
              {role === "user" &&
                <div className="d-flex align-items-start">
                  <Link className="link" to="/verify-email">Forgot password?</Link>
                </div>
              }
              {serverResponse && (
                <div
                  className={`alert ${serverResponse.status === "failed" ?
                    "alert-danger" :
                    "alert-success"} mt-3`
                  }
                  role="alert"
                >
                  {serverResponse.message}
                </div>
              )}
              <MDBBtn className="w-100 my-4" size="md" onClick={handleLogin}>Login</MDBBtn>
              {role === "user" &&
                (
                  <>
                    <div className="mb-2 d-flex justify-content-center">
                      <GLogin onServerResponse={setServerResponse} />
                    </div>
                    <p>
                      Don't have an account?<Link className="link" to="/sign-up">Sign Up</Link>
                    </p>
                  </>
                )
              }
            </div>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </div>
  );
};

export default Login;
