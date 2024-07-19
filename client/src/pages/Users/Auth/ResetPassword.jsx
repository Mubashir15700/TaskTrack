import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { MDBBtn } from "mdb-react-ui-kit";
import handleInputChange from "../../../utils/formUtils/handleInputChange";
import handleFormErrors from "../../../utils/formUtils/handleFormErrors";
import AuthWrapper from "../../../components/AuthWrapper";
import PasswordInput from "../../../components/FormElements/PasswordInput";
import { passwordSchema } from "../../../utils/validations/userValidations/passwordSchema";
import { resetPassword } from "../../../api/auth";

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
        <AuthWrapper title={"Enter new password"}>
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
        </AuthWrapper>
    );
};

export default ResetPassword;
