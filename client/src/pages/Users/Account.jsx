import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { getLaborer } from "../../api/user/laborer";
import IMAGE_URLS from "../../configs/imageUrls";
import { MDBCard, MDBCardBody, MDBCardImage, MDBBtn } from "mdb-react-ui-kit";

const Account = () => {
    const currentUser = useSelector((state) => state.user.userData);

    const navigate = useNavigate();

    const goToLaborerProfile = async () => {
        try {
            const response = await getLaborer(currentUser._id);
            if (response && response.status === 200) {
                // Extract relevant data from the response
                const { languages, education, avlDays, avlTimes, fields } = response.laborer;

                const laborerProfileData = {
                    userId: currentUser._id,
                    languages: languages ?? "",
                    education: education ?? "",
                    avlDays: avlDays,
                    avlTimes: avlTimes,
                    fields: fields || [defaultField],
                };

                navigate("/laborer-profile", { state: { laborerProfileData } });
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            toast.error("An error occurerd while fetching data");
            console.log("Get laborer profile error: ", error);
        }
    };

    return (
        <div className="col-10 my-3 mx-auto">
            {/* user profile view */}
            <div className="d-md-flex align-items-center">
                <div className="col-md-5 card mb-3">
                    <MDBCard>
                        <MDBCardBody className="text-center">
                            <MDBCardImage
                                src={currentUser?.profile ?
                                    `${import.meta.env.VITE_AXIOS_BASE_URL}/uploads/profile/${currentUser?.profile}` :
                                    IMAGE_URLS.avatar
                                }
                                alt="avatar"
                                className="rounded-circle"
                                style={{ width: "150px" }}
                                fluid />
                            <p className="mb-1">{currentUser?.username}</p>
                            <p className="text-muted mb-1">{currentUser?.email}</p>
                            <p className="text-muted mb-1">{currentUser?.phone}</p>
                            <Link to="/profile" className="d-flex justify-content-center">
                                <MDBBtn>Edit</MDBBtn>
                            </Link>
                            {currentUser.isJobSeeker && (
                                <div className="d-flex justify-content-center">
                                    <Link onClick={goToLaborerProfile}>
                                        Manage Laborer Profile
                                    </Link>
                                </div>
                            )}
                        </MDBCardBody>
                    </MDBCard>
                </div>
                <div className="d-grid gap-2 col-md-6 mx-auto">
                    <Link to="/jobs/listed-jobs" className="btn btn-outline-primary">
                        Listed Jobs
                    </Link>
                    <Link to="/jobs/works-history" className="btn btn-outline-primary">
                        Work History
                    </Link>
                    <Link to="/manage-subscription" className="btn btn-outline-primary">
                        Manage Subscriptions
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Account;
