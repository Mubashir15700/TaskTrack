import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { getLaborer } from "../../api/user/laborer";

const Account = () => {
    const currentUser = useSelector((state) => state.user.userData);
    // the profile image URL
    const imageUrl = `http://localhost:3000/uploads/profile/${currentUser?.profile}`;

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
        <div className="col-10 my-5 mx-auto d-md-flex align-items-center">
            {/* user profile view */}
            <div className="col-md-3 card mb-3">
                <div className="card-body text-center">
                    {currentUser?.profile ? (
                        <img
                            src={imageUrl}
                            alt="Profile"
                            style={{ height: "130px", width: "150px" }}
                            className="rounded-3 mb-2 mx-auto"
                        />
                    ) : (
                        <i className="bi bi-person-circle fs-1 mb-3"></i>
                    )}
                    <h6 className="card-subtitle text-muted mb-2">{currentUser?.username}</h6>
                    <Link to="/profile" className="btn btn-primary">
                        View
                    </Link>
                </div>
                {currentUser.isJobSeeker && (
                    <div className="d-flex justify-content-center">
                        <Link onClick={goToLaborerProfile}>
                            Manage Laborer Profile
                        </Link>
                    </div>
                )}
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
    );
};

export default Account;
