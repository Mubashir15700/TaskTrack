import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { getWorksHistory, getPrevRequest, cancelRequest, getLaborer } from "../../../api/userApi";
import SweetAlert from "../../../components/Common/SweetAlert";

const WorksHistory = () => {
    const navigate = useNavigate();
    const currentUserId = useSelector((state) => state.user.userData._id);
    const isJobSeeker = useSelector((state) => state.user.userData.isJobSeeker);

    const [works, setWorks] = useState([]);
    const [pendingRequest, setPendingRequest] = useState({});

    useEffect(() => {
        const getAllWorksHistory = async () => {
            try {
                const response = await getWorksHistory(currentUserId);
                if (response && response.data.status === "success") {
                    setWorks(response.data.works);
                }
            } catch (error) {
                console.log(error);
            }
        };

        const getAnyPendingRequest = async () => {
            try {
                const response = await getPrevRequest(currentUserId);
                if (response && response.data.status === "success") {
                    const responseData = response.data.request;
                    if (responseData) {
                        const workData = {
                            userId: responseData.userId,
                            languages: responseData.languages,
                            education: responseData.education,
                            avlDays: responseData.avlDays,
                            avlTimes: responseData.avlTimes,
                            fields: responseData.fields,
                            status: responseData.status,
                        };
                        setPendingRequest(workData);
                    }
                }
            } catch (error) {
                console.log(error);
            }
        };

        getAllWorksHistory();
        getAnyPendingRequest();
    }, []);

    const confirmCancelRequest = async () => {
        const result = await SweetAlert.confirmAction(
            "Cancel Request",
            "Are you sure you want to cancel this request?",
            "Cancel",
            "#d9534f"
        );

        if (result.isConfirmed) {
            handleCancelRequest();
        }
    };

    const handleLinkClick = async () => {
        try {
            const response = await getLaborer(currentUserId);
            if (response && response.data.status === "success") {
                // Extract relevant data from the response
                const { languages, education, avlDays, avlTimes, fields } = response.data.laborer;

                const laborerProfileData = {
                    userId: currentUserId,
                    languages: languages ?? "",
                    education: education ?? "",
                    avlDays: avlDays,
                    avlTimes: avlTimes,
                    fields: fields,
                };

                navigate("/laborer-profile", { state: { laborerProfileData } });
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error("An error occurerd while fetching data");
            console.log("Get laborer profile error: ", error);
        }
    };

    const handleCancelRequest = async () => {
        try {
            const response = await cancelRequest({ currentUserId });
            if (response) {
                if (response.data.status === "success") {
                    toast.success("Cancelled request successfully");
                    navigate("/account");
                } else {
                    toast.error(response.data?.message);
                }
            } else {
                toast.error("Failed to cancel request. Please try again.");
            }
        } catch (error) {
            console.error("Error cancelling request:", error);
            toast.error("An error occurred while cancelling the request. Please try again.");
        }
    };

    return (
        <div className="col-10 mx-auto mt-3">
            <h3 className="mb-4">Your Work History</h3>
            {
                works.length ? (
                    works.map((work, index) => (
                        <div className="card mb-3" key={index}>
                            <div className="card-header">
                                {work.title}
                            </div>
                            <div className="card-body d-flex flex-wrap justify-content-between">
                                <div className="col-md-6 col-12 mb-3">
                                    <p className="card-text">{work.description}</p>
                                    <p className="mb-1">Location: {work.location.village}, {work.location.district}</p>
                                    <p className="mb-1">Posted on: {new Date(work.postedAt).toLocaleString()}</p>
                                </div>
                                <div className="col-md-3 col-12 mb-3">
                                    <p>Status: {work.status}</p>
                                    <Link to={`/jobs/${work._id}`} className="btn btn-primary btn-block">
                                        View
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="d-flex justify-content-center align-items-center flex-column">
                        <p>You haven't done any works yet</p>
                        {Object.values(pendingRequest).length > 0 ? (
                            <>
                                <p>
                                    {pendingRequest.status === "pending" ?
                                        "Your request to become laborer has been sent to admin." :
                                        `Your request to become laborer has been ${pendingRequest.status}`}
                                </p>
                                <div className="d-md-flex justify-content-between col-6">
                                    {pendingRequest.status !== "approved" ? (
                                        <Link
                                            to="/become-laborer-form"
                                            {...(pendingRequest && { state: pendingRequest })}
                                            className="btn btn-primary col-12 col-md-5"
                                        >
                                            View Request
                                        </Link>
                                    ) : (
                                        <Link
                                            onClick={() => handleLinkClick()}
                                            className="btn btn-primary col-12 col-md-5"
                                        >
                                            Manage Laborer Profile
                                        </Link>
                                    )}
                                    <button
                                        className="btn btn-danger col-12 col-md-5"
                                        onClick={confirmCancelRequest}
                                        disabled={pendingRequest.status !== "pending"}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </>
                        ) : (
                            !isJobSeeker && (
                                <Link to="/become-laborer-form">
                                    You wanna become a laborer?
                                </Link>
                            )
                        )}
                    </div>
                )
            }
        </div>
    );
};

export default WorksHistory;
