import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { MDBBtn, MDBRow, MDBCol, MDBInput } from "mdb-react-ui-kit";
import { signupSchema } from "../../../utils/validations/userValidations/signUpSchema";
import { setUserData } from "../../../redux/slices/userSlice";
import { userSignUp } from "../../../api/auth";
import handleInputChange from "../../../utils/formUtils/handleInputChange";
import handleFormErrors from "../../../utils/formUtils/handleFormErrors";
import AuthWrapper from "../../../components/AuthWrapper";
import GLogin from "../../../components/Users/GLogin";
import PasswordInput from "../../../components/FormElements/PasswordInput";
import FormErrorDisplay from "../../../components/FormErrorDisplay";

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
    <AuthWrapper title={"Sign up now"}>
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
      <div className="mb-2 d-flex justify-content-center">
        <GLogin onServerResponse={setServerResponse} />
      </div>
      <p>
        Already have an account?<Link className="link" to="/login">Log In</Link>
      </p>
    </AuthWrapper>
  );
};

export default SignUp;
