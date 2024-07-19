import { Link } from "react-router-dom";
import {
    MDBCard,
    MDBCardText,
    MDBCardBody,
    MDBCardImage,
    MDBBtn,
} from "mdb-react-ui-kit";
import IMAGE_URLS from "../../configs/imageUrls";

const ProfileCard = ({ imageSrc, userId, username, title }) => {
    return (
        <MDBCard className="mb-4">
            {title && <MDBCardText className="m-2">{title}</MDBCardText>}
            <MDBCardBody className="text-center">
                <MDBCardImage
                    src={imageSrc ?
                        `${import.meta.env.VITE_AXIOS_BASE_URL}/uploads/profile/${imageSrc}` :
                        IMAGE_URLS.avatar
                    }
                    alt="avatar"
                    className="rounded-circle"
                    style={{ width: "150px" }}
                    fluid />
                <p className="text-muted mb-1">{username}</p>
                <div className="d-flex justify-content-center mb-2">
                    <MDBBtn>Follow</MDBBtn>
                    <Link
                        to={`/chat/${userId}/${username}`}
                        className="btn btn-outline-primary ms-2"
                    >
                        <i className="bi bi-chat-dots"></i>
                    </Link>
                </div>
            </MDBCardBody>
        </MDBCard>
    );
};

export default ProfileCard;
