import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  MDBBtn, MDBContainer, MDBCard, MDBCardBody
} from "mdb-react-ui-kit";
import OtpInput from "react-otp-input";
import FormErrorDisplay from "../../../components/Common/FormErrorDisplay";
import { otpSchema } from "../../../validations/userValidations/otpSchema";
import { setLoggedIn } from "../../../redux/slices/userSlice";
import { verifyOtp, resendOtp } from "../../../api/shared/auth";
import logo from "../../../assets/images/logo.png";

const OTP = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const purpose = queryParams.get("purpose");
  const email = queryParams.get("email");

  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(() => {
    // Retrieve the timer value from localStorage or set it to the initial value (300 seconds)
    const storedTimer = localStorage.getItem("otpTimer");
    return storedTimer ? parseInt(storedTimer, 10) : 300;
  });
  const [serverResponse, setServerResponse] = useState("");
  const [errors, setErrors] = useState("");

  const handleVerification = async (e) => {
    e.preventDefault();
    setServerResponse("");

    try {
      // Validate OTP and email against the schema
      await otpSchema.validate({ otp });

      // If validation passes, proceed with OTP verification
      const response = await verifyOtp({ otp, email, purpose });

      if (response) {
        setServerResponse(response);

        if (response.status === 200) {
          localStorage.removeItem("otpTimer");
          if (purpose === "forgot-password") {
            navigate("/reset-password");
          } else if (purpose === "signup") {
            dispatch(setLoggedIn(true));
            navigate("/");
          }
        }
      }
    } catch (error) {
      // Handle the validation error or set an appropriate server response
      if (error.name === "ValidationError") {
        setErrors(error.errors[0]);
      } else {
        console.error("Error during verifying otp:", error);
        setServerResponse({ status: "failed", message: error.message });
      }
    }
  };

  const handleResend = async () => {
    setServerResponse("");

    const response = await resendOtp({ email });
    if (response) {
      setServerResponse(response);
      if (response.status === 200) {
        setTimer(300);
        localStorage.setItem("otpTimer", "300");
      }
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimer((prevTimer) => {
        const newTimer = prevTimer > 0 ? prevTimer - 1 : 0;
        localStorage.setItem("otpTimer", String(newTimer));
        return newTimer;
      });
    }, 1000);

    // Cleanup function to remove item from localStorage
    return () => {
      clearInterval(intervalId);
      localStorage.removeItem("otpTimer");
    };
  }, []);

  // Convert seconds to minutes and seconds for display
  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;

  return (
    <div className="vh-100 d-flex flex-column justify-content-center align-items-center">
      <MDBContainer fluid className="col-md-8 col-10 pt-4">
        <MDBCard
          className="cascading-right"
          style={{ background: "hsla(0, 0%, 100%, 0.55)", backdropFilter: "blur(30px)" }}
        >
          <MDBCardBody
            className="shadow-5 d-flex flex-column justify-content-center align-items-center"
          >
            <img src={logo} alt="logo" />
            <h2 className="fw-bold mb-5">Enter the otp</h2>
            <div className="col-12 col-md-8">
              <div className="mb-3">
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  numInputs={6}
                  renderSeparator={<span>*</span>}
                  renderInput={(props) => <input {...props} className="w-100 py-1" />}
                />
                {errors &&
                  <FormErrorDisplay error={errors} />
                }
              </div>
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
              <div className="d-flex flex-column">
                {timer > 0 && (
                  <span className="timer">
                    Time remaining: {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
                  </span>
                )}
                {timer === 0 && (
                  <Link onClick={handleResend} className="link mt-1">
                    Resend OTP
                  </Link>
                )}
              </div>
              <MDBBtn className="w-100 mb-4" size="md" onClick={handleVerification}>Verify</MDBBtn>
            </div>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </div>
  );
};

export default OTP;
