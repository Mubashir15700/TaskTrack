import { MDBBtn, MDBIcon } from "mdb-react-ui-kit";

const GLogin = () => {
    const loginWithGoogle = () => {
        try {
            // Open Google OAuth authentication URL
            window.open(`${import.meta.env.VITE_AXIOS_BASE_URL}/auth/google`, "_self");
        } catch (error) {
            // Handle errors, such as if the URL is invalid or window.open fails
            console.error("Error occurred while logging in with Google:", error);
            // Optionally, display an error message to the user
            alert("An error occurred while logging in with Google. Please try again later.");
        }
    };

    return (
        <MDBBtn tag="a" color="none" className="m-1" onClick={loginWithGoogle}>
            <MDBIcon fab icon="google" size="lg" style={{ color: "#dd4b39" }} /> Sign In With Google
        </MDBBtn>
    );
};

export default GLogin;
