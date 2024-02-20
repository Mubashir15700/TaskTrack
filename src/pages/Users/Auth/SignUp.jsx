import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  MDBBtn, MDBContainer, MDBCard, MDBCardBody, MDBRow, MDBCol, MDBInput
} from "mdb-react-ui-kit";
import { signupSchema } from "../../../validations/userValidations/signUpSchema";
import { setUserData } from "../../../redux/slices/userSlice";
import { userSignUp } from "../../../api/shared/auth";
import handleInputChange from "../../../utils/formUtils/handleInputChange";
import handleFormErrors from "../../../utils/formUtils/handleFormErrors";
import PasswordInput from "../../../components/FormElements/PasswordInput";
import FormErrorDisplay from "../../../components/Common/FormErrorDisplay";
import logo from "../../../assets/images/logo.png";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
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

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      // Validate formData against the signup schema
      await signupSchema.validate(formData, { abortEarly: false });

      setErrors({}); // Clear previous validation errors

      // If validation passes, proceed with signup
      const response = await userSignUp(formData);

      if (response) {
        if (response.status === 200) {
          dispatch(setUserData(response.currentUser));
          navigate(`/verify-otp?purpose=signup&email=${formData.email}`);
        } else {
          alert(response.message);
        }
      }
    } catch (error) {
      handleFormErrors(error, setErrors, setServerResponse);
    }
  };

  return (
    <MDBContainer fluid className="col-md-8 col-10 pt-4">
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
          <h2 className="fw-bold mb-5">Sign up now</h2>
          <div className="w-75">
            <div className="mb-3">
              <MDBRow>
                <MDBCol size="12" sm="6 mb-3 mb-md-0">
                  <MDBInput
                    label={"Username"}
                    name={"username"}
                    onChange={handleChange}
                    type={"text"}
                  />
                  {errors.username &&
                    <FormErrorDisplay error={errors.username} />
                  }
                </MDBCol>
                <MDBCol size="12" sm="6">
                  <MDBInput
                    label={"Phone"}
                    name={"phone"}
                    onChange={handleChange}
                    type={"tel"}
                  />
                  {errors.phone &&
                    <FormErrorDisplay error={errors.phone} />
                  }
                </MDBCol>
              </MDBRow>
            </div>
            <div className="mb-3">
              <MDBInput
                label={"Email"}
                name={"email"}
                onChange={handleChange}
                type={"email"}
              />
              {errors.email &&
                <FormErrorDisplay error={errors.email} />
              }
            </div>
            <PasswordInput
              showPassword={showPassword}
              handleChange={handleChange}
              togglePasswordVisibility={togglePasswordVisibility}
              errors={errors}
            />
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
            <MDBBtn className="w-100 mb-4" size="md" onClick={handleSignUp}>Sign up</MDBBtn>
            <p>
              Already have an account?<Link className="link" to="/login">Log In</Link>
            </p>
          </div>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
};

export default SignUp;
