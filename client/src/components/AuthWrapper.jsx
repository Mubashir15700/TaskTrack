import { MDBContainer, MDBCard, MDBCardBody } from "mdb-react-ui-kit";
import logo from "../assets/images/logo.png";

const AuthWrapper = ({ children, title }) => {
    return (
        <div className="vh-100 d-flex flex-column justify-content-center align-items-center">
            <MDBContainer fluid className="col-md-8 col-10">
                <MDBCard
                    className="cascading-right"
                    style={{ background: "hsla(0, 0%, 100%, 0.55)", backdropFilter: "blur(30px)" }}
                >
                    <MDBCardBody
                        className="shadow-5 d-flex flex-column justify-content-center align-items-center"
                    >
                        <img src={logo} alt="logo" />
                        <h2 className="fw-bold mb-5">{title}</h2>
                        <div className="col-12 col-md-8">
                            {children} {/* Render children components */}
                        </div>
                    </MDBCardBody>
                </MDBCard>
            </MDBContainer>
        </div>
    );
};

export default AuthWrapper;
