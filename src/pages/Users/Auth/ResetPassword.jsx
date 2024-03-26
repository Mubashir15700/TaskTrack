import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
    MDBBtn, MDBContainer, MDBCard, MDBCardBody
} from "mdb-react-ui-kit";
import handleInputChange from "../../../utils/formUtils/handleInputChange";
import handleFormErrors from "../../../utils/formUtils/handleFormErrors";
import PasswordInput from "../../../components/FormElements/PasswordInput";
import { passwordSchema } from "../../../validations/userValidations/passwordSchema";
import { resetPassword } from "../../../api/shared/auth";
import logo from "../../../assets/images/logo.png";

const ResetPassword = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: ""
    });

    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [serverResponse, setServerResponse] = useState("");

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const userId = useSelector(state => state.user.userData?._id);

    const handleChange = (e) => {
        handleInputChange(e, formData, setFormData, setServerResponse, setErrors);
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();

        try {
            // Validate formData against the password schema
            await passwordSchema.validate(formData, { abortEarly: false });

            setErrors({}); // Clear previous validation errors

            // If validation passes, proceed with password reset
            const response = await resetPassword({ userId, ...formData });

            if (response) {
                console.log("reset password response: ", response);
                setServerResponse(response);

                if (response.status === 200) {
                    navigate("/login");
                }
            }
        } catch (error) {
            handleFormErrors(error, setErrors, setServerResponse);
        }
    };

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
                        <h2 className="fw-bold mb-5">Enter new password</h2>
                        <div className="col-12 col-md-8">
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
                            <MDBBtn className="w-100 mb-4" size="md" onClick={handleResetPassword}>
                                Reset
                            </MDBBtn>
                        </div>
                    </MDBCardBody>
                </MDBCard>
            </MDBContainer>
        </div>
    );
};

export default ResetPassword;
