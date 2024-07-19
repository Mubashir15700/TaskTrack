import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MDBBtn, MDBInput } from "mdb-react-ui-kit";
import AuthWrapper from "../../../components/AuthWrapper";
import FormErrorDisplay from "../../../components/FormErrorDisplay";
import { emailSchema } from "../../../utils/validations/userValidations/emailSchema";
import { confirmEmail } from "../../../api/auth";

const Email = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [serverResponse, setServerResponse] = useState("");
    const [errors, setErrors] = useState("");

    const handleChange = (e) => {
        setServerResponse("");
        setErrors("");
        setEmail(e.target.value);
    };

    const handleConfirmEmail = async (e) => {
        e.preventDefault();
        setServerResponse("");

        try {
            await emailSchema.validate({ email });

            const response = await confirmEmail({ email });

            if (response) {
                setServerResponse(response);

                if (response.status === 200) {
                    navigate(`/verify-otp?purpose=forgot-password&email=${email}`);
                }
            }
        } catch (error) {
            // Handle the validation error or set an appropriate server response
            if (error.name === "ValidationError") {
                setErrors(error.errors[0]);
            } else {
                console.error("Error during verifying email:", error);
                setServerResponse({ status: "failed", message: error.message });
            }
        }
    };

    return (
        <AuthWrapper title={"Enter your email"}>
            <div className="mb-3">
                <MDBInput
                    label={"Email"}
                    name={"email"}
                    onChange={handleChange}
                    type={"email"}
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
            <MDBBtn className="w-100 mb-4" size="md" onClick={handleConfirmEmail}>
                Verify
            </MDBBtn>
        </AuthWrapper>
    );
};

export default Email;
