import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    MDBBtn, MDBContainer, MDBCard, MDBCardBody, MDBInput
} from "mdb-react-ui-kit";
import FormErrorDisplay from "../../../components/Common/FormErrorDisplay";
import { emailSchema } from "../../../validations/userValidations/emailSchema";
import { confirmEmail } from "../../../api/shared/auth";
import logo from "../../../assets/images/logo.png";

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
                        <h2 className="fw-bold mb-5">Enter your email</h2>
                        <div className="w-75">
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
                        </div>
                    </MDBCardBody>
                </MDBCard>
            </MDBContainer>
        </div>
    );
};

export default Email;
