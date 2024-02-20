import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { GoogleLogin } from "@react-oauth/google";
import initializeUser from "../../utils/initializeUser";
import { loginWithGoogle } from "../../api/shared/auth";

const GLogin = ({ onServerResponse }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = async (data) => {
        try {
            const response = await loginWithGoogle({ token: data.credential });
            if (response && response.status === 200) {
                initializeUser("user", dispatch);
                navigate("/");
            } else {
                onServerResponse({ status: "failed", message: response.message });
            }
        } catch (error) {
            console.error("Error during login with google:", error);
            onServerResponse({ status: "failed", message: error.message });
        }
    };

    const handleError = async (data) => {
        console.log("An error occurred during Google login: ", data);
        onServerResponse({ status: "failed", message: "An error occurred during Google login" });
    };

    return (
        <GoogleLogin
            onSuccess={credentialResponse => {
                handleLogin(credentialResponse);
            }}
            onError={credentialResponse => {
                handleError(credentialResponse)
            }}
        />
    );
};

export default GLogin;
