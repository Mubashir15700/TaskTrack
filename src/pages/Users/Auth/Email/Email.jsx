import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { emailSchema } from "../../../../validations/userValidations/emailSchema";
import { setLoading } from "../../../../redux/slices/userSlice";
import { confirmEmail } from "../../../../services/api";
import logo from "../../../../assets/images/logo.png";
import "./Email.css";

const Email = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [serverResponse, setServerResponse] = useState("");
    const [errors, setErrors] = useState("");

    const handleChange = (e) => {
        setServerResponse("");
        setErrors("");
        setEmail(e.target.value);
    }

    const handleConfirmEmail = async (e) => {
        e.preventDefault();
        // dispatch(setLoading(true));
        setServerResponse("");

        try {
            await emailSchema.validate({ email });

            const response = await confirmEmail({ email });

            if (response) {
                setServerResponse(response.data);

                if (response.data.status === "success") {
                    navigate(`/verify-otp?purpose=forgot-password&email=${email}`);
                }
            }
        } catch (error) {
            console.error("Error during email confirmation:", error);

            if (error.name === "ValidationError") {
                setErrors(error.errors[0]);
            } else {
                setServerResponse({ status: "failed", message: "An error occurred during email confirmation" });
            }
        }

        // dispatch(setLoading(false));
    };

    const handleCancel = () => {
        navigate(-1);
    };

    return (
        <div className="container-fluid main-div">
            <div className="sub-div">
                <img src={logo} alt="logo" />
                <h3>Enter your email</h3>
                <p>Enter your email address and select Send Email.</p>
            </div>
            <form className="mt-3" onSubmit={handleConfirmEmail}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                        Email *
                    </label>
                    <input
                        type="email"
                        className="form-control input"
                        id="email"
                        placeholder="Enter your email"
                        onChange={handleChange}
                    />
                    {errors && <span className="error-display">{errors}</span>}
                </div>
                <div className="d-flex justify-content-end bottom-div">
                    <Link onClick={handleCancel} className="link mt-1">
                        Cancel
                    </Link>
                    <button type="submit" className="btn btn-primary send-mail-btn">
                        Send Mail
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

export default Email;
