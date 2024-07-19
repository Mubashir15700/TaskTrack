import { MDBInput, MDBBtn } from "mdb-react-ui-kit";
import FormErrorDisplay from "../FormErrorDisplay";

const PasswordInput = ({ showPassword, handleChange, togglePasswordVisibility, errors }) => {
    return (
        <>
            <div className="mb-3">
                <div className="d-flex position-relative">
                    <MDBInput
                        label={"Password"}
                        name={"password"}
                        onChange={handleChange}
                        type={showPassword ? "text" : "password"}
                    />
                    <MDBBtn
                        className="mx-2 position-absolute end-0 top-50 translate-middle-y"
                        color="tertiary"
                        rippleColor="light"
                    >
                        <i
                            className={`fas text-dark ${showPassword ?
                                "fa-eye-slash" :
                                "fa-eye"}`
                            }
                            onClick={togglePasswordVisibility}
                        ></i>
                    </MDBBtn>
                </div>
                {errors.password &&
                    <FormErrorDisplay error={errors.password} />
                }
            </div>
            <div className="mb-3">
                <MDBInput
                    label={"Confirm your password"}
                    name={"confirmPassword"}
                    onChange={handleChange}
                    type={"password"}
                />
                {errors.confirmPassword &&
                    <FormErrorDisplay error={errors.confirmPassword} />
                }
            </div>
        </>
    );
};

export default PasswordInput;
