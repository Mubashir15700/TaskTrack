import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { passwordSchema } from "../../../../validations/userValidations/passwordSchema";
import { setLoading } from "../../../../redux/slices/userSlice";
import { resetPassword } from "../../../../api/sharedApi/authApi";
import logo from "../../../../assets/images/logo.png";
import "./ResetPassword.css";

const ResetPassword = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: ""
    });

    const [errors, setErrors] = useState({});
    const [formFilled, setFormFilled] = useState(false);
    const [serverResponse, setServerResponse] = useState("");

    const userId = useSelector(state => state.user.userData?._id);

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

    const handleResetPassword = async (e) => {
        e.preventDefault();
        // dispatch(setLoading(true));

        try {
            // Validate formData against the password schema
            await passwordSchema.validate(formData, { abortEarly: false });

            setErrors({}); // Clear previous validation errors

            // If validation passes, proceed with password reset
            const response = await resetPassword({ userId, ...formData });

            if (response) {
                console.log("reset password response: ", response.data);
                setServerResponse(response.data);

                if (response.data.status === "success") {
                    navigate("/login");
                }
            }
        } catch (error) {
            console.error("Error during resetting password:", error);

            // Handle the validation error or set an appropriate server response
            if (error.name === 'ValidationError') {
                const validationErrors = {};
                error.inner.forEach(err => {
                    validationErrors[err.path] = err.message;
                });
                setErrors(validationErrors);
            } else {
                setServerResponse({ status: "failed", message: "An error occurred during resetting password" });
            }
        }

        // dispatch(setLoading(false));
    };

    return (
        <div className="container-fluid main-div">
            <div className="sub-div">
                <img src={logo} alt="logo" />
                <h3>Reset Password</h3>
                <p>Enter your new password.</p>
            </div>
            <form className="mt-3" onSubmit={handleResetPassword}>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                        Password *
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
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                        Confirm Password *
                    </label>
                    <input
                        type="password"
                        className="form-control input"
                        id="confirm-password"
                        name="confirmPassword"
                        placeholder="Confirm your password"
                        onChange={handleChange}
                    />
                    {errors.confirmPassword && <span className="error-display">{errors.confirmPassword}</span>}
                </div>
                <div className="d-flex justify-content-center bottom-div">
                    <button type="submit" className="btn btn-primary reset-password-btn" disabled={!formFilled}>
                        Reset Password
                    </button>
                </div>
                {serverResponse && (
                    <div className={`alert ${serverResponse.status === "failed" ? "alert-danger" : "alert-success"} mt-3`} role="alert">
                        {serverResponse.message}
                    </div>
                )}
            </form>
        </div>
    );
};

export default ResetPassword;
