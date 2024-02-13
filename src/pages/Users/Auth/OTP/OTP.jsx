import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { otpSchema } from "../../../../validations/userValidations/otpSchema";
import { setLoggedIn } from "../../../../redux/slices/userSlice";
import { verifyOtp, resendOtp } from "../../../../api/shared/auth";
import logo from "../../../../assets/images/logo.png";
import "./OTP.css";

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
      const response = await verifyOtp({ otp, email });

      if (response) {
        setServerResponse(response);

        if (response.status === "success") {
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
      console.error("Error during OTP verification:", error);

      // Handle the validation error or set an appropriate server response
      if (error.name === 'ValidationError') {
        setErrors(error.errors[0]);
      } else {
        setServerResponse("An error occurred during OTP verification");
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

  const handleCancel = () => {
    navigate(-1);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimer((prevTimer) => {
        const newTimer = prevTimer > 0 ? prevTimer - 1 : 0;
        localStorage.setItem("otpTimer", String(newTimer));
        return newTimer;
      });
    }, 1000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []);

  // Convert seconds to minutes and seconds for display
  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;

  return (
    <div className="container-fluid main-div">
      <div className="sub-div">
        <img src={logo} alt="logo" />
        <h3>Verify your email</h3>
        <p>
          Enter the OTP that has been sent to your Email
        </p>
      </div>
      <form className="mt-3" onSubmit={handleVerification}>
        <div className="mb-3">
          <label htmlFor="otp" className="form-label">
            OTP *
          </label>
          <input
            type="number"
            className="form-control input"
            id="otp"
            placeholder="Enter the OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          {errors && <span className="error-display">{errors}</span>}
        </div>
        <div className="d-flex flex-column">
          {timer > 0 && (
            <span className="timer">
              Time remaining: {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
            </span>
          )}
          {timer === 0 && (<Link onClick={handleResend} className="link mt-1">
            Resend OTP
          </Link>
          )}
        </div>
        <div className="d-flex justify-content-end bottom-div">
          <Link onClick={handleCancel} className="link mt-1">
            Cancel
          </Link>
          <button type="submit" className="btn btn-primary otp-verify-btn" disabled={otp.length < 4 ? true : false}>
            Verify
          </button>
        </div>
        {serverResponse && (
          <div className={`alert ${["failed", "error"].includes(serverResponse.status) ? "alert-danger" : "alert-success"} mt-3`} role="alert">
            {serverResponse.message}
          </div>
        )}
      </form>
    </div>
  );
};

export default OTP;
